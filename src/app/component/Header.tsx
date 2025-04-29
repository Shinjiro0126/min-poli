'use client';

import React, { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow fixed z-50 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* ロゴとタイトル */}
            <div className="flex items-center">
              <img
                className="h-8 w-auto"
                src="/img/logo.svg"
                alt="Your Company"
              />
              <span className="ml-2 font-semibold text-lg text-background zen-kurenaido-regular">
                みんなの政治
              </span>
            </div>

            {/* PC用ナビゲーション */}
            <div className="hidden md:flex space-x-4">
              <a href="#" className="text-gray-700 hover:text-indigo-600">
                政治を知る
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600">
                政治広場に行く
              </a>
            </div>

            {/* PC用 ログイン/新規登録 */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-gray-700 hover:text-indigo-600">
                ログイン
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                新規登録
              </a>
            </div>

            {/* ハンバーガーボタン（モバイル用） */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="cursor-pointer focus:outline-none text-gray-700 hover:text-indigo-600 focus:ring-2 focus:ring-indigo-600"
              >
                {/* ハンバーガーアイコン */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    // 閉じるアイコン
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    // ハンバーガーアイコン
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* モバイル用メニュー（開閉制御） */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex justify-end pt-16 lg:static lg:inset-auto lg:justify-end border-gray-200">
          <div className="w-full max-w-xs bg-white shadow-lg p-6 lg:w-64">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              >
                政治を知る
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              >
                政策広場へ
              </a>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              >
                ログイン
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
