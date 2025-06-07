import Breadcrumb from "@/app/component/Breadcrumb";
import React from 'react';
import RadioButton from "@/app/component/RadioButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { getUserAnswer, getWorksheetAnswers, getWorksheetByIdEnabled } from "@/lib/answer/answer";
import { redirect } from "next/navigation";
import VoteForm from "@/app/component/worksheet/vote/VoteForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkSheetVoteSelectPage({ params }: Props) {
  const { id } = await params;
  const worksheet_id = parseInt(id);

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;

  //ログイン済みでなければログインページへリダイレクト
  if (!userId) {
    redirect(`/auth/signin?callbackUrl=/worksheet/vote/${worksheet_id}`);
  }

  //投票済みであれば結果画面へ
  const userAnswer = await getUserAnswer(worksheet_id, userId);
  if (userAnswer) {
    redirect(`/worksheet/${worksheet_id}`);
  }

  //有効なアンケートがなければ投票画面へ戻る
  const worksheet = await getWorksheetByIdEnabled(worksheet_id);
  if (!worksheet) {
    redirect(`/worksheet/vote/${worksheet_id}`);
  }

  const breadcrumbData = [
    { path: "/worksheet", label: "政治を知る" },
    { path: `/worksheet/vote/${id}`, label: "アンケート" },
    { path: `/worksheet/vote/${id}/select`, label: "投票" }
  ];

  //回答の選択肢データ
  const worksheetAnswers = await getWorksheetAnswers(worksheet_id);
  if (!worksheetAnswers || worksheetAnswers.length === 0) {
    return (
      <>
      <main className="pt-16">
        <div className="max-w-2xl mx-auto pt-12 px-4 mb-12">
          <Breadcrumb segments={breadcrumbData} />
          <h4 className="mb-3">アンケートが見つかりません</h4>
          <p>指定されたアンケートは存在しないか、削除された可能性があります。</p>
        </div>
      </main>
      </>
    );
  }

  return (
    <>
      <main className="pt-16">
        <div className="max-w-2xl mx-auto pt-12 px-4 mb-12">
          <Breadcrumb segments={breadcrumbData} />
          <div className="w-full mb-4">
            <VoteForm 
              worksheetId={worksheet_id}
              userId={userId}
              worksheetTitle={worksheet.title}
              workSheetAnswers={worksheetAnswers}
            />
          </div>
        </div>
      </main>
    </>
  );
}
