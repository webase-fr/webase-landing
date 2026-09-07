import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Mentions légales", "/mentions-legales");
export default function LegalPage() {
  const host = process.env.HOSTING_NAME;
  const hostAddress = process.env.HOSTING_ADDRESS;
  const hostContact = process.env.HOSTING_CONTACT;
  return (
    <>
      <PageIntro
        eyebrow="Informations légales"
        title="Mentions légales."
        description="Les informations concernant l’éditeur et l’hébergement du site Webase."
      />
      <Section className="section--top-small">
        <Container className="reading-layout prose">
          <h2>Éditeur du site</h2>
          <div className="legal-details">
            <p>
              <strong>{site.legalName}</strong>
              <br />
              Nom commercial : Webase
              <br />
              {site.address}
              <br />
              E-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p>
              SIREN : {site.siren}
              <br />
              SIRET : {site.siret}
              <br />
              Numéro de TVA intracommunautaire : {site.vat}
              <br />
              Inscrit au Registre national des entreprises (RNE).
              <br />
              Activité : programmation informatique, développement de sites et applications,
              maintenance, intégration et déploiement.
              <br />
              Code APE : 62.01Z.
            </p>
          </div>
          <h2>Directeur de la publication</h2>
          <p>Luis Doudeau, entrepreneur individuel.</p>
          <h2>Hébergement</h2>
          {host && hostAddress && hostContact ? (
            <p>
              {host}
              <br />
              {hostAddress}
              <br />
              {hostContact}
            </p>
          ) : (
            <p>Les coordonnées de l’hébergeur seront précisées lors de la mise en ligne du site.</p>
          )}
          <h2>Propriété intellectuelle</h2>
          <p>
            Les textes, compositions graphiques et éléments d’identité du site sont protégés par les
            droits applicables. Les marques, polices et ressources de tiers restent soumises à leurs
            licences respectives. Toute réutilisation doit respecter les droits de leurs titulaires.
          </p>
          <h2>Offres et demandes de devis</h2>
          <p>
            Les prix présentés sont des prix de départ hors taxes. Les prestations, la TVA
            applicable, les droits cédés, les frais tiers, les délais et les modalités de paiement
            sont précisés dans le devis et les conditions contractuelles remis avant engagement. Une
            demande via le site ou une estimation automatique ne constitue pas une commande.
          </p>
          <h2>Données personnelles</h2>
          <p>
            Les traitements liés aux formulaires sont décrits dans la{" "}
            <a href="/confidentialite">politique de confidentialité</a>.
          </p>
        </Container>
      </Section>
    </>
  );
}
