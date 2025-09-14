"use client";
import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "../../Button";
import { createAnswer } from "@/lib/answer/create";
import { getUserAnswer } from "@/lib/answer/answer";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type VoteSubmitButtonProps = {
  worksheetId: number;
  userId: string;
  selectedValue: string | null;
  reason?: string;
}

export default function VoteSubmitButton({
  worksheetId,
  userId,
  selectedValue,
  reason = "",
}: VoteSubmitButtonProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  //マウント時に投票状況をチェック
  useEffect(() => {
    const checkVoteStatus = async () => {
      try {
        const userAnswer = await getUserAnswer(worksheetId, userId);
        if(userAnswer){
          setHasVoted(true);
          router.replace(`/worksheet/${worksheetId}`);
        }
      } catch (error) {
        console.error("投票状況チェック中にエラーが発生しました。", error);
      }
    };

    checkVoteStatus();
  }, [worksheetId, userId, router]);

  const handleSubmit = async () => {
    if(isSubmitting || hasVoted){
      return;
    }

    if(!selectedValue){
      alert("選択肢を選んでください。");
      return;
    }

    const confirmed = confirm("この内容で投票しますか？\n投票後は変更できません。");
    if (!confirmed) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 投票前に再度チェック
      const existingAnswer = await getUserAnswer(worksheetId, userId);
      if (existingAnswer) {
        alert("既に投票済みです。");
        router.replace(`/worksheet/${worksheetId}`);
        return;
      }

      const result = await createAnswer(
        worksheetId,
        userId,
        parseInt(selectedValue),
        reason
      );

      if (result.success) {
        router.push(`/worksheet/vote/${worksheetId}/thanks`);
      } else {
        throw new Error("投票に失敗しました。");
      }
    } catch (error) {
      alert("投票に失敗しました。もう一度お試しください。");
      console.error("投票エラー:", error);
    } finally{
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4 px-3">
      <Button
              onClick={() => router.push(`/worksheet/vote/${worksheetId}`)}
              disabled={isSubmitting}
              className="bg-gray-500 hover:bg-gray-700 flex-1 text-white py-3 order-1 sm:order-0"
            >
              キャンセル
            </Button>
      <Button
      onClick={handleSubmit}
      disabled={isSubmitting || !selectedValue}
      className={`bg-primary-700 hover:bg-primary-900 flex-1 text-white py-3 order-0 sm:order-1`}>
        {isSubmitting ? (
          <span className="flex items-center justify-center">
                        <AiOutlineLoading3Quarters className="mr-3 size-5 animate-spin" />
                        <span>投票中...</span>
                      </span>
        ) : (
          "投票して結果を見る"
        )}
      </Button>
    </div>
  );
}