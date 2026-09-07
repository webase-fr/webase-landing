import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { contact, fullQuote, quote } from "./fixtures";
const requestHeaders = vi.hoisted(() => new Headers());
vi.mock("next/headers", () => ({ headers: async () => requestHeaders }));
import { submitLead } from "../src/actions/send-email";
beforeEach(() => {
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("RESEND_API_KEY", "re_unit_test");
  vi.stubEnv("MAIL_FROM", "Webase <projets@example.test>");
  vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example.test");
  vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "unit_test");
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  requestHeaders.forEach((_, key) => requestHeaders.delete(key));
});
function provider() {
  return vi.fn(async (url: string) =>
    url.startsWith("https://redis.")
      ? Response.json({ result: 1 })
      : Response.json({ id: "provider-id" }),
  );
}
describe("Parcours serveur complet, fournisseur simulé", () => {
  it.each([contact, quote, fullQuote])(
    "transmet un vrai message après validation : $kind $mode",
    async (data) => {
      const fetch = provider();
      vi.stubGlobal("fetch", fetch);
      expect(await submitLead(data)).toMatchObject({
        status: "success",
        reference: expect.stringMatching(/^WB-/),
      });
      expect(fetch).toHaveBeenCalledTimes(2);
    },
  );
  it("ne contacte aucun prestataire pour une saisie invalide", async () => {
    const fetch = provider();
    vi.stubGlobal("fetch", fetch);
    expect(await submitLead({ ...contact, email: "invalid" })).toMatchObject({
      status: "error",
      errors: { email: expect.any(String) },
    });
    expect(fetch).not.toHaveBeenCalled();
  });
  it("rejette le piège antispam sans simuler un succès", async () => {
    const fetch = provider();
    vi.stubGlobal("fetch", fetch);
    expect(await submitLead({ ...contact, fax: "spam" })).toMatchObject({ status: "error" });
    expect(fetch).not.toHaveBeenCalled();
  });
  it("refuse les objets trop grands", async () => {
    const fetch = provider();
    vi.stubGlobal("fetch", fetch);
    expect(await submitLead({ ...contact, message: "x".repeat(25000) })).toMatchObject({
      status: "error",
    });
    expect(fetch).not.toHaveBeenCalled();
  });
  it("ne transforme pas une panne mail en succès et ne journalise pas les données", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string) =>
        url.startsWith("https://redis.")
          ? Response.json({ result: 1 })
          : new Response("", { status: 500 }),
      ),
    );
    expect(await submitLead(contact)).toMatchObject({ status: "error" });
    expect(console.error).toHaveBeenCalledWith("[webase:lead]", "MAIL_PROVIDER_500");
    expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain(contact.email);
  });
  it("ne permet pas aux paramètres clients de changer le destinataire", async () => {
    const fetch = provider();
    vi.stubGlobal("fetch", fetch);
    const state = await submitLead({
      ...contact,
      to: "attacker@example.test",
      from: "attacker@example.test",
    });
    expect(state.status).toBe("success");
    const options = (fetch.mock.calls[1] as unknown as [string, RequestInit])[1];
    expect(JSON.parse(options.body as string).to).toEqual(["luis.doudeau@gmail.com"]);
  });
});
