"use client";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="error-page">
      <p className="eyebrow">Un contretemps</p>
      <h1>On reprend ?</h1>
      <p>La page n’a pas pu être chargée. Réessayez dans quelques instants.</p>
      <div className="button-row">
        <Button onClick={reset}>Réessayer</Button>
        <ButtonLink href="/" variant="secondary">
          Retour à l’accueil
        </ButtonLink>
      </div>
    </Container>
  );
}
