import { ArrowUpRight, Code2, HeartHandshake, MapPin } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { MethodSection } from "@/components/sections/MethodSection";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceArea } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { businessNode, founderNode, graph } from "@/lib/structured-data";
export const metadata = pageMetadata(
  "Luis Doudeau, développeur web freelance à Orléans",
  "/studio",
  "Webase, c’est Luis Doudeau : développeur web et mobile indépendant à Orléans. Sites internet, applications et plateformes sur mesure, avec un interlocuteur direct.",
);
export default function StudioPage() {
  return (
    <>
      <JsonLd data={graph(founderNode(), businessNode())} />
      <PageIntro
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Le studio", path: "/studio" },
        ]}
        eyebrow="Luis Doudeau · Développeur web freelance à Orléans"
        eyebrowInTitle
        title={
          <>
            Un indépendant.
            <br />
            <span>Pleinement impliqué.</span>
          </>
        }
        description="Webase, c’est Luis Doudeau. Un développeur à Orléans, un interlocuteur direct et l’envie de construire des sites utiles aux personnes qui entreprennent."
      />
      <Section className="section--top-small">
        <Container className="studio-split">
          <div className="studio-mark" aria-hidden="true">
            <div className="studio-monogram">
              w<span>.</span>
            </div>
            <span>
              DE BONNES IDÉES.
              <br />
              DE BONNES FONDATIONS.
            </span>
            <span className="studio-mark-location">ORLÉANS / FRANCE</span>
          </div>
          <div className="studio-copy">
            <p className="eyebrow">Faire les choses avec soin</p>
            <h2>
              Le web doit vous
              <br />
              simplifier la vie.
            </h2>
            <p>
              Quand on est indépendant ou à la tête d’une petite entreprise, on a besoin de
              comprendre ce qu’on achète, à quoi cela sert et à qui s’adresser.
            </p>
            <p>
              C’est l’idée de Webase : des projets à taille humaine, des choix expliqués et une
              attention portée autant au résultat visible qu’à la qualité du développement.
            </p>
            <p>
              Je conçois, développe, intègre et déploie votre site ou votre application. Je peux
              aussi reprendre un projet existant et assurer sa maintenance, dans un cadre défini
              ensemble.
            </p>
            <p>
              Mon terrain de jeu technique : TypeScript, React, Next.js et Node.js, pour des sites
              rapides, des applications web et mobiles et des plateformes SaaS. Des technologies
              répandues, choisies pour que votre projet reste maintenable dans la durée.
            </p>
            <ButtonLink href="/contact">
              Échangeons simplement <ArrowUpRight size={17} />
            </ButtonLink>
          </div>
        </Container>
      </Section>
      <Section className="inclusions-section">
        <Container>
          <div className="reassurance-row">
            <div>
              <HeartHandshake />
              <h3>Une relation directe.</h3>
              <p>
                Du premier échange à la livraison, vous parlez à la personne qui travaille sur votre
                projet.
              </p>
            </div>
            <div>
              <Code2 />
              <h3>Des fondations durables.</h3>
              <p>
                Un code structuré, des composants cohérents et une documentation utile pour la
                suite.
              </p>
            </div>
            <div>
              <MapPin />
              <h3>À Orléans, et à distance.</h3>
              <p>
                Basé dans le Loiret, j’accompagne les professionnels partout en France, avec des
                échanges réguliers en visio.
              </p>
            </div>
          </div>
        </Container>
      </Section>
      <Section id="zone-intervention">
        <Container className="area-layout">
          <div>
            <p className="eyebrow">Zone d’intervention</p>
            <h2>
              Orléans, sa métropole
              <br />
              et toute la France.
            </h2>
          </div>
          <div className="area-copy">
            <p>
              Basé à Orléans, j’accompagne en priorité les entreprises des 22 communes d’
              {serviceArea.metropolis} et du {serviceArea.department}. Les échanges se font en visio
              et par e-mail, et le projet avance sur une adresse de prévisualisation que vous
              consultez quand vous le souhaitez.
            </p>
            <ul className="area-list" aria-label={`Communes d’${serviceArea.metropolis}`}>
              {serviceArea.communes.map((commune) => (
                <li key={commune}>{commune}</li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
      <MethodSection />
      <CTASection />
    </>
  );
}
