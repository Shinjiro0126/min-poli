import React from "react";
import WorkSheetCardSkeleton from "./WorkSheetCardSkeleton";

export default function WorkSheetListSkeleton() {
  return (
    <div className="mb-3">
      {/* 政党投票スケルトン */}
      <div className="w-full mb-12">
        <div className="h-8 bg-gray-200 rounded mb-3 w-24 animate-pulse"></div>
        <div className="flex flex-nowrap gap-2 sm:gap-4 overflow-x-auto">
          {Array.from({ length: 3 }).map((_, index) => (
            <WorkSheetCardSkeleton
              key={`political-${index}`}
              layout="horizontal"
              showNewBadge={false}
            />
          ))}
        </div>
      </div>

      {/* アンケートスケルトン */}
      <div className="w-full mb-12">
        <div className="h-8 bg-gray-200 rounded mb-3 w-40 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <WorkSheetCardSkeleton
              key={`life-${index}`}
              layout="vertical"
              showNewBadge={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
