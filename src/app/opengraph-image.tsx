import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "文書AI - ビジネスメール・文書をAIが自動生成";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: 24,
            display: "flex",
          }}
        >
          文書AI
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#60a5fa",
            marginBottom: 40,
            display: "flex",
          }}
        >
          ビジネスメール・文書をAIが即座に作成
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          {["お詫び", "依頼", "催促", "お礼", "議事録", "企画書"].map(
            (label) => (
              <div
                key={label}
                style={{
                  padding: "12px 24px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 24,
                  display: "flex",
                }}
              >
                {label}
              </div>
            )
          )}
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
