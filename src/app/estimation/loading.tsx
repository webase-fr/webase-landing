import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <section className="form-page" aria-busy="true">
      <Container>
        <p className="eyebrow" role="status">
          Préparation de votre questionnaire…
        </p>
        <div className="quote-loading" aria-hidden="true">
          <div />
          <div />
        </div>
      </Container>
    </section>
  );
}
