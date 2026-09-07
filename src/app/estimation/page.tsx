import { QuoteForm } from "@/components/forms/QuoteForm";
import { FormSidebar } from "@/components/forms/FormSidebar";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { Section } from "@/components/ui/Section";
import { BriefCards } from "@/components/sections/BriefCards";
import { offers, site } from "@/content/site";
import { projectTypes } from "@/lib/lead-schema";
import { formatPrice } from "@/lib/estimate";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Estimer votre projet",
  "/estimation",
  "Décrivez votre projet web en 2 minutes ou préparez un brief complet en 5 à 8 minutes. Demande de devis gratuite, sans engagement, directement au studio.",
);
export default async function EstimationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const value = (key: string) =>
    typeof params[key] === "string" ? (params[key] as string) : undefined;
  const mode = value("format");
  const selectedOffer = offers.find((offer) => offer.id === value("offre"));
  const projectType = projectTypes.find((type) => type.value === value("type"))?.value;
  if (mode !== "express" && mode !== "complet") {
    return (
      <>
        <PageIntro
          eyebrow="Un devis commence par une bonne discussion"
          title={
            <>
              Vous avez une idée.
              <br />
              <span>Donnons-lui une suite.</span>
            </>
          }
          description="Pas besoin de tout avoir défini. Choisissez le format qui vous ressemble : une première prise de contact ou un projet à détailler."
        />
        <Section className="section--top-small quote-entry">
          <Container>
            {selectedOffer && (
              <p className="notice">
                Votre point de départ : <strong>{selectedOffer.name}</strong>, dès{" "}
                {formatPrice(selectedOffer.price)} HT. Le périmètre sera précisé ensemble.
              </p>
            )}
            <BriefCards offer={selectedOffer?.id} projectType={projectType} />
            <div className="brief-next">
              <div>
                <span>01 / Vous racontez</span>
                <p>Des questions simples, sans vocabulaire technique.</p>
              </div>
              <div>
                <span>02 / Je vous réponds</span>
                <p>Je lis personnellement votre demande, puis nous précisons le besoin.</p>
              </div>
              <div>
                <span>03 / Vous décidez</span>
                <p>Un devis détaillé, à valider avant de commencer. Aucun engagement ici.</p>
              </div>
            </div>
            <p className="brief-alternative">
              Vous préférez écrire directement ?{" "}
              <a href={`mailto:${site.email}`} className="text-link">
                {site.email}
              </a>
            </p>
          </Container>
        </Section>
      </>
    );
  }
  return (
    <section className="form-page">
      <Container className="form-layout">
        <FormSidebar
          title={
            <>
              Votre idée.
              <br />
              La suite,
              <br />
              <span>ensemble.</span>
            </>
          }
          description="Parlez-moi de votre activité et de ce que vous aimeriez construire. Pas besoin de vocabulaire technique, juste de vos idées."
        />
        <div className="form-panel">
          <QuoteForm
            key={JSON.stringify([value("format"), value("offre"), value("type")])}
            initialMode={mode}
            initialOffer={selectedOffer?.id}
            initialType={projectType}
          />
        </div>
      </Container>
    </section>
  );
}
