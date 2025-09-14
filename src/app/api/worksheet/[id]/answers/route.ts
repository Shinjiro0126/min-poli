import { NextRequest, NextResponse } from "next/server";
import { getAllAnswers } from "@/lib/answer/answer";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const worksheetId = parseInt(id);
    
    if (isNaN(worksheetId)) {
      return NextResponse.json(
        { error: "Invalid worksheet ID" },
        { status: 400 }
      );
    }

    // クエリパラメータを取得
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const userId = searchParams.get('userId');

    // ページネーション用のオフセットを計算
    const offset = (page - 1) * limit;

    // データベースから回答を取得（制限付き）
    const allAnswers = await getAllAnswers(worksheetId, userId);
    
    // ページネーション適用
    const paginatedAnswers = allAnswers.slice(offset, offset + limit);
    const hasMore = allAnswers.length > offset + limit;
    const totalCount = allAnswers.length;

    return NextResponse.json({
      answers: paginatedAnswers,
      hasMore,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });

  } catch (error) {
    console.error("Error fetching answers:", error);
    return NextResponse.json(
      { error: "Failed to fetch answers" },
      { status: 500 }
    );
  }
}
