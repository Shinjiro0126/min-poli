// src/app/component/know/NewsSummary.tsx
import { NewsSummary } from "@/types/news_summaries/summary";
import { convertNewlinesToBr } from "@/util/text";

interface NewsSummaryProps {
  news: NewsSummary;
}

export default function NewsSummaryText({ news }: NewsSummaryProps) {
  return (
      <div className="px-3 py-2 leading-[1.75rem]">
        {convertNewlinesToBr(news.summary)}
      </div>
  );
}