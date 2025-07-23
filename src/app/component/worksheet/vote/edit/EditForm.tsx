"use client";
import React, { useState } from 'react';
import TextArea from "@/app/component/TextArea";
import EditSubmitButton from "@/app/component/worksheet/vote/edit/EditSubmitButton";
import Card from "@/app/component/Card";
import Avatar from "@/app/component/Avatar";

interface EditFormProps {
  worksheetId: number;
  userId: string;
  currentReason: string;
  answerText: string;
}

export default function EditForm({ worksheetId, userId, currentReason, answerText }: EditFormProps) {
  const [reason, setReason] = useState(currentReason);

  return (
    <div className="w-full">
      <h4 className="mb-6">投票理由を編集</h4>
      
      {/* 現在の投票内容表示 */}
      <div className="mb-6">
        <h6 className="mb-3">あなたの投票</h6>
        <Card>
          <div className="flex items-center gap-3">
            <Avatar src="/img/vote.svg" alt="投票アイコン" className="p-1" />
            <div className="flex items-center gap-2">
              <span className="font-label">{answerText}</span>
              <span className="font-caption">に投票</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 投票理由編集フォーム */}
      <div className="mb-12">
        <TextArea
          id="reason"
          label="投票理由"
          placeholder="投票理由を自由に記述してください。不適切な内容は削除される可能性があります。"
          name="reason"
          maxLength={500}
          className="w-full h-50 bg-white mb-2"
          required={false}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <p className="text-sm text-stone-500">※自由記述欄は任意です。回答しなくても投票できます。</p>
      </div>

      <EditSubmitButton
        worksheetId={worksheetId}
        userId={userId}
        reason={reason}
        currentReason={currentReason}
      />
    </div>
  );
}
