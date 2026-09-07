import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Field, TextArea } from "@/components/forms/Fields";
import { BriefCards } from "@/components/sections/BriefCards";
export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false, follow: false },
};
export default function DesignSystem() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <>
      <PageIntro
        eyebrow="Webase / Foundations v1"
        title={
          <>
            Un langage commun.
            <br />
            <span>Du premier au dernier détail.</span>
          </>
        }
        description="Planche de référence interne : tokens, typographie, boutons, surfaces et contrôles. Cette page n’est pas accessible en production."
      />
      <Section className="section--top-small">
        <Container>
          <SectionHeading eyebrow="01 / Couleurs" title="Une palette intentionnelle." />
          <div className="token-grid">
            {["paper", "white", "ink", "muted", "blue", "blue-wash", "forest", "lime"].map(
              (token) => (
                <div className="token-swatch" key={token}>
                  <div style={{ background: `var(--${token})` }} />
                  <span>--{token}</span>
                </div>
              ),
            )}
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeading eyebrow="02 / Actions" title="Une action. Le bon composant." />
          <div className="button-row">
            <Button>
              Action principale <ArrowUpRight size={17} />
            </Button>
            <Button variant="secondary">Action secondaire</Button>
            <Button variant="inverse">Sur fond de marque</Button>
            <Button variant="primary" disabled>
              Indisponible
            </Button>
            <ButtonLink href="/offres" variant="ghost">
              Lien de navigation <ArrowUpRight size={17} />
            </ButtonLink>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SectionHeading eyebrow="03 / Orientation" title="Un choix lisible, une action claire." />
          <BriefCards />
        </Container>
      </Section>
      <Section className="inclusions-section">
        <Container>
          <SectionHeading eyebrow="04 / Formulaires" title="Des états explicites." />
          <div className="two-column">
            <div className="form-panel">
              <Field id="demo-name" label="Nom" defaultValue="Camille Martin" readOnly />
              <Field
                id="demo-email"
                label="E-mail"
                type="email"
                defaultValue="adresse incorrecte"
                error="Saisissez une adresse e-mail valide."
                readOnly
              />
              <Field
                id="demo-optional"
                label="Entreprise"
                placeholder="Votre activité"
                optional
                readOnly
              />
            </div>
            <div className="form-panel">
              <TextArea
                id="demo-message"
                label="Message"
                defaultValue="Un projet bien cadré commence par des questions simples."
                rows={4}
                readOnly
              />
              <div className="form-feedback">L’envoi a échoué. Vos réponses sont conservées.</div>
              <div className="estimate-result">
                <span>Repère, sans engagement</span>
                <strong>1 990 à 2 990 € HT</strong>
                <p>Une information utile et ses conditions, au même endroit.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
