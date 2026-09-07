import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createLeadEmail, escapeHtml, sendLeadEmail } from "../src/lib/server/lead-email";
import { contact, fullQuote } from "./fixtures";
beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "re_unit_test");
  vi.stubEnv("MAIL_FROM", "Webase <projets@example.test>");
  vi.stubEnv("MAIL_TO", "owner@example.test");
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});
describe("Message transactionnel", () => {
  it("échappe toutes les données HTML", () => {
    const email = createLeadEmail({
      ...contact,
      name: '<script>alert("x")</script>',
      message: "<img src=x onerror=alert(1)> & texte",
    });
    expect(email.html).not.toContain("<script>");
    expect(email.html).not.toContain("<img");
    expect(email.html).toContain("&lt;img");
    expect(email.text).toContain("<img");
    expect(escapeHtml("&<>'\"")).toBe("&amp;&lt;&gt;&#39;&quot;");
  });
  it("reprend chaque réponse du brief complet, avec des libellés lisibles", () => {
    const email = createLeadEmail(fullQuote);
    for (const value of [
      fullQuote.name,
      fullQuote.email,
      fullQuote.activity,
      fullQuote.audience,
      fullQuote.description,
      fullQuote.references,
      fullQuote.notes,
      "Modifier mes contenus",
      "Budget prévu (HT)",
      "3 490 €",
      "1 à 3 mois",
    ])
      expect(email.text.replaceAll("\u202f", " ")).toContain(value);
  });
  it("envoie au destinataire configuré avec un reply-to client et une clé stable", async () => {
    const fetch = vi
      .fn()
      .mockImplementation(() => Promise.resolve(Response.json({ id: "provider-123" })));
    vi.stubGlobal("fetch", fetch);
    const first = await sendLeadEmail(contact);
    await sendLeadEmail(contact);
    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(JSON.parse(options.body)).toMatchObject({
      to: ["owner@example.test"],
      reply_to: contact.email,
    });
    expect(options.headers["Idempotency-Key"]).toBe(
      fetch.mock.calls[1][1].headers["Idempotency-Key"],
    );
    expect(first).toMatchObject({
      providerId: "provider-123",
      reference: expect.stringMatching(/^WB-[A-F0-9]{10}$/),
    });
  });
  it("ne prétend jamais réussir sans configuration", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    await expect(sendLeadEmail(contact)).rejects.toThrow("MAIL_NOT_CONFIGURED");
    expect(fetch).not.toHaveBeenCalled();
  });
  it.each([400, 401, 403, 429, 500])("signale le refus fournisseur %s", async (status) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("Failure", { status })));
    await expect(sendLeadEmail(contact)).rejects.toThrow(`MAIL_PROVIDER_${status}`);
  });
  it("signale une réponse de succès sans identifiant", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({})));
    await expect(sendLeadEmail(contact)).rejects.toThrow("MAIL_PROVIDER_INVALID_RESPONSE");
  });
  it("signale les coupures réseau", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    await expect(sendLeadEmail(contact)).rejects.toThrow("MAIL_CONNECTION_FAILED");
  });
});
