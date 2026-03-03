# QA Report - 文書AI (50-ai)

**Date:** 2026-03-04 (Night 5 - QA Phase, Round 3)
**Tester:** Claude Code (Automated QA)
**Build:** Next.js 16.1.6 (Turbopack)

## Summary

全チェックリスト項目クリア。今回のQAラウンド3では5件の問題を発見し修正。

## Checklist

- [x] `npm run build` 成功 (42 pages, 0 errors, 0 warnings)
- [x] `npm run lint` エラーなし
- [x] レスポンシブ対応（モバイル・デスクトップ）
- [x] favicon, OGP設定 (root + 15 scenario OGP images)
- [x] 404ページ (`not-found.tsx`)
- [x] ローディング状態の表示 (`loading.tsx`)
- [x] エラー状態の表示 (`error.tsx`)

## Issues Found & Fixed (Round 3)

### 1. [Bug/High] MCP API crashes on missing arguments
- **File:** `src/app/api/mcp/route.ts`
- POSTing `{"tool":"generate_business_document"}` without `arguments` field would crash due to destructuring `undefined`
- **Fix:** Added guard check for `args` existence before destructuring

### 2. [Security/Low] MCP API reflected unsanitized user input
- **File:** `src/app/api/mcp/route.ts`
- Error message included raw `scenario_id`: `` `無効なシナリオID: ${scenario_id}` ``
- **Fix:** Changed to static error message `"無効なシナリオIDです"`

### 3. [SEO/Medium] Footer missing 5 of 15 scenario links
- **File:** `src/app/layout.tsx`
- Missing: 自己紹介メール, 日程調整メール, 問い合わせメール, 報告書, 送付状. Also missing /email, /document category links
- **Fix:** Reorganized footer: ビジネスメール (all 10), ビジネス文書 (all 5), 文書AI (home + category pages + GitHub)

### 4. [Edge Case/Low] Feedback API no server-side message length limit
- **File:** `src/app/api/feedback/route.ts`
- Client had maxLength=1000 but server accepted any length
- **Fix:** Added 2000-char server-side limit

### 5. [Best Practice/Low] x-forwarded-for IP extraction
- **Files:** `src/app/api/generate/route.ts`, `src/app/api/mcp/route.ts`
- Full header string used as rate limit key; could allow bypass with varying proxy chains
- **Fix:** Extract first IP with `.split(",")[0].trim()`

## Previously Fixed Issues

### Round 2 (5 issues)
- JSON-LD: 虚偽のaggregateRating削除
- FeedbackWidget: サイレントエラー修正、リトライUI追加
- MCP Route: レート制限追加
- favicon: 動的生成追加
- Accessibility: aria-label, nav要素, focus-visible追加

### Round 1 (19 issues)
- Metadata accuracy, Security headers, UX, Lint, Edge cases, A11y, Loading state

## Verified (No Issues)

### UI/Layout
- All pages use consistent containers and responsive grids
- Design system: black bg, white text, blue-400 accent, no emoji/icons
- Toast notifications with dark theme
- Hover/focus transitions on all interactive elements

### SEO
- Unique metadata per page (title, description, OGP, canonical)
- 16 OGP images (root + 15 scenarios)
- JSON-LD: WebApplication, FAQPage, Organization, BreadcrumbList, HowTo, CollectionPage
- sitemap.xml (19 URLs), robots.txt, llms.txt, agent.json

### Accessibility
- `<html lang="ja">`, `<nav aria-label>`, breadcrumbs with aria-current
- All form fields labeled, focus-visible rings, keyboard-navigable

### Error Handling
- 404, error boundary, loading state all present
- API: 400/429/500 with Japanese messages
- Client: Toast notifications for all states

### Security
- Headers: X-Frame-Options, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- Input validation on all API endpoints
- Rate limiting on /api/generate and /api/mcp
- GA ID sanitized before DOM injection

### Performance
- Server Components default; "use client" on 3 files only
- SSG for all scenario pages
- Minimal dependencies

## Known Limitations
- No automated tests (unit/integration/e2e)
- Rate limiting relies on x-forwarded-for header
- Low contrast on muted text (white/30, white/40) - intentional design choice
