export type Relationship = "boss" | "client" | "subordinate" | "colleague";
export type Tone = "formal" | "semi-formal" | "casual";
export type Category = "email" | "document";

export interface ScenarioField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder: string;
  required: boolean;
  options?: { value: string; label: string }[];
}

export interface Scenario {
  id: string;
  category: Category;
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  fields: ScenarioField[];
  systemPrompt: string;
}

export interface GenerateRequest {
  scenarioId: string;
  relationship: Relationship;
  tone: Tone;
  fields: Record<string, string>;
}

export interface GenerateResponse {
  content: string;
  scenarioId: string;
  timestamp: string;
}

export const RELATIONSHIPS: { value: Relationship; label: string }[] = [
  { value: "boss", label: "上司・目上の方" },
  { value: "client", label: "取引先・お客様" },
  { value: "subordinate", label: "部下・後輩" },
  { value: "colleague", label: "同僚" },
];

export const TONES: { value: Tone; label: string }[] = [
  { value: "formal", label: "フォーマル" },
  { value: "semi-formal", label: "ややフォーマル" },
  { value: "casual", label: "カジュアル" },
];
