"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-32 text-center">
      <h1 className="text-3xl font-bold text-white mb-4">
        エラーが発生しました
      </h1>
      <p className="text-white/60 mb-8">
        予期しないエラーが発生しました。もう一度お試しください。
      </p>
      <Button onClick={reset}>再試行</Button>
    </div>
  );
}
