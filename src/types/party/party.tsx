// src/types/user/user.tsx
export interface MParty {
  party_id: number;
  name: string;
  abbreviation: string;
  logo_url: string;
  color_code: string;
  description: string;
  official_url: string;
  is_active: boolean;
  created_at: string;  // ISO 8601 タイムスタンプ文字列
  updated_at: string;  // ISO 8601 タイムスタンプ文字列
}