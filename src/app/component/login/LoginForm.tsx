"use client";

import React, { useState, useEffect } from "react";
import TextBox from "../TextBox";
import Button from "../Button";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [callbackUrl, setCallbackUrl] = useState<string>("/");
  const [infoMessage, setInfoMessage] = useState<string>("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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
    setIsLoginLoading(true);
    
    try {
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
    } catch (error) {
      console.error("Login error:", error);
      alert("ログイン中にエラーが発生しました");
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    signIn("google", {callbackUrl: callbackUrl});
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <h3 className="h3 mb-10">ログイン</h3>
      
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
              disabled={isLoginLoading || isGoogleLoading}
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
              disabled={isLoginLoading || isGoogleLoading}
            />
          </div>
        </div>
        <Button
          type="submit"
          isLoading={isLoginLoading}
          className="w-full py-2 px-4 bg-primary-700 hover:bg-primary-900 text-white font-semibold rounded-md shadow transition-colors duration-200"
        >
          ログイン
        </Button>
      </form>
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-400">または</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <Button
        type="button"
        isLoading={isGoogleLoading}
        loadingText="ログイン中..."
        onClick={handleGoogleSignIn}
        className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors duration-200 font-normal!"
      >
        <Image 
          src="/img/logo_google.svg" 
          alt="Google" 
          width={20}
          height={20}
        />
        Googleアカウントでログイン
      </Button>
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-700">アカウントをお持ちでない方は</span>
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
