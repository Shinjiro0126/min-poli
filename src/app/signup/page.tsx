"use client";

import React, {useState, useEffect, Suspense} from "react";
import TextBox from "../component/TextBox";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [callbackUrl, setCallbackUrl] = useState<string>("/");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // ウェルカムメール送信関数
  const sendWelcomeEmail = async (email: string) => {
    try {
      const response = await fetch("/api/auth/welcome-email", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ email }),
      });
      
      const result = await response.json();
      console.log('Welcome email result:', result.message);
      // メール送信は成功/失敗に関わらず続行
    } catch (error) {
      console.log('Welcome email failed, but continuing...', error);
      // メール送信失敗してもユーザー体験を損なわない
    }
  };

  useEffect(() => {
    const callback = searchParams.get('callbackUrl');
    if (callback) {
      setCallbackUrl(callback);
    }
    
    const error = searchParams.get('error');
    if (error === 'existing_credentials') {
      setErrorMessage("このメールアドレスは既にメール・パスワードで登録されています。ログインページからログインしてください。");
    }
  }, [searchParams]);
  // const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password}),
    });

    if(!res.ok){
      const {error} = await res.json();
      alert(error || "登録に失敗しました");
      setEmail("");
      setPassword("");
      return;
    }

    // 登録成功後、ログイン前にウェルカムメールを送信
    await sendWelcomeEmail(email);

    // その後でログイン実行
    const login = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: callbackUrl,
    });

    if (login?.error) {
      alert("ログインに失敗しました");
    } else {
      // ログイン成功後にcallbackUrlに遷移
      router.push(callbackUrl);
    }
    
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h3 className="mb-10">新規登録</h3>
      
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p className="text-sm">{errorMessage}</p>
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}&from=signup_existing`}
            className="mt-2 inline-block text-primary-700 hover:underline text-sm font-semibold"
          >
            ログインページへ →
          </Link>
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
        onClick={() => signIn("google", {callbackUrl: callbackUrl})}
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
          href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="ml-2 text-primary-700 hover:underline text-sm font-semibold"
        >
          ログイン
        </Link>
      </div>
    </div>
  );
}

export default function Signup() {
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
            <SignupForm />
          </Suspense>
        </main>
    </div>
    </>
  );
}
