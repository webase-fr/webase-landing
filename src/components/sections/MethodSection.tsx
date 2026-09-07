import { ArrowUpRight } from "lucide-react";
import { process } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
export function MethodSection() {
  return (
    <Section id="methode" className="method-section">
      <Container>
        <SectionHeading
          eyebrow="Une méthode, pas de mystère"
          title={
            <>
              Vous savez toujours
              <br />
              où on en est.
            </>
          }
          description="Des étapes simples, des points réguliers et un seul interlocuteur, du premier échange à la mise en ligne."
        />
        <div className="method-grid">
          {process.map((step, index) => (
            <article key={step.title}>
              <div className="method-number">
                <span>0{index + 1}</span>
                <ArrowUpRight size={21} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <span className="method-deliverable">{step.deliverable}</span>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
