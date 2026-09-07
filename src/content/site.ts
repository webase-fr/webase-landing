/** Public business information. Never put secrets in this module. */
export const site = {
  name: "Webase",
  owner: "Luis Doudeau",
  legalName: "DOUDEAU LUIS — Entrepreneur individuel",
  email: "luis.doudeau@gmail.com",
  address: "31 rue des Charretiers, 45000 Orléans, France",
  siren: "999 300 296",
  siret: "999 300 296 00012",
  vat: "FR82999300296",
  city: "Orléans",
  description:
    "Création de sites web pour indépendants, artisans et petites entreprises. Un design soigné, des tarifs clairs et un interlocuteur direct à Orléans, partout en France.",
} as const;

export const navigation = [
  { href: "/services", label: "Expertises" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/offres", label: "Offres & tarifs" },
  { href: "/studio", label: "Le studio" },
] as const;

/** Same starting prices for offer cards, the finder and indicative quotes. */
export const offerStartingPrices = {
  essentiel: 990,
  vitrine: 1990,
  evolutif: 3490,
} as const;

export const offers = [
  {
    id: "essentiel",
    name: "L’essentiel",
    category: "Un premier pas solide",
    price: offerStartingPrices.essentiel,
    description:
      "Une page bien pensée pour présenter votre activité et donner envie de vous contacter.",
    audience: "Indépendants, lancement d’activité, offre unique.",
    timeline: "1 à 2 semaines",
    pages: "1 page, jusqu’à 6 sections",
    featured: false,
    features: [
      "Design adapté à votre identité",
      "Version mobile, tablette et ordinateur",
      "Formulaire de contact fonctionnel",
      "Titres et métadonnées de référencement",
      "1 série de retours sur la maquette",
    ],
  },
  {
    id: "vitrine",
    name: "La vitrine",
    category: "Votre activité, bien présentée",
    price: offerStartingPrices.vitrine,
    description:
      "Un site complet pour expliquer votre savoir-faire, valoriser vos projets et recevoir des demandes.",
    audience: "Artisans, professions de service, petites entreprises.",
    timeline: "3 à 4 semaines",
    pages: "Jusqu’à 5 pages",
    featured: true,
    features: [
      "Maquettes personnalisées",
      "Version mobile, tablette et ordinateur",
      "Galerie de réalisations et formulaire",
      "Structure de référencement local",
      "2 séries de retours sur les maquettes",
    ],
  },
  {
    id: "evolutif",
    name: "L’évolutif",
    category: "La liberté de faire grandir",
    price: offerStartingPrices.evolutif,
    description:
      "Un site que vous faites vivre vous-même, avec un espace pour publier vos contenus simplement.",
    audience: "Entreprises qui publient régulièrement et développent leur activité.",
    timeline: "4 à 6 semaines",
    pages: "Jusqu’à 8 pages + un blog",
    featured: false,
    features: [
      "Tout le socle de l’offre La vitrine",
      "Gestion autonome des contenus",
      "Blog ou collection de réalisations",
      "Formation de prise en main d’1 heure",
      "2 séries de retours sur les maquettes",
    ],
  },
] as const;

export const process = [
  {
    title: "On pose les bonnes questions.",
    text: "Votre activité, vos clients, vos objectifs. On définit ensemble le périmètre, le budget et le calendrier.",
    deliverable: "Un devis détaillé",
  },
  {
    title: "Vous voyez avant de valider.",
    text: "Une direction visuelle et des maquettes concrètes. Vous donnez votre avis avant le développement.",
    deliverable: "Des maquettes à valider",
  },
  {
    title: "Chaque détail prend sa place.",
    text: "Le site est développé, adapté aux écrans et testé. Vous suivez l’avancement sur une adresse de prévisualisation.",
    deliverable: "Un site à tester",
  },
  {
    title: "Votre site. Et les clés avec.",
    text: "Mise en ligne, remise des accès et explications. Les anomalies liées à la livraison sont corrigées pendant 30 jours.",
    deliverable: "Une mise en ligne accompagnée",
  },
] as const;

export const faqs = [
  {
    question: "Je ne sais pas quel type de site il me faut. On en parle ?",
    answer:
      "Bien sûr. Le questionnaire express permet de décrire votre activité et votre objectif, sans vocabulaire technique. Je vous orienterai vers le format adapté, avec un devis gratuit avant tout engagement.",
  },
  {
    question: "Qu’est-ce qui est compris dans le prix ?",
    answer:
      "Le cadrage, le design, le développement, l’adaptation aux écrans, les bases du référencement et l’accompagnement à la mise en ligne. Le nombre de pages et de retours dépend de l’offre. Les textes, photos, achats de licences, le domaine et l’hébergement sont à prévoir séparément, sauf mention au devis.",
  },
  {
    question: "Y a-t-il un abonnement obligatoire ?",
    answer:
      "Non. La création est facturée une fois. Le domaine et l’hébergement restent des frais récurrents à votre nom, auprès des prestataires retenus. Une maintenance facultative est proposée à partir de 59 € HT par mois ; les évolutions font l’objet d’un devis distinct.",
  },
  {
    question: "Est-ce que je garde la main sur mon site ?",
    answer:
      "Oui. Après règlement, vous récupérez les accès et les livrables prévus au contrat. Les licences des outils et ressources tiers continuent de s’appliquer. Avec L’évolutif, une interface et une formation vous permettent de modifier vos contenus vous-même.",
  },
  {
    question: "Comment se déroulent le paiement et la livraison ?",
    answer:
      "Le règlement est réparti en trois étapes : 40 % au démarrage, 30 % à la validation des maquettes et 30 % avant la mise en ligne. Les délais annoncés démarrent à réception des contenus et dépendent de la validation des étapes. Le calendrier définitif figure au devis.",
  },
  {
    question: "Vous pouvez reprendre mon site actuel ?",
    answer:
      "Oui. Je commence par examiner l’existant : contenu, design, fonctionnement et contraintes techniques. L’objectif est de conserver ce qui fonctionne et de chiffrer les améliorations utiles. Les refontes, boutiques et fonctionnalités spécifiques sont étudiées sur devis.",
  },
] as const;
