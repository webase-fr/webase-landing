import type { ReactNode } from "react";
import { Plus, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { faqs } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
/** Answers stay in the HTML (native details), so they are readable without JavaScript. */
export function FAQSection({
  items = faqs,
  eyebrow = "Tout simplement",
  title = (
    <>
      Les bonnes
      <br />
      questions.
    </>
  ),
}: {
  items?: readonly { question: string; answer: string; link?: { href: string; label: string } }[];
  eyebrow?: string;
  title?: ReactNode;
}) {
  return (
    <Section className="faq-section">
      <Container className="faq-layout">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
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
          {items.map((item) => (
            <details key={item.question} name="faq">
              <summary>
                {item.question}
                <Plus size={20} aria-hidden="true" />
              </summary>
              <p>
                {item.answer}
                {item.link && (
                  <>
                    {" "}
                    <Link href={item.link.href} className="faq-link">
                      {item.link.label}
                    </Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
