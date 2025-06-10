import Breadcrumb from "@/app/component/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
import { getWorksheetsByCategory } from "@/lib/answer/answer";
import { WORKSHEET_CATEGORY } from "@/constans/worksheet";

export default async function WorkSheet() {
  const breadcrumbData = [
    {path: "/worksheet", label: "政策広場"}
  ];

  // 政党投票のワークシートを取得
  const politicalPartyWorksheets = await getWorksheetsByCategory(WORKSHEET_CATEGORY.POLITICAL_PARTY);

  // 生活のワークシートを取得
  const lifeWorksheets = await getWorksheetsByCategory(WORKSHEET_CATEGORY.LIFE);

  return (
    <>
      <main className="pt-16">

        <div className="max-w-7xl mx-auto pt-12 px-4 mb-12">
          <Breadcrumb segments={breadcrumbData} />

          <div className="mb-3">
            {/* 政党投票 */}
            <div className="w-full mb-12">
              <h4 className="mb-3">政党投票</h4>
              <div className="flex flex-nowrap gap-2 sm:gap-4 overflow-x-auto">
                {politicalPartyWorksheets.map((worksheet) => (
                  <Link
                    key={worksheet.worksheet_id}
                    href={`/worksheet/${worksheet.worksheet_id}`}
                    className="aspect-video flex-shrink-0 rounded-lg overflow-hidden relative group min-w-[50%] md:min-w-[33.333%] xl:min-w-[25%]"
                  >
                    <Image
                      src={`/img/worksheet/${worksheet.thumbnail_url || "202506.png"}`}
                      alt={worksheet.title}
                      fill
                      className="object-cover transition-all duration-300 group-hover:brightness-75"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* アンケート */}
            <div className="w-full mb-12">
              <h4 className="mb-3">開催中のアンケート</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                {lifeWorksheets.map((worksheet) => (                
                  <Link
                  key={worksheet.worksheet_id}
                  href={`/worksheet/${worksheet.worksheet_id}`}
                  className="flex-shrink-0 rounded-lg overflow-hidden relative aspect-video group"
                >
                  <Image
                    src={`/img/worksheet/${worksheet.thumbnail_url || "202506.png"}`}
                    alt={worksheet.title}
                    fill
                    className="object-cover transition-all duration-300 group-hover:brightness-75"
                  />
                </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

      </main>
    </>
  );
}
