import { ArrowUpRight, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
export function CTASection() {
  return (
    <section className="cta-section">
      <Container>
        <div className="cta-panel">
          <div className="cta-art" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="cta-content">
            <p className="eyebrow">La suite commence ici</p>
            <h2>
              Votre projet mérite
              <br />
              une bonne base.
            </h2>
            <p>
              Quelques mots sur votre activité.
              <br />
              Et si on construisait la suite ensemble ?
            </p>
            <div className="button-row">
              <ButtonLink href="/estimation" variant="inverse">
                Estimer mon projet <ArrowUpRight size={18} />
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                D’abord, faire connaissance <ArrowUpRight size={17} />
              </ButtonLink>
            </div>
            <span className="cta-note">
              <Clock3 size={14} /> 2 minutes pour commencer · Gratuit et sans engagement
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
