import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/supabeseClient";
import bcrypt from "bcrypt";
import { formatToJST } from "@/util/timestamp_jp";

// POST /api/auth/signup
export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "email, password はすべて必須です。" },
        { status: 400 }
      );
    }

    // 重複チェック
    const { data: existing, error: fetchError } = await supabase
      .from("d_users")
      .select("user_id")
      .eq("email", email)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Supabase fetch error:", fetchError);
      return NextResponse.json(
        { error: "データベースエラーが発生しました。" },
        { status: 500 }
      );
    }
    if (existing) {
      return NextResponse.json(
        { error: "このメールアドレスはすでに登録されています。ログインしてください。" },
        { status: 409 }
      );
    }

    // パスワードハッシュ化
    const password_hash = await bcrypt.hash(password, 10);
    const now = formatToJST(new Date().toISOString());

    // 新規挿入
    const { error: insertError } = await supabase.from("d_users").insert({
      email,
      name,
      password_hash,
      auth_provider: "credentials",
      last_login_at: now,
      created_at: now,
      updated_at: now,
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "ユーザー作成に失敗しました。" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "ユーザー登録が完了しました。" },
      { status: 201 }
    );
  } catch (e) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: "予期せぬエラーが発生しました。" },
      { status: 500 }
    );
  }
}

// GET /api/auth/signup は許可しない（405）
export async function GET() {
  return NextResponse.json(
    { error: "Method Not Allowed" },
    { status: 405 }
  );
}
