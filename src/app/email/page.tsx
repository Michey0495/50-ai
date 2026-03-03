import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { EMAIL_SCENARIOS, DOCUMENT_SCENARIOS } from "@/lib/scenarios";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bunsho.ezoai.jp";

export const metadata: Metadata = {
  title: "ビジネスメール テンプレート一覧 | AI自動生成",
  description:
    "お詫び・依頼・催促・お礼・報告・断り・挨拶・自己紹介・日程調整・問い合わせの10種類のビジネスメールをAIが自動生成。関係性に応じた敬語レベルで、すぐ使えるメールを作成します。",
  openGraph: {
    title: "ビジネスメール テンプレート一覧 | AI自動生成 - 文書AI",
    description:
      "10種類のビジネスメールをAIが自動生成。相手との関係性に応じた敬語レベルで、すぐ使えるメールテンプレートを作成。",
  },
  alternates: {
    canonical: `${SITE_URL}/email`,
  },
};

export default function EmailIndexPage() {
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
        <span className="text-white/60">ビジネスメール</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
        ビジネスメール テンプレート
      </h1>
      <p className="text-lg text-white/60 mb-10 max-w-2xl leading-relaxed">
        10種類のビジネスシーンに対応。関係性（上司・取引先・部下・同僚）とトーンを選ぶだけで、敬語レベルまで完璧なメールをAIが自動生成します。
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {EMAIL_SCENARIOS.map((scenario) => (
          <Link key={scenario.id} href={`/email/${scenario.id}`}>
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
          ビジネス文書テンプレート
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {DOCUMENT_SCENARIOS.map((s) => (
            <Link
              key={s.id}
              href={`/document/${s.id}`}
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
                name: "ビジネスメール",
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
            name: "ビジネスメール テンプレート一覧",
            description:
              "10種類のビジネスメールをAIが自動生成。関係性に応じた敬語レベルで作成。",
            url: `${SITE_URL}/email`,
            mainEntity: {
              "@type": "ItemList",
              itemListElement: EMAIL_SCENARIOS.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: s.name,
                url: `${SITE_URL}/email/${s.id}`,
              })),
            },
          }),
        }}
      />
    </div>
  );
}
