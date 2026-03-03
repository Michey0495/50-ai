"use client";

import { useState } from "react";

export function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"bug" | "feature" | "other">("bug");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const submit = async () => {
    if (!message.trim()) return;
    setError(false);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, message, repo: "50-ai" }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
      setTimeout(() => {
        setOpen(false);
        setSent(false);
        setMessage("");
      }, 2000);
    } catch {
      setError(true);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 bg-white/10 text-white/60 px-4 py-2 rounded-full border border-white/10 hover:bg-white/15 hover:text-white transition-all duration-200 text-sm z-50"
      >
        フィードバック
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-black border border-white/10 rounded-xl shadow-2xl p-4 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-white">フィードバック</h3>
        <button
          onClick={() => setOpen(false)}
          aria-label="閉じる"
          className="text-white/40 hover:text-white transition-colors duration-200 text-lg leading-none"
        >
          &times;
        </button>
      </div>
      {sent ? (
        <p className="text-blue-400 text-center py-4">
          送信しました
        </p>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-red-400 mb-3">送信に失敗しました</p>
          <button
            onClick={() => setError(false)}
            className="text-sm text-white/50 hover:text-white transition-colors duration-200"
          >
            もう一度試す
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2 mb-3">
            {(["bug", "feature", "other"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1 rounded-full text-xs transition-all duration-200 ${
                  type === t
                    ? "bg-blue-400 text-black"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
              >
                {t === "bug" ? "不具合" : t === "feature" ? "要望" : "その他"}
              </button>
            ))}
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="ご意見をお聞かせください..."
            aria-label="フィードバック内容"
            maxLength={1000}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm text-white placeholder:text-white/30 h-24 resize-none mb-3 focus:outline-none focus:ring-1 focus:ring-blue-400/30"
          />
          <button
            onClick={submit}
            disabled={!message.trim()}
            className="w-full bg-blue-400 text-black py-2 rounded-lg text-sm font-medium hover:bg-blue-300 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            送信
          </button>
        </>
      )}
    </div>
  );
}
