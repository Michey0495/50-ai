# QA Report - 文書AI (50-ai)

**Date:** 2026-03-04 (Night 4 - QA Phase)
**Tester:** Claude Code (Automated QA)
**Build:** Next.js 16.1.6 (Turbopack)

## Summary

全体的に高品質なコードベース。重大なバグはなし。今回のQAでは正確性・セキュリティ・UXに関する6件の問題を発見し修正。

## Checklist

- [x] `npm run build` 成功
- [x] `npm run lint` エラーなし
- [x] レスポンシブ対応（モバイル・デスクトップ）
- [x] favicon, OGP設定
- [x] 404ページ
- [x] ローディング状態の表示
- [x] エラー状態の表示

## Issues Found & Fixed (Today - Night 4)

### 1. Metadata Accuracy (4件) - Fixed

| File | Issue | Fix |
|------|-------|-----|
| `src/app/layout.tsx` | メタデータに「50+のビジネスシーン」と記載されているが実際は15シナリオ | 「15のビジネスシーン」に修正 |
| `public/llms.txt` | 同上 + 「Next.js 15」と記載されているがv16使用 | 「15のビジネスシーン」「Next.js 16」に修正 |
| `public/.well-known/agent.json` | 「50+のビジネスシーン」と記載 | 「15のビジネスシーン」に修正 |
| `src/app/api/mcp/route.ts` | MCPサーバー説明に「50+のシナリオ」 | 「15のシナリオ」に修正 |

### 2. Security: MCP Endpoint Validation (1件) - Fixed

| File | Issue | Severity | Fix |
|------|-------|----------|-----|
| `src/app/api/mcp/route.ts` | `relationship`/`tone`パラメータの検証なし、フィールド長制限なし | Medium | ホワイトリスト検証追加、`.slice(0, 2000)`でフィールド長制限追加 |

### 3. Security: GA ID Sanitization (1件) - Fixed

| File | Issue | Severity | Fix |
|------|-------|----------|-----|
| `src/app/layout.tsx` | `NEXT_PUBLIC_GA_ID`がインラインスクリプトに直接挿入（XSSリスク） | Low | 英数字とハイフンのみ許可する正規表現フィルター追加 |

### 4. UX: Select Component (1件) - Fixed

| File | Issue | Fix |
|------|-------|-----|
| `src/components/ui/select.tsx` | `appearance-none`でドロップダウン矢印が非表示のまま代替インジケータなし | SVGのドロップダウン矢印を追加 |

## Previously Fixed Issues (Night 3 QA)

### Lint Errors (5件)
- `<a>` tags → `<Link>` (3箇所)
- Empty interface → type alias (2箇所)

### Security Issues (2件)
- `/api/generate`: relationship/tone パラメータ検証追加
- `/api/feedback`: repoフィールドのホワイトリスト制限追加

### Edge Case Protections (2件)
- フォーム入力: maxLength属性追加 (text: 500, textarea: 2000)
- API: サーバーサイドフィールド長制限 `.slice(0, 2000)` 追加

### Accessibility (3件)
- labels: `htmlFor`/`id`属性追加
- feedback widget: `aria-label` 追加

### Loading State (1件)
- `loading.tsx` 作成（スピナーアニメーション）

## Verified (No Issues)

### UI/Layout
- Homepage: Hero section, scenario cards, how-it-works section all properly structured
- Email/Document pages: Breadcrumb navigation, form layout, cross-navigation links
- Responsive grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` pattern used correctly
- Design system compliance: Black background, white text, blue-400 accent, no emojis/icons
- Form components: Input/Textarea/Select with proper styling and focus states
- Toast notifications: Dark theme, appropriate timing

### SEO
- Dynamic metadata per scenario page (title, description, OGP)
- OpenGraph images auto-generated for all 16 pages (1 homepage + 15 scenarios)
- JSON-LD structured data: `WebApplication` + `FAQPage` on homepage, `BreadcrumbList` + `HowTo` on scenario pages
- Dynamic sitemap.xml with all routes (priority 1.0 homepage, 0.8 scenarios)
- robots.txt allows all crawlers including AI bots
- llms.txt and agent.json properly configured
- Canonical URLs on all pages
- Twitter Card: summary_large_image

### Error Handling
- 404 page (`not-found.tsx`) with link back to homepage
- Error boundary (`error.tsx`) with retry button
- API: 400 for invalid input, 429 for rate limit, 500 for server errors
- Client-side: Toast notifications for all error/success states
- Rate limit exceeded: Clear user-facing message

### Accessibility
- All form inputs have associated labels with `htmlFor`/`id`
- Focus states: `focus-visible:ring-2` on buttons, `focus:ring-1` on inputs
- Select component: Custom dropdown arrow indicator
- Feedback widget: `aria-label` on interactive elements
- Color contrast: Primary text is white on black (21:1 ratio)
- Language attribute: `<html lang="ja">`

### Performance
- Server Components used by default; `"use client"` only for interactive components (3 files)
- Static generation (SSG) for all scenario pages via `generateStaticParams`
- Edge runtime for OGP image generation
- `poweredByHeader: false` and `compress: true` in next.config
- DNS prefetch enabled
- Cache headers for static assets (86400s)
- Minimal dependencies (no unnecessary packages)
- No unnecessary re-renders (local state management)

### Security
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS
- Input validation on all API endpoints (relationship, tone, scenarioId)
- Field length limits (client + server side)
- Rate limiting (5/day per IP via Vercel KV)
- GitHub feedback repo allowlist
- GA ID sanitization

### Architecture
- AI-First design: MCP Server, A2A Agent Card, llms.txt
- Rate limiting via Vercel KV with graceful fallback
- Feedback widget with GitHub Issues integration
- Clean type definitions with TypeScript strict mode

## Known Limitations

- No automated tests (unit/integration/e2e). Recommended for future development.
- Rate limiting relies on `x-forwarded-for` header (can be spoofed). Acceptable for free tier.
- MCP endpoint does not have rate limiting. Consider adding for production.
- middleware.ts deprecation warning in Next.js 16 (should migrate to proxy).
- Secondary text colors (white/40, white/30) have lower contrast ratios but are used for intentionally muted elements.
