import React from "react";
import Image from "next/image";
import { LuUsers } from "react-icons/lu";
import { MdOutlineCalendarToday, MdInfoOutline, MdCheckCircleOutline } from "react-icons/md";
import Button from "../Button";
import { getWorksheetImageUrl } from "@/lib/worksheet/worksheet_img";
import { isExpired, isNewWorksheet } from "@/util/date";

export interface WorkSheetCardProps {
  worksheet: {
    worksheet_id: number;
    title: string;
    title_message: string;
    thumbnail_url: string;
    vote_count: number;
    end_at: string | null;
    start_at: string;
    is_answer: boolean;
  };
  layout?: "horizontal" | "vertical";
  showNewBadge?: boolean;
}

export default function WorkSheetCard({ 
  worksheet, 
  layout = "vertical", 
  showNewBadge = false 
}: WorkSheetCardProps) {
  const isHorizontal = layout === "horizontal";
  
  return (
    <div 
      className={`border border-stone-300 rounded-md overflow-hidden bg-white shadow-md relative flex flex-col ${
        isHorizontal 
          ? "flex-shrink-0 w-[90%] md:w-[33.333%] xl:w-[25%]" 
          : ""
      }`}
    >
      {showNewBadge && isNewWorksheet(worksheet.start_at) && (
        <span className="py-1 px-3 bg-pine-green-500 text-white rounded shadow-md absolute top-3 left-3 z-10 font-overline">
          New
        </span>
      )}
      
      <div className="aspect-video overflow-hidden relative group">
        <Image
          src={getWorksheetImageUrl(worksheet.thumbnail_url)}
          alt={worksheet.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-3 flex-grow">
        <div className="flex flex-col justify-between h-full">
          <div>
            <h5 className="font-sub-title2 mb-2">{worksheet.title}</h5>
            <p className="font-body-sm text-stone-500 mb-3">{worksheet.title_message}</p>

            <div className="mb-4 text-stone-500 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <LuUsers className="text-[20px] text-stone-700" />
                <span className="font-overline">{worksheet.vote_count}</span>
              </div>
              {worksheet.end_at && (
                <div className="flex items-center gap-1">
                  <MdOutlineCalendarToday className="text-[20px] text-stone-700" />
                  <span className="font-overline">
                    {new Date(worksheet.end_at).toLocaleDateString('ja-JP', {
                      month: '2-digit',
                      day: '2-digit'
                    })}まで
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              {worksheet.is_answer ? (
                <span className="flex items-center gap-2 bg-success-100 text-success-400 py-2 px-3 rounded-full font-overline">
                  <MdCheckCircleOutline className="text-[20px]" />
                  参加済み
                </span>
              ) : (
                <span className="flex items-center gap-2 bg-orange-100 text-orange-400 py-2 px-3 rounded-full font-overline">
                  <MdInfoOutline className="text-[20px]" />
                  未参加
                </span>
              )}
            </div>

            <Button
              href={`/worksheet/${worksheet.worksheet_id}`}
              className="inline-block text-white bg-primary-700 hover:bg-primary-900"
            >
              {worksheet.is_answer || isExpired(worksheet.end_at) ? "結果を見る" : "投票する"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
