// src/app/api/user/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { updateUserEmail, updateUserName, updateUserPassword } from '@/lib/user/user';

export async function PUT(request: NextRequest) {
  try {
    console.log('Profile update API called');
    const session = await getServerSession(authOptions);
    console.log('Session:', session);
    
    if (!session?.user?.id) {
      console.log('No session or user ID');
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('Request body:', body);
    const { email, name, password } = body;

    // バリデーション
    if (email && (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return NextResponse.json(
        { error: '有効なメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    if (name && (!name.trim() || name.trim().length < 1)) {
      return NextResponse.json(
        { error: 'ユーザー名を入力してください' },
        { status: 400 }
      );
    }

    if (password && (!password.trim() || password.trim().length < 6)) {
      return NextResponse.json(
        { error: 'パスワードは6文字以上で入力してください' },
        { status: 400 }
      );
    }

    // メールアドレスの更新
    if (email) {
      const emailResult = await updateUserEmail(session.user.id, email.trim());
      if (!emailResult.success) {
        return NextResponse.json(
          { error: emailResult.error },
          { status: 400 }
        );
      }
    }

    // ユーザー名の更新
    if (name) {
      const nameResult = await updateUserName(session.user.id, name.trim());
      if (!nameResult.success) {
        return NextResponse.json(
          { error: nameResult.error },
          { status: 400 }
        );
      }
    }

    // パスワードの更新
    if (password) {
      const passwordResult = await updateUserPassword(session.user.id, password.trim());
      if (!passwordResult.success) {
        return NextResponse.json(
          { error: passwordResult.error },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'プロフィールの更新中にエラーが発生しました', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}