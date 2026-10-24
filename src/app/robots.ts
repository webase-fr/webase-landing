import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable } from "@/lib/metadata";
export default function robots(): MetadataRoute.Robots {
  return isIndexable()
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: absoluteUrl("/sitemap.xml"),
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
