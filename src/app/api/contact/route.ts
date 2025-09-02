import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// お問い合わせフォームのデータ型
interface ContactFormData {
  name: string;
  email: string;
  category: string;
  message: string;
}

// カテゴリーの日本語表示
const categoryLabels: Record<string, string> = {
  question: 'ご質問',
  bug: '不具合報告',
  feature: '機能のご要望',
  other: 'その他'
};

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, category, message } = body;

    // バリデーション
    if (!name || !email || !category || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません。' },
        { status: 400 }
      );
    }

    // メール送信の設定
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'v2011.coreserver.jp',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // メール内容
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'info@min-poli.biz',
      subject: `【みんなの政治】お問い合わせ - ${categoryLabels[category] || category}`,
      html: `
        <h2>お問い合わせが届きました</h2>
        <div style="border: 1px solid #ddd; padding: 20px; margin: 10px 0; border-radius: 5px;">
          <h3>お問い合わせ詳細</h3>
          <p><strong>お名前:</strong> ${name}</p>
          <p><strong>メールアドレス:</strong> ${email}</p>
          <p><strong>お問い合わせ種別:</strong> ${categoryLabels[category] || category}</p>
          <p><strong>お問い合わせ内容:</strong></p>
          <div style="white-space: pre-wrap; background-color: #f9f9f9; padding: 10px; border-radius: 3px;">
            ${message}
          </div>
        </div>
        <hr>
        <p style="color: #666; font-size: 12px;">
          送信日時: ${new Date().toLocaleString('ja-JP')}
        </p>
      `,
    };

    // 自動返信メール
    const autoReplyOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: '【みんなの政治】お問い合わせを受け付けました',
      html: `
        <h2>お問い合わせありがとうございます</h2>
        <p>${name} 様</p>
        <p>
          この度は「みんなの政治」にお問い合わせいただき、ありがとうございます。<br>
          以下の内容でお問い合わせを受け付けいたしました。
        </p>
        <div style="border: 1px solid #ddd; padding: 20px; margin: 10px 0; border-radius: 5px;">
          <h3>お問い合わせ内容</h3>
          <p><strong>お問い合わせ種別:</strong> ${categoryLabels[category] || category}</p>
          <p><strong>お問い合わせ内容:</strong></p>
          <div style="white-space: pre-wrap; background-color: #f9f9f9; padding: 10px; border-radius: 3px;">
            ${message}
          </div>
        </div>
        <p>
          内容を確認の上、順次回答させていただきます。<br>
          お急ぎの場合は、直接 info@min-poli.biz までご連絡ください。
        </p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          みんなの政治<br>
          https://min-poli.biz
        </p>
      `,
    };

    // メール送信
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { message: 'お問い合わせを送信しました。ありがとうございます。' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'メールの送信に失敗しました。しばらく時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}
