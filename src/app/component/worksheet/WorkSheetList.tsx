import { getWorkSheetsWithAnswerStatus, filterWorksheetsByCategory } from "@/lib/answer/answer";
import { WORKSHEET_CATEGORY } from "@/constans/worksheet";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import WorkSheetCard from "./WorkSheetCard";

export default async function WorkSheetList() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;

  // 最低2秒間のローディング時間を確保
  const [worksheets] = await Promise.all([
    getWorkSheetsWithAnswerStatus(userId),
    new Promise(resolve => setTimeout(resolve, 2000))
  ]);

  // カテゴリ別にフィルタリング
  const politicalPartyWorksheets = filterWorksheetsByCategory(worksheets, WORKSHEET_CATEGORY.POLITICAL_PARTY);
  const lifeWorksheets = filterWorksheetsByCategory(worksheets, WORKSHEET_CATEGORY.LIFE);

  return (
    <div className="mb-3">
      {/* 政党投票 */}
      {politicalPartyWorksheets.length > 0 && (
        <div className="w-full mb-12">
          <h2 className="h4 mb-3">政党投票</h2>
          <div className="flex flex-nowrap gap-2 sm:gap-4 overflow-x-auto">
            {politicalPartyWorksheets.map((worksheet) => (
              <WorkSheetCard
                key={worksheet.worksheet_id}
                worksheet={worksheet}
                layout="horizontal"
                showNewBadge={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* アンケート */}
      <div className="w-full mb-12">
        <h2 className="h4 mb-3">開催中のアンケート</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-4">
          {lifeWorksheets.map((worksheet) => (
            <WorkSheetCard
              key={worksheet.worksheet_id}
              worksheet={worksheet}
              layout="vertical"
              showNewBadge={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
