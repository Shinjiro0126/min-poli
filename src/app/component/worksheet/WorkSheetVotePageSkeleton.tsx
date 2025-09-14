import React from "react";

export default function WorkSheetVotePageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* タイトルスケルトン */}
      <div className="w-full mb-4">
        <div className="h-8 bg-gray-200 rounded mb-3 w-3/4"></div>
        
        {/* 画像スケルトン */}
        <div className="w-full aspect-[3/2] bg-gray-200 rounded-lg mb-4"></div>
      </div>

      {/* 説明文スケルトン */}
      <div className="w-full mb-12">
        <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-11/12"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-4/5"></div>
      </div>

      {/* 投票ボタンスケルトン */}
      <div className="w-full max-w-2xl px-4">
        <div className="h-12 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
}
