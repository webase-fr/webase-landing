import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllPosts, formatPostDate } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
export const metadata = pageMetadata(
  "Le journal",
  "/blog",
  "Des repères simples pour préparer votre site web, faire les bons choix et comprendre les étapes de votre projet.",
);
export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageIntro
        eyebrow="Le journal"
        title={
          <>
            Comprendre avant
            <br />
            <span>de se lancer.</span>
          </>
        }
        description="Quelques repères pour préparer votre projet, poser les bonnes questions et avancer avec une idée plus claire de la suite."
      />
      <Section className="section--top-small">
        <Container>
          <div className="journal-list">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} className="journal-card" key={post.slug}>
                <time dateTime={post.frontmatter.date}>
                  {formatPostDate(post.frontmatter.date)}
                </time>
                <div>
                  <h2>{post.frontmatter.title}</h2>
                  <p>{post.frontmatter.description}</p>
                </div>
                <ArrowUpRight size={23} />
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <CTASection />
    </>
  );
}
