import { supabase } from "@/lib/supabase";
import { NewsSummary } from "@/types/summary/summary";

export async function getLatestSummary(): Promise<NewsSummary | null>{
  const today = new Date();
  today.setHours(today.getHours() + 9); // JSTに変換
  today.setHours(23, 59, 59, 999); // JSTの終端

  const { data, error } = await supabase
    .from('t_summaries')
    .select('*')
    .lte('published_date', today.toISOString())
    .order('published_date', { ascending: false })
    .limit(1)
    .single();

    if (error) {
      console.error('Error fetching news summary:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return null;
    }

  return data;
}