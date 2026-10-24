import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { MethodSection } from "@/components/sections/MethodSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { JsonLd } from "@/components/seo/JsonLd";
import { getService, servicePath, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { graph, serviceNode } from "@/lib/structured-data";

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) notFound();
  return pageMetadata(service.metaTitle, servicePath(service.slug), service.metaDescription, false);
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const related = services.filter((item) => service.related.includes(item.slug));
  return (
    <>
      <JsonLd data={graph(serviceNode(service))} />
      <PageIntro
        breadcrumbs={[
          { name: "Accueil", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: servicePath(service.slug) },
        ]}
        eyebrow={service.metaTitle}
        eyebrowInTitle
        title={
          <>
            {service.title[0]}
            <br />
            <span>{service.title[1]}</span>
          </>
        }
        description={service.intro}
      >
        <div className="button-row intro-actions">
          <ButtonLink href={service.cta.href}>
            {service.cta.label} <ArrowUpRight size={18} />
          </ButtonLink>
          <a href="#tarifs" className="text-link">
            Voir les tarifs <ArrowUpRight size={16} />
          </a>
        </div>
      </PageIntro>
      <Section className="section--top-small">
        <Container>
          <SectionHeading eyebrow={service.shortName} title={service.needsTitle} />
          <div className="reassurance-row reassurance-row--flush">
            {service.needs.map((need) => (
              <div key={need.title}>
                <h3>{need.title}</h3>
                <p>{need.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section id="tarifs" className="inclusions-section">
        <Container>
          <div className="two-column">
            <article className="detail-panel">
              <h2 className="panel-title">{service.includedTitle}</h2>
              <ul className="check-list">
                {service.included.map((text) => (
                  <li key={text}>
                    <Check size={17} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              {service.technology && <p className="panel-note">{service.technology}</p>}
            </article>
            <article className="detail-panel">
              <h2 className="panel-title">{service.pricing.title}</h2>
              <p className="panel-lead">{service.pricing.lead}</p>
              <dl className="cost-list">
                {service.pricing.items.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.text}</dd>
                  </div>
                ))}
              </dl>
              <ButtonLink href={service.cta.href} variant="secondary" className="panel-action">
                {service.cta.label} <ArrowUpRight size={17} />
              </ButtonLink>
            </article>
          </div>
        </Container>
      </Section>
      {service.approach ? (
        <Section id="methode" className="method-section">
          <Container>
            <SectionHeading
              eyebrow="La méthode"
              title={service.approach.title}
              description={service.approach.description}
            />
            <div className="method-grid">
              {service.approach.steps.map((step, index) => (
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
      ) : (
        <MethodSection />
      )}
      <FAQSection
        items={service.faqs}
        eyebrow={`${service.shortName} · Questions fréquentes`}
        title={
          <>
            Vos questions,
            <br />
            en toute clarté.
          </>
        }
      />
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Pour aller plus loin"
            title="Ces services peuvent aussi vous aider."
            action={
              <Link href="/services" className="text-link">
                Tous les services <ArrowUpRight size={17} />
              </Link>
            }
          />
          <ServiceCards items={related} />
        </Container>
      </Section>
      <CTASection />
    </>
  );
}
