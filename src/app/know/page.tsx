import Breadcrumb from "@/app/component/Breadcrumb";
import Image from "next/image";

export default function Know() {
  const breadcrumbData = [
    {path: "/know", label: "政治を知る"}
  ];

  return (
    <>
      <main className="pt-16">
        <div className="max-w-7xl mx-auto pt-12 px-4">
          <Breadcrumb segments={breadcrumbData} />

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-6">
            <div className="w-full lg:w-[65%] order-2 lg:order-1">
              <h4 className="mb-4">みんなで見る政治・経済</h4>
              <div>

                <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 sm:gap-6 border-b border-b-stone-300 py-3 sm:px-2">
                  <div className="flex flex-col justify-between gap-2">
                    <p className="sub-title1 line-clamp-2 h-12 sm:line-clamp-4 sm:h-18">
                      【高市早苗に聞く、日本の安全保障の行方】トランプ関税ここまでの振り返り
                      ／製造業の国内回帰／EV補助金「見直し」の可能性／ピンチをチャンスにする
                      には
                    </p>
                    <span className="text-stone-500 font-caption">2時間前</span>
                  </div>
                  <div className="w-full sm:min-w-40 sm:max-w-50 flex justify-end items-center">
                    <Image src="https://i.ytimg.com/vi/oJQZf2cX6_Q/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLC47jvsFad1xTjvTsvEqs8xus9Kcw" alt="title" className="aspect-video w-full rounded-lg" />
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 sm:gap-6 border-b border-b-stone-300 py-3 sm:px-2">
                  <div>
                    <p className="sub-title1 line-clamp-2 h-12 sm:line-clamp-3 sm:h-18">
                    減税？給付？どうする経済対策…与党キーマンが「補正予算」明言【報道ステ
                    ーション】(2025年4月14日)
                    </p>
                    <span className="text-stone-500 font-caption">4日前</span>
                  </div>
                  <div className="w-full sm:min-w-40 sm:max-w-50 flex justify-end items-center">
                    <Image src="https://i.ytimg.com/vi/3HkSt_zJJo4/hqdefault.jpg?sqp=-oaymwEnCOADEI4CSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDyauSncUkeG-2GvJ_dpRwEzF_MYQ" alt="title" className="aspect-video w-full rounded-lg" />
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 sm:gap-6 border-b border-b-stone-300 py-3 sm:px-2">
                  <div>
                    <p className="sub-title1 line-clamp-2 h-12 sm:line-clamp-3 sm:h-18">
                    知っておきたい経済ニュース1週間　高値が続くコメ　7月まで備蓄米放出へ/鴻
                    海精密工業、2027年までに日本にEV投入する方針【Bizスクエア】
                    </p>
                    <span className="text-stone-500 font-caption">7日前</span>
                  </div>
                  <div className="w-full sm:min-w-40 sm:max-w-50 flex justify-end items-center">
                    <Image src="https://i.ytimg.com/vi/BDsSQSxEZf4/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBskcpdcPsuy7p-9pvPgZBI5GBETw" alt="title" className="aspect-video w-full rounded-lg" />
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 sm:gap-6 border-b border-b-stone-300 py-3 sm:px-2">
                  <div>
                    <p className="sub-title1 line-clamp-2 h-12 sm:line-clamp-3 sm:h-18">
                    【想定外】石破首相の｢懐刀｣赤沢経済再生相とはどのような政治家？トランプ
                    大統領との“面会”の内容は？【サン！シャインニュース】
                    </p>
                    <span className="text-stone-500 font-caption">3日前</span>
                  </div>
                  <div className="w-full sm:min-w-40 sm:max-w-50 flex justify-end items-center">
                    <Image src="https://i.ytimg.com/vi/f_bdZa5A-UI/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDM0jHsrG9jKTW9Go0lCC_ZAqwbJw" alt="title" className="aspect-video w-full rounded-lg" />
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 sm:gap-6 border-b border-b-stone-300 py-3 sm:px-2">
                  <div>
                    <p className="sub-title1 line-clamp-2 h-12 sm:line-clamp-3 sm:h-18">
                    【解説】物価高対策で現金給付？ 国民一律3万～5万円、与党内で検討 公明から
                    は「減税」求める意見も
                    </p>
                    <span className="text-stone-500 font-caption">9日前</span>
                  </div>
                  <div className="w-full sm:min-w-40 sm:max-w-50 flex justify-end items-center">
                    <Image src="https://i.ytimg.com/vi/tAhAIrJbvAM/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBOBRmi5G0Vh08Zid3W0tndCyzXJg" alt="title" className="aspect-video w-full rounded-lg" />
                  </div>
                </div>



              </div>
        
            </div>
            <div className="w-full lg:w-[35%] lg:mb-0 order-1 lg:order-2">
              <h4 className="mb-4">今日の政治を1分でキャッチ!</h4>
              <div className="px-3 py-2 leading-[1.75rem]">
                日銀は本日、政策金利を0.5%に据え置く方針を決定。米国の関税政策の影響などを受け、2025年度と2026年度の実質GDP成長率見通しを1%未満に下方修正する見込みです。物価上昇率も2%程度に下方修正される可能性があります。
                <br /><br />
                株式市場では、サノヤスHDやTAC、遠藤照明などが好決算で注目を集める一方、ANAや東京電力など一部大手企業は減益見通しを発表しています。
                <br /><br />
                政治では、自民党・立憲民主党の対立軸が「右・左」から「上・下」へと変化しつつあるとの指摘もあり、減税を訴える勢力の動きが注目されています。
              </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
