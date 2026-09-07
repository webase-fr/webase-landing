import { ArrowUpRight, FolderOpen } from "lucide-react";
import { projects } from "@/content/projects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Réalisations",
  "/realisations",
  "Les projets Webase : sites vitrines, sites administrables et applications web. Découvrez les sites réalisés par le studio indépendant.",
);
export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Réalisations"
        title={
          <>
            Des idées qui
            <br />
            <span>prennent leur place.</span>
          </>
        }
        description="Chaque projet part d’un métier, d’une histoire et d’un objectif. Voici les sites réalisés par le studio."
      />
      <Section className="section--top-small">
        <Container>
          {projects.length ? (
            <ProjectGrid projects={projects} />
          ) : (
            <div className="projects-empty">
              <div className="empty-project-art" aria-hidden="true">
                <span />
                <span />
                <span />
                <FolderOpen size={38} strokeWidth={1} />
              </div>
              <p className="eyebrow">Les projets du studio</p>
              <h2>Les réalisations arrivent ici.</h2>
              <p>
                Cette sélection sera enrichie avec les projets publiés et l’accord de leurs clients.
                En attendant, parlons de ce que vous aimeriez construire.
              </p>
              <ButtonLink href="/contact" variant="secondary">
                Faire connaissance <ArrowUpRight size={18} />
              </ButtonLink>
            </div>
          )}
        </Container>
      </Section>
      <CTASection />
    </>
  );
}
