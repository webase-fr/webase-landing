import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "../src/app/robots";
import sitemap from "../src/app/sitemap";
import { getService, services } from "../src/content/services";
import { offerStartingPrices } from "../src/content/site";
import { getSiteUrl, isIndexable, pageMetadata } from "../src/lib/metadata";
import { businessNode, serviceNode } from "../src/lib/structured-data";

afterEach(() => vi.unstubAllEnvs());
function env(values: { SITE_URL?: string; VERCEL_ENV?: string }) {
  vi.stubEnv("SITE_URL", values.SITE_URL ?? "");
  vi.stubEnv("VERCEL_ENV", values.VERCEL_ENV ?? "");
}

describe("indexation selon l’environnement", () => {
  it("indexe la production Vercel même sans SITE_URL", () => {
    env({ VERCEL_ENV: "production" });
    expect(isIndexable()).toBe(true);
    expect(getSiteUrl().href).toBe("https://webase.fr/");
    expect(robots()).toMatchObject({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://webase.fr/sitemap.xml",
    });
  });
  it("garde les prévisualisations Vercel hors index, même avec SITE_URL", () => {
    env({ VERCEL_ENV: "preview", SITE_URL: "https://webase.fr" });
    expect(isIndexable()).toBe(false);
    expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
    expect(sitemap()).toEqual([]);
  });
  it("hors Vercel, SITE_URL active l’indexation", () => {
    env({});
    expect(isIndexable()).toBe(false);
    env({ SITE_URL: "https://webase.fr" });
    expect(isIndexable()).toBe(true);
  });
  it("les canonicals pointent toujours vers le domaine public", () => {
    env({ VERCEL_ENV: "preview" });
    expect(getSiteUrl().origin).toBe("https://webase.fr");
  });
});

describe("sitemap", () => {
  it("liste chaque page de service et les articles, sans doublon", () => {
    env({ VERCEL_ENV: "production" });
    const urls = sitemap().map((entry) => entry.url);
    expect(new Set(urls).size).toBe(urls.length);
    for (const service of services)
      expect(urls).toContain(`https://webase.fr/services/${service.slug}`);
    expect(urls).toContain("https://webase.fr/blog/prix-site-internet");
    expect(urls).not.toContain("https://webase.fr/blog/hello-world");
  });
});

describe("référentiel des services", () => {
  it("chaque page cible une intention distincte", () => {
    for (const key of ["slug", "metaTitle", "metaDescription", "name"] as const) {
      const values = services.map((service) => service[key]);
      expect(new Set(values).size, key).toBe(values.length);
    }
  });
  it("les services liés existent et ne pointent pas vers eux-mêmes", () => {
    for (const service of services)
      for (const slug of service.related) {
        expect(getService(slug), `${service.slug} → ${slug}`).toBeDefined();
        expect(slug).not.toBe(service.slug);
      }
  });
  it("les prix publiés viennent des offres", () => {
    expect(getService("creation-site-vitrine")?.pricing.from).toBe(offerStartingPrices.essentiel);
    expect(serviceNode(getService("creation-site-vitrine")!)).toMatchObject({
      offers: { priceSpecification: { minPrice: offerStartingPrices.essentiel } },
    });
  });
});

describe("données structurées", () => {
  it("n’invente ni avis, ni téléphone, ni adresse de local", () => {
    const business = JSON.stringify(businessNode());
    expect(business).not.toMatch(/aggregateRating|review|telephone|streetAddress/);
  });
  it("chaque page porte une image de partage", () => {
    expect(pageMetadata("Test", "/test").openGraph).toHaveProperty("images");
    expect(pageMetadata("Test", "/test", undefined, false).openGraph).not.toHaveProperty("images");
  });
});
