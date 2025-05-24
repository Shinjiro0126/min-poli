/**
 * ISO 文字列を受け取り、日本時間（JST）フォーマットの文字列を返す
 *
 * @param isoDate - `new Date().toISOString()` のような ISO タイムスタンプ
 * @param options - Intl.DateTimeFormatOptions でフォーマットを上書きしたい場合
 * @returns "YYYY/MM/DD HH:MM:SS" 形式の日本時間文字列
 */

export function formatToJST(
  isoDate: string,
  options?: Intl.DateTimeFormatOptions
): string {
  const date = new Date(isoDate);
  return date.toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year:   "numeric",
    month:  "2-digit",
    day:    "2-digit",
    hour:   "2-digit",
    minute: "2-digit",
    second: "2-digit",
    ...options,
  });
}