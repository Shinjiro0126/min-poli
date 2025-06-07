'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {useSession, signOut} from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const {data: session, status} = useSession();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
                className="h-8 w-auto"
                src="/img/logo.svg"
                alt="みんなの政治ロゴ"
                width={120}
                height={40}
              />
              <span className="ml-2 text-lg reggae-one-regular text-[24px]">
                みんなの政治
              </span>
            </Link>

            {/* PC用ナビゲーション */}
            <div className="hidden md:flex space-x-4">
              <Link href="/know" className="text-gray-700 hover:text-primary-700">
                政治を知る
              </Link>
              <Link href="/worksheet" className="text-gray-700 hover:text-primary-700">
                政治広場に行く
              </Link>
            </div>

            {/* PC用 ログイン/新規登録 */}
            <div className="hidden md:flex items-center space-x-4">
              {status === "loading" ? null : session ? (
                <div className="relative" ref={menuRef}>
                  <FaUserCircle
                    className="text-3xl cursor-pointer text-gray-700 hover:text-primary-700"
                    onClick={() => setProfileMenuOpen((o) => !o)}
                  />
                  {profileMenuOpen && (
                    <div className="absolute top-[calc(100%+8px)] right-0 bg-white border border-stone-300 rounded-md shadow-md divide-y divide-stone-100">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap rounded-md"
                      >
                        プロフィール
                      </Link>
                      <Link
                        href="/"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap rounded-md"
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        ログアウト
                      </Link>
                    </div>
                  )}
                </div>

                // <button
                //   className="flex item-center gap-1 rounded-md bg-primary-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-900"
                //   onClick={() => signOut({ callbackUrl: "/" })}
                // >
                //   <MdOutlineLogout className="inline text-2xl" />
                //   ログアウト
                // </button>
              ) : (
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
              )}
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
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              >
                政治を知る
              </Link>
              <Link
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              >
                政策広場へ
              </Link>
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4">
              {status === "loading" ? null : session ? (
                <button
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:bg-gray-100 hover:text-primary-900"
                onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <span className="font-caption">ログアウト</span>
                </button>
              ) : (
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
              )}
              
            </div>
          </div>
        </div>
      )}
    </>
  );
}
