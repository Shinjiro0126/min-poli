import Breadcrumb from "@/app/component/Breadcrumb";
import { getDVideos } from "@/lib/dvideo/dvideos";
import VideoList from "../component/know/VideoList";
import { getLatestSummary } from "@/lib/summary/summary";
import NewsSummary from "@/app/component/know/NewsSummary"

export default async function KnowPage() {
  const breadcrumbData = [
    {path: "/know", label: "政治を知る"}
  ];
  
  const [dvideos, latestNews] = await Promise.all([
    getDVideos(),
    getLatestSummary()
  ]);

  return (
    <>
      <main className="pt-16">

        <div className="max-w-7xl mx-auto pt-12 px-4 mb-12">
          <Breadcrumb segments={breadcrumbData} />

          <div className="flex flex-col lg:flex-row gap-2 mb-3">
            <div className="w-full lg:w-[65%] order-2 lg:order-1">
              <h4 className="mb-6">政治を知る</h4>
              <div className="space-y-4">
                <VideoList videos={dvideos} />
              </div>
            </div>
            <div className="w-full lg:w-[35%] lg:mb-0 order-1 lg:order-2">
              <h4 className="mb-4">今日の政治を1分でキャッチ!</h4>
              <div className="px-3 py-2 leading-[1.75rem]">
                {latestNews && <NewsSummary news={latestNews} />}
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}
