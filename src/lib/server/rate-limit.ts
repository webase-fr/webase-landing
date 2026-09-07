import "server-only";
import { createHash } from "node:crypto";

type Rule = { key: string; max: number };
type Entry = { count: number; expiresAt: number };
const WINDOW_SECONDS = 3600;
const localBuckets = new Map<string, Entry>();
const digest = (value: string) => createHash("sha256").update(value).digest("hex");
// Atomic multi-bucket check. Blocked requests do not consume the global allowance.
const script = `
for i,key in ipairs(KEYS) do
  if tonumber(redis.call('GET',key) or '0') >= tonumber(ARGV[i+1]) then return 0 end
end
for i,key in ipairs(KEYS) do
  local count = redis.call('INCR',key)
  if count == 1 then redis.call('EXPIRE',key,ARGV[1]) end
end
return 1
`;
export class RateLimitUnavailable extends Error {}
export async function allowSubmission(email: string, trustedIp?: string): Promise<boolean> {
  const rules: Rule[] = [
    { key: "webase:leads:global", max: 100 },
    { key: `webase:leads:email:${digest(email.trim().toLowerCase())}`, max: 5 },
    ...(trustedIp ? [{ key: `webase:leads:ip:${digest(trustedIp)}`, max: 20 }] : []),
  ];
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    if (!url.startsWith("https://")) throw new RateLimitUnavailable("RATE_LIMIT_CONFIG_INVALID");
    try {
      const response = await fetch(url, {
        method: "POST",
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify([
          "EVAL",
          script,
          rules.length,
          ...rules.map((rule) => rule.key),
          WINDOW_SECONDS,
          ...rules.map((rule) => rule.max),
        ]),
      });
      if (!response.ok) throw new Error("Redis request failed");
      const result: unknown = await response.json();
      if (
        typeof result !== "object" ||
        result === null ||
        !("result" in result) ||
        ![0, 1].includes(result.result as number)
      )
        throw new Error("Invalid Redis response");
      return result.result === 1;
    } catch {
      throw new RateLimitUnavailable("RATE_LIMIT_UNAVAILABLE");
    }
  }
  // Development only. Never pretend process memory protects a serverless deployment.
  if (process.env.NODE_ENV === "production")
    throw new RateLimitUnavailable("RATE_LIMIT_NOT_CONFIGURED");
  const now = Date.now();
  for (const [key, value] of localBuckets) if (value.expiresAt <= now) localBuckets.delete(key);
  if (rules.some((rule) => (localBuckets.get(rule.key)?.count ?? 0) >= rule.max)) return false;
  for (const rule of rules) {
    const previous = localBuckets.get(rule.key);
    localBuckets.set(rule.key, {
      count: (previous?.count ?? 0) + 1,
      expiresAt: previous?.expiresAt ?? now + WINDOW_SECONDS * 1000,
    });
  }
  return true;
}
