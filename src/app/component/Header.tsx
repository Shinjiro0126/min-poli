'use client';

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {useSession, signOut} from "next-auth/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const {data: session, status} = useSession();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 認証状態の表示コンポーネントをメモ化
  const authDisplayDesktop = useMemo(() => {
    if (status === "loading") {
      return (
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      );
    }
    
    if (session) {
      return (
        <div className="relative" ref={menuRef}>
          <div 
            className="w-10 h-10 bg-stone-400 rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-stone-600 transition-colors"
            onClick={() => setProfileMenuOpen((o) => !o)}
          >
            <span className="font-sub-title1 text-white">
              {session.user?.name ? session.user.name.charAt(0) : session.user?.email?.charAt(0)}
            </span>
          </div>
          {profileMenuOpen && (
            <div className="absolute top-[calc(100%+8px)] right-0 bg-white border border-stone-300 rounded-md shadow-md divide-y divide-stone-100">
              <Link
                href="/user"
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap rounded-md"
                onClick={() => setProfileMenuOpen(false)}
              >
                プロフィール
              </Link>
              <Link
                href="/"
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap rounded-md"
                onClick={() => {
                  setProfileMenuOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
              >
                ログアウト
              </Link>
            </div>
          )}
        </div>
      );
    }
    
    return (
      <>
        <Link href="/login" className="text-gray-700 hover:text-primary-700">
          ログイン
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center rounded-md bg-primary-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-900"
        >
          新規登録
        </Link>
      </>
    );
  }, [status, session, profileMenuOpen]);

  const authDisplayMobile = useMemo(() => {
    if (status === "loading") {
      return (
        <div className="space-y-2">
          <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      );
    }
    
    if (session) {
      return (
        <>
          <Link
            href="/user"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600 flex items-center gap-4"
          >
            <div
              className="w-8 h-8 bg-stone-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-stone-600 transition-colors"
              >
              <span className="font-sub-title1 text-white">
                {session.user?.name ? session.user.name.charAt(0) : session.user?.email?.charAt(0)}
              </span>
            </div>
              プロフィール
          </Link>
          <button
            className="block px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:bg-gray-100 hover:text-primary-900"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            ログアウト
          </button>
        </>
      );
    }
    
    return (
      <>
        <Link
          href="/login"
          className="block px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:bg-gray-100 hover:text-primary-900"
        >
          ログイン
        </Link>
        <Link
          href="/signup"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
        >
          新規登録
        </Link>
      </>
    );
  }, [status, session]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent){
      if(menuRef.current && !menuRef.current.contains(e.target as Node)){
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);

    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <>
      <header className="bg-white shadow fixed z-50 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* ロゴとタイトル */}
            <Link href="/" className="flex items-center">
              <Image
                className="h-14 w-auto"
                src="/img/logo.svg"
                alt="みんなの政治ロゴ"
                width={120}
                height={40}
              />
            </Link>

            {/* PC用ナビゲーション */}
            <div className="hidden md:flex space-x-4">
              <Link href="/" className="text-gray-700 hover:text-primary-700">
                今日のテーマ
              </Link>
              <Link href="/worksheet" className="text-gray-700 hover:text-primary-700">
                投票一覧
              </Link>
            </div>

            {/* PC用 ログイン/新規登録 */}
            <div className="hidden md:flex items-center space-x-4">
              {authDisplayDesktop}
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
        <div className="fixed inset-0 z-45 flex justify-end pt-16 lg:static lg:inset-auto lg:justify-end border-gray-200">
          <div className="w-full max-w-xs bg-white shadow-lg p-6 lg:w-64">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                今日のテーマ
              </Link>
              <Link
                href="/worksheet"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                投票一覧
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                このアプリについて
              </Link>
              <Link
                href="/privacy"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                プライバシーポリシー
              </Link>
              <Link
                href="/terms"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                利用規約
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                お問い合わせ
              </Link>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              {authDisplayMobile}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
