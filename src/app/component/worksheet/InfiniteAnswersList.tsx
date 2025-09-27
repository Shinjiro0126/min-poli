"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Card from "@/app/component/Card";
import Avatar from "@/app/component/Avatar";
import { getRelativeTimeString } from "@/util/date";
import { getRandomAvatarPath } from "@/util/avator_img";

interface Answer {
  answer_text: string;
  reason: string;
  created_at: string;
}

interface Props {
  worksheetId: number;
  userId: string | null;
}

export default function InfiniteAnswersList({ worksheetId, userId }: Props) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const isInitialized = useRef(false);
  const loadingRef = useRef(false);
  const fetchAnswersRef = useRef<((pageNum: number, reset?: boolean) => Promise<void>) | null>(null);

  const fetchAnswers = useCallback(async (pageNum: number, reset = false) => {
    if (loadingRef.current) return;
    
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: '10',
        ...(userId && { userId })
      });

      const response = await fetch(`/api/worksheet/${worksheetId}/answers?${params}`);
      
      if (!response.ok) {
        throw new Error('データの取得に失敗しました');
      }

      const data = await response.json();
      
      if (reset) {
        setAnswers(data.answers);
      } else {
        setAnswers(prev => [...prev, ...data.answers]);
      }
      
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [worksheetId, userId]); // loadingを依存配列に追加

  // fetchAnswersの参照を保存
  useEffect(() => {
    fetchAnswersRef.current = fetchAnswers;
  }, [fetchAnswers]);

  // 初回データ取得
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      fetchAnswers(1, true);
    }
  }, [fetchAnswers]);

  // スクロールイベントハンドラー
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // ページ下部に近づいたら次のページを読み込み
      if (scrollTop + clientHeight >= scrollHeight - 1000) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchAnswersRef.current?.(nextPage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, page]); // fetchAnswersを依存配列から削除

  if (answers.length === 0 && !loading) {
    return (
      <Card>
        <div className="text-center text-stone-500">
          まだ他のユーザーからの投票理由はありません。
        </div>
      </Card>
    );
  }

  return (
    <>
      {answers.map((answer, index) => (
        <Card key={`${answer.created_at}-${index}`} className="mb-3">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <Avatar src={getRandomAvatarPath()} alt="ユーザーアバター" width={32} height={32} />
              <div className="flex items-center gap-2">
                <span className="font-label">{answer.answer_text}</span>
                <span className="font-caption">に投票</span>
              </div>
            </div>
            <span className="font-caption text-stone-500">
              {answer.created_at ? getRelativeTimeString(answer.created_at) : ""}
            </span>
          </div>
          <div>
            {answer.reason}
          </div>
        </Card>
      ))}

      {/* ローディングインジケーター */}
      {loading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-700"></div>
        </div>
      )}

      {/* エラー表示 */}
      {error && (
        <div className="text-center text-red-500 py-4">
          <p>{error}</p>
          <button 
            onClick={() => fetchAnswersRef.current?.(page, false)}
            className="mt-2 text-primary-700 hover:text-primary-900 underline"
          >
            再試行
          </button>
        </div>
      )}
    </>
  );
}
