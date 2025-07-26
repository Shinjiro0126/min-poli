'use client';

import React, { useState } from 'react';
import { DUser } from '@/types/user/user';
import TextBox from '@/app/component/TextBox';

interface ProfileFormProps {
  user: DUser;
  type?: 'email' | 'password';
  onSuccess?: () => void;
}

export default function ProfileForm({ user, type, onSuccess }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    password: '',
    email: user.email || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // typeに応じて送信するデータを絞り込む
      const submitData: { password?: string; email?: string } = {};
      
      if (type === 'password') {
        submitData.password = formData.password;
      } else if (type === 'email') {
        submitData.email = formData.email;
      } else {
        // typeが指定されていない場合は両方
        submitData.password = formData.password;
        submitData.email = formData.email;
      }

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('プロフィールを更新しました');
        setTimeout(() => {
          setMessage(null);
          onSuccess?.();
        }, 1500);
      } else {
        setMessage(data.error || 'プロフィールの更新に失敗しました');
      }
    } catch {
      setMessage('ネットワークエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  // typeに応じて変更検出を行う
  const hasChanges = (() => {
    if (type === 'email') {
      return formData.email !== user.email;
    } else if (type === 'password') {
      return formData.password !== '';
    } else {
      return formData.password !== '' || formData.email !== user.email;
    }
  })();

  return (
    <div>
      {message && (
        <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200">
          <span className="text-sm font-medium text-blue-800">{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {(!type || type === 'password') && (
          <TextBox
            id="password"
            label="新しいパスワード"
            type="password"
            placeholder="6文字以上のパスワードを入力してください"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            disabled={loading}
          />
        )}

        {(!type || type === 'email') && (
          <TextBox
            id="email"
            label="メールアドレス"
            type="email"
            placeholder="メールアドレスを入力してください"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            disabled={loading}
          />
        )}

        <div className="flex items-center justify-end pt-4">
          <button
            type="submit"
            disabled={loading || !hasChanges}
            className={`px-6 py-2 rounded-md font-semibold text-white transition-colors ${
              loading || !hasChanges
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary-600 hover:bg-primary-700'
            }`}
          >
            {loading ? '更新中...' : '更新する'}
          </button>
        </div>
      </form>
    </div>
  );
}
