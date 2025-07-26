"use client";

import {SessionProvider} from "next-auth/react";
import React from "react";

export default function Providers({children}: {children: React.ReactNode}){
  return (
    <SessionProvider 
      refetchInterval={5 * 60} // 5分間隔でセッションを更新
      refetchOnWindowFocus={false} // ウィンドウフォーカス時の自動更新を無効化
    >
      {children}
    </SessionProvider>
  );
}