import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
export default function NotFound() {
  return (
    <Container className="error-page">
      <p className="eyebrow">404 · Une page introuvable</p>
      <h1>
        Repartons sur
        <br />
        une bonne base.
      </h1>
      <p>
        Cette page n’existe pas ou a changé d’adresse. Retrouvez les offres du studio ou revenez à
        l’accueil.
      </p>
      <div className="button-row">
        <ButtonLink href="/">
          <ArrowLeft size={17} /> Retour à l’accueil
        </ButtonLink>
        <ButtonLink href="/offres" variant="secondary">
          Les offres <ArrowUpRight size={17} />
        </ButtonLink>
      </div>
    </Container>
  );
}
