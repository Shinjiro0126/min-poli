'use client';

import React, { useState } from 'react';
import { MdArrowForwardIos, MdMailOutline, MdOutlineCalendarToday } from "react-icons/md";
import { LuKeyRound } from "react-icons/lu";
import Card from "../component/Card";
import EditModal from "./EditModal";
import { DUser } from "@/types/user/user";

interface UserProfileClientProps {
  user: DUser;
}

export default function UserProfileClient({ user }: UserProfileClientProps) {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleEmailClick = () => {
    setShowEmailModal(true);
  };

  const handlePasswordClick = () => {
    setShowPasswordModal(true);
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    // ページをリロードして最新のユーザー情報を取得
    window.location.reload();
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
  };

  return (
    <>
      {/* アカウント情報カード */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-stone-500 rounded-full flex items-center justify-center shadow-md">
            <span className="font-sub-title1 text-white">
              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </span>
          </div>
          <h4>アカウント情報</h4>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleEmailClick}
            className="w-full sm:flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span className="text-stone-800 flex items-center space-x-2 mb-2 sm:mb-0">
              <MdMailOutline className="text-gray-800" />
              <span>メールアドレス</span>
            </span>
            <span className="text-stone-800 flex items-center justify-between sm:justify-end gap-2">
              <span>{user.email}</span>
              <MdArrowForwardIos />
            </span>
          </button>
          
          <button
            onClick={handlePasswordClick}
            className="w-full sm:flex justify-between items-center py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <span className="text-stone-800 flex items-center space-x-2 mb-2 sm:mb-0">
              <LuKeyRound className="text-gray-800" />
              <span>パスワード</span>
            </span>
            <span className="text-stone-800 flex items-center justify-between sm:justify-end gap-2">
              <span>●●●●●●●●●</span>
              <MdArrowForwardIos />
            </span>
          </button>
          
          <div className="sm:flex justify-between items-center py-3">
            <span className="text-sm font-medium text-gray-700 flex items-center space-x-2 mb-2 sm:mb-0">
              <MdOutlineCalendarToday className="text-gray-500" />
              <span>登録日</span>
            </span>
            <span className="text-sm text-gray-600">
              {user.created_at
                ? new Date(user.created_at).toLocaleDateString('ja-JP')
                : '不明'
              }
            </span>
          </div>
        </div>
      </Card>

      {/* メール編集モーダル */}
      <EditModal
        isOpen={showEmailModal}
        onClose={handleCloseEmailModal}
        user={user}
        type="email"
        title="メールアドレスの変更"
        description="新しいメールアドレスを入力してください。"
      />

      {/* パスワード編集モーダル */}
      <EditModal
        isOpen={showPasswordModal}
        onClose={handleClosePasswordModal}
        user={user}
        type="password"
        title="パスワードの変更"
        description="新しいパスワードを入力してください。"
      />
    </>
  );
}
