export interface DVideo {
  id: number;
  video_id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  youtube_url: string | null;
  channel_id: string | null;
  channel_title: string | null;
  view_count: number | null;
  like_count: number | null;
  tags: string[] | null;
  published_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DVideoListItem {
  id: number;
  video_id: string;
  title: string;
  thumbnail_url: string | null;
  published_at: string | null;
  created_at: string;
  is_active: boolean;
} 