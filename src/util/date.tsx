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