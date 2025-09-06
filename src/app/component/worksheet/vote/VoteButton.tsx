"use client";
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '../../Button';  
import { MdOutlineEmail } from "react-icons/md";
import Link from 'next/link';
import Image from 'next/image';
import Modal from '@/app/component/Modal';

type VoteButtonProps = {
  worksheetId: string;
  className?: string;
};

export default function VoteButton({ worksheetId, className = '' }: VoteButtonProps) {
  const {data: session} = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  
  // コールバックURLを作成
  const callbackUrl = `/worksheet/vote/${worksheetId}`;

  const handleVoteClick = () => {
    if(!session?.user?.id){
      setShowModal(true);
    } else {
      router.push(`/worksheet/vote/${worksheetId}/select`);
    }
  };

  return (
    <>
      <Button
        onClick={handleVoteClick}
        className={`bg-primary-700 hover:bg-primary-900 block w-full shadow-lg text-white py-3 ${className}`}
      >
        投票する
      </Button>
      <Modal
        isOpen={showModal}
        isClosedButton={true}
        onClose={() => setShowModal(false)}
        title="会員登録して投票に参加しよう"
      >
        <p className="mb-4">会員登録すると、アンケート結果やみんなの投票理由を確認できます。</p>

        <div className='flex gap-10 justify-center items-center mb-6'>
          <Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-center hover:text-primary-700">
            <div className='w-13 h-13 border border-stone-300 rounded-full flex justify-center items-center bg-white hover:border-primary-700 mb-2'>
              <Image
                src="/img/logo_google.svg"
                alt="Googleで新規登録"
                width={24}
                height={24}
              />
            </div>
            <div className='font-caption'>Google</div>
          </Link>
          <Link href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-center hover:text-primary-700">
            <div className='w-13 h-13 border border-stone-300 rounded-full flex justify-center items-center bg-white hover:border-primary-700 mb-2'>
              <MdOutlineEmail className="w-6 h-6 text-stone-800" />
            </div>
            <div className='font-caption'>メール</div>
          </Link>
        </div>

        <div className="text-center text-sm text-stone-500">
          <p>
            すでに会員の方は、
            <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-primary-700 hover:text-primary-900 font-semibold underline">
              ログイン
            </Link>
            してください。
          </p>
        </div>
      </Modal>
    </>
  );
}