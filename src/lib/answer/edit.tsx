import { supabase } from '@/lib/supabase/supabeseClient';

export async function updateAnswerReason(
  worksheetId: number,
  userId: string,
  reason: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('t_answer')
      .update({ 
        reason: reason,
        updated_at: new Date().toISOString()
      })
      .eq('worksheet_id', worksheetId)
      .eq('user_id', userId)
      .eq('is_active', true)
      .select();

    if (error) {
      console.error('Error updating answer reason:', error);
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return { success: false, error: '更新対象の投票が見つかりません' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating answer reason:', error);
    return { success: false, error: '投票理由の更新に失敗しました' };
  }
}
