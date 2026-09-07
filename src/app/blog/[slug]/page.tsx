import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, formatPostDate } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return pageMetadata(post.frontmatter.title, `/blog/${post.slug}`, post.frontmatter.description);
}
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  return (
    <>
      <header className="page-intro">
        <Container className="reading-layout">
          <Link href="/blog" className="text-link article-back">
            <ArrowLeft size={16} /> Le journal
          </Link>
          <h1 className="article-title">{post.frontmatter.title}</h1>
          <p className="intro-description">{post.frontmatter.description}</p>
          <p className="article-meta">
            <time dateTime={post.frontmatter.date}>{formatPostDate(post.frontmatter.date)}</time> ·
            Par {post.frontmatter.author}
          </p>
        </Container>
      </header>
      <Section className="section--top-small">
        <Container className="reading-layout">
          <article className="prose">
            <MDXRemote source={post.content} />
          </article>
        </Container>
      </Section>
      <CTASection />
    </>
  );
}
