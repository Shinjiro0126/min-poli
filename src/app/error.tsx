'use client';

import { useEffect } from 'react';
import { MdError } from 'react-icons/md';
import Button from '@/app/component/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーログを記録（本番環境では外部サービスに送信）
    console.error('Application error:', error);
    
    // 本番環境でのエラー追跡サービス（例：Sentry）
    // if (process.env.NODE_ENV === 'production') {
    //   captureException(error);
    // }
  }, [error]);

  return (
    <div className="max-w-xl mx-auto text-center px-4 py-24">
      <div className="mb-8">        
        <h1 className="text-6xl font-bold text-red-600 mb-4">500</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          サーバーエラー
        </h2>
        <p className="text-gray-600">
          申し訳ございません。予期しないエラーが発生しました。
          問題が解決しない場合は、しばらく時間をおいてから再度お試しください。
        </p>
      </div>
      
      <div className="space-y-4">
              <Button
                href="/"
                className="inline-flex items-center gap-2 bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors font-semibold"
              >
                今日のテーマを見る
              </Button>
            </div>
      
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-8 text-left">
          <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
            開発者向け情報
          </summary>
          <div className="mt-2 p-4 bg-gray-100 rounded border text-xs font-mono text-gray-700 overflow-auto">
            <p><strong>Error:</strong> {error.message}</p>
            {error.digest && <p><strong>Digest:</strong> {error.digest}</p>}
            <pre className="mt-2 whitespace-pre-wrap">{error.stack}</pre>
          </div>
        </details>
      )}
    </div>
  );
}