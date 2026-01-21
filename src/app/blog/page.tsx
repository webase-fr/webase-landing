import { getAllPosts } from "@/lib/blog";
import { Container } from "@/components/ui/Container";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function BlogIndex() {
  const posts = getAllPosts(["slug", "frontmatter"]);

  return (
    <main className="min-h-screen pt-32 pb-20">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Le Blog Webase</h1>
          <p className="text-xl text-text-muted">
            Conseils, stratégies et actualités pour développer votre business en ligne.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            // Safe access to frontmatter properties
            const { title, date, coverImage, description, tags } = post.frontmatter;

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="flex flex-col h-full bg-surface-1 border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand/50 hover:-translate-y-1">
                  {/* Image Cover */}
                  <div className="aspect-video relative overflow-hidden bg-surface-2">
                    {coverImage && (
                      <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs font-semibold text-brand mb-3 uppercase tracking-wider">
                      {date && (
                        <time dateTime={date}>
                          {format(new Date(date), "d MMMM yyyy", { locale: fr })}
                        </time>
                      )}
                      {tags && tags.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{tags[0]}</span>
                        </>
                      )}
                    </div>

                    <h2 className="text-xl font-bold mb-3 group-hover:text-brand transition-colors">
                      {title}
                    </h2>

                    <p className="text-text-muted text-sm line-clamp-3 mb-4">
                      {description}
                    </p>

                    <div className="mt-auto text-sm font-bold text-brand flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                      Lire l'article
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
