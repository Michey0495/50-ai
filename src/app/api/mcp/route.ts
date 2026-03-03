import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { ALL_SCENARIOS } from "@/lib/scenarios";
import { checkRateLimit } from "@/lib/rate-limit";
import type { Relationship, Tone } from "@/lib/types";

const anthropic = new Anthropic();

const TOOLS = [
  {
    name: "generate_business_document",
    description:
      "ビジネスメールや文書を生成します。シナリオID、関係性、トーン、入力フィールドを指定してください。",
    inputSchema: {
      type: "object" as const,
      properties: {
        scenario_id: {
          type: "string",
          description:
            "シナリオID。メール: apology, request, reminder, thanks, report, rejection, greeting, introduction, schedule, inquiry。文書: minutes, proposal, business-report, incident-report, cover-letter",
        },
        relationship: {
          type: "string",
          enum: ["boss", "client", "subordinate", "colleague"],
          description: "相手との関係性",
        },
        tone: {
          type: "string",
          enum: ["formal", "semi-formal", "casual"],
          description: "トーン",
        },
        fields: {
          type: "object",
          description: "シナリオ固有の入力フィールド（キーはフィールドID）",
        },
      },
      required: ["scenario_id", "relationship", "tone", "fields"],
    },
  },
  {
    name: "list_scenarios",
    description: "利用可能なシナリオの一覧を返します",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
];

export async function GET() {
  return NextResponse.json({
    name: "文書AI MCP Server",
    version: "1.0.0",
    description:
      "ビジネスメール・文書をAIで自動生成するMCPサーバー。15のシナリオに対応。",
    tools: TOOLS,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { tool, arguments: args } = await request.json();

    if (tool === "list_scenarios") {
      const scenarios = ALL_SCENARIOS.map((s) => ({
        id: s.id,
        category: s.category,
        name: s.name,
        description: s.description,
        fields: s.fields.map((f) => ({
          id: f.id,
          label: f.label,
          type: f.type,
          required: f.required,
        })),
      }));
      return NextResponse.json({ result: scenarios });
    }

    if (tool === "generate_business_document") {
      const ip = request.headers.get("x-forwarded-for") || "unknown";
      const { allowed } = await checkRateLimit(ip);
      if (!allowed) {
        return NextResponse.json(
          { error: "本日の無料生成回数に達しました" },
          { status: 429 }
        );
      }

      const { scenario_id, relationship, tone, fields } = args;

      const validRelationships: Relationship[] = ["boss", "client", "subordinate", "colleague"];
      const validTones: Tone[] = ["formal", "semi-formal", "casual"];

      if (!validRelationships.includes(relationship)) {
        return NextResponse.json({ error: "無効な関係性です" }, { status: 400 });
      }
      if (!validTones.includes(tone)) {
        return NextResponse.json({ error: "無効なトーンです" }, { status: 400 });
      }

      const scenario = ALL_SCENARIOS.find((s) => s.id === scenario_id);

      if (!scenario) {
        return NextResponse.json(
          { error: `無効なシナリオID: ${scenario_id}` },
          { status: 400 }
        );
      }

      const fieldsDescription = scenario.fields
        .map((f) => {
          const value = fields[f.id]?.slice(0, 2000);
          return value ? `${f.label}: ${value}` : null;
        })
        .filter(Boolean)
        .join("\n");

      const relationshipMap: Record<Relationship, string> = {
        boss: "上司・目上",
        client: "取引先・お客様",
        subordinate: "部下・後輩",
        colleague: "同僚",
      };

      const toneMap: Record<Tone, string> = {
        formal: "フォーマル",
        "semi-formal": "ややフォーマル",
        casual: "カジュアル",
      };

      const message = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2048,
        system: scenario.systemPrompt,
        messages: [
          {
            role: "user",
            content: `関係性: ${relationshipMap[relationship as Relationship]}\nトーン: ${toneMap[tone as Tone]}\n\n${fieldsDescription}\n\nすぐに使える形式で出力してください。`,
          },
        ],
      });

      const content =
        message.content[0].type === "text" ? message.content[0].text : "";

      return NextResponse.json({
        result: { content, scenarioId: scenario_id },
      });
    }

    return NextResponse.json(
      { error: `未知のツール: ${tool}` },
      { status: 400 }
    );
  } catch (error) {
    console.error("MCP error:", error);
    return NextResponse.json(
      { error: "MCPリクエストの処理に失敗しました" },
      { status: 500 }
    );
  }
}
