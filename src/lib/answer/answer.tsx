// src/lib/answer/answer.tsx
import { supabase } from '@/lib/supabase/supabeseClient';
import { MWorksheet, WorksheetWithAnswerStatus, MWorksheetAnswer, TAnswer, WorksheetAnswerWithUserFlag, VAnswer } from '@/types/answer/answer';

export async function getWorksheetsByCategory(categoryTy: number): Promise<MWorksheet[]> {
  const { data, error } = await supabase
    .from('m_worksheet')
    .select('*')
    .eq('category_ty', categoryTy)
    .eq('is_active', true)
    .order('sort', { ascending: true });
  
  if (error) {
    console.error('Error fetching worksheets:', error);
    return [];
  }
  
  return data || [];
}

export async function getWorkSheetsWithAnswerStatus(userId: string | null): Promise<WorksheetWithAnswerStatus[]> {
  const { data, error } = await supabase
    .rpc('get_worksheets_with_answer_status', {
      p_user_id: userId,
    })
  
  if (error) {
    console.error('Error fetching worksheet answers:', error);
    return [];
  }
  
  if (!data || data.length === 0) {
    return [];
  }

  return data;
}

export async function getUserAnswer(worksheetId: number, userId: string | null): Promise<TAnswer | null> {
  if (!userId || userId === "") {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('t_answer')
      .select('*')
      .eq('worksheet_id', worksheetId)
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // データが見つからない場合
        return null;
      }
      console.error('Error fetching user answer:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user answer:', error);
    return null;
  }
}

export async function getWorksheetAnswers(worksheetId: number): Promise<MWorksheetAnswer[]> {
  const { data, error } = await supabase
    .from('m_worksheet_answer')
    .select('*')
    .eq('worksheet_id', worksheetId)
    .eq('is_active', true)
    .order('sort', { ascending: true });
  
  if (error) {
    console.error('Error fetching worksheet answers:', error);
    return [];
  }
  
  return data || [];
}

export async function getWorksheetById(worksheetId: number): Promise<MWorksheet | null> {
  const { data, error } = await supabase
    .from('m_worksheet')
    .select('*')
    .eq('worksheet_id', worksheetId)
    .eq('is_active', true)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // データが見つからない場合
      return null;
    }
    console.error('Error fetching worksheet:', error);
    return null;
  }
  
  return data;
}

export async function getWorksheetByIdEnabled(worksheetId: number): Promise<MWorksheet | null> {
const currenDate = new Date().toISOString();

  const { data, error } = await supabase
    .from('m_worksheet')
    .select('*')
    .eq('worksheet_id', worksheetId)
    .lte('start_at', currenDate)
    .or(`end_at.is.null, end_at.gte.${currenDate}`)
    .eq('is_active', true)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // データが見つからない場合
      return null;
    }
    console.error('Error fetching worksheet:', error);
    return null;
  }
  
  return data;
}

export async function getWorksheetAnswersResult(worksheetId: number, userId: string | null): Promise<WorksheetAnswerWithUserFlag[]> {
  const { data, error } = await supabase
    .rpc('get_answers_with_user_flag', {
      p_user_id: userId,
      p_worksheet_id: worksheetId
    })
  
  if (error) {
    console.error('Error fetching worksheet answers:', error);
    return [];
  }
  
  if (!data || data.length === 0) {
    return [];
  }

  return data;
}

export async function getVUserAnswer(worksheetId: number, userId: string | null): Promise<VAnswer | null> {
  if (!userId || userId === "") {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('v_answer')
      .select('*')
      .eq('worksheet_id', worksheetId)
      .eq('user_id', userId)
      .eq('is_active', true)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // データが見つからない場合
        return null;
      }
      console.error('Error fetching user answer from v_answer:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user answer from v_answer:', error);
    return null;
  }
}

export async function getAllAnswers(worksheetId: number, currentUserId: string | null): Promise<VAnswer[]> {
  try {
    let query = supabase
      .from('v_answer')
      .select('*')
      .eq('worksheet_id', worksheetId)
      .eq('is_active', true)
      .not('reason', 'is', null)
      .order('created_at', { ascending: false });

    if (currentUserId) {
      query = query.neq('user_id', currentUserId);
    }

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching all answers:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching all answers:', error);
    return [];
  }
}

/**
 * start_atが最新のワークシート1件を取得する（ユーザーの回答状況付き）
 * @param userId ユーザーID
 * @returns 最新のワークシート、存在しない場合はnull
 */
export async function getLatestWorksheetWithAnswerStatus(userId: string | null): Promise<WorksheetWithAnswerStatus | null> {
  const { data, error } = await supabase
    .rpc('get_worksheets_with_answer_status', {
      p_user_id: userId,
    })
  
  if (error) {
    console.error('Error fetching latest worksheet:', error);
    return null;
  }
  
  if (!data || data.length === 0) {
    return null;
  }

  // Supabaseファンクション側でstart_atのdesc順になっているので最初の1件を返す
  return data[0];
}

// カテゴリ別にワークシートを分割するヘルパー関数
export function filterWorksheetsByCategory(
  worksheets: WorksheetWithAnswerStatus[],
  categoryTy: number
): WorksheetWithAnswerStatus[] {
  return worksheets.filter(worksheet => worksheet.category_ty === categoryTy);
}