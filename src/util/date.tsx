/**
 * 日付を相対的な時間表示に変換する関数
 * @param dateString - 日付文字列（例: "2025-04-17 00:00:00"）
 * @returns 相対的な時間表示（例: "3時間前"）
 */
export const getRelativeTimeString = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // 1分未満
  if (diffInSeconds < 60) {
    return 'たった今';
  }

  // 1時間未満
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}分前`;
  }

  // 24時間未満
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}時間前`;
  }

  // 7日未満
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}日前`;
  }

  // 30日未満
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks}週間前`;
  }

  // 365日未満
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months}ヶ月前`;
  }

  // 1年以上
  const years = Math.floor(diffInSeconds / 31536000);
  return `${years}年前`;
};


// src/lib/utils/date.ts
/**
 * 指定された終了日時が現在時刻より過去かどうかを判定する
 * @param endAt 終了日時（ISO文字列形式）
 * @returns 期限切れの場合true、そうでなければfalse
 */
export function isExpired(endAt: string | null): boolean {
  if (!endAt) return false;
  const endDate = new Date(endAt);
  const now = new Date();
  return now > endDate;
}

/**
 * 指定された開始日時が1週間以内かどうかを判定する
 * @param startAt 開始日時（ISO文字列形式）
 * @returns 1週間以内の場合true、そうでなければfalse
 */
export function isNewWorksheet(startAt: string | null): boolean {
  if (!startAt) return false;
  const startDate = new Date(startAt);
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  return startDate >= oneWeekAgo;
}

/**
 * ワークシートが期限内かどうかを判定する
 * @param startAt 開始日時（ISO文字列形式）
 * @param endAt 終了日時（ISO文字列形式）
 * @returns 期限内の場合true、そうでなければfalse
 */
export function isWithinPeriod(startAt: string | null | undefined, endAt: string | null | undefined): boolean {
  const now = new Date();
  const start = startAt ? new Date(startAt) : null;
  const end = endAt ? new Date(endAt) : null;
  
  return (!start || now >= start) && (!end || now <= end);
}