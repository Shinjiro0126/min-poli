import Breadcrumb from "@/app/component/Breadcrumb";
import React from 'react';
import Button from "@/app/component/Button";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  params: Promise<{ id: number }>;
}

export default async function WorkSheetVoteThanksPage({ params }: Props) {
  const { id } = await params;

  //投票済みであれば結果画面へ
  const hasVoted = false; // ここで実際の投票状況を確認するロジックを実装

  if (hasVoted) {
    // 投票済みの場合は結果画面へリダイレクト
    // 例: redirect(`/worksheet/${id}/result`);
  }


  return (
    <>
      <main className="pt-16">
        <div className="max-w-2xl mx-auto pt-12 px-4 mb-12">
          {/* <Breadcrumb segments={breadcrumbData} /> */}
          <div className="flex justify-center mb-6">
            <Image
              src="/img/votethanks.gif"
              alt="投票完了画像"
              width={200}
              height={200}/>
          </div>
          <div className="w-full mb-12 text-center">
            <h4 className="mb-3 text-success">ご協力ありがとうございました！</h4>
            <div>
              <p className="mb-1">あなたの声が、みんなの関心を動かすきっかけになります。</p>
              <p className="mb-1">「自分はこう思う」と表明することが、未来を考える一歩です。</p>
              <p>様々なテーマが変わるので、気軽に続けてみてくださいね！</p>
            </div>
          </div>

          <Button href={`/worksheet/${id}`} className="bg-primary-700 hover:bg-primary-900 block w-full shadow-lg text-white py-3">
            投票結果を確認する
          </Button>
        </div>
      </main>
    </>
  );
}
