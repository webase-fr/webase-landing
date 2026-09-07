import { afterEach, describe, expect, it, vi } from "vitest";
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});
async function limiter() {
  vi.resetModules();
  return (await import("../src/lib/server/rate-limit")).allowSubmission;
}
describe("Protection des envois", () => {
  it("limite un expéditeur sans bloquer tous les clients", async () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    const allow = await limiter();
    for (let i = 0; i < 5; i++) expect(await allow("one@example.test")).toBe(true);
    expect(await allow("one@example.test")).toBe(false);
    expect(await allow("two@example.test")).toBe(true);
  });
  it("expire les compteurs de développement après une heure", async () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.useFakeTimers();
    const allow = await limiter();
    for (let i = 0; i < 5; i++) await allow("one@example.test");
    expect(await allow("one@example.test")).toBe(false);
    vi.advanceTimersByTime(3600001);
    expect(await allow("one@example.test")).toBe(true);
  });
  it("exige une protection partagée en production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    await expect((await limiter())("one@example.test")).rejects.toThrow(
      "RATE_LIMIT_NOT_CONFIGURED",
    );
  });
  it("utilise une opération Redis atomique sans e-mail ni IP en clair", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.test");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test");
    const fetch = vi.fn().mockResolvedValue(Response.json({ result: 1 }));
    vi.stubGlobal("fetch", fetch);
    expect(await (await limiter())("one@example.test", "203.0.113.1")).toBe(true);
    const command = JSON.parse(fetch.mock.calls[0][1].body);
    expect(command[0]).toBe("EVAL");
    expect(command[2]).toBe(3);
    expect(fetch.mock.calls[0][1].body).not.toContain("one@example.test");
    expect(fetch.mock.calls[0][1].body).not.toContain("203.0.113.1");
  });
  it("respecte un blocage Redis", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.test");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ result: 0 })));
    expect(await (await limiter())("one@example.test")).toBe(false);
  });
  it("échoue explicitement si Redis tombe, sans repli en mémoire", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.test");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    await expect((await limiter())("one@example.test")).rejects.toThrow("RATE_LIMIT_UNAVAILABLE");
  });
});
