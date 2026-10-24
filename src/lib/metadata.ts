import type { Metadata } from "next";
import { site } from "@/content/site";

/** `SITE_URL` overrides the canonical origin (e.g. staging); otherwise the production domain. */
export function getSiteUrl() {
  return new URL(process.env.SITE_URL || site.url);
}
/**
 * Only the production deployment may be indexed. On Vercel, `VERCEL_ENV` is the source of truth,
 * so previews stay out of search results even if `SITE_URL` is copied to every environment.
 * Elsewhere, setting `SITE_URL` opts in, as documented in the README.
 */
export function isIndexable() {
  if (process.env.VERCEL_ENV) return process.env.VERCEL_ENV === "production";
  return Boolean(process.env.SITE_URL);
}
export function absoluteUrl(path = "/") {
  return new URL(path, getSiteUrl()).href;
}
/**
 * Page `openGraph`/`twitter` objects replace the parent ones (shallow merge), so the shared card
 * is restated here. A segment's own `opengraph-image` file still takes precedence.
 */
const shareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Webase — création de sites internet et d’applications à Orléans",
};
export function pageMetadata(
  title: string,
  path: string,
  description: string = site.description,
  /** False when the route segment has its own `opengraph-image` file. */
  sharedImage = true,
): Metadata {
  const images = sharedImage ? { images: [shareImage] } : {};
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Webase`,
      description,
      url: path,
      type: "website",
      locale: "fr_FR",
      siteName: "Webase",
      ...images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Webase`,
      description,
      ...images,
    },
  };
}
