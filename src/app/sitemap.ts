import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexable } from "@/lib/metadata";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/content/projects";
import { services, servicePath } from "@/content/services";
/**
 * Canonical, indexable URLs only. `lastModified` is set where it is verifiable (articles);
 * Google ignores priority and changefreq, so they are omitted.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable()) return [];
  const pages = [
    "/",
    "/services",
    ...services.map((service) => servicePath(service.slug)),
    "/offres",
    ...(projects.length ? ["/realisations"] : []),
    "/studio",
    "/contact",
    "/estimation",
    "/blog",
    "/mentions-legales",
    "/confidentialite",
  ];
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path) })),
    ...getAllPosts().map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.frontmatter.updated ?? post.frontmatter.date,
    })),
  ];
}
