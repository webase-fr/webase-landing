import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, formatPostDate } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getService, type Service } from "@/content/services";
import { articleNode, graph } from "@/lib/structured-data";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const metadata = pageMetadata(
    post.frontmatter.title,
    `/blog/${post.slug}`,
    post.frontmatter.description,
  );
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updated ?? post.frontmatter.date,
      authors: [post.frontmatter.author],
    },
  };
}
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const related = post.frontmatter.services
    .map(getService)
    .filter((service): service is Service => Boolean(service));
  return (
    <>
      <JsonLd data={graph(articleNode({ slug: post.slug, ...post.frontmatter }))} />
      <header className="page-intro">
        <Container className="reading-layout">
          <Breadcrumbs
            items={[
              { name: "Accueil", path: "/" },
              { name: "Le journal", path: "/blog" },
              { name: post.frontmatter.title, path: `/blog/${post.slug}` },
            ]}
          />
          <h1 className="article-title">{post.frontmatter.title}</h1>
          <p className="intro-description">{post.frontmatter.description}</p>
          <p className="article-meta">
            <time dateTime={post.frontmatter.date}>{formatPostDate(post.frontmatter.date)}</time> ·
            Par <Link href="/studio">{post.frontmatter.author}</Link>
            {post.frontmatter.updated && post.frontmatter.updated !== post.frontmatter.date && (
              <>
                {" "}
                · Mis à jour le{" "}
                <time dateTime={post.frontmatter.updated}>
                  {formatPostDate(post.frontmatter.updated)}
                </time>
              </>
            )}
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
      {related.length > 0 && (
        <Section>
          <Container>
            <SectionHeading eyebrow="Passer à l’action" title="Les services liés à cet article." />
            <ServiceCards items={related} />
          </Container>
        </Section>
      )}
      <CTASection />
    </>
  );
}
