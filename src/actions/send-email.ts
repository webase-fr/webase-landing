"use server";
import { headers } from "next/headers";
import { isIP } from "node:net";
import { contactSchema, quoteSchema, validationErrors, type ActionState } from "@/lib/lead-schema";
import { DeliveryError, sendLeadEmail } from "@/lib/server/lead-email";
import { allowSubmission, RateLimitUnavailable } from "@/lib/server/rate-limit";

export async function submitLead(input: unknown): Promise<ActionState> {
  if (!input || typeof input !== "object")
    return { status: "error", message: "La demande est invalide." };
  // Hard bound before validation. Next's Server Action body limit is the outer bound.
  try {
    if (JSON.stringify(input).length > 24000)
      return {
        status: "error",
        message: "Votre demande est trop longue. Raccourcissez les textes avant de réessayer.",
      };
  } catch {
    return { status: "error", message: "La demande est invalide." };
  }
  const schema = "kind" in input && input.kind === "contact" ? contactSchema : quoteSchema;
  const parsed = schema.safeParse(input);
  if (!parsed.success)
    return {
      status: "error",
      message: "Vérifiez les champs indiqués, puis renvoyez votre demande.",
      errors: validationErrors(parsed.error),
    };
  const lead = parsed.data;
  if (lead.fax)
    return {
      status: "error",
      message: "La demande n’a pas pu être validée. Rechargez la page et réessayez.",
    };
  try {
    const requestHeaders = await headers();
    // Only opt in to an IP header that your hosting proxy overwrites.
    const configuredHeader = process.env.TRUSTED_IP_HEADER;
    const allowedHeaders = ["x-vercel-forwarded-for", "cf-connecting-ip", "x-real-ip"];
    const candidate =
      configuredHeader && allowedHeaders.includes(configuredHeader)
        ? requestHeaders.get(configuredHeader)?.split(",")[0].trim()
        : undefined;
    const trustedIp = candidate && isIP(candidate) ? candidate : undefined;
    if (!(await allowSubmission(lead.email, trustedIp)))
      return {
        status: "error",
        message:
          "Plusieurs demandes ont déjà été envoyées. Patientez une heure avant de réessayer.",
      };
    const delivered = await sendLeadEmail(lead);
    // Acceptance by the provider is required. Inbox delivery is checked in its dashboard.
    return {
      status: "success",
      message: "Votre demande a été transmise au studio.",
      reference: delivered.reference,
    };
  } catch (error) {
    const code =
      error instanceof DeliveryError
        ? error.code
        : error instanceof RateLimitUnavailable
          ? error.message
          : "LEAD_UNEXPECTED_ERROR";
    // No submitted content, email addresses or credentials in application logs.
    console.error("[webase:lead]", code);
    return {
      status: "error",
      message:
        "L’envoi n’a pas pu être confirmé. Vos réponses sont conservées sur cette page : réessayez dans quelques instants. Vous pouvez aussi écrire à luis.doudeau@gmail.com.",
    };
  }
}
