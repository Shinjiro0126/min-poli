"use client";
import React from 'react';
import { useState } from "react";
import RadioButton from "../../RadioButton"; 
import TextArea from '../../TextArea';
import VoteSubmitButton from "./VoteSubmitButtonProps";
import { MWorksheetAnswer } from "@/types/answer/answer";

type VoteFormProps = {
  worksheetId: number;
  userId: string;
  worksheetTitle: string;
  workSheetAnswers: MWorksheetAnswer[];
};

export default function VoteForm({
  worksheetId,
  userId,
  workSheetAnswers,
  worksheetTitle,
}: VoteFormProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [reason, setReason] = useState<string>("");


  return (
    <>
      <h4 className="h4 mb-3">{worksheetTitle}</h4>

      <div className="mb-12">
        {workSheetAnswers.map((answer) => (
          <RadioButton
            key={answer.no}
            label={answer.answer_text}
            value={answer.no.toString()}
            name={worksheetId.toString()}
            checked={selectedValue === answer.no.toString()}
            onChange={(value) => setSelectedValue(value)}
          />
        ))}
      </div>

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

      <div className="mb-12 text-center text-error">
        ※投票は一度だけ行えます。投票後は変更できません。
      </div>

      <VoteSubmitButton
        worksheetId={worksheetId}
        userId={userId}
        selectedValue={selectedValue}
        reason={reason}
      />
    </>
  );
}