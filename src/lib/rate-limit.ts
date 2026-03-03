import { kv } from "@vercel/kv";

const DAILY_LIMIT = 5;

export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  remaining: number;
  limit: number;
}> {
  try {
    const today = new Date().toISOString().split("T")[0];
    const key = `bunsho:rate:${ip}:${today}`;
    const count = (await kv.get<number>(key)) || 0;

    if (count >= DAILY_LIMIT) {
      return { allowed: false, remaining: 0, limit: DAILY_LIMIT };
    }

    await kv.set(key, count + 1, { ex: 86400 });
    return { allowed: true, remaining: DAILY_LIMIT - count - 1, limit: DAILY_LIMIT };
  } catch {
    // KV未設定時はレート制限なしで動作
    return { allowed: true, remaining: DAILY_LIMIT, limit: DAILY_LIMIT };
  }
}
