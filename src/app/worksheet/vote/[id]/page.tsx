import Breadcrumb from "@/app/component/Breadcrumb";
import React from 'react';
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { getUserAnswer, getWorksheetByIdEnabled } from "@/lib/answer/answer";
import { redirect } from "next/navigation";
import VoteButton from "@/app/component/worksheet/vote/VoteButton";
import { getWorksheetImageUrl } from "@/lib/worksheet/worksheet_img";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkSheetVotePage({ params }: Props) {
  const { id } = await params;
  const worksheet_id = parseInt(id);

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;

  if(userId === null) {
    redirect(`/login?callbackUrl=/worksheet/vote/${worksheet_id}`);
  }

  //投票済みであれば結果画面へ
  const userAnswer = await getUserAnswer(worksheet_id, userId);
  if (userAnswer) {
    redirect(`/worksheet/${worksheet_id}`);
  }

  const breadcrumbData = [
    { path: "/worksheet", label: "投票一覧" },
    { path: `/worksheet/vote/${id}`, label: "アンケート" }
  ];

  const worksheet = await getWorksheetByIdEnabled(worksheet_id);
  if(!worksheet) {
    return(
      <>
      <main className="pt-16">
        <div className="max-w-2xl mx-auto pt-12 px-4 mb-12">
          <Breadcrumb segments={breadcrumbData} />
        </div>
        <div className="max-w-2xl mx-auto pt-4 px-4 mb-12">
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
            <h4 className="mb-3">{worksheet.title}</h4>
            <Image
              src={getWorksheetImageUrl(worksheet.thumbnail_url)}
              alt="政党投票"
              width={800}
              height={450}
              className="w-full h-auto rounded-lg mb-4"
            />
          </div>

          <div className="w-full mb-12 pb-12">
            {worksheet.description}
          </div>

          <VoteButton worksheetId={id} className="w-full max-w-2xl px-4" />
        </div>
      </main>
    </>
  );
}
