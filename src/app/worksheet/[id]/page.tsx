import Breadcrumb from "@/app/component/Breadcrumb";
import React from 'react';
import WorksheetChart from "@/app/component/worksheet/WorkSheetChart";
import Card from "@/app/component/Card";
import Avatar from "@/app/component/Avatar";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { getUserAnswer } from "@/lib/answer/answer";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkSheetPage({ params }: Props) {
  const { id } = await params;
  const worksheet_id = parseInt(id);

  
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;

  //自身のアンケート情報取得してなかったら投票ページへ遷移するようにする
  const userAnswer = await getUserAnswer(worksheet_id, userId);
  if (!userAnswer) {
    redirect(`/worksheet/vote/${worksheet_id}`);
  }

  const breadcrumbData = [
    { path: "/know", label: "政治を知る" },
    { path: `/worksheet/${worksheet_id}`, label: "アンケート結果" }
  ];

  const percentData = getPercentageDate();

  return (
    <>
      <main className="pt-16">
        <div className="max-w-2xl mx-auto pt-12 px-4 mb-12">
          <Breadcrumb segments={breadcrumbData} />
          <div className="w-full mb-12">
            <h4 className="mb-3">【2025年6月度】みんなの政党投票</h4>
            <WorksheetChart percentData={percentData} />
          </div>

          <div className="w-full mb-12">
            <h4 className="mb-3">あなたの回答</h4>
            <Card>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <Avatar src="/img/vote.svg" alt="投票アイコン" className="p-1"  />
                  <div className="flex items-center gap-2">
                    <span className="font-label">自民党</span><span className="font-caption">に投票</span>
                  </div>
                </div>
                <span className="font-caption text-stone-500">36分前</span>
              </div>
              <div className="mb-3">
                理想を語るだけでなく、現実的で実行可能な政策を具体的に示している点に信頼感が持てました。言葉だけでなく行動が伴っている印象です。
              </div>
              <div className="text-right">
                <Link href="/" className="text-info-600 cursor-pointer hover:text-info-800 flex items-center justify-end gap-2">
                  <FiEdit className="text-lg" /><span className="font-caption">編集する</span>
                </Link>
              </div>
            </Card>
          </div>

          <div className="w-full mb-12">
            <h4 className="mb-3">みんなの声</h4>
            <Card className="mb-3">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <Avatar src="/img/vote.svg" alt="投票アイコン" className="p-1"  />
                  <div className="flex items-center gap-2">
                    <span className="font-label">自民党</span><span className="font-caption">に投票</span>
                  </div>
                </div>
                <span className="font-caption text-stone-500">36分前</span>
              </div>
              <div>
                理想を語るだけでなく、現実的で実行可能な政策を具体的に示している点に信頼感が持てました。言葉だけでなく行動が伴っている印象です。
              </div>
            </Card>
            <Card className="mb-3">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <Avatar src="/img/vote.svg" alt="投票アイコン" className="p-1"  />
                  <div className="flex items-center gap-2">
                    <span className="font-label">自民党</span><span className="font-caption">に投票</span>
                  </div>
                </div>
                <span className="font-caption text-stone-500">36分前</span>
              </div>
              <div>
                理想を語るだけでなく、現実的で実行可能な政策を具体的に示している点に信頼感が持てました。言葉だけでなく行動が伴っている印象です。
              </div>
            </Card>
          </div>


        </div>
      </main>
    </>
  );
}

function getPercentageDate() {
  const data = [
    { label: "自民党", value: 200, is_answer: false },
    { label: "立憲民主党", value: 100, is_answer: false },
    { label: "日本維新の会", value: 50, is_answer: false },
    { label: "国民民主", value: 40, is_answer: false },
    { label: "れいわ", value: 30, is_answer: true },
    { label: "共産党", value: 20, is_answer: false },
    { label: "参政党", value: 10, is_answer: false },
    { label: "その他", value: 5, is_answer: false },
  ];

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  // まず小数点第2位まで計算
  const temp = data.map(item => ({
    ...item,
    percent: Math.round((item.value / total) * 1000) / 10 // 小数点1位
  }));

  // 合計値を計算
  const sum = temp.reduce((acc, curr) => acc + curr.percent, 0);

  // 誤差を補正（合計が100になるように、最大値の項目に差分を加算）
  if (sum !== 100) {
    const diff = +(100 - sum).toFixed(1);
    // 最大値のindexを取得
    const maxIdx = temp.reduce((maxIdx, item, idx, arr) =>
      item.percent > arr[maxIdx].percent ? idx : maxIdx, 0
    );
    temp[maxIdx] = {
      ...temp[maxIdx],
      percent: +(temp[maxIdx].percent + diff).toFixed(1)
    };
  }

  const percentData = temp;

  return percentData;
}
