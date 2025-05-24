// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabase/supabeseClinent";
import bcrypt from "bcrypt";
import { formatToJST } from "@/util/timestamp_jp";

export const authOptions: NextAuthOptions = {

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // --- Credentials: d_users テーブルを直接叩く ---
    CredentialsProvider({
      name: "Email・Password",
      credentials: {
        email: { label: "メールアドレス", type: "email" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // 1) d_users テーブルから email でレコード取得
        const { data: user, error } = await supabase
          .from("d_users")
          .select("user_id, email, password_hash")
          .eq("email", credentials.email)
          .single();

        if (error || !user) {
          console.error("Supabase lookup error:", error);
          return null;
        }

        // 2) bcrypt でパスワード照合
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password_hash
        );
        if (!isValid) {
          console.warn("Password mismatch for", credentials.email);
          return null;
        }

        // 3) 認証成功 → NextAuth に返す user オブジェクト
        return {
          id: user.user_id,
          email: user.email,
          // 必要に応じて name, role などを追加しても OK
        };
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({user, account}){
      if(account?.provider === "google"){
        const email = user.email;
        if(!email){
          return false;
        }

        //d_usersから既存レコードを取得(email + auth_providerでチェック)
        const {data: existing, error: fetchError} = await supabase
        .from("d_users")
        .select("user_id, auth_provider")
        .eq("email", email)
        .single();

        const now = formatToJST(new Date().toISOString());

        if(fetchError && fetchError.code !== "PGRST116") {
          console.error("Supabase fetch error:", fetchError);
          return false;
        }

        if(existing){
          if(existing.auth_provider === "credentials"){
            // 既に credentials 登録済みユーザー → signup へ誘導
            return "/signup";
          }

          // 既に Google 登録済みユーザー → 最終ログイン日時だけ更新
          const {error: updateError} = await supabase
          .from("d_users")
          .update({last_login_at: now, updated_at: now})
          .eq("user_id", existing.user_id);

          if (updateError) {
            console.error("Supabase uddate error:", updateError);
          }
        } else {
          const {error: insertError} = await supabase.from("d_users").insert({
            email,
            auth_provider: "google",
            image_url: user.image ?? null,
            last_login_at: now,
            created_at: now,
            updated_at: now,
          });
          if (insertError) {
            console.error("Supabase insert error:", insertError);
            return false;
          }
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.user as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
