
import Avatar from "./component/Avatar";
import Card from "./component/Card";
import Button from "./component/Button";
import { LuUsers } from "react-icons/lu";
import { FaHeartbeat } from "react-icons/fa";
import { MdOutlineCalendarToday } from "react-icons/md";
import { MdShare } from "react-icons/md";
import { MdLightbulb } from "react-icons/md";
import { getRandomAvatarPaths } from "@/util/avator_img";
import { getLatestWorksheetWithAnswerStatus } from "@/lib/answer/answer";
import { getLatestSummary } from "@/lib/summary/summary";
import { calcInterestBoostPercent } from "@/lib/answer/util";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

export default async function Home() {

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;

  // 最新のワークシートを取得
  const latestWorksheet = await getLatestWorksheetWithAnswerStatus(userId);

  // 最新のニュースサマリーを取得
  const latestSummary = await getLatestSummary();

  // ランダムなアバター画像を3つ取得
  const avatarPaths = getRandomAvatarPaths(3);

  // 関心向上率を計算
  const interestBoostPercent = latestWorksheet && latestWorksheet.start_at 
    ? calcInterestBoostPercent(
        latestWorksheet.vote_count || 0,
        latestWorksheet.start_at,
        0 // interest_scoreは一時的にデフォルト値を使用
      )
    : 53; // デフォルト値

  return (
    <>
      <div 
        className="min-h-screen font-[family-name:var(--font-geist-sans)]"
        >
        <div className="py-16 px-3 mb-12 position-relative h-[256px] relative" style={{ backgroundImage: 'url("/img/main-v.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white"></div>
            <div className="max-w-2xl mx-auto relative z-10">
              <h2 className="h4 mb-4">今日のテーマで投票しよう！</h2>
              <p className="mb-6">政治や社会課題について、みんなで考えて意見を共有しよう！</p>
              <div className="flex gap-4 items-center">
                <div className="flex -space-x-1 overflow-hidden">
                  {avatarPaths.map((avatarPath, index) => (
                    <div key={index} className="inline-block rounded-full ring-1 ring-stone-300 bg-stone-50 p-2">
                      <Avatar 
                        src={avatarPath} 
                        alt={`参加者${index + 1}`}
                        className="rounded-full w-8 h-8"
                      />
                    </div>
                  ))}
                </div>
                <div className="font-body-sm">
                  <span className="font-overline">{latestWorksheet?.vote_count.toLocaleString() || 0}人</span>が参加中
                </div>
              </div>
            </div>
        </div>

        <div className="max-w-3xl mx-auto px-3">
          <Card className="mb-6 shadow-md">
            <div className="text-center mb-6">
              <h1 className="text-stone-500 mb-2">今日の投票テーマ</h1>
              {latestWorksheet ? (
                <>
                  <div className="text-primary-700 font-sub-title1 mb-4">{latestWorksheet.title}</div>
                  <div>
                    {latestWorksheet.title_message || "あなたの意見を聞かせてください! 1日1回投票できます。"}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-primary-700 font-sub-title1 mb-4">現在投票可能なテーマはありません</div>
                  <div>
                    新しい投票テーマをお待ちください。
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-center">
              {latestWorksheet ? (
                <Button href={`/worksheet/${latestWorksheet.worksheet_id}`} className="d-inline-block bg-primary-700 hover:bg-primary-900 text-white py-3 px-4 shadow-md">
                  {latestWorksheet.is_answer ? "結果を見る" : "今すぐ投票する"}
                </Button>
              ) : (
                <Button href="/worksheet" className="d-inline-block bg-gray-500 text-white py-3 px-4 shadow-md cursor-not-allowed" disabled>
                  投票テーマなし
                </Button>
              )}
            </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Card className="shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <LuUsers className="text-[44px] text-stone-700" />
                </div>
                <div className="h3 mb-1">{latestWorksheet?.vote_count || 0}</div>
                <p className="text-stone-700 font-body-sm">参加者数</p>
              </Card>
              <Card className="shadow-md text-center">
                <div className="flex justify-center mb-4">
                  <FaHeartbeat className="text-[44px] text-stone-700" />
                </div>
                <div className="h3 mb-1">{interestBoostPercent}<span className="font-caption">%</span></div>
                <p className="text-stone-700 font-body-sm">関心向上率</p>
              </Card>
            </div>

            {/* 後で実装 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 hidden">
              <Card className="shadow-md">
                <div className="flex gap-4 items-center mb-2">
                  <MdOutlineCalendarToday className="text-[24px] text-stone-700" />
                  <div>
                    <div className="font-body-sm">今週の投票回数</div>
                    <h4>5<span className="font-body-sm">回</span></h4>
                  </div>
                </div>
                <p>今週は後2回だよ！頑張って</p>
              </Card>
              <Card className="shadow-md">
                <div className="flex gap-4 items-center mb-2">
                  <MdShare className="text-[24px] text-stone-700" />
                  <div>
                    <div className="font-body-sm">シェア回数</div>
                    <h4>12<span className="font-body-sm">回</span></h4>
                  </div>
                </div>
                <p>今週は後2回だよ！頑張って</p>
              </Card>
            </div>

            <div className="grid grid-cols-1 mb-16">
              <Card className="shadow-md">
                <div className="flex gap-4 items-center mb-2">
                  <MdLightbulb className="text-[24px] text-stone-700" />
                  <div>今日の豆知識</div>
                </div>
                <p>{latestSummary?.summary || "今日の豆知識はお休みだよ！"}</p>
              </Card>
            </div>

            <div>
                          
            </div>


        </div>

    </div>
    </>
  );
}
