# 文書AI - bunsho.ezoai.jp

50+のビジネスシーンに特化したAI文書生成プラットフォーム。シナリオを選び最小限の情報を入力するだけで、関係性に応じた敬語レベルのビジネスメール・文書をAIが即座に作成します。

## Features

### ビジネスメール (10シナリオ)
お詫び / 依頼 / 催促 / お礼 / 報告 / 断り / 挨拶 / 自己紹介 / 日程調整 / 問い合わせ

### ビジネス文書 (5シナリオ)
議事録 / 企画書 / 報告書 / 始末書 / 送付状

### 共通機能
- 関係性に応じた敬語自動調整（上司/取引先/部下/同僚）
- トーン設定（フォーマル/ややフォーマル/カジュアル）
- ワンクリックコピー
- 各シナリオに専用SEOランディングページ
- MCP Server（AIエージェント連携）

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS
- **AI**: Anthropic Claude API (Haiku)
- **Hosting**: Vercel
- **Rate Limit**: Vercel KV

## Setup

```bash
npm install
cp .env.example .env.local
# .env.local に ANTHROPIC_API_KEY を設定
npm run dev
```

## Environment Variables

| 変数 | 説明 |
|------|------|
| `ANTHROPIC_API_KEY` | Anthropic API Key |
| `KV_REST_API_URL` | Vercel KV URL |
| `KV_REST_API_TOKEN` | Vercel KV Token |
| `NEXT_PUBLIC_SITE_URL` | サイトURL |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |

## API

| Endpoint | Method | 説明 |
|----------|--------|------|
| `/api/generate` | POST | ビジネスメール・文書の生成 |
| `/api/mcp` | GET | MCPサーバー情報 |
| `/api/mcp` | POST | MCPツール実行 |
| `/api/feedback` | POST | フィードバック送信 |

## AI Integration

- **MCP Server**: `/api/mcp`
- **Agent Card**: `/.well-known/agent.json`
- **LLMs.txt**: `/llms.txt`
- **Robots.txt**: `/robots.txt`

## Links

- Website: https://bunsho.ezoai.jp
- GitHub: https://github.com/Michey0495/50-ai
