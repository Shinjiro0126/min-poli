import Breadcrumb from "@/app/component/Breadcrumb";
import React from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { getWorksheetById, getVUserAnswer } from "@/lib/answer/answer";
import { redirect } from "next/navigation";
import EditForm from "@/app/component/worksheet/vote/edit/EditForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: Props) {
  const { id } = await params;
  const worksheet_id = parseInt(id);

  // worksheetの取得
  const worksheet = await getWorksheetById(worksheet_id);
  if (!worksheet) {
    redirect(`/worksheet/${worksheet_id}`);
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;

  if (!session || !userId) {
    redirect(`/login?callbackUrl=/worksheet/vote/${worksheet_id}/edit`);
  }

  // 自身のアンケート情報取得してなかったら投票ページへ遷移
  const vUser = await getVUserAnswer(worksheet_id, userId);
  if (!vUser) {
    redirect(`/worksheet/vote/${worksheet_id}`);
  }

  const breadcrumbData = [
    { path: "/worksheet", label: "投票一覧", isActive: false },
    { path: `/worksheet/${worksheet_id}`, label: "アンケート結果", isActive: false },
    { path: `/worksheet/vote/${worksheet_id}/edit`, label: "投票理由編集", isActive: true }
  ];

  return (
    <>
      <div className="max-w-2xl mx-auto pt-12 px-4 mb-12">
        <Breadcrumb segments={breadcrumbData} />
        <EditForm 
          worksheetId={worksheet_id}
          userId={userId}
          currentReason={vUser.reason || ""}
          answerText={vUser.answer_text}
          session={session}
        />
      </div>
    </>
  );
}
