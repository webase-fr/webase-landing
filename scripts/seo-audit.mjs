import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
/**
 * Crawls every sitemap URL of a running build and checks the on-page SEO contract:
 * unique title/description, absolute canonical, indexability, one h1, valid JSON-LD.
 * Run with an indexable build (SITE_URL set): `SEO_URL=http://127.0.0.1:3001 pnpm seo`.
 */
const base = process.env.SEO_URL || "http://127.0.0.1:3000";
const origin = process.env.SITE_URL || "https://webase.fr";
const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));
assert.ok(urls.length > 0, "Le sitemap est vide : SITE_URL est-il défini pour ce build ?");
const robots = await (await fetch(new URL("/robots.txt", base))).text();
assert.match(robots, /Allow: \//, "robots.txt doit autoriser l’exploration");
assert.match(robots, new RegExp(`Sitemap: ${origin}/sitemap.xml`));
const seen = { title: new Map(), description: new Map() };
const warnings = [];
for (const url of urls) {
  const path = url.pathname;
  const response = await fetch(new URL(path, base), { redirect: "manual" });
  assert.equal(response.status, 200, `${path} doit répondre 200 sans redirection`);
  const document = new JSDOM(await response.text()).window.document;
  const title = document.title;
  const description = document.querySelector('meta[name="description"]')?.content ?? "";
  const canonical = document.querySelector('link[rel="canonical"]')?.href;
  const robotsMeta = document.querySelector('meta[name="robots"]')?.content ?? "";
  assert.equal(canonical?.replace(/\/$/, ""), url.href.replace(/\/$/, ""), `${path}: canonical`);
  assert.ok(!/noindex/.test(robotsMeta), `${path}: une URL du sitemap ne doit pas être noindex`);
  assert.equal(document.querySelectorAll("h1").length, 1, `${path}: un seul h1`);
  assert.ok(description.length >= 70, `${path}: description trop courte`);
  assert.ok(document.querySelector('meta[property="og:image"]'), `${path}: og:image`);
  for (const [key, value] of [
    ["title", title],
    ["description", description],
  ]) {
    assert.ok(!seen[key].has(value), `${path}: ${key} dupliqué avec ${seen[key].get(value)}`);
    seen[key].set(value, path);
  }
  if (title.length > 65) warnings.push(`${path}: title de ${title.length} caractères`);
  if (description.length > 165)
    warnings.push(`${path}: description de ${description.length} caractères`);
  const types = [];
  for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
    const data = JSON.parse(script.textContent);
    for (const node of data["@graph"] ?? [data]) types.push(node["@type"]);
  }
  const h1 = document.querySelector("h1").textContent.replace(/\s+/g, " ").trim();
  console.log(`OK ${path}\n   ${title}\n   h1: ${h1}\n   JSON-LD: ${types.join(", ") || "—"}`);
}
console.log(`\n${urls.length} URL du sitemap vérifiées.`);
if (warnings.length)
  console.log(`Avertissements (longueurs indicatives) :\n- ${warnings.join("\n- ")}`);
