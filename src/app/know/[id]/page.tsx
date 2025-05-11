import Breadcrumb from "@/app/component/Breadcrumb";

export default function Know() {
  const breadcrumbData = [
    {path: "/know", label: "政治を知る"},
    {path: "", label: "詳細"}
  ];

  return (
    <>
      <main className="pt-16">
        <div className="max-w-2xl mx-auto pt-12 px-4 mb-12">
          <Breadcrumb segments={breadcrumbData} />

          <h2 className="font-sub-title1 mb-3">
            【高市早苗に聞く、日本の安全保障の行方】トランプ関税ここまでの振り返り
            ／製造業の国内回帰／EV補助金「見直し」の可能性／ピンチをチャンスにする
            には
          </h2>

          <div className="aspect-video w-full rounded-lg overflow-hidden mb-8">
            <iframe
              src="https://www.youtube.com/embed/oJQZf2cX6_Q"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          <div className="font-sub-title2">
            ▼PIVOTアプリなら、バックグラウンド再生、ダウンロード機能、音声モード再生が無料。視聴ごとにマイルが溜まり、Amazonギフト券などの特典と交換できます。<br/>アプリダウンロードはこちら↓（無料）<br/>https://app.adjust.com/1nz1ejki<br/><br/>＜ゲスト＞<br/>高市早苗｜衆議院議員<br/>1961年奈良県生まれ。経済安全保障担当大臣、内閣府特命担当大臣など歴任。現在は自民党の経済安全保障推進本部 顧問、治安・テロ・サイバー犯罪対策調査会 会長を務める。<br/>＜書籍＞<br/>高市早苗『国力研究　日本列島を、強く豊かに。』産経新聞出版<br/>https://amzn.to/4cw8cls<br/>高市早苗『日本経済安全保障　国家国民を守る黄金律』飛鳥新社<br/>https://amzn.to/3Y0DNpo<br/>※このリンクはAmazonアソシエイトリンクを使用しています。<br/><br/>＜目次＞<br/>00:24　トランプ関税についての見解<br/>09:07　日米制度の違い<br/>11:00　米国が求める新しい国際通商秩序<br/>15:30　「ジャパンファースト」として米国に求めること<br/>22:11　EV補助金「見直し」の可能性<br/>28:55　高市早苗氏の今<br/><br/>＜関連動画＞<br/>「高市早苗氏に聞く、積極財政による強い経済」   • 【高市早苗氏に聞く、積極財政による強い経済】デフレ脱却まで増税・利上げなし...  <br/>「小林鷹之氏に聞く、トランプ関税交渉、日本のカードは」   • 【トランプ関税交渉、日本のカードは】コメに踏み込むべき／輸出できる儲かる農...  <br/><br/>#トランプ関税 #トランプ政権#高市早苗 #アメリカファースト＃ジャパンファースト#食料安全保障＃資源エネルギー安全保障＃健康医療安全保障＃サイバーセキュリティ対策＃外交＃貿易摩擦 #日米#交渉 #PIVOT
          </div>

        </div>
      </main>
    </>
  );
}
