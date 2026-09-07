import { ArrowUpRight, Code2, LayoutTemplate, RefreshCw, Settings2 } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { MethodSection } from "@/components/sections/MethodSection";
import { CTASection } from "@/components/sections/CTASection";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Expertises", "/services");
const services = [
  {
    icon: LayoutTemplate,
    number: "01",
    title: "Présenter votre activité.",
    subtitle: "Sites vitrines & pages de lancement",
    description:
      "Votre métier, votre différence et une manière simple de vous contacter. Une présence professionnelle pour rassurer les personnes qui vous découvrent.",
    items: [
      "Structure des pages et parcours",
      "Design adapté à votre identité",
      "Formulaires et référencement essentiel",
    ],
    href: "/offres#vitrine",
    cta: "Découvrir les sites vitrines",
    art: "vitrine",
  },
  {
    icon: Settings2,
    number: "02",
    title: "Faire vivre votre contenu.",
    subtitle: "Sites administrables & publications",
    description:
      "Vos actualités, vos réalisations ou votre catalogue changent. Un espace de gestion vous permet de les mettre à jour sans dépendre d’un développeur au quotidien.",
    items: [
      "Gestion de contenus adaptée à vos besoins",
      "Blog, galerie ou catalogue",
      "Formation et guide de prise en main",
    ],
    href: "/offres#evolutif",
    cta: "Découvrir les sites administrables",
    art: "cms",
  },
  {
    icon: RefreshCw,
    number: "03",
    title: "Donner une suite à l’existant.",
    subtitle: "Refonte, maintenance & amélioration",
    description:
      "Un site qui vieillit ou un parcours qui bloque ? On fait le point avant de changer les choses. Les améliorations sont priorisées selon leur utilité pour votre activité.",
    items: [
      "Audit de l’existant et recommandations",
      "Refonte graphique et corrections",
      "Maintenance corrective et évolutive",
    ],
    href: "/estimation?format=complet&type=refonte",
    cta: "Parler de mon site actuel",
    art: "refonte",
  },
  {
    icon: Code2,
    number: "04",
    title: "Répondre à un besoin précis.",
    subtitle: "Fonctionnalités & applications web",
    description:
      "Réservation, espace client, boutique ou outil interne : un développement spécifique commence par un besoin bien défini et une première version réaliste.",
    items: [
      "Cadrage fonctionnel et étude de faisabilité",
      "Intégration avec vos outils",
      "Développement et déploiement",
    ],
    href: "/estimation?format=complet&type=application",
    cta: "Étudier mon besoin",
    art: "app",
  },
];
export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Expertises"
        title={
          <>
            Du beau, du clair.
            <br />
            <span>Et du concret.</span>
          </>
        }
        description="Du premier site à l’outil qui vous simplifie la vie, chaque choix part de votre activité. La technique vient servir le projet."
      />
      <Container>
        <div className="service-list">
          {services.map((service) => (
            <Section className="service-row" key={service.number}>
              <div className={`service-art service-art--${service.art}`} aria-hidden="true">
                <span className="service-art-number">{service.number} /</span>
                <service.icon size={90} strokeWidth={0.7} />
                <div className="service-art-lines">
                  <i />
                  <i />
                  <i />
                </div>
                <span className="service-art-label">{service.subtitle}</span>
              </div>
              <div className="service-copy">
                <p className="eyebrow">{service.subtitle}</p>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ul className="simple-list">
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ButtonLink href={service.href} variant="secondary">
                  {service.cta} <ArrowUpRight size={17} />
                </ButtonLink>
              </div>
            </Section>
          ))}
        </div>
      </Container>
      <MethodSection />
      <CTASection />
    </>
  );
}
