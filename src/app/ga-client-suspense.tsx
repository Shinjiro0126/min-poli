'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type GtagCommand = 'config' | 'event' | 'js' | 'set';
type GtagEventParams = {
  page_location?: string;
  page_path?: string;
  page_title?: string;
  [key: string]: string | number | boolean | undefined;
};

declare global {
  interface Window {
    gtag?: (
      command: GtagCommand,
      targetIdOrEventName: string,
      parameters?: GtagEventParams | Date
    ) => void;
  }
}

function GAClientCore() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (!window.gtag) return;
    const url = pathname + (search?.toString() ? `?${search.toString()}` : '');
    // ルート変更ごとに page_view を送信
    window.gtag('event', 'page_view', {
      page_location: window.location.origin + url,
      page_path: pathname,
    });
  }, [pathname, search]);

  return null;
}

export default function GAClient() {
  return (
    <Suspense fallback={null}>
      <GAClientCore />
    </Suspense>
  );
}
