import assert from "node:assert/strict";
import { JSDOM } from "jsdom";
const base = process.env.SMOKE_URL || "http://127.0.0.1:3000";
const routes = [
  "/",
  "/services",
  "/offres",
  "/realisations",
  "/studio",
  "/contact",
  "/estimation",
  "/estimation?format=express",
  "/estimation?format=complet",
  "/estimation?offre=evolutif",
  "/blog",
  "/blog/hello-world",
  "/blog/preparer-son-projet",
  "/mentions-legales",
  "/confidentialite",
];
const links = new Set();
const pages = new Map();
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, `${route} doit répondre 200`);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  const document = new JSDOM(await response.text()).window.document;
  assert.equal(document.documentElement.lang, "fr");
  assert.equal(document.querySelectorAll("main").length, 1, `${route}: un seul main`);
  assert.equal(document.querySelectorAll("h1").length, 1, `${route}: un seul titre h1`);
  assert.equal(document.querySelectorAll("footer").length, 1, `${route}: un seul footer`);
  assert.ok(document.querySelector('meta[name="description"]')?.getAttribute("content"));
  assert.ok(document.querySelector('link[rel="canonical"]')?.getAttribute("href"));
  assert.equal(
    document.querySelectorAll("a button, button a").length,
    0,
    "Pas d’interactions imbriquées",
  );
  for (const link of document.querySelectorAll("a[href]")) {
    const href = link.getAttribute("href");
    if (href?.startsWith("/") || href?.startsWith("#"))
      links.add(new URL(href, new URL(route, base)).href);
  }
  for (const control of document.querySelectorAll(
    'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, select',
  )) {
    assert.ok(
      control.id && document.querySelector(`label[for="${control.id}"]`),
      "Chaque champ possède un label lié",
    );
  }
  pages.set(new URL(route, base).pathname, document);
  console.log(`OK ${route}`);
}
for (const href of links) {
  const url = new URL(href);
  let document = pages.get(url.pathname);
  if (!document) {
    const response = await fetch(url);
    assert.equal(response.status, 200, `Lien interne cassé : ${url.pathname}`);
    document = new JSDOM(await response.text()).window.document;
    pages.set(url.pathname, document);
  }
  if (url.hash)
    assert.ok(
      document.getElementById(decodeURIComponent(url.hash.slice(1))),
      `Ancre absente : ${url.pathname}${url.hash}`,
    );
}
for (const route of ["/cette-page-nexiste-pas", "/blog/article-absent"])
  assert.equal((await fetch(new URL(route, base))).status, 404);
for (const route of ["/robots.txt", "/sitemap.xml", "/icon.svg", "/opengraph-image"])
  assert.equal((await fetch(new URL(route, base))).status, 200, route);
console.log(
  `${routes.length} routes et ${links.size} liens internes vérifiés. Ce contrôle HTTP ne remplace pas une revue visuelle navigateur.`,
);
