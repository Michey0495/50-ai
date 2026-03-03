import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { ALL_SCENARIOS } from "@/lib/scenarios";
import { checkRateLimit } from "@/lib/rate-limit";
import type { GenerateRequest, Relationship, Tone } from "@/lib/types";

const anthropic = new Anthropic();

const RELATIONSHIP_CONTEXT: Record<Relationship, string> = {
  boss: "相手は上司・目上の方です。尊敬語・謙譲語を適切に使い、丁寧な表現にしてください。",
  client: "相手は取引先・お客様です。最も丁寧な敬語を使い、ビジネスマナーを厳守してください。",
  subordinate: "相手は部下・後輩です。丁寧語を基本としつつ、親しみやすさも持たせてください。",
  colleague: "相手は同僚です。丁寧語を基本としつつ、堅すぎない自然な表現にしてください。",
};

const TONE_CONTEXT: Record<Tone, string> = {
  formal: "フォーマルなトーンで作成してください。格式高い表現を使ってください。",
  "semi-formal": "ややフォーマルなトーンで作成してください。丁寧だが堅すぎない表現にしてください。",
  casual: "カジュアルなトーンで作成してください。ただしビジネスの最低限のマナーは守ってください。",
};

export async function POST(request: NextRequest) {
  const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  const { allowed, remaining } = await checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: "本日の無料生成回数に達しました。明日またお試しください。", remaining: 0 },
      { status: 429 }
    );
  }

  try {
    const body: GenerateRequest = await request.json();

    const validRelationships: Relationship[] = ["boss", "client", "subordinate", "colleague"];
    const validTones: Tone[] = ["formal", "semi-formal", "casual"];

    if (!validRelationships.includes(body.relationship)) {
      return NextResponse.json({ error: "無効な関係性です" }, { status: 400 });
    }
    if (!validTones.includes(body.tone)) {
      return NextResponse.json({ error: "無効なトーンです" }, { status: 400 });
    }

    const scenario = ALL_SCENARIOS.find((s) => s.id === body.scenarioId);

    if (!scenario) {
      return NextResponse.json(
        { error: "無効なシナリオです" },
        { status: 400 }
      );
    }

    const fieldsDescription = scenario.fields
      .map((f) => {
        const value = body.fields[f.id]?.slice(0, 2000);
        return value ? `${f.label}: ${value}` : null;
      })
      .filter(Boolean)
      .join("\n");

    const userMessage = `以下の情報に基づいて、${scenario.name}を作成してください。

${RELATIONSHIP_CONTEXT[body.relationship]}
${TONE_CONTEXT[body.tone]}

【入力情報】
${fieldsDescription}

件名と本文を含めて、すぐにコピーして使える形式で出力してください。余計な説明は不要です。`;

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system: scenario.systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const content =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({
      content,
      scenarioId: scenario.id,
      timestamp: new Date().toISOString(),
      remaining,
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "生成中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
