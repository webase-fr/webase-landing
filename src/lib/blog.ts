import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const directory = path.join(process.cwd(), "src/content/posts");
const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.iso.date(),
  description: z.string().min(1),
  author: z.string().default("Luis Doudeau"),
  tags: z.array(z.string()).default([]),
});
export type Post = {
  slug: string;
  frontmatter: z.infer<typeof frontmatterSchema>;
  content: string;
};
export function getPostBySlug(slug: string): Post | null {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const filename = path.join(directory, `${slug}.mdx`);
  if (!fs.existsSync(filename)) return null;
  const { data, content } = matter(fs.readFileSync(filename, "utf8"));
  return { slug, content, frontmatter: frontmatterSchema.parse(data) };
}
export function getAllPosts(): Post[] {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => getPostBySlug(file.slice(0, -4)))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}
export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
