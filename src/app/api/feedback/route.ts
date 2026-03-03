import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { type, message, scenarioId } = await request.json();

    // TODO: Store feedback in KV or database
    console.log("Feedback received:", { type, message, scenarioId });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "フィードバックの送信に失敗しました" },
      { status: 500 }
    );
  }
}
