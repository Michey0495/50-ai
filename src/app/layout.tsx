import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import { Toaster } from "sonner";
import { FeedbackWidget } from "@/components/feedback-widget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bunsho.ezoai.jp";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    default: "文書AI - ビジネスメール・文書をAIが自動生成 | 敬語自動調整",
    template: "%s | 文書AI",
  },
  description:
    "ビジネスメールの敬語に迷わない。15のシーン別テンプレートで、お詫び・依頼・催促・お礼メールから議事録・企画書まで、相手との関係性に応じた敬語レベルでAIが自動作成。登録不要・無料。",
  keywords: [
    "ビジネスメール テンプレート",
    "お詫び メール テンプレート",
    "お詫びメール 例文",
    "催促メール 書き方",
    "催促メール 例文 ビジネス",
    "議事録 テンプレート",
    "企画書 テンプレート",
    "退職 挨拶メール",
    "始末書 テンプレート",
    "始末書 書き方",
    "お礼メール 書き方",
    "お礼メール 例文",
    "断りメール テンプレート",
    "ビジネス文書 AI 作成",
    "ビジネスメール 例文",
    "敬語 メール 書き方",
    "メール 自動作成 AI",
    "報告メール テンプレート",
    "依頼メール 書き方",
    "日程調整メール テンプレート",
    "送付状 テンプレート",
    "報告書 テンプレート",
    "ビジネスメール AI",
    "敬語 自動生成",
    "ビジネスメール 敬語 チェック",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: "文書AI",
    title: "文書AI - 敬語レベルを自動調整するAIビジネスメール生成",
    description:
      "上司・取引先・同僚、相手に合わせた敬語でビジネスメールをAIが5秒で作成。15シナリオ対応、登録不要、無料。",
  },
  twitter: {
    card: "summary_large_image",
    title: "文書AI - 敬語レベルを自動調整するAIビジネスメール生成",
    description:
      "「敬語、これで合ってる？」をAIが5秒で解決。15のビジネスシーン対応、関係性に応じた敬語自動調整。無料・登録不要。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.replace(/[^a-zA-Z0-9-]/g, "");

  return (
    <html lang="ja">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <header className="border-b border-white/5">
          <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold text-white hover:text-blue-400 transition-colors duration-200">
              文書AI
            </Link>
            <div className="flex items-center gap-6 text-sm text-white/50">
              <Link href="/email" className="hover:text-white transition-colors duration-200">
                メール
              </Link>
              <Link href="/document" className="hover:text-white transition-colors duration-200">
                文書
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-white/5 mt-20">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-sm font-bold text-white/50 mb-3">ビジネスメール</h4>
                <ul className="space-y-1.5 text-sm text-white/30">
                  <li><Link href="/email/apology" className="hover:text-white/60 transition-colors duration-200">お詫びメール</Link></li>
                  <li><Link href="/email/request" className="hover:text-white/60 transition-colors duration-200">依頼メール</Link></li>
                  <li><Link href="/email/reminder" className="hover:text-white/60 transition-colors duration-200">催促メール</Link></li>
                  <li><Link href="/email/thanks" className="hover:text-white/60 transition-colors duration-200">お礼メール</Link></li>
                  <li><Link href="/email/rejection" className="hover:text-white/60 transition-colors duration-200">断りメール</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white/50 mb-3">その他のメール・文書</h4>
                <ul className="space-y-1.5 text-sm text-white/30">
                  <li><Link href="/email/report" className="hover:text-white/60 transition-colors duration-200">報告メール</Link></li>
                  <li><Link href="/email/greeting" className="hover:text-white/60 transition-colors duration-200">挨拶メール</Link></li>
                  <li><Link href="/document/minutes" className="hover:text-white/60 transition-colors duration-200">議事録</Link></li>
                  <li><Link href="/document/proposal" className="hover:text-white/60 transition-colors duration-200">企画書</Link></li>
                  <li><Link href="/document/incident-report" className="hover:text-white/60 transition-colors duration-200">始末書</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white/50 mb-3">文書AI</h4>
                <ul className="space-y-1.5 text-sm text-white/30">
                  <li><Link href="/" className="hover:text-white/60 transition-colors duration-200">ホーム</Link></li>
                  <li><a href="https://github.com/Michey0495/50-ai" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors duration-200">GitHub</a></li>
                </ul>
              </div>
            </div>
            <div className="text-center text-sm text-white/20 pt-6 border-t border-white/5">
              <p>&copy; 2026 文書AI by Ghostfee</p>
            </div>
          </div>
        </footer>
        <FeedbackWidget />
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
            },
          }}
        />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}')`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
