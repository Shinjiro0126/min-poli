import Breadcrumb from "@/app/component/Breadcrumb";
import ParkChart from "../component/park/ParkChart";
import UserVoiceList from "./component/UserVoiceList";
import { getCurrentPeriodVotes } from "@/lib/vote/vote";
import { getAllParties } from "@/lib/party/party";
import type { VVote } from "@/types/vote/vote";
import type { MParty } from "@/types/party/party";

export default async function ParkPage() {
  const breadcrumbData = [
    {path: "", label: "政策広場"}
  ];

  const votes: VVote[] = await getCurrentPeriodVotes();
  const parties: MParty[] = await getAllParties();

  const counts = votes.reduce((map, v) => {
    map.set(v.party_id, (map.get(v.party_id) ?? 0) + 1);
    return map;
  }, new Map<number, number>());

  const chartData = parties.map((p) => ({
    name: p.abbreviation,
    value: counts.get(p.party_id) ?? 0,
    color: p.color_code,
  }));

  const knownIds = new Set(parties.map((p) => p.party_id));
  const otherCount = votes.filter((v) => !knownIds.has(v.party_id)).length;
  if (otherCount > 0) {
    chartData.push({ name: "その他", value: otherCount, color: "#B0B0B0" });
  }


  const userVoices = votes.map((v) => ({
    id: v.vote_id,
    userName: v.user_name ?? "匿名",
    timeAgo: v.voted_at,
    partyLogo: `/img/party/${v.party_logo_url}`,
    content: v.comment ?? "",
  }));

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
                <ParkChart data={chartData} />
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
