import { ArrowUpRight, Code2, HeartHandshake, MapPin } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { MethodSection } from "@/components/sections/MethodSection";
import { CTASection } from "@/components/sections/CTASection";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Le studio — Luis Doudeau", "/studio");
export default function StudioPage() {
  return (
    <>
      <PageIntro
        eyebrow="Le studio"
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
              Je conçois, développe, intègre et déploie votre site. Je peux aussi reprendre un
              projet existant et assurer sa maintenance, dans un cadre défini ensemble.
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
      <MethodSection />
      <CTASection />
    </>
  );
}
