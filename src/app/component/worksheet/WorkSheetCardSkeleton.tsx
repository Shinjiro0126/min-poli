import React from "react";

export interface WorkSheetCardSkeletonProps {
  layout?: "horizontal" | "vertical";
  showNewBadge?: boolean;
}

export default function WorkSheetCardSkeleton({ 
  layout = "vertical", 
  showNewBadge = false 
}: WorkSheetCardSkeletonProps) {
  const isHorizontal = layout === "horizontal";
  
  return (
    <div 
      className={`border border-stone-300 rounded-md overflow-hidden bg-white shadow-md relative animate-pulse ${
        isHorizontal 
          ? "flex-shrink-0 w-[90%] md:w-[33.333%] xl:w-[25%]" 
          : ""
      }`}
    >
      {showNewBadge && (
        <div className="py-1 px-3 bg-gray-300 rounded shadow-md absolute top-3 left-3 z-10 w-12 h-6"></div>
      )}
      
      {/* スケルトンイメージ */}
      <div className="aspect-video bg-gray-300"></div>
      
      <div className="p-3">
        {/* タイトルスケルトン */}
        <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>
        
        {/* メッセージスケルトン */}
        <div className="h-4 bg-gray-300 rounded mb-3 w-full"></div>
        <div className="h-4 bg-gray-300 rounded mb-3 w-2/3"></div>
        
        {/* 投票数・期限スケルトン */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <div className="w-8 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-gray-300 rounded"></div>
            <div className="w-16 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
        
        {/* ステータス・ボタンスケルトン */}
        <div className="flex items-center justify-between">
          <div className="w-20 h-8 bg-gray-300 rounded-full"></div>
          <div className="w-20 h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
