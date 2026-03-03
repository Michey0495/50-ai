import Link from "next/link";
import { Card } from "@/components/ui/card";
import { EMAIL_SCENARIOS, DOCUMENT_SCENARIOS } from "@/lib/scenarios";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Hero */}
      <section className="text-center mb-20">
        <p className="text-sm text-blue-400/80 mb-4 tracking-wide">
          15のビジネスシーンに対応 / 登録不要 / 無料
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
          「敬語、これで合ってる？」を
          <br />
          <span className="text-blue-400">AIが5秒で解決</span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-8">
          上司・取引先・同僚——相手との関係性を選ぶだけで、
          敬語レベルまで完璧なビジネスメール・文書をAIが自動生成。
          もう書き方で悩む時間は不要です。
        </p>
        <Link
          href="/email/apology"
          className="inline-block px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition-all duration-200 mb-8"
        >
          今すぐ試す（無料）
        </Link>
        <div className="flex items-center justify-center gap-3 text-sm text-white/40">
          <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
            無料 5回/日
          </span>
          <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
            登録不要
          </span>
          <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">
            敬語自動調整
          </span>
        </div>
      </section>

      {/* Email Scenarios */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">
          ビジネスメール
        </h2>
        <p className="text-white/50 mb-6">
          シーンに合わせたビジネスメールを自動生成
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMAIL_SCENARIOS.map((scenario) => (
            <Link key={scenario.id} href={`/email/${scenario.id}`}>
              <Card className="h-full hover:bg-white/8 hover:border-white/20 transition-all duration-200 cursor-pointer">
                <h3 className="text-lg font-bold text-white mb-2">
                  {scenario.name}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {scenario.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Document Scenarios */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-2">
          ビジネス文書
        </h2>
        <p className="text-white/50 mb-6">
          業務に必要な文書・テンプレートを自動生成
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DOCUMENT_SCENARIOS.map((scenario) => (
            <Link key={scenario.id} href={`/document/${scenario.id}`}>
              <Card className="h-full hover:bg-white/8 hover:border-white/20 transition-all duration-200 cursor-pointer">
                <h3 className="text-lg font-bold text-white mb-2">
                  {scenario.name}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {scenario.description}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          使い方
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "シナリオを選ぶ",
              desc: "お詫び、依頼、催促など、目的に合ったテンプレートを選択",
            },
            {
              step: "2",
              title: "情報を入力",
              desc: "相手との関係性と状況を入力。最小限の情報でOK",
            },
            {
              step: "3",
              title: "コピーして使う",
              desc: "AIが生成した文書をワンクリックでコピー。すぐに使えます",
            },
          ].map((item) => (
            <Card key={item.step} className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-3">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-white/50">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* JSON-LD: WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "文書AI",
            url: "https://bunsho.ezoai.jp",
            description:
              "15のビジネスシーンに特化したAI文書生成。関係性に応じた敬語レベルで自動作成。",
            applicationCategory: "BusinessApplication",
            operatingSystem: "All",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "JPY",
            },
            featureList: [
              "お詫びメール自動生成",
              "依頼メール自動生成",
              "催促メール自動生成",
              "議事録自動生成",
              "企画書自動生成",
              "関係性に応じた敬語自動調整",
              "登録不要で即利用可能",
            ],
          }),
        }}
      />
      {/* JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "文書AIは無料で使えますか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "はい、登録不要で1日5回まで無料でご利用いただけます。",
                },
              },
              {
                "@type": "Question",
                name: "どのようなビジネスメールを作成できますか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "お詫び、依頼、催促、お礼、報告、断り、挨拶、自己紹介、日程調整、問い合わせの10種類のメールと、議事録、企画書、報告書、始末書、送付状の5種類の文書を作成できます。",
                },
              },
              {
                "@type": "Question",
                name: "敬語レベルはどのように調整されますか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "相手との関係性（上司、取引先、部下、同僚）を選択するだけで、AIが適切な敬語レベルを自動で判断し、文書を生成します。",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
