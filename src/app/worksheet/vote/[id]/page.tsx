import Breadcrumb from "@/app/component/Breadcrumb";
import React, { Suspense } from 'react';
import WorkSheetVoteContent from "@/app/component/worksheet/WorkSheetVoteContent";
import WorkSheetVotePageSkeleton from "@/app/component/worksheet/WorkSheetVotePageSkeleton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WorkSheetVotePage({ params }: Props) {
  const { id } = await params;
  const worksheet_id = parseInt(id);

  const breadcrumbData = [
    { path: "/worksheet", label: "投票一覧", isActive: false },
    { path: `/worksheet/vote/${id}`, label: "アンケート", isActive: true }
  ];

  return (
    <>
      <div className="max-w-2xl mx-auto pt-12 px-4 mb-12">
        <Breadcrumb segments={breadcrumbData} />
        
        <Suspense fallback={<WorkSheetVotePageSkeleton />}>
          <WorkSheetVoteContent worksheetId={worksheet_id} />
        </Suspense>
      </div>
    </>
  );
}
