import { ArrowUpRight, Check, Clock3, KeyRound, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { OffersCards } from "@/components/sections/OffersCards";
import { OfferFinder } from "@/components/sections/OfferFinder";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Offres & tarifs",
  "/offres",
  "Trois offres de création de site web : une page dès 990 € HT, site vitrine dès 1 990 € HT, site administrable dès 3 490 € HT. Périmètre clair, devis gratuit.",
);
export default function OffersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Offres & tarifs"
        title={
          <>
            La bonne dimension.
            <br />
            <span>Le juste investissement.</span>
          </>
        }
        description="Chaque activité n’a pas besoin du même site. Trois points de départ clairs, un devis détaillé et la liberté de choisir la suite."
      />
      <Section className="section--top-small">
        <Container>
          <OfferFinder />
          <OffersCards />
          <p className="pricing-note">
            Prix de départ hors taxes. Le montant et la TVA applicable sont précisés sur votre
            devis. Les délais dépendent de la réception des contenus et de vos validations.
          </p>
        </Container>
      </Section>
      <Section id="compris" className="inclusions-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Tout est posé sur la table</p>
              <h2>
                Ce qui est compris.
                <br />
                Ce qui se prévoit.
              </h2>
            </div>
          </div>
          <div className="two-column">
            <article className="detail-panel">
              <h3>Dans chaque projet</h3>
              <ul className="check-list">
                {[
                  "Un échange de cadrage et un devis détaillé",
                  "Un design adapté au mobile, à la tablette et à l’ordinateur",
                  "Des pages structurées et les métadonnées essentielles",
                  "Les tests du formulaire et des parcours principaux",
                  "La mise en ligne et la remise des accès",
                  "30 jours de correction des anomalies de livraison",
                ].map((text) => (
                  <li key={text}>
                    <Check size={17} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="detail-panel">
              <h3>À prévoir à côté</h3>
              <dl className="cost-list">
                <div>
                  <dt>Domaine & hébergement</dt>
                  <dd>
                    Réglés directement aux prestataires. Budget indicatif : 10 à 30 € HT / mois pour
                    l’hébergement et 10 à 25 € HT / an pour le domaine, à confirmer selon la
                    solution.
                  </dd>
                </div>
                <div>
                  <dt>Textes, photos & licences</dt>
                  <dd>
                    Vous fournissez vos contenus. Rédaction, photographie, traduction ou ressources
                    payantes peuvent être chiffrées séparément.
                  </dd>
                </div>
                <div>
                  <dt>Maintenance, si vous le souhaitez</dt>
                  <dd>
                    À partir de 59 € HT / mois : mises à jour, surveillance et sauvegardes selon la
                    solution retenue. Périmètre et fréquence précisés au contrat. Évolutions sur
                    devis.
                  </dd>
                </div>
              </dl>
            </article>
          </div>
          <div className="reassurance-row">
            <div>
              <KeyRound />
              <h3>Les accès sont à vous.</h3>
              <p>Vos comptes à votre nom, les livrables et droits définis au contrat.</p>
            </div>
            <div>
              <Clock3 />
              <h3>Un paiement en 3 étapes.</h3>
              <p>40 % au démarrage, 30 % aux maquettes, 30 % avant la mise en ligne.</p>
            </div>
            <div>
              <ShieldCheck />
              <h3>Vous validez avant.</h3>
              <p>Le budget et le calendrier sont fixés avant de commencer.</p>
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="custom-offer">
            <div>
              <p className="eyebrow">Votre besoin sort du cadre ?</p>
              <h2>Alors, parlons-en.</h2>
              <p>
                Refonte, boutique en ligne, réservation, espace client ou application métier : on
                étudie le besoin avant de parler solution et budget.
              </p>
            </div>
            <ButtonLink href="/estimation?format=complet">
              Décrire mon projet <ArrowUpRight size={18} />
            </ButtonLink>
          </div>
        </Container>
      </Section>
      <FAQSection />
      <CTASection />
    </>
  );
}
