import "server-only";
import { createHash } from "node:crypto";
import { z } from "zod";
import { site } from "@/content/site";
import type { Lead } from "@/lib/lead-schema";
import { quoteSummaryRows } from "@/lib/quote-summary";
import { estimateProject, formatPrice } from "@/lib/estimate";

export class DeliveryError extends Error {
  constructor(public readonly code: string) {
    super(code);
    this.name = "DeliveryError";
  }
}
export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!,
  );
}
export function leadReference(requestId: string) {
  return "WB-" + createHash("sha256").update(requestId).digest("hex").slice(0, 10).toUpperCase();
}

export function createLeadEmail(lead: Lead) {
  const reference = leadReference(lead.requestId);
  const title =
    lead.kind === "contact" ? "Nouveau message" : `Demande de devis — brief ${lead.mode}`;
  const rows: [string, string][] = [
    ["Référence", reference],
    ["Nom", lead.name],
    ["E-mail", lead.email],
    ["Entreprise / activité", lead.company || "Non renseigné"],
    ["Téléphone", lead.phone || "Non renseigné"],
  ];
  if (lead.kind === "contact") rows.push(["Sujet", lead.subject], ["Message", lead.message]);
  else {
    rows.push(...quoteSummaryRows(lead));
    const estimate = estimateProject(lead);
    rows.push([
      "Repère affiché au client",
      estimate
        ? `${formatPrice(estimate.min)} à ${formatPrice(estimate.max)} HT — indicatif, hors contenus, domaine, hébergement et licences.`
        : "Chiffrage personnalisé après échange",
    ]);
  }
  rows.push([
    "Information de confidentialité",
    "Lue et demande de recontact confirmée. Version 2026-09-07.",
  ]);
  return {
    reference,
    subject: `[Webase · ${reference}] ${title}`,
    text: `${title}\n\n${rows.map(([label, value]) => `${label}\n${value}`).join("\n\n")}\n\nRépondez directement à ce message pour contacter ${lead.name}.`,
    html: `<!doctype html><html lang="fr"><head><meta charset="utf-8"></head><body style="margin:0;background:#f8f8f2;color:#20261f;font-family:Arial,sans-serif"><table role="presentation" style="width:100%;max-width:680px;margin:0 auto;border-collapse:collapse"><tr><td style="padding:36px 28px;background:#345bff;color:#fff"><div style="font-size:25px;font-weight:bold">webase.</div><h1 style="font-size:22px;line-height:1.4;margin:20px 0 0">${escapeHtml(title)}</h1></td></tr><tr><td style="padding:20px 28px;background:#fff"><table style="border-collapse:collapse;width:100%">${rows.map(([label, value]) => `<tr><th scope="row" style="text-align:left;vertical-align:top;width:34%;border-bottom:1px solid #dcded4;padding:16px 14px 16px 0;font-size:12px;color:#62685e">${escapeHtml(label)}</th><td style="padding:16px 0;border-bottom:1px solid #dcded4;font-size:14px;line-height:1.7;white-space:pre-wrap;overflow-wrap:anywhere">${escapeHtml(value)}</td></tr>`).join("")}</table><p style="font-size:12px;line-height:1.7;color:#62685e">Répondez directement à ce message pour contacter ${escapeHtml(lead.name)}.</p></td></tr></table></body></html>`,
  };
}
export async function sendLeadEmail(
  lead: Lead,
): Promise<{ reference: string; providerId: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO || site.email;
  if (!apiKey || !from) throw new DeliveryError("MAIL_NOT_CONFIGURED");
  const senderAddress = from.match(/<([^<>]+)>$/)?.[1] ?? from;
  if (
    /[\r\n]/.test(from) ||
    !z.email().safeParse(senderAddress).success ||
    !z.email().safeParse(to).success
  )
    throw new DeliveryError("MAIL_CONFIG_INVALID");
  const message = createLeadEmail(lead);
  // Include the normalized payload hash: a changed request is a new mail; retries
  // with the same request ID and payload remain idempotent for 24h at Resend.
  const contentHash = createHash("sha256").update(JSON.stringify(lead)).digest("hex");
  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `webase/${lead.requestId}/${contentHash}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject: message.subject,
        text: message.text,
        html: message.html,
      }),
    });
  } catch {
    throw new DeliveryError("MAIL_CONNECTION_FAILED");
  }
  if (!response.ok) throw new DeliveryError(`MAIL_PROVIDER_${response.status}`);
  const body: unknown = await response.json().catch(() => null);
  const parsed = z.object({ id: z.string().min(1) }).safeParse(body);
  if (!parsed.success) throw new DeliveryError("MAIL_PROVIDER_INVALID_RESPONSE");
  return { reference: message.reference, providerId: parsed.data.id };
}
