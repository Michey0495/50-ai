import { Scenario } from "./types";

export const EMAIL_SCENARIOS: Scenario[] = [
  {
    id: "apology",
    category: "email",
    name: "お詫びメール",
    description: "ミスやトラブルに対する謝罪メールを作成します",
    seoTitle: "お詫びメール テンプレート | AI自動生成 - 文書AI",
    seoDescription: "ビジネスシーンに適切なお詫びメールをAIが自動生成。関係性に応じた敬語レベルで、誠意の伝わる謝罪文を作成します。",
    fields: [
      { id: "situation", label: "状況・原因", type: "textarea", placeholder: "例: 納品が3日遅れてしまった", required: true },
      { id: "impact", label: "影響・被害", type: "text", placeholder: "例: 先方のスケジュールに遅れが生じた", required: false },
      { id: "solution", label: "対応策・再発防止策", type: "textarea", placeholder: "例: 今後はダブルチェック体制を構築する", required: false },
    ],
    systemPrompt: "あなたはビジネスメールの専門家です。お詫び・謝罪のメールを作成してください。誠意が伝わり、かつ具体的な対応策を示す内容にしてください。",
  },
  {
    id: "request",
    category: "email",
    name: "依頼メール",
    description: "仕事の依頼やお願いのメールを作成します",
    seoTitle: "依頼メール テンプレート | AI自動生成 - 文書AI",
    seoDescription: "ビジネスでの依頼・お願いメールをAIが自動生成。相手に配慮した丁寧な依頼文を作成します。",
    fields: [
      { id: "request_content", label: "依頼内容", type: "textarea", placeholder: "例: 来週の会議資料の作成をお願いしたい", required: true },
      { id: "deadline", label: "期限", type: "text", placeholder: "例: 3月15日まで", required: false },
      { id: "background", label: "背景・理由", type: "textarea", placeholder: "例: 来月のプレゼンに向けて準備が必要", required: false },
    ],
    systemPrompt: "あなたはビジネスメールの専門家です。依頼・お願いのメールを作成してください。相手の負担に配慮しつつ、明確に依頼内容を伝える内容にしてください。",
  },
  {
    id: "reminder",
    category: "email",
    name: "催促メール",
    description: "返信や対応を促す催促メールを作成します",
    seoTitle: "催促メール 書き方 | AI自動生成 - 文書AI",
    seoDescription: "角の立たない催促メールをAIが自動生成。相手の気分を害さず、適切に対応を促すメールを作成します。",
    fields: [
      { id: "original_request", label: "元の依頼内容", type: "textarea", placeholder: "例: 先週お送りした見積書のご確認", required: true },
      { id: "sent_date", label: "最初の連絡日", type: "text", placeholder: "例: 2月20日", required: false },
      { id: "urgency", label: "緊急度の理由", type: "text", placeholder: "例: 月末の締め切りが迫っている", required: false },
    ],
    systemPrompt: "あなたはビジネスメールの専門家です。催促メールを作成してください。相手の気分を害さないよう配慮しつつ、明確に対応を促す内容にしてください。",
  },
  {
    id: "thanks",
    category: "email",
    name: "お礼メール",
    description: "感謝の気持ちを伝えるお礼メールを作成します",
    seoTitle: "お礼メール 書き方 | AI自動生成 - 文書AI",
    seoDescription: "ビジネスシーンにふさわしいお礼メールをAIが自動生成。感謝の気持ちが適切に伝わるメールを作成します。",
    fields: [
      { id: "thanks_for", label: "お礼の対象", type: "textarea", placeholder: "例: 先日の打ち合わせでのご助言", required: true },
      { id: "specific_point", label: "具体的に良かった点", type: "textarea", placeholder: "例: 新しい視点でのアドバイスが参考になった", required: false },
    ],
    systemPrompt: "あなたはビジネスメールの専門家です。お礼メールを作成してください。具体的なエピソードを含め、温かみのある感謝の内容にしてください。",
  },
  {
    id: "report",
    category: "email",
    name: "報告メール",
    description: "業務の進捗や結果を報告するメールを作成します",
    seoTitle: "報告メール テンプレート | AI自動生成 - 文書AI",
    seoDescription: "業務報告メールをAIが自動生成。要点を押さえた分かりやすい報告文を作成します。",
    fields: [
      { id: "report_subject", label: "報告事項", type: "textarea", placeholder: "例: A社との商談結果", required: true },
      { id: "result", label: "結果・成果", type: "textarea", placeholder: "例: 契約締結に合意いただいた", required: false },
      { id: "next_action", label: "今後の予定", type: "text", placeholder: "例: 来週中に契約書を送付", required: false },
    ],
    systemPrompt: "あなたはビジネスメールの専門家です。報告メールを作成してください。結論を先に述べ、要点を簡潔にまとめた内容にしてください。",
  },
  {
    id: "rejection",
    category: "email",
    name: "断りメール",
    description: "依頼や提案を丁寧に断るメールを作成します",
    seoTitle: "断りメール テンプレート | AI自動生成 - 文書AI",
    seoDescription: "角が立たない断りメールをAIが自動生成。関係性を損なわない丁寧なお断り文を作成します。",
    fields: [
      { id: "what_to_decline", label: "断る内容", type: "textarea", placeholder: "例: 来月のイベントへの参加", required: true },
      { id: "reason", label: "理由", type: "textarea", placeholder: "例: 同日に別件の予定が入っている", required: false },
      { id: "alternative", label: "代替案", type: "text", placeholder: "例: 次回のイベントには参加したい", required: false },
    ],
    systemPrompt: "あなたはビジネスメールの専門家です。断りメールを作成してください。相手の気持ちに配慮し、関係性を損なわない丁寧な内容にしてください。",
  },
  {
    id: "greeting",
    category: "email",
    name: "挨拶メール",
    description: "異動・退職・年始などの挨拶メールを作成します",
    seoTitle: "退職 挨拶メール テンプレート | AI自動生成 - 文書AI",
    seoDescription: "異動・退職・年始などの挨拶メールをAIが自動生成。適切な挨拶文を作成します。",
    fields: [
      { id: "occasion", label: "挨拶の種類", type: "select", placeholder: "", required: true, options: [
        { value: "transfer", label: "異動の挨拶" },
        { value: "retirement", label: "退職の挨拶" },
        { value: "new_year", label: "年始の挨拶" },
        { value: "year_end", label: "年末の挨拶" },
        { value: "joining", label: "着任の挨拶" },
      ]},
      { id: "details", label: "詳細", type: "textarea", placeholder: "例: 4月1日付で大阪支社に異動", required: false },
    ],
    systemPrompt: "あなたはビジネスメールの専門家です。挨拶メールを作成してください。心のこもった、かつ適切なフォーマルさの内容にしてください。",
  },
  {
    id: "introduction",
    category: "email",
    name: "自己紹介メール",
    description: "新任・着任時の自己紹介メールを作成します",
    seoTitle: "自己紹介メール テンプレート | AI自動生成 - 文書AI",
    seoDescription: "新任・着任時の自己紹介メールをAIが自動生成。好印象を与える自己紹介文を作成します。",
    fields: [
      { id: "position", label: "役職・担当", type: "text", placeholder: "例: 営業部 主任", required: true },
      { id: "background", label: "経歴・前任", type: "textarea", placeholder: "例: 前職では5年間マーケティングを担当", required: false },
      { id: "message", label: "意気込み", type: "textarea", placeholder: "例: チームの一員として全力で貢献したい", required: false },
    ],
    systemPrompt: "あなたはビジネスメールの専門家です。自己紹介メールを作成してください。親しみやすさと信頼感のバランスの取れた内容にしてください。",
  },
  {
    id: "schedule",
    category: "email",
    name: "日程調整メール",
    description: "会議やアポイントの日程調整メールを作成します",
    seoTitle: "日程調整メール テンプレート | AI自動生成 - 文書AI",
    seoDescription: "スムーズな日程調整メールをAIが自動生成。候補日の提示から確定まで、適切な文面を作成します。",
    fields: [
      { id: "purpose", label: "目的", type: "text", placeholder: "例: 四半期レビューの打ち合わせ", required: true },
      { id: "candidates", label: "候補日時", type: "textarea", placeholder: "例: 3月10日(月) 14:00-15:00\n3月12日(水) 10:00-11:00", required: true },
      { id: "location", label: "場所・方法", type: "text", placeholder: "例: Zoomでのオンライン会議", required: false },
    ],
    systemPrompt: "あなたはビジネスメールの専門家です。日程調整メールを作成してください。候補日を明確に提示し、相手が返信しやすい内容にしてください。",
  },
  {
    id: "inquiry",
    category: "email",
    name: "問い合わせメール",
    description: "製品やサービスへの問い合わせメールを作成します",
    seoTitle: "問い合わせメール テンプレート | AI自動生成 - 文書AI",
    seoDescription: "ビジネスの問い合わせメールをAIが自動生成。明確で丁寧な問い合わせ文を作成します。",
    fields: [
      { id: "subject", label: "問い合わせ内容", type: "textarea", placeholder: "例: 御社のクラウドサービスの料金プランについて", required: true },
      { id: "specific_questions", label: "具体的な質問", type: "textarea", placeholder: "例: 年間契約の割引はありますか？", required: false },
      { id: "company_info", label: "自社情報", type: "text", placeholder: "例: 従業員50名のIT企業", required: false },
    ],
    systemPrompt: "あなたはビジネスメールの専門家です。問い合わせメールを作成してください。要件を明確にし、回答しやすい内容にしてください。",
  },
];

export const DOCUMENT_SCENARIOS: Scenario[] = [
  {
    id: "minutes",
    category: "document",
    name: "議事録",
    description: "会議の議事録を整形・作成します",
    seoTitle: "議事録 テンプレート | AI自動生成 - 文書AI",
    seoDescription: "会議の議事録をAIが自動整形。メモや発言ログから、読みやすい議事録を作成します。",
    fields: [
      { id: "meeting_name", label: "会議名", type: "text", placeholder: "例: 第3回プロジェクト進捗会議", required: true },
      { id: "date", label: "日時", type: "text", placeholder: "例: 2026年3月4日 14:00-15:00", required: true },
      { id: "attendees", label: "出席者", type: "text", placeholder: "例: 田中部長、佐藤主任、鈴木", required: true },
      { id: "notes", label: "メモ・発言内容", type: "textarea", placeholder: "会議中のメモや発言ログをそのまま貼り付けてください", required: true },
    ],
    systemPrompt: "あなたはビジネス文書の専門家です。会議メモから正式な議事録を作成してください。決定事項、アクションアイテム、次回予定を明確にまとめてください。",
  },
  {
    id: "proposal",
    category: "document",
    name: "企画書",
    description: "プロジェクトや施策の企画書を作成します",
    seoTitle: "企画書 テンプレート | AI自動生成 - 文書AI",
    seoDescription: "説得力のある企画書をAIが自動生成。目的・背景・施策をロジカルにまとめます。",
    fields: [
      { id: "project_name", label: "企画名", type: "text", placeholder: "例: 社内DX推進プロジェクト", required: true },
      { id: "background", label: "背景・課題", type: "textarea", placeholder: "例: 紙ベースの業務が多く効率が悪い", required: true },
      { id: "goal", label: "目的・ゴール", type: "textarea", placeholder: "例: 業務時間を20%削減する", required: true },
      { id: "approach", label: "施策・アプローチ", type: "textarea", placeholder: "例: クラウドツールの導入、ペーパーレス化", required: false },
    ],
    systemPrompt: "あなたはビジネス文書の専門家です。説得力のある企画書を作成してください。背景→課題→解決策→期待効果の流れでロジカルにまとめてください。",
  },
  {
    id: "business-report",
    category: "document",
    name: "報告書",
    description: "業務報告書や出張報告書を作成します",
    seoTitle: "報告書 テンプレート | AI自動生成 - 文書AI",
    seoDescription: "業務報告書をAIが自動生成。要点を押さえた分かりやすい報告書を作成します。",
    fields: [
      { id: "report_title", label: "報告書タイトル", type: "text", placeholder: "例: 2月度営業報告書", required: true },
      { id: "period", label: "対象期間", type: "text", placeholder: "例: 2026年2月1日〜2月28日", required: true },
      { id: "content", label: "報告内容", type: "textarea", placeholder: "活動内容、実績、課題などをメモ書きで入力", required: true },
    ],
    systemPrompt: "あなたはビジネス文書の専門家です。報告書を作成してください。結論を先に述べ、数値やファクトに基づいた客観的な内容にしてください。",
  },
  {
    id: "incident-report",
    category: "document",
    name: "始末書",
    description: "不始末やミスに対する始末書を作成します",
    seoTitle: "始末書 テンプレート | AI自動生成 - 文書AI",
    seoDescription: "始末書をAIが自動生成。適切な反省と再発防止策を含む始末書を作成します。",
    fields: [
      { id: "incident", label: "不始末の内容", type: "textarea", placeholder: "例: 顧客データの誤送信", required: true },
      { id: "cause", label: "原因", type: "textarea", placeholder: "例: 宛先の確認不足", required: true },
      { id: "prevention", label: "再発防止策", type: "textarea", placeholder: "例: 送信前のダブルチェック体制の導入", required: true },
    ],
    systemPrompt: "あなたはビジネス文書の専門家です。始末書を作成してください。事実を正確に記載し、深い反省と具体的な再発防止策を含む内容にしてください。",
  },
  {
    id: "cover-letter",
    category: "document",
    name: "送付状",
    description: "書類送付時の添え状を作成します",
    seoTitle: "送付状 テンプレート | AI自動生成 - 文書AI",
    seoDescription: "ビジネス送付状をAIが自動生成。適切なフォーマットの送付状を作成します。",
    fields: [
      { id: "recipient", label: "送付先", type: "text", placeholder: "例: 株式会社ABC 営業部 田中様", required: true },
      { id: "documents", label: "送付書類", type: "textarea", placeholder: "例: 見積書 1部\n契約書 2部", required: true },
      { id: "note", label: "補足事項", type: "text", placeholder: "例: ご不明な点がございましたらお問い合わせください", required: false },
    ],
    systemPrompt: "あなたはビジネス文書の専門家です。送付状を作成してください。ビジネスマナーに沿った適切なフォーマットで作成してください。",
  },
];

export const ALL_SCENARIOS = [...EMAIL_SCENARIOS, ...DOCUMENT_SCENARIOS];

export function getScenario(category: string, id: string): Scenario | undefined {
  return ALL_SCENARIOS.find((s) => s.category === category && s.id === id);
}

export function getScenariosByCategory(category: "email" | "document"): Scenario[] {
  return ALL_SCENARIOS.filter((s) => s.category === category);
}
