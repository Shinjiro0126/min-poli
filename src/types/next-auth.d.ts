import type { DefaultSession, DefaultUser } from "next-auth";
import type { JWT as DefaultJWT }        from "next-auth/jwt";

declare module "next-auth" {
  // Session.user に id を追加
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  // User オブジェクトにも id を追加
  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  // JWT の型にも user 情報を追加
  interface JWT extends DefaultJWT {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
