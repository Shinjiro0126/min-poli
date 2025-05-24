"use client";

import React, {useState} from "react";
import TextBox from "../component/TextBox";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if(res?.error){
      alert("ログインに失敗しました");
    } else {
      router.push("/");
    }
  }

  return (
    <>
      <div 
        className="grid justify-items-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]"
        style={{
          backgroundImage: 'url("/img/background.svg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        >
        <main className="flex flex-col items-center justify-center w-full min-h-screen">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h3 className="mb-10">ログイン</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <TextBox 
                  id="email"
                  label="メールアドレス"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <TextBox
                  id="password"
                  label="パスワード"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </div>
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  パスワードを保存
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary-700 hover:bg-primary-900 text-white font-semibold rounded-md shadow"
              >
                ログイン
              </button>
            </form>
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-400">または</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              type="button"
              className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow flex items-center justify-center gap-2 hover:bg-gray-50"
              onClick={() => signIn("google", {callbackUrl: "/"})}
            >
              <Image 
              src="/img/logo_google.svg" 
              alt="Google" 
              width={20}
              height={20}
               />
              Googleアカウントでログイン
            </button>
            <div className="mt-6 text-center">
              <span className="text-sm text-gray-700">アカウントをお持ちですか？</span>
              <Link
                href="/signup"
                className="ml-2 text-primary-700 hover:underline text-sm font-semibold"
              // onClick={} // 新規登録ページへの遷移処理を追加
              >
                新規登録
              </Link>
            </div>
          </div>
        </main>
    </div>
    </>
  );
}
