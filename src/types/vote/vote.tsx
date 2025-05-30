// t_vote テーブル
export interface TVote {
  vote_id: number;
  vote_period_id: number;
  user_id?: string; // uuid, nullable
  party_id: number;
  comment?: string | null;
  is_public?: boolean | null;
  voted_at?: string | null; // ISO8601文字列
  created_at?: string | null;
  updated_at?: string | null;
  is_deleted?: boolean | null;
}

// t_vote_periods テーブル
export interface TVotePeriod {
  vote_period_id: number;
  title: string;
  start_date: string; // 'YYYY-MM-DD'
  end_date: string;   // 'YYYY-MM-DD'
  description?: string | null;
  is_active?: boolean | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// t_vote_period_parties テーブル
export interface TVotePeriodParty {
  id: number;
  vote_period_id: number;
  party_id: number;
}

export interface VVote {
  vote_id: number;
  vote_period_id: number;
  user_id: string;
  user_name: string;
  party_id: number;
  party_name: string;
  party_abbreviation: string;
  party_logo_url: string;
  comment: string;
  voted_at: string;  // ISO8601 形式または "YYYY-MM-DD HH:MM:SS" など文字列
}