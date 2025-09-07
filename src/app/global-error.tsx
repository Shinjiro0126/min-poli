'use client';

import Button from './component/Button';
import { MdRefresh, MdError } from 'react-icons/md';

export default function GlobalError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md mx-auto text-center px-4">
            <div className="mb-8">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MdError className="text-3xl text-red-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-red-600 mb-4">
                アプリケーションエラー
              </h1>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                予期しないエラーが発生しました
              </h2>
              <p className="text-gray-600">
                アプリケーション全体でエラーが発生しています。
                ページを再読み込みしてください。
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors font-semibold w-full justify-center"
              >
                <MdRefresh className="text-xl" />
                アプリを再起動
              </button>
              
              <Button
                href="/"
                className="inline-flex items-center gap-2 bg-primary-700 text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition-colors font-semibold"
              >
                今日のテーマを見る
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}