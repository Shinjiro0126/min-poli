import { supabase } from '@/lib/supabase';
import { DVideoListItem, DVideo } from '@/types/dvideo/dvideo';

export async function getDVideos(): Promise<DVideoListItem[]> {
  const { data, error } = await supabase
    .from('dvideo')
    .select(`
      id,
      video_id,
      title,
      thumbnail_url,
      published_at,
      created_at,
      is_active
    `)
    .eq('is_active', true)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching dvideos:', error);
    return [];
  }

  return data || [];
}

export async function getDVideoById(id: string): Promise<DVideo | null> {
  const { data, error } = await supabase
    .from('dvideo')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching video:', error);
    return null;
  }

  return data;
} 