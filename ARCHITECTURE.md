# Architecture - 文書AI

## 設計方針

- **MVP優先**: 最小限の実装で価値を提供
- **SEO重視**: 各シナリオが個別のランディングページ
- **AI-First**: MCPサーバー、Agent Card、llms.txtによるAIエージェント連携
- **日本特化**: ビジネス敬語・マナーに完全対応

## ページ構成

```
/                           トップページ（シナリオ一覧、使い方）
/email/[scenario]           メール生成ページ（10シナリオ）
/document/[scenario]        文書生成ページ（5シナリオ）
```

### メールシナリオ
| ID | 名前 | SEOターゲット |
|----|------|--------------|
| apology | お詫びメール | お詫び メール テンプレート |
| request | 依頼メール | 依頼メール テンプレート |
| reminder | 催促メール | 催促メール 書き方 |
| thanks | お礼メール | お礼メール 書き方 |
| report | 報告メール | 報告メール テンプレート |
| rejection | 断りメール | 断りメール テンプレート |
| greeting | 挨拶メール | 退職 挨拶メール |
| introduction | 自己紹介メール | 自己紹介メール テンプレート |
| schedule | 日程調整メール | 日程調整メール テンプレート |
| inquiry | 問い合わせメール | 問い合わせメール テンプレート |

### 文書シナリオ
| ID | 名前 | SEOターゲット |
|----|------|--------------|
| minutes | 議事録 | 議事録 テンプレート |
| proposal | 企画書 | 企画書 テンプレート |
| business-report | 報告書 | 報告書 テンプレート |
| incident-report | 始末書 | 始末書 テンプレート |
| cover-letter | 送付状 | 送付状 テンプレート |

## コンポーネント設計

```
src/
├── app/
│   ├── layout.tsx              ルートレイアウト（メタデータ、ナビ、フッター）
│   ├── page.tsx                トップページ
│   ├── error.tsx               エラーバウンダリ
│   ├── not-found.tsx           404ページ
│   ├── sitemap.ts              動的サイトマップ
│   ├── email/[scenario]/page.tsx   メール生成ページ
│   ├── document/[scenario]/page.tsx 文書生成ページ
│   └── api/
│       ├── generate/route.ts   AI生成API
│       ├── mcp/route.ts        MCPサーバー
│       └── feedback/route.ts   フィードバック
├── components/
│   ├── ui/
│   │   ├── button.tsx          ボタン（CVA variants）
│   │   ├── card.tsx            カード
│   │   ├── input.tsx           テキスト入力
│   │   ├── textarea.tsx        テキストエリア
│   │   └── select.tsx          セレクトボックス
│   ├── generation-form.tsx     生成フォーム（use client）
│   └── generation-result.tsx   生成結果表示（use client）
└── lib/
    ├── types.ts                TypeScript型定義
    ├── scenarios.ts            シナリオ定義（15シナリオ）
    ├── rate-limit.ts           レート制限
    └── utils.ts                ユーティリティ（cn()）
```

## データフロー

```
1. ユーザーがシナリオページで入力
2. GenerationForm → POST /api/generate
3. API: レート制限チェック → Claude Haiku呼び出し
4. レスポンス → GenerationResult表示
5. ワンクリックコピー
```

## API設計

### POST /api/generate
```json
{
  "scenarioId": "apology",
  "relationship": "client",
  "tone": "formal",
  "fields": {
    "situation": "納品が3日遅れた",
    "solution": "ダブルチェック体制を構築"
  }
}
```

### レスポンス
```json
{
  "content": "件名: ...\n\n本文...",
  "scenarioId": "apology",
  "timestamp": "2026-03-04T...",
  "remaining": 4
}
```

## MCP Server設計

### GET /api/mcp
サーバー情報とツール定義を返す。

### POST /api/mcp
```json
{
  "tool": "generate_business_document",
  "arguments": {
    "scenario_id": "apology",
    "relationship": "client",
    "tone": "formal",
    "fields": { "situation": "..." }
  }
}
```

### ツール定義
| ツール名 | 説明 |
|---------|------|
| generate_business_document | ビジネスメール・文書を生成 |
| list_scenarios | 利用可能なシナリオ一覧を返す |

## レート制限

- Free: 5回/日（IP単位）
- Vercel KVでカウント管理
- KV未設定時は制限なし（開発用）

## デザインシステム

- 背景: `#000000`
- アクセント: `#60a5fa` (blue-400)
- カード: `bg-white/5 border border-white/10`
- テキスト: `text-white`, `text-white/60`, `text-white/50`
- ホバー: `transition-all duration-200`
