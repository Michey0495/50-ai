import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { EMAIL_SCENARIOS, DOCUMENT_SCENARIOS } from "@/lib/scenarios";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bunsho.ezoai.jp";

export const metadata: Metadata = {
  title: "ビジネス文書 テンプレート一覧 | AI自動生成",
  description:
    "議事録・企画書・報告書・始末書・送付状の5種類のビジネス文書をAIが自動生成。関係性に応じた敬語レベルで、すぐ使える文書を作成します。",
  openGraph: {
    title: "ビジネス文書 テンプレート一覧 | AI自動生成 - 文書AI",
    description:
      "5種類のビジネス文書をAIが自動生成。議事録・企画書・報告書・始末書・送付状のテンプレートを作成。",
  },
  alternates: {
    canonical: `${SITE_URL}/document`,
  },
};

export default function DocumentIndexPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-4 text-sm text-white/40">
        <Link
          href="/"
          className="hover:text-white transition-colors duration-200"
        >
          トップ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/60">ビジネス文書</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        ビジネス文書 テンプレート
      </h1>
      <p className="text-lg text-white/60 mb-10 max-w-2xl leading-relaxed">
        5種類のビジネス文書に対応。会議メモから議事録、アイデアから企画書まで、AIが構造化された文書を自動生成します。
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {DOCUMENT_SCENARIOS.map((scenario) => (
          <Link key={scenario.id} href={`/document/${scenario.id}`}>
            <Card className="h-full hover:bg-white/8 hover:border-white/20 transition-all duration-200 cursor-pointer">
              <h2 className="text-lg font-bold text-white mb-2">
                {scenario.name}
              </h2>
              <p className="text-sm text-white/50 leading-relaxed">
                {scenario.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="border-t border-white/5 pt-8">
        <h2 className="text-lg font-bold text-white mb-4">
          ビジネスメールテンプレート
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {EMAIL_SCENARIOS.map((s) => (
            <Link
              key={s.id}
              href={`/email/${s.id}`}
              className="block p-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>

      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "トップ",
                item: SITE_URL,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "ビジネス文書",
              },
            ],
          }),
        }}
      />
      {/* JSON-LD: CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "ビジネス文書 テンプレート一覧",
            description:
              "5種類のビジネス文書をAIが自動生成。議事録・企画書・報告書・始末書・送付状。",
            url: `${SITE_URL}/document`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: DOCUMENT_SCENARIOS.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.name,
                url: `${SITE_URL}/document/${s.id}`,
              })),
            },
          }),
        }}
      />
    </div>
  );
}
