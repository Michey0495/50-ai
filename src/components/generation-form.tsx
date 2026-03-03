"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { GenerationResult } from "@/components/generation-result";
import type { Scenario, Relationship, Tone } from "@/lib/types";
import { RELATIONSHIPS, TONES } from "@/lib/types";

interface GenerationFormProps {
  scenario: Scenario;
}

export function GenerationForm({ scenario }: GenerationFormProps) {
  const [fields, setFields] = useState<Record<string, string>>({});
  const [relationship, setRelationship] = useState<Relationship>("client");
  const [tone, setTone] = useState<Tone>("formal");
  const [result, setResult] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const updateField = (id: string, value: string) => {
    setFields((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const missing = scenario.fields
      .filter((f) => f.required && !fields[f.id]?.trim())
      .map((f) => f.label);

    if (missing.length > 0) {
      toast.error(`入力してください: ${missing.join(", ")}`);
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId: scenario.id,
          relationship,
          tone,
          fields,
        }),
      });

      if (res.status === 429) {
        toast.error("本日の無料生成回数に達しました。明日またお試しください。");
        return;
      }

      if (!res.ok) {
        throw new Error("生成に失敗しました");
      }

      const data = await res.json();
      setResult(data.content);
      if (typeof data.remaining === "number") {
        setRemaining(data.remaining);
      }
      toast.success("生成完了");
    } catch {
      toast.error("エラーが発生しました。しばらくしてから再度お試しください。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm text-white/70">
                  相手との関係性
                </label>
                <Select
                  options={RELATIONSHIPS}
                  value={relationship}
                  onChange={(e) =>
                    setRelationship(e.target.value as Relationship)
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-white/70">トーン</label>
                <Select
                  options={TONES}
                  value={tone}
                  onChange={(e) => setTone(e.target.value as Tone)}
                />
              </div>
            </div>

            {scenario.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <label className="block text-sm text-white/70">
                  {field.label}
                  {field.required && (
                    <span className="text-blue-400 ml-1">*</span>
                  )}
                </label>
                {field.type === "textarea" ? (
                  <Textarea
                    placeholder={field.placeholder}
                    value={fields[field.id] || ""}
                    onChange={(e) => updateField(field.id, e.target.value)}
                  />
                ) : field.type === "select" && field.options ? (
                  <Select
                    options={field.options}
                    placeholder="選択してください"
                    value={fields[field.id] || ""}
                    onChange={(e) => updateField(field.id, e.target.value)}
                  />
                ) : (
                  <Input
                    type="text"
                    placeholder={field.placeholder}
                    value={fields[field.id] || ""}
                    onChange={(e) => updateField(field.id, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        <Button type="submit" disabled={loading} size="lg" className="w-full">
          {loading ? "生成中..." : `${scenario.name}を生成する`}
        </Button>
        {remaining !== null && (
          <p className="text-center text-sm text-white/40">
            本日の残り生成回数: {remaining}回
          </p>
        )}
      </form>

      {result && <GenerationResult content={result} />}
    </div>
  );
}
