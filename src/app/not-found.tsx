import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-32 text-center">
      <h1 className="text-5xl font-bold text-white mb-4">404</h1>
      <p className="text-white/60 mb-8">
        お探しのページが見つかりませんでした。
      </p>
      <Link href="/">
        <Button>トップに戻る</Button>
      </Link>
    </div>
  );
}
