import Breadcrumb from "@/app/component/Breadcrumb";
import ParkChart from "../component/ParkChart";
import UserVoiceList from "./component/UserVoiceList";
import { UserVoice } from "./types/userVoice";

export default function ParkPage() {
  const breadcrumbData = [
    {path: "", label: "政策広場"}
  ];

  const data = [
    { name: "自民党", value: 45, color: "#DA4544" },
    { name: "立憲民主党", value: 30, color: "#004097" },
    { name: "維新", value: 10, color: "#3C9641" },
    { name: "国民民主", value: 8, color: "#112C73" },
    { name: "れいわ新選組", value: 4, color: "#E61785" },
    { name: "共産党", value: 1, color: "#E8161E" },
    { name: "参政党", value: 1, color: "#E26632" },
    { name: "その他", value: 1, color: "#B0B0B0" },
  ];

  // ユーザーの声のデータ
  const userVoices: UserVoice[] = [
    {
      id: 1,
      userName: "ユーザー1",
      timeAgo: "3時間前",
      partyLogo: "/img/party/jimin.svg",
      content: "物価高への対策や経済成長戦略に具体性があって信頼できると感じました。"
    },
    {
      id: 2,
      userName: "ユーザー2",
      timeAgo: "5時間前",
      partyLogo: "/img/party/rikkenminsyu.svg",
      content: "社会保障の充実と格差是正の政策に共感しました。"
    },
    {
      id: 3,
      userName: "ユーザー3",
      timeAgo: "1日前",
      partyLogo: "/img/party/ishin.svg",
      content: "行政改革と規制緩和の姿勢が評価できます。"
    }
  ];

  return (
    <>
      <main className="pt-16">
        <div className="max-w-7xl mx-auto pt-12 px-4 mb-12">
          <Breadcrumb segments={breadcrumbData} />

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-6">
            <div className="w-full lg:w-[65%]">
              {/* 投票結果 */}
              <div className="px-2 py-3 sm:p-6 border border-stone-300 rounded-lg mb-12">
                <div className="text-center">
                  <h4 className="mb-4">第1回みんなの投票結果</h4>
                  <h4 className="mb-4">自民党</h4>
                </div>
                <ParkChart data={data} />
              </div>

              {/* みんなの声 */}
              <h4 className="mb-6">みんなの声</h4>
              {userVoices.map((voice) => (
                <UserVoiceList
                  key={voice.id}
                  userName={voice.userName}
                  timeAgo={voice.timeAgo}
                  partyLogo={voice.partyLogo}
                  content={voice.content}
                />
              ))}
            </div>

            <div className="w-full lg:w-[35%] lg:mb-0">
              <div className="px-2 py-3 sm:p-6 border border-stone-300 rounded-lg">
                次回みんなの投票
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
