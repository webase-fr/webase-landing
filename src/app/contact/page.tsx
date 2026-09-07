import { ContactForm } from "@/components/forms/ContactForm";
import { FormSidebar } from "@/components/forms/FormSidebar";
import { Container } from "@/components/ui/Container";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Contact", "/contact");
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
