import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/metadata";
export default function robots(): MetadataRoute.Robots {
  return process.env.SITE_URL
    ? {
        rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
        sitemap: new URL("/sitemap.xml", getSiteUrl()).href,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
