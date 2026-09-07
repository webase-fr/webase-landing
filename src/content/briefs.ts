/** Shared copy for the homepage, quote entry and in-form format switch. */
export const briefFormats = [
  {
    id: "express",
    name: "Brief express",
    duration: "Moins de 2 min",
    title: "J’ai une première idée.",
    description:
      "Quelques mots suffisent pour ouvrir la discussion. Nous préciserons la suite ensemble.",
    details: [
      "Votre besoin, même encore flou",
      "Votre budget et votre calendrier",
      "Vos coordonnées pour en parler",
    ],
    action: "Commencer le brief express",
    steps: "2 étapes",
  },
  {
    id: "complet",
    name: "Brief complet",
    duration: "5 à 8 min",
    title: "Mon projet est déjà réfléchi.",
    description:
      "Prenons le temps de poser les bonnes bases pour préparer un devis adapté à votre activité.",
    details: [
      "Votre activité et vos objectifs",
      "Les pages, les contenus, les fonctionnalités",
      "Votre budget et vos inspirations",
    ],
    action: "Commencer le brief complet",
    steps: "5 étapes guidées",
  },
] as const;

export type BriefMode = (typeof briefFormats)[number]["id"];
