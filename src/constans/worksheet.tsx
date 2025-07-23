// src/constants/worksheet.tsx

export const WORKSHEET_CATEGORY = {
  POLITICAL_PARTY: 1,    // 政党投票
  LIFE: 2,            // 生活
} as const;

export type WorksheetCategoryType = typeof WORKSHEET_CATEGORY[keyof typeof WORKSHEET_CATEGORY];