import { ImageResponse } from "next/og";
import { DOCUMENT_SCENARIOS } from "@/lib/scenarios";

export const alt = "文書AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return DOCUMENT_SCENARIOS.map((s) => ({ scenario: s.id }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ scenario: string }>;
}) {
  const { scenario: scenarioId } = await params;
  const scenario = DOCUMENT_SCENARIOS.find((s) => s.id === scenarioId);
  const name = scenario?.name || "文書";
  const description = scenario?.description || "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#60a5fa",
            marginBottom: 16,
            display: "flex",
          }}
        >
          文書AI
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 24,
            display: "flex",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 40,
            display: "flex",
            textAlign: "center",
          }}
        >
          {description}
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
          }}
        >
          {["敬語自動調整", "無料", "登録不要"].map((label) => (
            <div
              key={label}
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.5)",
                fontSize: 20,
                display: "flex",
              }}
            >
              {label}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            color: "rgba(255,255,255,0.3)",
            display: "flex",
          }}
        >
          bunsho.ezoai.jp
        </div>
      </div>
    ),
    { ...size }
  );
}
