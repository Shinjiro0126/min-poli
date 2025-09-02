import Breadcrumb from "@/app/component/Breadcrumb";
import React from 'react';
import WorksheetChart from "@/app/component/worksheet/WorkSheetChart";
import Card from "@/app/component/Card";
import Avatar from "@/app/component/Avatar";
import Link from "next/link";
import { FiEdit } from "react-icons/fi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { getWorksheetAnswersResult, getWorksheetById, getVUserAnswer, getAllAnswers } from "@/lib/answer/answer";
import { redirect } from "next/navigation";
import { WorksheetAnswerWithUserFlag } from "@/types/answer/answer";
import { getRelativeTimeString } from "@/util/date";
import { getRandomAvatarPath } from "@/util/avator_img";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkSheetPage({ params }: Props) {
  const { id } = await params;
  const worksheet_id = parseInt(id);

  //worksheetの取得
  const worksheet = await getWorksheetById(worksheet_id);
  if(!worksheet) {
    return (
      <>
      <main className="pt-16">
        <div className="max-w-2xl mx-auto pt-12 px-4 mb-12">
          <Breadcrumb segments={[{ path: "/know", label: "政治を知る" }]} />
          <h4 className="mb-3">アンケートが見つかりません</h4>
          <p>指定されたアンケートは存在しないか、削除された可能性があります。</p>
        </div>
      </main>
      </>
    );
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;

  //自身のアンケート情報取得してなかったら投票ページへ遷移するようにする
  const vUser = await getVUserAnswer(worksheet_id, userId);
  if (!vUser) {
    redirect(`/worksheet/vote/${worksheet_id}`);
  }

  const breadcrumbData = [
    { path: "/worksheet", label: "投票一覧" },
    { path: `/worksheet/${worksheet_id}`, label: "アンケート結果" }
  ]; 
  
  const allAnswers = await getAllAnswers(worksheet_id, userId);
  const percentData = await getPercentageData(userId, worksheet_id);

  console.log(vUser?.reason);

  return (
    <>
      <main className="pt-16">
        <div className="max-w-2xl mx-auto pt-12 px-4 mb-12">
          <Breadcrumb segments={breadcrumbData} />
          <div className="w-full mb-12">
            <h4 className="mb-3">{worksheet.title}</h4>
            <WorksheetChart percentData={percentData} />
          </div>

          <div className="w-full mb-12">
            <h4 className="mb-3">あなたの回答</h4>
            <Card>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  {session?.user?.email ? (
                    <div className="w-8 h-8 bg-stone-400 rounded-full flex items-center justify-center shadow-md">
                      <span className="font-sub-title1 text-white">
                        {session.user?.name ? session.user.name.charAt(0) : session.user?.email?.charAt(0)}
                      </span>
                    </div>
                  ) : (
                    <Avatar src={getRandomAvatarPath()} alt="ユーザーアバター" width={32} height={32} />
                  )}
                  <div className="flex items-center gap-2">
                    <span className="font-label">{vUser?.answer_text || "回答なし"}</span><span className="font-caption">に投票</span>
                  </div>
                </div>
                <span className="font-caption text-stone-500">{vUser?.created_at ? getRelativeTimeString(vUser.created_at) : ""}</span>
              </div>
              {vUser?.reason !== null && vUser?.reason !== undefined && vUser?.reason !== "" ? 
              (
                <>
                  <div className="mb-3">
                    {vUser?.reason}
                  </div>
                  <div className="text-right">
                    <Link href={`/worksheet/vote/${worksheet_id}/edit`} className="text-info-600 cursor-pointer hover:text-info-800 flex items-center justify-end gap-2">
                      <FiEdit className="text-lg" /><span className="font-caption">編集する</span>
                    </Link>
                  </div>
                </>
              ) :
              (
              <div className="text-right">
                <Link href={`/worksheet/vote/${worksheet_id}/edit`} className="text-info-600 cursor-pointer hover:text-info-800 flex items-center justify-end gap-2">
                  <FiEdit className="text-lg" /><span className="font-caption">投票理由を入力する</span>
                </Link>
              </div>
              )}
              
            </Card>
          </div>

          <div className="w-full mb-12">
            <h4 className="mb-3">みんなの声</h4>
            {allAnswers.length > 0 ? (
              allAnswers.map((answer, index) => (
                <Card key={index} className="mb-3">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={getRandomAvatarPath()} alt="ユーザーアバター" width={40} height={40} />
                      <div className="flex items-center gap-2">
                        <span className="font-label">{answer.answer_text}</span><span className="font-caption">に投票</span>
                      </div>
                    </div>
                    <span className="font-caption text-stone-500">{answer.created_at ? getRelativeTimeString(answer.created_at) : ""}</span>
                  </div>
                  <div>
                    {answer.reason}
                  </div>
                </Card>
              ))
            ) : (
              <Card>
                <div className="text-center text-stone-500">
                  まだ他のユーザーからの投票理由はありません。
                </div>
              </Card>
            )}
          </div>


        </div>
      </main>
    </>
  );
}

async function getPercentageData(userId: string | null, worksheetId: number) {
  const worksheetAnswersData = await getWorksheetAnswersResult(worksheetId, userId);

  // worksheetAnswersDataから動的にdataを生成
  const data = worksheetAnswersData.map((answer: WorksheetAnswerWithUserFlag) => ({
    label: answer.answer_text,
    value: answer.count || 0,
    is_answer: answer.is_answer || false
  }));

  // データが空の場合のフォールバック
  if (data.length === 0) {
    return [
      {
        label: "データなし",
        value: 0,
        percent: 0,
        is_answer: false
      }
    ];
  }

  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  // 総数が0の場合は全て0パーセントで返す
  if (total === 0) {
    return data.map(item => ({
      ...item,
      percent: 0
    }));
  }

  // まず小数点第1位まで計算
  const temp = data.map(item => ({
    ...item,
    percent: Math.round((item.value / total) * 1000) / 10 // 小数点1位
  }));

  // 合計値を計算
  const sum = temp.reduce((acc, curr) => acc + curr.percent, 0);

  // 誤差を補正（合計が100になるように、最大値の項目に差分を加算）
  if (sum !== 100 && temp.length > 0) {
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

  return temp;
}
