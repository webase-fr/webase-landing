import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { PageIntro } from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Confidentialité", "/confidentialite");
export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Vos données"
        title="Simplement, en confiance."
        description="Ce que Webase utilise, pourquoi, et comment exercer vos droits. Version du 7 septembre 2026."
      />
      <Section className="section--top-small">
        <Container className="reading-layout prose">
          <h2>Qui traite vos données ?</h2>
          <p>
            Le responsable du traitement est Luis Doudeau, entrepreneur individuel, sous le nom
            commercial Webase, {site.address}. Contact :{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <h2>Les informations demandées</h2>
          <p>
            Le formulaire de contact recueille votre nom, votre e-mail, votre sujet et votre
            message. Le questionnaire de devis recueille aussi votre type de projet, votre budget
            indicatif et votre calendrier. Le brief complet ajoute votre activité, vos clients, vos
            objectifs, vos contenus et fonctionnalités souhaitées. Le nom de l’entreprise, le
            téléphone et les autres champs indiqués comme facultatifs restent optionnels.
          </p>
          <p>
            Les champs marqués d’un astérisque sont nécessaires pour traiter votre demande. Évitez
            d’inclure des données sensibles, des mots de passe ou des informations concernant des
            tiers.
          </p>
          <h2>Pourquoi et sur quelle base ?</h2>
          <p>
            Ces informations servent à répondre à votre demande, comprendre votre projet et préparer
            un éventuel devis. Pour les demandes de projet, la base est l’exécution de mesures
            précontractuelles à votre initiative. Pour les questions générales, Webase s’appuie sur
            son intérêt légitime à répondre aux personnes qui le contactent. La protection contre
            les envois abusifs repose sur l’intérêt légitime à sécuriser le service.
          </p>
          <p>
            La case du formulaire confirme que vous avez lu ces informations et souhaitez être
            recontacté. Elle ne vous inscrit à aucune communication commerciale.
          </p>
          <h2>Où vont les réponses ?</h2>
          <p>
            Vos réponses sont envoyées à Luis Doudeau par e-mail. Resend intervient pour l’envoi
            transactionnel et Google pour la réception dans la messagerie du studio. L’hébergeur
            traite techniquement la requête. Upstash peut conserver temporairement des compteurs de
            protection contre les abus, associés à une empreinte de l’adresse e-mail et, si
            l’hébergement le permet, de l’adresse IP. Les réponses du questionnaire ne sont pas
            stockées dans ces compteurs.
          </p>
          <p>
            Certains prestataires peuvent traiter des données hors de l’Union européenne. Leurs
            garanties contractuelles et mécanismes de transfert sont décrits dans les accords de
            traitement de{" "}
            <a href="https://resend.com/legal/dpa" target="_blank" rel="noopener noreferrer">
              Resend
            </a>
            ,{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google
            </a>{" "}
            et{" "}
            <a href="https://upstash.com/trust/dpa.pdf" target="_blank" rel="noopener noreferrer">
              Upstash
            </a>
            .
          </p>
          <h2>Combien de temps ?</h2>
          <p>
            Les échanges sans suite commerciale sont conservés au maximum 12 mois après le dernier
            échange, puis supprimés de la messagerie du studio. Si une relation contractuelle
            commence, les documents utiles sont conservés selon les obligations contractuelles et
            légales applicables. Les compteurs de protection expirent après une heure ; les journaux
            techniques des prestataires suivent leur propre durée de conservation.
          </p>
          <p>
            Avant l’envoi, les réponses restent dans la mémoire de la page ouverte. Elles ne sont
            pas sauvegardées dans le stockage local du navigateur : quitter ou recharger la page les
            efface.
          </p>
          <h2>Vos droits</h2>
          <p>
            Vous pouvez demander l’accès, la rectification ou l’effacement de vos données, ainsi que
            la limitation du traitement et, selon la base applicable, vous opposer au traitement ou
            demander la portabilité. Écrivez à <a href={`mailto:${site.email}`}>{site.email}</a>. En
            cas de difficulté, vous pouvez adresser une réclamation à la{" "}
            <a
              href="https://www.cnil.fr/fr/adresser-une-plainte"
              target="_blank"
              rel="noopener noreferrer"
            >
              CNIL
            </a>
            .
          </p>
          <h2>Cookies et mesure d’audience</h2>
          <p>
            Le site n’intègre pas de publicité, de traceur publicitaire ou d’outil de mesure
            d’audience. Aucune bannière de consentement à ces traceurs n’est donc affichée. Si des
            outils supplémentaires sont ajoutés, cette page et les choix proposés seront mis à jour.
          </p>
        </Container>
      </Section>
    </>
  );
}
