import React from 'react';
import Image from "next/image";
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import { getUserAnswer, getWorksheetById } from "@/lib/answer/answer";
import { redirect } from "next/navigation";
import VoteButton from "@/app/component/worksheet/vote/VoteButton";
import { getWorksheetImageUrl } from "@/lib/worksheet/worksheet_img";
import { isWithinPeriod } from "@/util/date";

interface Props {
  worksheetId: number;
}

export default async function WorkSheetVoteContent({ worksheetId }: Props) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || null;

  if(userId === null) {
    redirect(`/login?callbackUrl=/worksheet/vote/${worksheetId}`);
  }

  //投票済みであれば結果画面へ
  const userAnswer = await getUserAnswer(worksheetId, userId);
  if (userAnswer) {
    redirect(`/worksheet/${worksheetId}`);
  }

  // 最低2秒間のローディング時間を確保
  const [worksheet] = await Promise.all([
    getWorksheetById(worksheetId),
    new Promise(resolve => setTimeout(resolve, 1000))
  ]);

  if(!worksheet) {
    return(
      <div className="max-w-2xl mx-auto pt-4 px-4 mb-12">
        <h4 className="h4 mb-3">アンケートが見つかりません</h4>
        <p>指定されたアンケートは存在しないか、削除された可能性があります。</p>
      </div>
    );
  }

  // 期限チェック - 期限が切れている場合は結果ページへリダイレクト
  if (!isWithinPeriod(worksheet.start_at, worksheet.end_at)) {
    redirect(`/worksheet/${worksheetId}`);
  }

  // HTMLをサニタイズする関数
  const sanitizeHTML = (html: string): string => {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    return purify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'],
      ALLOWED_ATTR: []
    });
  };

  return (
    <>
      <div className="w-full mb-4">
        <h4 className="h4 mb-3">{worksheet.title}</h4>
        <Image
          src={getWorksheetImageUrl(worksheet.thumbnail_url)}
          alt="アンケートサムネイル画像"
          width={800}
          height={450}
          className="w-full h-auto rounded-lg mb-4"
        />
      </div>

      <div className="w-full mb-12">
        <div 
          className="prose prose-stone max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: sanitizeHTML(worksheet.description || '') 
          }} 
        />
      </div>

      <VoteButton worksheetId={worksheetId.toString()} className="w-full max-w-2xl px-4" />
    </>
  );
}
