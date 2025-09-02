// pages/api/auth/[...nextauth].ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "@/lib/supabase/supabeseClient";
import bcrypt from "bcrypt";
import { formatToJST } from "@/util/timestamp_jp";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  
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
            // 既に credentials 登録済みユーザー → signup へ誘導（メッセージ付き）
            return "/login?error=existing_credentials";
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

    async jwt({ token, user, account }) {
      // 初回ログイン時のみ実行（accountが存在する場合）
      if (account) {
        if(account.provider === "google" && user?.email){
          console.log("Processing Google login for email:", user.email);
          
          const {data: dbUser, error } = await supabase
            .from("d_users")
            .select("user_id, email")
            .eq("email", user.email)
            .eq("auth_provider", "google")
            .single();

          if(dbUser && !error){
            token.user = {
              id: dbUser.user_id,
              email: dbUser.email,
              image: user.image,
            };
            console.log("JWT: Set user from database:", token.user);
          } else {
            console.error("JWT: Failed to get user from database:", error);
          }
        } else if(user){
          // Credentials認証の場合
          token.user = user;
          console.log("JWT: Set credentials user:", token.user);
        }
      }
      // 2回目以降は既存のtokenをそのまま返す（DBクエリなし）

      return token;
    },
    async session({ session, token }) {
      if(token.user){
        session.user = token.user as { id: string; name?: string; email?: string; image?: string };
      }

      return session;
    },
  },
};
