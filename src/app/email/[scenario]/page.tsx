import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GenerationForm } from "@/components/generation-form";
import { getScenario, EMAIL_SCENARIOS, DOCUMENT_SCENARIOS } from "@/lib/scenarios";
import Link from "next/link";

interface Props {
  params: Promise<{ scenario: string }>;
}

export async function generateStaticParams() {
  return EMAIL_SCENARIOS.map((s) => ({ scenario: s.id }));
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bunsho.ezoai.jp";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { scenario: scenarioId } = await params;
  const scenario = getScenario("email", scenarioId);
  if (!scenario) return {};
  return {
    title: scenario.seoTitle,
    description: scenario.seoDescription,
    openGraph: {
      title: scenario.seoTitle,
      description: scenario.seoDescription,
    },
    alternates: {
      canonical: `${SITE_URL}/email/${scenarioId}`,
    },
  };
}

export default async function EmailScenarioPage({ params }: Props) {
  const { scenario: scenarioId } = await params;
  const scenario = getScenario("email", scenarioId);
  if (!scenario) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-4 text-sm text-white/40">
        <Link href="/" className="hover:text-white transition-colors duration-200">
          トップ
        </Link>
        <span className="mx-2">/</span>
        <span>メール</span>
        <span className="mx-2">/</span>
        <span className="text-white/60">{scenario.name}</span>
      </div>

      <h1 className="text-3xl font-bold text-white mb-3">{scenario.name}</h1>
      <p className="text-white/60 mb-8 leading-relaxed">
        {scenario.description}。関係性とトーンを選んで、必要な情報を入力してください。
      </p>

      <GenerationForm scenario={scenario} />

      {/* Other email templates */}
      <div className="mt-16 border-t border-white/5 pt-8">
        <h2 className="text-lg font-bold text-white mb-4">
          他のメールテンプレート
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {EMAIL_SCENARIOS.filter((s) => s.id !== scenarioId).map((s) => (
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

      {/* Document templates */}
      <div className="mt-10 border-t border-white/5 pt-8">
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
              { "@type": "ListItem", position: 1, name: "トップ", item: SITE_URL },
              { "@type": "ListItem", position: 2, name: "メール", item: `${SITE_URL}/email/apology` },
              { "@type": "ListItem", position: 3, name: scenario.name },
            ],
          }),
        }}
      />
      {/* JSON-LD: HowTo */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `${scenario.name}の作り方`,
            description: scenario.seoDescription,
            step: [
              {
                "@type": "HowToStep",
                name: "シナリオを選択",
                text: `「${scenario.name}」テンプレートを選択します`,
              },
              {
                "@type": "HowToStep",
                name: "情報を入力",
                text: "相手との関係性、トーン、必要な情報を入力します",
              },
              {
                "@type": "HowToStep",
                name: "AIが生成",
                text: "AIが敬語レベルを自動調整し、メールを生成します",
              },
              {
                "@type": "HowToStep",
                name: "コピーして利用",
                text: "生成されたメールをコピーしてそのまま使えます",
              },
            ],
            tool: {
              "@type": "HowToTool",
              name: "文書AI",
            },
          }),
        }}
      />
    </div>
  );
}
