import React, { Suspense } from "react";
import Breadcrumb from "@/app/component/Breadcrumb";
import WorkSheetList from "../component/worksheet/WorkSheetList";
import WorkSheetListSkeleton from "../component/worksheet/WorkSheetListSkeleton";

export default async function WorkSheet() {
  const breadcrumbData = [
    {path: "/worksheet", label: "投票一覧", isActive: true}
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto pt-12 px-4 mb-12">
        <Breadcrumb segments={breadcrumbData} />

        <Suspense fallback={<WorkSheetListSkeleton />}>
          <WorkSheetList />
        </Suspense>
      </div>
    </>
  );
}
