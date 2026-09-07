import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/metadata";
import { getAllPosts } from "@/lib/blog";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!process.env.SITE_URL) return [];
  const pages = [
    "/",
    "/services",
    "/offres",
    "/realisations",
    "/studio",
    "/contact",
    "/estimation",
    "/blog",
    "/mentions-legales",
    "/confidentialite",
    ...getAllPosts().map((post) => `/blog/${post.slug}`),
  ];
  return pages.map((path) => ({ url: new URL(path, getSiteUrl()).href }));
}
