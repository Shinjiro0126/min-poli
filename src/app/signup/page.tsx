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
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password, name}),
    });

    if(!res.ok){
      const {error} = await res.json();
      alert(error || "登録に失敗しました");
      return;
    }

    const login = await signIn("credential", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });
    if(login?.error){
      alert("ログインに失敗しました");
    } else {
      router.push("/");
    }
  };

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
            <h3 className="mb-10">新規登録</h3>
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
                <TextBox
                  id="name"
                  label="名前"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary-700 hover:bg-primary-900 text-white font-semibold rounded-md shadow"
              >
                新規登録
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
              Googleで登録
            </button>
            <div className="mt-6 text-center">
              <span className="text-sm text-gray-700">すでにアカウントをお持ちですか？</span>
              <Link
                href="/login"
                className="ml-2 text-primary-700 hover:underline text-sm font-semibold"
 
              >
                ログイン
              </Link>
            </div>
          </div>
        </main>
    </div>
    </>
  );
}
