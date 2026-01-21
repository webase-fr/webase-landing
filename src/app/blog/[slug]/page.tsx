import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { Container } from "@/components/ui/Container";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = getPostBySlug(params.slug, ["title", "date", "slug", "content", "coverImage", "tags", "frontmatter"]);

  return (
    <main className="min-h-screen pt-32 pb-20">
      <Container className="max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-brand mb-8 transition-colors">
          <ArrowLeft size={16} />
          Retour au blog
        </Link>

        <header className="mb-12">
          {post.frontmatter.tags && (
            <div className="flex gap-2 mb-6">
              {post.frontmatter.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-surface-2 text-xs font-bold rounded-full text-brand uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {post.frontmatter.title}
          </h1>

          <div className="flex items-center gap-4 text-text-muted">
            <time dateTime={post.frontmatter.date}>
              {format(new Date(post.frontmatter.date), "d MMMM yyyy", { locale: fr })}
            </time>
            {post.frontmatter.author && (
              <>
                <span>•</span>
                <span>Par {post.frontmatter.author}</span>
              </>
            )}
          </div>
        </header>

        {post.frontmatter.coverImage && (
          <div className="aspect-video relative rounded-2xl overflow-hidden mb-12 bg-surface-2">
            <Image
              src={post.frontmatter.coverImage}
              alt={post.frontmatter.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <article className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-brand max-w-none">
          <MDXRemote source={post.content} />
        </article>
      </Container>
    </main>
  );
}
