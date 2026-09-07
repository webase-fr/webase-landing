import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BriefCards } from "./BriefCards";

export function BriefSection() {
  return (
    <Section id="votre-projet" className="brief-section">
      <Container>
        <SectionHeading
          eyebrow="On commence quand vous voulez"
          title={
            <>
              Votre projet mérite
              <br />
              un premier échange.
            </>
          }
          description="Choisissez votre point de départ. Vos réponses arrivent directement à Luis, qui revient vers vous pour préciser le besoin et préparer la suite."
        />
        <BriefCards />
        <p className="brief-alternative">
          Une question avant de vous lancer ?{" "}
          <Link href="/contact" className="text-link">
            Écrivez-moi simplement <ArrowUpRight size={16} />
          </Link>
        </p>
      </Container>
    </Section>
  );
}
