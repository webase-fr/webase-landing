import { offers, serviceArea, site } from "@/content/site";
import { services, servicePath, type Service } from "@/content/services";
import { absoluteUrl } from "@/lib/metadata";

/**
 * schema.org graph for Webase. Every statement must match visible content (Google
 * structured data policies). No reviews, ratings or phone number until they really exist.
 * The street address is omitted on purpose: Webase serves clients on site or remotely, not at
 * a storefront, consistent with Google Business Profile rules for service-area businesses.
 */
type Node = Record<string, unknown>;
const ids = {
  business: absoluteUrl("/#webase"),
  website: absoluteUrl("/#website"),
  founder: absoluteUrl("/studio#luis-doudeau"),
};
const areaServed = [
  { "@type": "City", name: "Orléans" },
  { "@type": "AdministrativeArea", name: serviceArea.metropolis },
  { "@type": "AdministrativeArea", name: serviceArea.department },
  { "@type": "Country", name: "France" },
];
export function graph(...nodes: Node[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
export function businessNode(): Node {
  return {
    "@type": "LocalBusiness",
    "@id": ids.business,
    name: site.name,
    alternateName: ["Webase Orléans", "WeBase"],
    legalName: site.legalName,
    description: site.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo-webase.svg"),
    image: absoluteUrl("/opengraph-image"),
    email: site.email,
    address: {
      "@type": "PostalAddress",
      postalCode: site.postalAddress.postalCode,
      addressLocality: site.postalAddress.addressLocality,
      addressRegion: site.postalAddress.addressRegion,
      addressCountry: site.postalAddress.addressCountry,
    },
    areaServed,
    founder: { "@id": ids.founder },
    vatID: site.vat,
    taxID: site.siret.replaceAll(" ", ""),
    knowsAbout: [
      "Création de sites internet",
      "Développement d’applications web",
      "Développement d’applications mobiles",
      "Plateformes SaaS",
      "Référencement naturel",
      "Next.js",
      "React",
      "TypeScript",
    ],
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", "@id": serviceId(service), name: service.name },
    })),
    ...(site.profiles.length ? { sameAs: site.profiles } : {}),
  };
}
export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    name: site.name,
    alternateName: ["WeBase", "We base", "webase.fr"],
    url: absoluteUrl("/"),
    inLanguage: "fr-FR",
    publisher: { "@id": ids.business },
  };
}
export function founderNode(): Node {
  return {
    "@type": "Person",
    "@id": ids.founder,
    name: site.owner,
    jobTitle: site.jobTitle,
    url: absoluteUrl("/studio"),
    worksFor: { "@id": ids.business },
    address: { "@type": "PostalAddress", addressLocality: "Orléans", addressCountry: "FR" },
    knowsAbout: ["Next.js", "React", "TypeScript", "Node.js", "Référencement naturel"],
    ...(site.profiles.length ? { sameAs: site.profiles } : {}),
  };
}
function serviceId(service: Pick<Service, "slug">) {
  return absoluteUrl(`${servicePath(service.slug)}#service`);
}
export function serviceNode(service: Service): Node {
  return {
    "@type": "Service",
    "@id": serviceId(service),
    name: service.name,
    serviceType: service.shortName,
    description: service.metaDescription,
    url: absoluteUrl(servicePath(service.slug)),
    provider: { "@id": ids.business },
    areaServed,
    ...(service.pricing.from
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: service.pricing.from,
              priceCurrency: "EUR",
              valueAddedTaxIncluded: false,
            },
          },
        }
      : {}),
  };
}
export function offerCatalogNode(): Node {
  return {
    "@type": "OfferCatalog",
    "@id": absoluteUrl("/offres#catalogue"),
    name: "Offres de création de site internet Webase",
    url: absoluteUrl("/offres"),
    itemListElement: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      offeredBy: { "@id": ids.business },
      description: offer.description,
      url: absoluteUrl(`/offres#${offer.id}`),
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: offer.price,
        priceCurrency: "EUR",
        valueAddedTaxIncluded: false,
      },
      itemOffered: { "@id": serviceId({ slug: "creation-site-vitrine" }) },
    })),
  };
}
export function breadcrumbNode(items: readonly { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
export function articleNode(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
}): Node {
  return {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl("/opengraph-image"),
    inLanguage: "fr-FR",
    author:
      post.author === site.owner
        ? { "@id": ids.founder, name: site.owner, url: absoluteUrl("/studio") }
        : { "@type": "Person", name: post.author },
    publisher: { "@id": ids.business },
  };
}
