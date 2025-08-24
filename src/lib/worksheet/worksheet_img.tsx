// src/lib/worksheet/worksheet_img.tsx
import { supabase } from '@/lib/supabase/supabeseClient';

/**
 * Supabaseストレージからワークシート画像のURLを取得する
 * @param thumbnailUrl 画像ファイルのパス（例: "202506.png"）
 * @returns 画像のURL
 */
export function getWorksheetImageUrl(thumbnailUrl: string | null | undefined): string {
  // thumbnailUrlがnullまたは空の場合はデフォルト画像を返す
  if (!thumbnailUrl) {
    return '/img/worksheet/202506.png'; // フォールバック用のローカル画像
  }

  try {
    // Supabaseストレージから公開URLを取得
    const { data } = supabase.storage
      .from('worksheet')
      .getPublicUrl(thumbnailUrl);

    return data.publicUrl;
  } catch (error) {
    console.error('Error getting worksheet image URL:', error);
    // エラーの場合はデフォルト画像を返す
    return '/img/worksheet/202506.png';
  }
}

/**
 * 複数のワークシート画像URLを一括取得する
 * @param thumbnailUrls 画像ファイルのパス配列
 * @returns 画像URLの配列
 */
export function getWorksheetImageUrls(thumbnailUrls: (string | null | undefined)[]): string[] {
  return thumbnailUrls.map(url => getWorksheetImageUrl(url));
}
