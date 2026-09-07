import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { z } from "zod";

if (existsSync(".env.local")) loadEnvFile(".env.local");
const missing = [];
for (const key of [
  "SITE_URL",
  "RESEND_API_KEY",
  "MAIL_FROM",
  "MAIL_TO",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "HOSTING_NAME",
  "HOSTING_ADDRESS",
  "HOSTING_CONTACT",
]) {
  if (!process.env[key]?.trim()) missing.push(key);
}
for (const key of ["SITE_URL", "UPSTASH_REDIS_REST_URL"]) {
  if (process.env[key] && !z.url({ protocol: /^https$/ }).safeParse(process.env[key]).success)
    missing.push(key + " (URL HTTPS attendue)");
}
if (process.env.MAIL_TO && !z.email().safeParse(process.env.MAIL_TO).success)
  missing.push("MAIL_TO (e-mail invalide)");
const from = process.env.MAIL_FROM;
const sender = from?.match(/<([^<>]+)>$/)?.[1] ?? from;
if (from && (/[\r\n]/.test(from) || !z.email().safeParse(sender).success))
  missing.push("MAIL_FROM (expéditeur invalide)");
if (sender?.endsWith("@gmail.com"))
  missing.push("MAIL_FROM (utilisez votre domaine vérifié, pas gmail.com)");
if (
  process.env.TRUSTED_IP_HEADER &&
  !["x-vercel-forwarded-for", "cf-connecting-ip", "x-real-ip"].includes(
    process.env.TRUSTED_IP_HEADER,
  )
)
  missing.push("TRUSTED_IP_HEADER (en-tête non pris en charge)");
if (missing.length) {
  console.error("Configuration à compléter avant mise en ligne :");
  for (const key of missing) console.error(" - " + key);
  console.error("Voir docs/MAILING.md et .env.example. Aucune valeur secrète n’est affichée.");
  process.exitCode = 1;
} else {
  console.log(
    "Configuration présente et format valide. Vérifiez le domaine Resend et effectuez un envoi réel depuis chaque formulaire avant publication.",
  );
}
