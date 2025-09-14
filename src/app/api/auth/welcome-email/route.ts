import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'メールアドレスが必要です' }, { status: 400 });
    }

    // メール送信の設定
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // ウェルカムメールの内容
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: '【みんなの政治】ご登録ありがとうございます！',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">みんなの政治</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">政治をもっと身近に、もっと楽しく</p>
          </div>
          
          <div style="background: white; padding: 40px 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #667eea; margin-bottom: 20px;">ご登録ありがとうございます！</h2>
            
            <p style="margin-bottom: 20px;">
              この度は「みんなの政治」にご登録いただき、ありがとうございます。<br>
              あなたの政治参加の第一歩を心から歓迎いたします！
            </p>
            
            <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #667eea; margin-top: 0;">🎉 これからできること</h3>
              <ul style="margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">📊 気になる政治アンケートに投票</li>
                <li style="margin-bottom: 8px;">📈 投票結果をリアルタイムで確認</li>
                <li style="margin-bottom: 8px;">💬 他の人の意見を読んで新しい発見</li>
                <li style="margin-bottom: 8px;">🤝 みんなで作る政治参加の輪</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.BASE_URL}/worksheet" 
                 style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                さっそく参加してみる
              </a>
            </div>
            
            <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; font-size: 14px; color: #666;">
              <p><strong>✨ ワンポイントアドバイス</strong></p>
              <p>まずは興味のあるトピックから投票してみてください。あなたの一票が、みんなの声の一部になります。</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="margin: 0; font-size: 12px; color: #999;">
                このメールに覚えがない場合は、このメールを削除してください。<br>
                © 2025 みんなの政治. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // メール送信
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'ウェルカムメールを送信しました' 
    });

  } catch (error) {
    console.error('Welcome email error:', error);
    // エラーが発生してもAPIは成功として返す（ユーザー体験を損なわないため）
    return NextResponse.json({ 
      success: false, 
      message: 'メール送信に失敗しましたが、登録は完了しています' 
    });
  }
}
