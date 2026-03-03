import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "文書AI - ビジネスメール・文書をAIが自動生成",
    template: "%s | 文書AI",
  },
  description:
    "50+のビジネスシーンに特化したAI文書生成。お詫び・依頼・催促・お礼メールから議事録・企画書まで、関係性に応じた敬語レベルで自動作成。無料で今すぐ使えます。",
  keywords: [
    "ビジネスメール テンプレート",
    "お詫び メール テンプレート",
    "催促メール 書き方",
    "議事録 テンプレート",
    "企画書 テンプレート",
    "退職 挨拶メール",
    "始末書 テンプレート",
    "お礼メール 書き方",
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
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: "文書AI",
    title: "文書AI - ビジネスメール・文書をAIが自動生成",
    description:
      "50+のビジネスシーンに特化したAI文書生成。関係性に応じた敬語レベルで自動作成。無料で今すぐ使えます。",
  },
  twitter: {
    card: "summary_large_image",
    title: "文書AI - ビジネスメール・文書をAIが自動生成",
    description:
      "50+のビジネスシーンに特化したAI文書生成。関係性に応じた敬語レベルで自動作成。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="ja">
      <head>
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}')`,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <header className="border-b border-white/5">
          <nav className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold text-white hover:text-blue-400 transition-colors duration-200">
              文書AI
            </Link>
            <div className="flex items-center gap-6 text-sm text-white/50">
              <Link href="/email/apology" className="hover:text-white transition-colors duration-200">
                メール
              </Link>
              <Link href="/document/minutes" className="hover:text-white transition-colors duration-200">
                文書
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-white/5 mt-20">
          <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-white/30">
            <p>&copy; 2026 文書AI by Ghostfee</p>
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
      </body>
    </html>
  );
}
