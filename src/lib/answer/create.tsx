import { TAnswer } from "@/types/answer/answer";
import { supabase } from "@/lib/supabase/supabeseClient";

export async function createAnswer(
  worksheetId: number,
  userId: string,
  no: number,
  reason?: string | null
): Promise<{success: boolean; data?: TAnswer | null; error?: string}> {
  try {
    const { data, error } = await supabase
      .from('t_answer')
      .insert({
        worksheet_id: worksheetId,
        user_id: userId,
        no: no,
        reason: reason || null,
        is_active: true
      })
      .select('*')
      .single();

    if (error) {
      console.error('Error creating answer:', error);
      return {success: false, error: error.message};
    }

    return {success: true, data};
  } catch (error) {
    console.error('Error creating answer:', error);
    return {success: false, error: "データベースエラーが発生しました。"};
  }
}