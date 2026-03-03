"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GenerationResultProps {
  content: string;
}

export function GenerationResult({ content }: GenerationResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success("コピーしました");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("コピーに失敗しました");
    }
  };

  return (
    <Card className="relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-white">生成結果</h3>
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? "コピー済み" : "コピー"}
        </Button>
      </div>
      <div className="whitespace-pre-wrap text-white/90 leading-7 text-base">
        {content}
      </div>
    </Card>
  );
}
