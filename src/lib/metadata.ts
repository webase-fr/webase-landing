import type { Metadata } from "next";
import { site } from "@/content/site";
export function getSiteUrl() {
  const url = process.env.SITE_URL;
  if (!url) return new URL("http://localhost:3000");
  return new URL(url);
}
export function pageMetadata(
  title: string,
  path: string,
  description: string = site.description,
): Metadata {
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
    },
  };
}
