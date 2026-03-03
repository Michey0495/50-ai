import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { type, message, repo } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const labels: Record<string, string> = {
      bug: "bug",
      feature: "enhancement",
      other: "feedback",
    };

    const title = `[${type}] ${message.slice(0, 80)}${message.length > 80 ? "..." : ""}`;
    const body = `## User Feedback\n\n**Type:** ${type}\n\n**Message:**\n${message}\n\n---\n*Auto-created from in-app feedback widget*`;

    const token = process.env.GITHUB_TOKEN;
    const repoName = repo || "50-ai";

    if (token) {
      try {
        await fetch(
          `https://api.github.com/repos/Michey0495/${repoName}/issues`,
          {
            method: "POST",
            headers: {
              Authorization: `token ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title,
              body,
              labels: [labels[type] || "feedback"],
            }),
          }
        );
      } catch (e) {
        console.error("Failed to create GitHub issue:", e);
      }
    } else {
      console.log("Feedback received (no GITHUB_TOKEN):", { type, message });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "フィードバックの送信に失敗しました" },
      { status: 500 }
    );
  }
}
