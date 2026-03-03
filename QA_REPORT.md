# QA Report - 文書AI (50-ai)

**Date:** 2026-03-04 (Night 4 - QA Phase, Round 2)
**Tester:** Claude Code (Automated QA)
**Build:** Next.js 16.1.6 (Turbopack)

## Summary

全体的に高品質なコードベース。今回のQAラウンド2では5件の問題を発見し修正。累計で全問題を解決済み。

## Checklist

- [x] `npm run build` 成功
- [x] `npm run lint` エラーなし
- [x] レスポンシブ対応（モバイル・デスクトップ）
- [x] favicon, OGP設定
- [x] 404ページ
- [x] ローディング状態の表示
- [x] エラー状態の表示

## Issues Found & Fixed (Round 2)

### 1. SEO: Fake AggregateRating in Structured Data - Fixed

| File | Issue | Severity | Fix |
|------|-------|----------|-----|
| `src/app/page.tsx` | JSON-LD WebApplicationに虚偽のaggregateRating（4.8/5, 15件）が含まれていた。Google構造化データガイドライン違反でペナルティリスク | High | aggregateRatingを削除 |

### 2. UX: FeedbackWidget Silent Error - Fixed

| File | Issue | Severity | Fix |
|------|-------|----------|-----|
| `src/components/feedback-widget.tsx` | catch blockが空でフィードバック送信失敗時にユーザーに通知されない | Medium | エラー状態を追加し「送信に失敗しました」メッセージとリトライボタンを表示 |

### 3. Security: MCP Route Rate Limiting Missing - Fixed

| File | Issue | Severity | Fix |
|------|-------|----------|-----|
| `src/app/api/mcp/route.ts` | generate_business_documentツールにレート制限がなく、/api/generateの5回/日制限を迂回可能 | Medium | checkRateLimitを追加し同一IPの制限を適用 |

### 4. Missing Favicon - Fixed

| File | Issue | Severity | Fix |
|------|-------|----------|-----|
| `public/` | favicon.icoが存在しない。ブラウザタブにデフォルトアイコン表示 | Low | `src/app/icon.tsx`で動的favicon生成を追加（青い「文」の文字） |

### 5. Accessibility Improvements - Fixed

| File | Issue | Severity | Fix |
|------|-------|----------|-----|
| `src/app/layout.tsx` | ナビゲーションに`aria-label`なし | Low | `aria-label="メインナビゲーション"`を追加 |
| `src/app/email/page.tsx` | パンくずリストがdivで`nav`要素でない | Low | `<nav aria-label="パンくずリスト">`に変更、separator に`aria-hidden`, 現在ページに`aria-current` |
| `src/app/document/page.tsx` | 同上 | Low | 同上 |
| `src/app/email/[scenario]/page.tsx` | 同上 | Low | 同上 |
| `src/app/document/[scenario]/page.tsx` | 同上 | Low | 同上 |
| `src/app/page.tsx` | シナリオカードのリンクにfocus-visibleスタイルなし | Low | `focus-visible:ring-1 focus-visible:ring-blue-400/50`を追加 |
| `src/app/email/page.tsx` | 同上 | Low | 同上 |
| `src/app/document/page.tsx` | 同上 | Low | 同上 |

## Previously Fixed Issues (Round 1)

### Metadata Accuracy (4件)
- メタデータの「50+のビジネスシーン」→「15のビジネスシーン」修正
- Next.js 15 → 16の記載修正

### Security (3件)
- MCP endpoint: relationship/toneパラメータ検証追加
- API: サーバーサイドフィールド長制限追加
- GA ID: XSS防止のサニタイズ追加

### UX (1件)
- Select component: ドロップダウン矢印SVG追加

### Lint Errors (5件)
- `<a>` → `<Link>` (3箇所), Empty interface修正 (2箇所)

### Edge Case Protections (2件)
- フォーム: maxLength属性追加 (text: 500, textarea: 2000)

### Accessibility (3件)
- labels: `htmlFor`/`id`属性追加、`aria-label`追加

### Loading State (1件)
- `loading.tsx` 作成

## Verified (No Issues)

### UI/Layout
- Homepage: Hero, scenario cards, how-it-works - 正常
- Email/Document pages: パンくずリスト、フォームレイアウト、クロスナビゲーション - 正常
- Responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` - 正常
- Design system: 黒背景、白テキスト、blue-400アクセント、絵文字/アイコンなし - 準拠
- Toast notifications: ダークテーマ - 正常

### SEO
- 動的metadata per scenario page (title, description, OGP)
- OpenGraph images 全16ページで自動生成
- JSON-LD: WebApplication + FAQPage (ホーム), BreadcrumbList + HowTo (各シナリオ), CollectionPage (カテゴリ一覧)
- sitemap.xml 全ルート含む
- robots.txt AIボット含む全クローラー許可
- llms.txt, agent.json 設定済み
- Canonical URLs 全ページ設定

### Error Handling
- 404ページ、エラーバウンダリ、ローディング状態 - 全て正常
- API: 400/429/500エラーレスポンス - 正常
- Client: Toast通知 - 正常

### Performance
- Server Components by default; "use client" は3ファイルのみ
- SSGで全シナリオページを静的生成
- Edge runtimeでOGP画像生成
- 最小限のdependency

### Security
- Security headers: X-Frame-Options, X-Content-Type-Options, HSTS等
- Input validation: 全APIエンドポイント
- Rate limiting: 5回/日/IP (Vercel KV) - API・MCP両方に適用
- Field length limits: クライアント + サーバーサイド

## Known Limitations

- 自動テスト（unit/integration/e2e）未実装。将来的に追加推奨
- Rate limitingは`x-forwarded-for`ヘッダー依存（スプーフ可能）。無料ティアとしては許容範囲
- middleware.ts はNext.js 16で非推奨警告。将来的にproxyへ移行推奨
- 二次テキスト色（white/40, white/30）はコントラスト比が低いが、意図的にミュートされた要素に使用
