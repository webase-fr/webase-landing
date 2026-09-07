import { offers } from "@/content/site";

export const siteNeeds = [
  { value: "page", label: "Présenter une offre sur une page" },
  { value: "site", label: "Présenter mon activité sur plusieurs pages" },
  { value: "refonte", label: "Refaire mon site actuel" },
  { value: "advanced", label: "Vendre, réserver ou créer un espace client" },
  { value: "unknown", label: "Je ne sais pas encore" },
] as const;
export const editingNeeds = [
  { value: "yes", label: "Oui, je veux être autonome" },
  { value: "no", label: "Non, je préfère vous confier les mises à jour" },
  { value: "unknown", label: "J’aimerais être conseillé" },
] as const;
export type SiteNeed = (typeof siteNeeds)[number]["value"];
export type EditingNeed = (typeof editingNeeds)[number]["value"];

export function findOffer(need: SiteNeed, editing: EditingNeed) {
  const type =
    need === "page"
      ? "landing"
      : need === "site"
        ? "vitrine"
        : need === "refonte"
          ? "refonte"
          : need === "advanced"
            ? "application"
            : "conseil";
  const params = new URLSearchParams({ format: "complet", type });
  if (need === "refonte" || need === "advanced") {
    return {
      offer: null,
      title: "Un périmètre à construire ensemble.",
      reason:
        need === "refonte"
          ? "Une refonte commence par comprendre l’existant : contenus à conserver, référencement et changements attendus. Un échange permettra de chiffrer le bon périmètre."
          : "Le paiement, la réservation ou un espace client demandent de préciser les usages et les outils. Un devis personnalisé sera plus juste qu’un forfait choisi trop vite.",
      href: `/estimation?${params}`,
    };
  }
  if (need === "unknown" || editing === "unknown") {
    params.set("format", "express");
    return {
      offer: null,
      title: "Commençons par votre besoin.",
      reason:
        "Vous n’avez pas à choisir une solution technique maintenant. Décrivez votre activité : je vous aiderai à trouver le format adapté.",
      href: `/estimation?${params}`,
    };
  }
  const id = editing === "yes" ? "evolutif" : need === "page" ? "essentiel" : "vitrine";
  const offer = offers.find((item) => item.id === id)!;
  params.set("offre", id);
  return {
    offer,
    title: `${offer.name}, un bon point de départ.`,
    reason:
      editing === "yes"
        ? "L’interface de gestion et la formation vous permettent de publier vos contenus vous-même. Le nombre de pages sera adapté à votre besoin."
        : need === "page"
          ? "Une page structurée suffit pour présenter une offre, rassurer et faciliter la prise de contact. Vous pourrez faire évoluer le site ensuite."
          : "Plusieurs pages permettent de présenter vos services, vos réalisations et votre activité en détail, avec un parcours clair vers la prise de contact.",
    href: `/estimation?${params}`,
  };
}
