// src/lib/answer/util.tsx

/**
 * 値を指定した範囲内にクランプする関数
 * @param value クランプする値
 * @param min 最小値
 * @param max 最大値
 * @returns クランプされた値
 */
const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * 関心向上率を計算する関数
 * @param voteCount 投票数
 * @param startAt 開始日時
 * @param interestScore 関心スコア
 * @param min 最小値（デフォルト: 50）
 * @param max 最大値（デフォルト: 95）
 * @returns 関心向上率（パーセント）
 */
export const calcInterestBoostPercent = (
  voteCount: number,
  startAt: string,
  interestScore: number,
  min: number = 45,
  max: number = 99
): number => {
  const base = interestScore;

  const bonus = Math.min(voteCount * 0.05, 5);

  const rawScore = base + bonus;
  return clamp(Math.round(rawScore), min, max);
};
