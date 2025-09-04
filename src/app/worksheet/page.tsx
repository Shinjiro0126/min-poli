import Breadcrumb from "@/app/component/Breadcrumb";
import Image from "next/image";
import { getWorkSheetsWithAnswerStatus, filterWorksheetsByCategory } from "@/lib/answer/answer";
import { WORKSHEET_CATEGORY } from "@/constans/worksheet";
import { LuUsers } from "react-icons/lu";
import { MdOutlineCalendarToday } from "react-icons/md";
import Button from "../component/Button";
import { MdInfoOutline } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { getWorksheetImageUrl } from "@/lib/worksheet/worksheet_img";

export default async function WorkSheet() {
  const breadcrumbData = [
    {path: "/worksheet", label: "投票一覧"}
  ];

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;

  // ワークシートを取得
  const worksheets = await getWorkSheetsWithAnswerStatus(userId);

  // カテゴリ別にフィルタリング
  const politicalPartyWorksheets = filterWorksheetsByCategory(worksheets, WORKSHEET_CATEGORY.POLITICAL_PARTY);
  const lifeWorksheets = filterWorksheetsByCategory(worksheets, WORKSHEET_CATEGORY.LIFE);

  // 1週間前の日付を計算
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // ワークシートが新しいかどうかを判定する関数
  const isNewWorksheet = (startAt: string | null) => {
    if (!startAt) return false;
    const startDate = new Date(startAt);
    return startDate >= oneWeekAgo;
  };

  return (
    <>
      <div className="max-w-7xl mx-auto pt-12 px-4 mb-12">
        <Breadcrumb segments={breadcrumbData} />

        <div className="mb-3">
          {/* 政党投票 */}
          <div className="w-full mb-12">
            <h2 className="h4 mb-3">政党投票</h2>
            <div className="flex flex-nowrap gap-2 sm:gap-4 overflow-x-auto">
              {politicalPartyWorksheets.map((worksheet) => (
                <div className="border rounded-md overflow-hidden bg-white shadow-md flex-shrink-0 w-[90%] md:w-[33.333%] xl:w-[25%]" key={worksheet.worksheet_id}>
                  <div className="aspect-video overflow-hidden relative group">
                    <Image
                      src={getWorksheetImageUrl(worksheet.thumbnail_url)}
                      alt={worksheet.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h5 className="font-sub-title2 mb-2">{worksheet.title}</h5>
                    <p className="font-body-sm text-stone-500 mb-3">{worksheet.title_message}</p>
                    <div className="mb-4 text-stone-500 flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <LuUsers className="text-[20px] text-stone-700" />
                        <span className="font-overline">{worksheet.vote_count}</span>
                      </div>
                      {worksheet.end_at && (
                        <div className="flex items-center gap-1">
                          <MdOutlineCalendarToday className="text-[20px] text-stone-700" />
                          <span className="font-overline">{new Date(worksheet.end_at).toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' })}まで</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        {worksheet.is_answer ? (
                          <span className="flex items-center gap-2 bg-success-100 text-success-400 py-2 px-3 rounded-full font-overline">
                            <MdCheckCircleOutline className="text-[20px]" />
                            参加済み
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 bg-orange-100 text-orange-400 py-2 px-3 rounded-full font-overline">
                            <MdInfoOutline className="text-[20px]" />
                            未参加
                          </span>
                        )}
                      </div>

                      <Button
                        href={`/worksheet/${worksheet.worksheet_id}`}
                        className="inline-block text-white bg-primary-700 hover:bg-primary-900"
                      >
                        {worksheet.is_answer ? "結果を見る" : "投票する"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* アンケート */}
          <div className="w-full mb-12">
            <h2 className="h4 mb-3">開催中のアンケート</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-4">
              {lifeWorksheets.map((worksheet) => (
                <div className="border rounded-md overflow-hidden bg-white shadow-md relative" key={worksheet.worksheet_id}>
                  {isNewWorksheet(worksheet.start_at) && (
                    <span className="py-1 px-3 bg-pine-green-500 text-white rounded shadow-md absolute top-3 left-3 z-10 font-overline">New</span>
                  )}
                  <div className="aspect-video aspect-video flex-shrink-0 overflow-hidden relative group min-w-[50%] md:min-w-[33.333%] xl:min-w-[25%]">
                    <Image
                      src={getWorksheetImageUrl(worksheet.thumbnail_url)}
                      alt={worksheet.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h5 className="font-sub-title2 mb-2">{worksheet.title}</h5>
                    <p className="font-body-sm text-stone-500 mb-3">{worksheet.title_message}</p>
                    <div className="mb-4 text-stone-500 flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <LuUsers className="text-[20px] text-stone-700" />
                        <span className="font-overline">{worksheet.vote_count}</span>
                      </div>
                      {worksheet.end_at && (
                        <div className="flex items-center gap-1">
                          <MdOutlineCalendarToday className="text-[20px] text-stone-700" />
                          <span className="font-overline">{new Date(worksheet.end_at).toLocaleDateString('ja-JP', { month: '2-digit', day: '2-digit' })}まで</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        {worksheet.is_answer ? (
                          <span className="flex items-center gap-2 bg-success-100 text-success-400 py-2 px-3 rounded-full font-overline">
                            <MdCheckCircleOutline className="text-[20px]" />
                            参加済み
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 bg-orange-100 text-orange-400 py-2 px-3 rounded-full font-overline">
                            <MdInfoOutline className="text-[20px]" />
                            未参加
                          </span>
                        )}
                      </div>

                      <Button
                        href={`/worksheet/${worksheet.worksheet_id}`}
                        className="inline-block text-white bg-primary-700 hover:bg-primary-900"
                      >
                        {worksheet.is_answer ? "結果を見る" : "投票する"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
