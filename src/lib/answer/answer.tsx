// src/lib/answer/answer.tsx
import { supabase } from '@/lib/supabase/supabeseClient';
import { MWorksheet, MWorksheetAnswer, TAnswer } from '@/types/answer/answer';

export async function getWorksheetsByCategory(categoryTy: number): Promise<MWorksheet[]> {
  const currenDate = new Date().toISOString();

  const { data, error } = await supabase
    .from('m_worksheet')
    .select('*')
    .eq('category_ty', categoryTy)
    .eq('is_active', true)
    .lte('start_at', currenDate)
    .or(`end_at.is.null, end_at.gte.${currenDate}`)
    .order('sort', { ascending: true });
  
  if (error) {
    console.error('Error fetching worksheets:', error);
    return [];
  }
  
  return data || [];
}

export async function getUserAnswer(worksheetId: number, userId: string | null): Promise<TAnswer | null> {
  if (!userId || userId === "") {
    return null;
  }

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
