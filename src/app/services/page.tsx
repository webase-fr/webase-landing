import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { MethodSection } from "@/components/sections/MethodSection";
import { CTASection } from "@/components/sections/CTASection";
import { serviceIcons } from "@/components/sections/ServiceCards";
import { services, servicePath } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Services web à Orléans : sites, applications et SEO",
  "/services",
  "Site vitrine, e-commerce, refonte, application web et mobile, SaaS, SEO et maintenance : les services de Webase, développeur web indépendant à Orléans.",
);
export default function ServicesPage() {
  return (
    <>
      <PageIntro
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        eyebrow="Services de développement web · Orléans"
        eyebrowInTitle
        title={
          <>
            Du beau, du clair.
            <br />
            <span>Et du concret.</span>
          </>
        }
        description="Du premier site vitrine à l’application qui simplifie votre quotidien, chaque choix part de votre activité. Un seul interlocuteur conçoit, développe et maintient votre projet, à Orléans ou à distance."
      />
      <Container>
        <div className="service-list">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            const number = String(index + 1).padStart(2, "0");
            return (
              <Section className="service-row" key={service.slug} id={service.slug}>
                <div className={`service-art service-art--${service.art}`} aria-hidden="true">
                  <span className="service-art-number">{number} /</span>
                  <Icon size={90} strokeWidth={0.7} />
                  <div className="service-art-lines">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span className="service-art-label">{service.shortName}</span>
                </div>
                <div className="service-copy">
                  <p className="eyebrow">{service.name}</p>
                  <h2>{service.hubTitle}</h2>
                  <p>{service.summary}</p>
                  <ul className="simple-list">
                    {service.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <ButtonLink href={servicePath(service.slug)} variant="secondary">
                    {service.name} <ArrowUpRight size={17} />
                  </ButtonLink>
                </div>
              </Section>
            );
          })}
        </div>
      </Container>
      <MethodSection />
      <CTASection />
    </>
  );
}
