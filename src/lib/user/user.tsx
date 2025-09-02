// src/lib/user/user.tsx
import { supabase } from '@/lib/supabase/supabeseClient';
import { DUser } from '@/types/user/user';
import bcrypt from 'bcrypt';

/**
 * ユーザー情報を取得する
 * @param userId ユーザーID
 * @returns ユーザー情報、存在しない場合はnull
 */
export async function getUserById(userId: string): Promise<DUser | null> {
  try {
    const { data, error } = await supabase
      .from('d_users')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // データが見つからない場合
        return null;
      }
      console.error('Error fetching user:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

/**
 * ユーザー情報を取得する
 * @param email ユーザーID
 * @returns ユーザー情報、存在しない場合はnull
 */
export async function getUserByEmail(email: string): Promise<DUser | null> {
  try {
    const { data, error } = await supabase
      .from('d_users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // データが見つからない場合
        return null;
      }
      console.error('Error fetching user:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

/**
 * ユーザーのメールアドレスを更新する
 * @param userId ユーザーID
 * @param email 新しいメールアドレス
 * @returns 更新結果
 */
export async function updateUserEmail(
  userId: string, 
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // メールアドレスの重複チェック
    const { data: existingUser, error: checkError } = await supabase
      .from('d_users')
      .select('user_id')
      .eq('email', email)
      .neq('user_id', userId)
      .single();

    if (existingUser) {
      return { success: false, error: 'このメールアドレスは既に使用されています' };
    }

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking email uniqueness:', checkError);
      return { success: false, error: 'メールアドレスの確認中にエラーが発生しました' };
    }

    // メールアドレスを更新
    const { error: updateError } = await supabase
      .from('d_users')
      .update({ 
        email: email,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error updating user email:', updateError);
      return { success: false, error: 'メールアドレスの更新に失敗しました' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating user email:', error);
    return { success: false, error: 'メールアドレスの更新中にエラーが発生しました' };
  }
}

/**
 * ユーザー名を更新する
 * @param userId ユーザーID
 * @param name 新しいユーザー名
 * @returns 更新結果
 */
export async function updateUserName(
  userId: string, 
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error: updateError } = await supabase
      .from('d_users')
      .update({ 
        name: name,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error updating user name:', updateError);
      return { success: false, error: 'ユーザー名の更新に失敗しました' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating user name:', error);
    return { success: false, error: 'ユーザー名の更新中にエラーが発生しました' };
  }
}

/**
 * ユーザーのパスワードを更新する
 * @param userId ユーザーID
 * @param password 新しいパスワード
 * @returns 更新結果
 */
export async function updateUserPassword(
  userId: string, 
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // パスワードをハッシュ化
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { error: updateError } = await supabase
      .from('d_users')
      .update({ 
        password_hash: hashedPassword,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (updateError) {
      console.error('Error updating user password:', updateError);
      return { success: false, error: 'パスワードの更新に失敗しました' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating user password:', error);
    return { success: false, error: 'パスワードの更新中にエラーが発生しました' };
  }
}