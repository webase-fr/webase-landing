import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  LayoutTemplate,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { services, servicePath, type Service, type ServiceIcon } from "@/content/services";

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  vitrine: LayoutTemplate,
  boutique: ShoppingBag,
  refonte: RefreshCw,
  application: Code2,
  mobile: Smartphone,
  saas: Rocket,
  seo: Search,
  maintenance: ShieldCheck,
};
/** Crawlable links to every service page: the main internal-linking hub of the site. */
export function ServiceCards({
  items = services,
  headingLevel = "h3",
}: {
  items?: readonly Service[];
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <ul className="service-cards">
      {items.map((service) => {
        const Icon = serviceIcons[service.icon];
        return (
          <li key={service.slug}>
            <Link href={servicePath(service.slug)} className="service-card">
              <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
              <Heading>{service.name}</Heading>
              <p>{service.summary}</p>
              <span className="service-card-link">
                En savoir plus <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
