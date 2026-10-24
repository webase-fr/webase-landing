import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Code2,
  Compass,
  Handshake,
  Layers3,
  MonitorSmartphone,
  PenTool,
} from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { OffersCards } from "@/components/sections/OffersCards";
import { MethodSection } from "@/components/sections/MethodSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { BriefSection } from "@/components/sections/BriefSection";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { businessNode, founderNode, graph, websiteNode } from "@/lib/structured-data";

const title = "Création de site internet et d’applications à Orléans";
export const metadata: Metadata = {
  ...pageMetadata(
    title,
    "/",
    "Webase, développeur web indépendant à Orléans : création de sites vitrines et e-commerce, applications web et mobiles, SaaS. Dès 990 € HT, devis gratuit.",
  ),
  title: { absolute: `${title} | Webase` },
};
export default function Home() {
  return (
    <>
      <JsonLd data={graph(businessNode(), websiteNode(), founderNode())} />
      <section className="hero">
        <Container className="hero-grid">
          <div className="hero-copy">
            <h1>
              <span className="eyebrow">
                <span className="status-dot" /> Webase · Création de sites et d’applications à
                Orléans
              </span>{" "}
              Votre savoir‑faire.
              <br />
              <span>
                Un site à<br className="desktop-break" /> sa hauteur.
              </span>
            </h1>
            <p className="hero-description">
              Vous faites du bon travail.
              <br />
              Votre site devrait le montrer.
            </p>
            <p className="hero-detail">
              Sites vitrines, boutiques en ligne, applications web et mobiles : je conçois et
              développe des outils clairs, rapides et utiles pour les indépendants, TPE et PME
              d’Orléans et du Loiret.
            </p>
            <div className="button-row">
              <ButtonLink href="#votre-projet">
                Parlons de votre projet <ArrowUpRight size={19} />
              </ButtonLink>
              <Link href="/offres" className="text-link">
                Découvrir les offres <ArrowDown size={16} />
              </Link>
            </div>
            <div className="hero-assurance">
              <span>
                <Check size={14} /> Un interlocuteur direct
              </span>
              <span>
                <Check size={14} /> Un devis sans engagement
              </span>
            </div>
          </div>
          <HeroVisual />
        </Container>
      </section>
      <Container>
        <div className="audience-strip">
          <span>
            À votre échelle.
            <br />
            <strong>Avec de l’ambition.</strong>
          </span>
          <div>
            <span>Artisans & commerces</span>
            <span>Indépendants & TPE</span>
            <span>PME & startups</span>
          </div>
          <span className="audience-plus" aria-hidden="true">
            ↗
          </span>
        </div>
      </Container>
      <Section id="services" className="services-section">
        <Container>
          <SectionHeading
            eyebrow="Services · Orléans et à distance"
            title={
              <>
                Un site, une application.
                <br />
                Un seul interlocuteur.
              </>
            }
            description="De la création de site internet au développement d’applications sur mesure, chaque projet est conçu, développé et suivi par la même personne."
            action={
              <Link href="/services" className="text-link">
                Tous les services <ArrowUpRight size={18} />
              </Link>
            }
          />
          <ServiceCards />
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Le fond compte. La forme aussi."
            title={
              <>
                Faire bonne impression.
                <br />
                Et faciliter la suite.
              </>
            }
            description="Un visiteur doit comprendre ce que vous faites, pourquoi vous choisir et comment vous contacter. Tout part de là."
          />
          <div className="value-grid">
            {[
              {
                icon: PenTool,
                n: "01",
                title: "Une image qui vous ressemble.",
                text: "Un design cohérent avec votre métier. La bonne typographie, les bons espaces et du soin jusque dans les détails.",
                detail: "Identité & design",
              },
              {
                icon: MonitorSmartphone,
                n: "02",
                title: "Simple pour vos clients.",
                text: "Des pages lisibles, un parcours évident et des formulaires utiles. Sur un téléphone comme sur un grand écran.",
                detail: "Expérience & conversion",
              },
              {
                icon: Code2,
                n: "03",
                title: "Solide pour la suite.",
                text: "Un code sur mesure, sans constructeur de pages : un site rapide, des contenus structurés pour les moteurs de recherche et une base entretenable.",
                detail: "Développement & suivi",
              },
            ].map((item) => (
              <article className="value-card" key={item.n}>
                <div className="value-card-top">
                  <item.icon size={25} strokeWidth={1.4} />
                  <span>{item.n}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="value-detail">
                  {item.detail}
                  <ArrowUpRight size={16} />
                </span>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="offers-section">
        <Container>
          <SectionHeading
            eyebrow="Le bon format pour votre activité"
            title={
              <>
                Un projet bien cadré.
                <br />
                Un budget qui l’est aussi.
              </>
            }
            action={
              <Link href="/offres" className="text-link">
                Comparer les offres <ArrowUpRight size={18} />
              </Link>
            }
          />
          <OffersCards />
          <p className="pricing-note">
            Tarifs de départ HT, selon le périmètre validé au devis. Contenus, domaine, hébergement
            et licences non inclus.{" "}
            <Link href="/offres#compris">
              Voir tous les détails <ArrowUpRight size={13} />
            </Link>
          </p>
        </Container>
      </Section>
      <MethodSection />
      {projects.length > 0 && (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Du concret"
              title="Les projets du studio."
              action={
                <Link href="/realisations" className="text-link">
                  Toutes les réalisations <ArrowUpRight size={17} />
                </Link>
              }
            />
            <ProjectGrid projects={projects.slice(0, 2)} />
          </Container>
        </Section>
      )}
      <Section className="studio-teaser">
        <Container className="studio-split">
          <div className="studio-mark" aria-hidden="true">
            <div className="studio-monogram">
              w<span>.</span>
            </div>
            <span>
              INDÉPENDANT PAR CHOIX.
              <br />
              IMPLIQUÉ PAR NATURE.
            </span>
            <span className="studio-mark-location">
              47°54′ N &nbsp; 1°54′ E &nbsp; / &nbsp; ORLÉANS
            </span>
          </div>
          <div className="studio-copy">
            <p className="eyebrow">Derrière Webase, Luis.</p>
            <h2>
              Une relation directe.
              <br />
              Un projet en commun.
            </h2>
            <p>
              Je suis Luis Doudeau, développeur indépendant à Orléans. J’accompagne les entreprises
              qui veulent un site à la hauteur de leur travail, et quelqu’un sur qui s’appuyer pour
              le construire.
            </p>
            <p>
              Je travaille avec les professionnels d’Orléans et de sa métropole, d’Olivet à
              Saint-Jean-de-Braye, de Saran à Saint-Jean-le-Blanc, et à distance partout en France.
            </p>
            <ul className="studio-principles">
              <li>
                <Handshake size={19} /> Vous échangez avec la personne qui réalise votre site.
              </li>
              <li>
                <Compass size={19} /> Les choix sont expliqués, le budget est cadré.
              </li>
              <li>
                <Layers3 size={19} /> Vous gardez les accès et la maîtrise de votre projet.
              </li>
            </ul>
            <Link href="/studio" className="text-link">
              Faire connaissance avec le studio <ArrowUpRight size={18} />
            </Link>
          </div>
        </Container>
      </Section>
      <FAQSection />
      <BriefSection />
    </>
  );
}
