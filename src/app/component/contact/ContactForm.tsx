'use client';

import { useState } from 'react';
import TextBox from '../TextBox';
import TextArea from '../TextArea';
import ContactFormButton from './ContactFormButton';

interface ContactFormData {
  name: string;
  email: string;
  category: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage({
          type: 'success',
          text: result.message || 'お問い合わせを送信しました。ありがとうございます。'
        });
        
        // フォームをリセット
        setFormData({
          name: '',
          email: '',
          category: '',
          message: ''
        });
      } else {
        setSubmitMessage({
          type: 'error',
          text: result.error || 'エラーが発生しました。'
        });
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitMessage({
        type: 'error',
        text: 'ネットワークエラーが発生しました。しばらく時間をおいて再度お試しください。'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // フォームが有効かチェック
  const isFormValid = formData.name && formData.email && formData.category && formData.message;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <p className="text-gray-700 mb-6 leading-relaxed">
        「みんなの政治」をご利用いただき、ありがとうございます。
        ご質問、ご意見、不具合報告など、お気軽にお問い合わせください。
      </p>

      {submitMessage && (
        <div
          className={`mb-6 p-4 rounded-md ${
            submitMessage.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <TextBox
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            label="お名前"
            placeholder="山田太郎"
            disabled={isSubmitting}
            className={isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}
          />
        </div>

        <div>
          <TextBox
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            label="メールアドレス"
            placeholder="example@email.com"
            disabled={isSubmitting}
            className={isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            お問い合わせ種別 <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">選択してください</option>
            <option value="question">ご質問</option>
            <option value="bug">不具合報告</option>
            <option value="feature">機能のご要望</option>
            <option value="other">その他</option>
          </select>
        </div>

        <div>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            required
            label="お問い合わせ内容"
            placeholder="お問い合わせ内容を詳しく記入してください"
            disabled={isSubmitting}
            className={isSubmitting ? 'bg-gray-100 cursor-not-allowed' : ''}
          />
        </div>

        <div className="text-center">
          <ContactFormButton 
            isSubmitting={isSubmitting} 
            disabled={!isFormValid}
          />
        </div>
      </form>
    </div>
  );
}
