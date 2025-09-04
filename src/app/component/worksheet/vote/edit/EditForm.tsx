"use client";
import React, { useState } from 'react';
import TextArea from "@/app/component/TextArea";
import EditSubmitButton from "@/app/component/worksheet/vote/edit/EditSubmitButton";
import Card from "@/app/component/Card";
import Avatar from "@/app/component/Avatar";
import { getRandomAvatarPath } from "@/util/avator_img";
import { Session } from "next-auth";

interface EditFormProps {
  worksheetId: number;
  userId: string;
  currentReason: string;
  answerText: string;
  session: Session;
}

export default function EditForm({ worksheetId, userId, currentReason, answerText, session }: EditFormProps) {
  const [reason, setReason] = useState(currentReason);

  return (
    <div className="w-full">
      <h4 className="h4 mb-6">投票理由を編集</h4>
      
      {/* 現在の投票内容表示 */}
      <div className="mb-6">
        <h6 className="h6 mb-3">あなたの投票</h6>
        <Card>
          <div className="flex items-center gap-3">
            {session?.user?.email ? (
              <div className="w-8 h-8 bg-stone-400 rounded-full flex items-center justify-center shadow-md">
                <span className="font-sub-title1 text-white">
                  {session.user?.name ? session.user.name.charAt(0) : session.user?.email?.charAt(0)}
                </span>
              </div>
            ) : (
              <Avatar src={getRandomAvatarPath()} alt="ユーザーアバター" width={32} height={32} />
            )}
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
