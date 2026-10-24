import { ContactForm } from "@/components/forms/ContactForm";
import { FormSidebar } from "@/components/forms/FormSidebar";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Contacter un développeur web à Orléans",
  "/contact",
  "Une question, une idée de site ou d’application ? Écrivez directement à Luis Doudeau, développeur web indépendant à Orléans. Réponse personnelle, sans engagement.",
);
export default function ContactPage() {
  return (
    <section className="form-page">
      <Container className="form-layout">
        <FormSidebar
          title={
            <>
              Un bon projet
              <br />
              commence par
              <br />
              <span>un échange.</span>
            </>
          }
          description="Vous avez une question, une idée ou un site à améliorer ? Écrivez-moi simplement. On voit ensemble comment avancer."
        />
        <div className="form-panel">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
