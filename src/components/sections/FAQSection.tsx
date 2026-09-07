import { Plus, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { faqs } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
export function FAQSection() {
  return (
    <Section className="faq-section">
      <Container className="faq-layout">
        <div>
          <p className="eyebrow">Tout simplement</p>
          <h2>
            Les bonnes
            <br />
            questions.
          </h2>
          <p className="section-description">
            Un projet clair commence par
            <br />
            des réponses claires.
          </p>
          <Link className="text-link" href="/contact">
            Une autre question ? <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question} name="faq">
              <summary>
                {item.question}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
