"use client";

import React, {useState, useEffect, Suspense} from "react";
import TextBox from "../component/TextBox";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [callbackUrl, setCallbackUrl] = useState<string>("/");
  const [infoMessage, setInfoMessage] = useState<string>("");

  useEffect(() => {
    const callback = searchParams.get('callbackUrl');
    if (callback) {
      setCallbackUrl(callback);
    }

    const error = searchParams.get('error');
    if (error === 'existing_credentials') {
      setInfoMessage("このメールアドレスは既にメール・パスワードで登録されています。こちらからログインしてください。");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: callbackUrl,
    });
    if(res?.error){
      alert("ログインに失敗しました");
    } else {
      router.push(callbackUrl);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h3 className="mb-10">ログイン</h3>
      
      {infoMessage && (
        <div className="mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-md">
          <p className="text-sm">{infoMessage}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="mb-3">
            <TextBox 
              id="email"
              label="メールアドレス"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="mb-3">
            <TextBox
              id="password"
              label="パスワード"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
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
        onClick={() => signIn("google", {callbackUrl: callbackUrl})}
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
          href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="ml-2 text-primary-700 hover:underline text-sm font-semibold"
        >
          新規登録
        </Link>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <>
      <div 
        className="grid justify-items-center min-h-screen p-2 font-[family-name:var(--font-geist-sans)]"
        style={{
          backgroundImage: 'url("/img/background.svg")',
          backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        >
        <main className="flex flex-col items-center justify-center w-full">
          <Suspense fallback={<div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">読み込み中...</div>}>
            <LoginForm />
          </Suspense>
        </main>
    </div>
    </>
  );
}
