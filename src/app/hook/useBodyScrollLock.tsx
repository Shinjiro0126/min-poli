"use client";
import { useEffect } from "react";

export default function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      // シンプルにoverflow-hiddenのみ適用
      document.body.style.overflow = 'hidden';
    } else {
      // 元に戻す
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);
}