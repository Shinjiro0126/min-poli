// src/types/user/user.tsx

export interface DUser {
  user_id: string; // uuid, NOT NULL
  name?: string | null;
  email: string;
  password_hash?: string | null;
  image_url?: string | null;
  auth_provider: string;
  last_login_at?: string | null; // ISO8601文字列
  created_at?: string | null;    // ISO8601文字列
  updated_at?: string | null;    // ISO8601文字列
}