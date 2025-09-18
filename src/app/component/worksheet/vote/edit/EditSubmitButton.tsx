"use client";
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "../../../Button";
import { updateAnswerReason } from "@/lib/answer/edit";

interface EditSubmitButtonProps {
  worksheetId: number;
  userId: string;
  reason: string;
  currentReason: string;
}

export default function EditSubmitButton({
  worksheetId,
  userId,
  reason,
  currentReason
}: EditSubmitButtonProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    // 変更がない場合はそのまま戻る
    if (reason === currentReason) {
      router.push(`/worksheet/${worksheetId}`);
      return;
    }

    const confirmed = confirm("投票理由を更新しますか？");
    if (!confirmed) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await updateAnswerReason(worksheetId, userId, reason);

      if (result.success) {
        router.push(`/worksheet/${worksheetId}`);
      } else {
        throw new Error("投票理由の更新に失敗しました。");
      }
    } catch (error) {
      alert("投票理由の更新に失敗しました。もう一度お試しください。");
      console.error("更新エラー:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        onClick={() => router.push(`/worksheet/${worksheetId}`)}
        disabled={isSubmitting}
        className="bg-gray-500 hover:bg-gray-700 flex-1 text-white py-3 order-1 sm:order-0"
      >
        キャンセル
      </Button>
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="bg-primary-700 hover:bg-primary-900 flex-1 text-white py-3 order-0 sm:order-1"
        isLoading={isSubmitting}
        loadingText="更新中..."
      >
        更新する
      </Button>
    </div>
  );
}
