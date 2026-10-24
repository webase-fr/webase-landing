import { offerStartingPrices } from "@/content/site";
import { formatPrice } from "@/lib/estimate";

/**
 * One entry = one page under /services/<slug>, targeting one distinct search intent.
 * Keep each page specific: no city variants, no duplicated paragraphs between services.
 * Prices must come from `offerStartingPrices` or stay "sur devis".
 */
export type ServiceArt = "vitrine" | "cms" | "refonte" | "app";
export type ServiceIcon =
  "vitrine" | "boutique" | "refonte" | "application" | "mobile" | "saas" | "seo" | "maintenance";
export type Service = {
  slug: string;
  /** Precise service name, used in breadcrumbs, structured data and footer links. */
  name: string;
  shortName: string;
  icon: ServiceIcon;
  art: ServiceArt;
  metaTitle: string;
  metaDescription: string;
  title: readonly [string, string];
  intro: string;
  /** Hub and home cards. */
  hubTitle: string;
  summary: string;
  highlights: readonly [string, string, string];
  needsTitle: string;
  needs: readonly { title: string; text: string }[];
  includedTitle: string;
  included: readonly string[];
  pricing: {
    title: string;
    lead: string;
    items: readonly { label: string; text: string }[];
    /** Lowest public starting price, mirrored in structured data. */
    from?: number;
  };
  approach?: {
    title: string;
    description: string;
    steps: readonly { title: string; text: string; deliverable: string }[];
  };
  technology?: string;
  faqs: readonly { question: string; answer: string }[];
  related: readonly string[];
  cta: { label: string; href: string };
};

export const services = [
  {
    slug: "creation-site-vitrine",
    name: "Création de site vitrine",
    shortName: "Site vitrine",
    icon: "vitrine",
    art: "vitrine",
    metaTitle: "Création de site vitrine à Orléans",
    metaDescription:
      "Création de site vitrine sur mesure à Orléans pour artisans, indépendants et TPE : design personnalisé, mobile, référencement local. Dès 990 € HT, devis gratuit.",
    title: ["Un site vitrine", "qui donne envie d’appeler."],
    intro:
      "Présenter votre métier, rassurer les personnes qui vous découvrent et recevoir des demandes : je conçois et développe des sites vitrines sur mesure pour les artisans, indépendants et petites entreprises d’Orléans et du Loiret.",
    hubTitle: "Présenter votre activité.",
    summary:
      "Votre métier, votre différence et une manière simple de vous contacter. Une présence professionnelle de 1 à 8 pages pour rassurer et recevoir des demandes.",
    highlights: [
      "Design adapté à votre identité",
      "Version mobile soignée",
      "Bases du référencement local",
    ],
    needsTitle: "Un site vitrine, pour qui et pour quoi faire ?",
    needs: [
      {
        title: "Vous lancez votre activité.",
        text: "Une page bien construite suffit souvent pour présenter une offre, inspirer confiance et laisser un moyen de contact simple. L’offre L’essentiel est pensée pour ce cas.",
      },
      {
        title: "Votre bouche-à-oreille mérite un relais.",
        text: "Vos clients vous recommandent, puis vous cherchent sur Google. Le site confirme votre sérieux : prestations, réalisations, zone d’intervention et contact.",
      },
      {
        title: "Vous voulez publier vous-même.",
        text: "Actualités, réalisations, nouvelles prestations : avec une interface de gestion, vous mettez vos contenus à jour sans dépendre d’un développeur.",
      },
    ],
    includedTitle: "Ce que comprend la création de votre site vitrine",
    included: [
      "Un échange de cadrage et l’arborescence des pages",
      "Des maquettes personnalisées, validées avant le développement",
      "Un site adapté au mobile, à la tablette et à l’ordinateur",
      "Un formulaire de contact testé, relié à votre messagerie",
      "Les bases du référencement : titres, descriptions, structure et informations locales",
      "Un site rapide, sans constructeur de pages ni extensions superflues",
      "La mise en ligne, la remise des accès et 30 jours de corrections",
    ],
    pricing: {
      title: "Combien coûte un site vitrine ?",
      lead: "Trois points de départ, ajustés au devis selon votre besoin réel.",
      from: offerStartingPrices.essentiel,
      items: [
        {
          label: `L’essentiel · dès ${formatPrice(offerStartingPrices.essentiel)} HT`,
          text: "Une page jusqu’à 6 sections. Délai indicatif : 1 à 2 semaines.",
        },
        {
          label: `La vitrine · dès ${formatPrice(offerStartingPrices.vitrine)} HT`,
          text: "Jusqu’à 5 pages, galerie de réalisations et formulaire. Délai indicatif : 3 à 4 semaines.",
        },
        {
          label: `L’évolutif · dès ${formatPrice(offerStartingPrices.evolutif)} HT`,
          text: "Jusqu’à 8 pages, contenus administrables, blog et formation. Délai indicatif : 4 à 6 semaines.",
        },
      ],
    },
    faqs: [
      {
        question: "Quelle différence entre un site vitrine et un site e-commerce ?",
        answer:
          "Un site vitrine présente votre activité et génère des prises de contact ; il ne vend pas en ligne. Un site e-commerce ajoute un catalogue, un panier, le paiement et la gestion des commandes. Si vous envisagez de vendre plus tard, la structure du site vitrine peut être prévue pour évoluer.",
      },
      {
        question: "Mon site vitrine sera-t-il visible sur Google ?",
        answer:
          "Le site est livré avec une structure propre : titres et descriptions de pages, adresses lisibles, sitemap, données structurées et performances soignées. C’est la base indispensable, mais personne ne peut garantir une position. La visibilité locale dépend aussi de votre fiche Google Business Profile, de vos avis clients et de contenus utiles dans la durée.",
      },
      {
        question: "Combien de temps faut-il pour créer un site vitrine ?",
        answer:
          "Comptez 1 à 2 semaines pour une page, 3 à 4 semaines pour un site de 5 pages et 4 à 6 semaines pour un site administrable. Les délais démarrent à réception des contenus et dépendent de vos validations.",
      },
      {
        question: "Je n’ai pas encore de textes ni de photos. Est-ce un problème ?",
        answer:
          "Non, mais ils conditionnent le calendrier. Je vous indique ce qu’il faut préparer pour chaque page. La rédaction ou la photographie peuvent être chiffrées séparément si vous préférez les confier.",
      },
      {
        question: "Quelle technologie utilisez-vous ?",
        answer:
          "Le choix dépend de votre besoin. Un site développé sur mesure est rapide, sûr et sobre en maintenance ; une interface de gestion de contenus est ajoutée quand vous devez publier vous-même. La solution retenue et ses coûts récurrents sont expliqués dans le devis.",
      },
    ],
    related: ["referencement-seo", "creation-site-e-commerce", "maintenance-site-internet"],
    cta: { label: "Estimer mon site vitrine", href: "/estimation?format=express&type=vitrine" },
  },
  {
    slug: "creation-site-e-commerce",
    name: "Création de site e-commerce",
    shortName: "Site e-commerce",
    icon: "boutique",
    art: "cms",
    metaTitle: "Création de site e-commerce à Orléans",
    metaDescription:
      "Boutique en ligne sur mesure à Orléans : catalogue, paiement sécurisé, livraison ou retrait sur place, gestion des commandes. Cadrage précis et devis détaillé.",
    title: ["Vendre en ligne,", "sans perdre le fil."],
    intro:
      "Commerçant, artisan ou créateur, vous voulez prendre des commandes sur internet ? Je conçois des boutiques en ligne adaptées à votre catalogue, à votre logistique et au temps que vous pouvez y consacrer chaque semaine.",
    hubTitle: "Vendre en ligne.",
    summary:
      "Un catalogue clair, un paiement sécurisé et une gestion des commandes adaptée à votre organisation, du click & collect à l’expédition.",
    highlights: ["Catalogue et fiches produits", "Paiement sécurisé", "Livraison ou retrait"],
    needsTitle: "Une boutique en ligne adaptée à votre commerce",
    needs: [
      {
        title: "Prolonger votre boutique physique.",
        text: "Click & collect, retrait sur place ou livraison locale dans l’agglomération : le site complète votre point de vente au lieu de le concurrencer.",
      },
      {
        title: "Lancer une marque en ligne.",
        text: "Un catalogue lisible, des fiches produits soignées et un parcours d’achat simple, pensé d’abord pour le téléphone.",
      },
      {
        title: "Reprendre une boutique qui freine.",
        text: "Lenteurs, paniers abandonnés, stocks gérés à la main : on identifie les blocages avant de proposer une amélioration ou une migration.",
      },
    ],
    includedTitle: "Ce que comprend la création de votre boutique",
    included: [
      "Le cadrage du catalogue, des variantes, des frais de port et de la TVA",
      "Le choix argumenté de la solution : plateforme e-commerce éprouvée ou développement sur mesure",
      "Des fiches produits, un panier et un parcours de commande pensés pour le mobile",
      "Le paiement sécurisé via un prestataire spécialisé",
      "Les e-mails de commande, le suivi des expéditions et la gestion des stocks",
      "Les emplacements prévus pour vos CGV, conditions de livraison et de rétractation",
      "Le référencement des catégories et des fiches produits",
      "Une formation à la gestion quotidienne de la boutique",
    ],
    pricing: {
      title: "Quel budget pour un site e-commerce ?",
      lead: "Chaque boutique est chiffrée sur devis, après un échange de cadrage.",
      items: [
        {
          label: "Ce qui fait varier le prix",
          text: "Le nombre de produits et de variantes, les modes de livraison, les intégrations (stock, comptabilité, transporteur) et la solution retenue.",
        },
        {
          label: "Les frais récurrents à prévoir",
          text: "L’abonnement de la plateforme le cas échéant, les commissions du prestataire de paiement, l’hébergement et le nom de domaine.",
        },
        {
          label: "Ce que vous fournissez",
          text: "Les photos et descriptions des produits, vos conditions générales de vente et vos informations de livraison. La rédaction juridique n’est pas incluse.",
        },
      ],
    },
    faqs: [
      {
        question: "Plateforme e-commerce ou développement sur mesure : que choisir ?",
        answer:
          "Une plateforme du marché convient à la plupart des catalogues classiques et limite le coût de départ, avec un abonnement ou des modules à prévoir. Le sur-mesure se justifie pour un parcours d’achat spécifique, des règles de prix complexes ou une intégration poussée avec vos outils. Les deux options sont comparées, coûts récurrents compris, avant de décider.",
      },
      {
        question: "Puis-je proposer le retrait sur place ou la livraison locale ?",
        answer:
          "Oui. Retrait en boutique, livraison sur une zone définie autour d’Orléans ou expédition partout en France : les modes de livraison et leurs tarifs sont paramétrés selon votre organisation.",
      },
      {
        question: "Qui gère les paiements et la sécurité des cartes bancaires ?",
        answer:
          "Les paiements passent par un prestataire spécialisé et certifié pour le traitement des cartes. Les données bancaires ne sont pas stockées sur votre site. Vous recevez les fonds sur votre compte selon les conditions du prestataire.",
      },
      {
        question: "Combien de temps faut-il pour lancer une boutique en ligne ?",
        answer:
          "Le délai dépend surtout de la taille du catalogue et de la préparation des fiches produits. Le calendrier précis figure au devis, avec les étapes de validation et la date de mise en ligne visée.",
      },
    ],
    related: ["creation-site-vitrine", "referencement-seo", "maintenance-site-internet"],
    cta: { label: "Parler de ma boutique", href: "/estimation?format=complet&type=boutique" },
  },
  {
    slug: "refonte-site-internet",
    name: "Refonte de site internet",
    shortName: "Refonte",
    icon: "refonte",
    art: "refonte",
    metaTitle: "Refonte de site internet à Orléans",
    metaDescription:
      "Site lent, daté ou qui ne génère plus de contacts ? Audit de l’existant, refonte du design et du code, migration sans perte de référencement. Devis gratuit.",
    title: ["Refaire votre site,", "sans repartir de zéro."],
    intro:
      "Un site qui a vieilli, qui s’affiche mal sur mobile ou qui ne vous apporte plus de demandes n’est pas forcément à jeter. Je commence par comprendre ce qui fonctionne, ce qui bloque et ce qu’il faut préserver, à commencer par votre référencement.",
    hubTitle: "Donner une suite à l’existant.",
    summary:
      "Un site qui vieillit ou un parcours qui bloque ? On fait le point avant de changer les choses, en préservant ce qui fonctionne et le trafic déjà acquis.",
    highlights: [
      "Audit de l’existant",
      "Nouveau design et nouveau code",
      "Redirections maîtrisées",
    ],
    needsTitle: "Quand faut-il refaire son site internet ?",
    needs: [
      {
        title: "Votre site ne vous ressemble plus.",
        text: "Votre activité a évolué, votre site non. Nouvelles prestations, nouvelle identité, nouveaux clients : la refonte remet votre discours à jour.",
      },
      {
        title: "Il est lent ou difficile à utiliser.",
        text: "Pages lourdes, menu confus, formulaire capricieux sur mobile : chaque frein vous coûte des prises de contact.",
      },
      {
        title: "Vous ne pouvez plus le modifier.",
        text: "Prestataire injoignable, outil abandonné, extensions obsolètes : on reprend la main sur le site et sur ses accès.",
      },
    ],
    includedTitle: "Les étapes d’une refonte bien préparée",
    included: [
      "Un audit de l’existant : contenus, parcours, performance, référencement et technique",
      "L’inventaire des pages et des adresses déjà référencées",
      "Une nouvelle arborescence et de nouvelles maquettes",
      "La reprise et la réécriture des contenus utiles",
      "Un plan de redirections 301 pour conserver le trafic acquis",
      "La mesure des performances avant et après la refonte",
      "Une mise en ligne contrôlée et le suivi de l’indexation dans Google Search Console",
    ],
    pricing: {
      title: "Combien coûte une refonte de site ?",
      lead: "Une refonte est chiffrée après examen de l’existant.",
      items: [
        {
          label: "Ce qui fait varier le prix",
          text: "Le volume de contenus à reprendre, le nombre de pages, les fonctionnalités à conserver et la migration éventuelle vers une autre solution.",
        },
        {
          label: "Un repère utile",
          text: `Pour un périmètre comparable, les offres de création servent de base : dès ${formatPrice(offerStartingPrices.vitrine)} HT pour un site jusqu’à 5 pages, ajusté selon l’existant.`,
        },
        {
          label: "Parfois, pas besoin de tout refaire",
          text: "Des corrections ciblées (vitesse, mobile, formulaire, contenus) suffisent quand la base est saine. L’audit sert aussi à le savoir.",
        },
      ],
    },
    faqs: [
      {
        question: "Vais-je perdre mon référencement avec une refonte ?",
        answer:
          "C’est le principal risque d’une refonte mal préparée. Les adresses existantes sont inventoriées, chaque ancienne page utile est redirigée vers sa nouvelle version et l’indexation est suivie après la mise en ligne. Une baisse temporaire reste possible ; une migration méthodique la limite.",
      },
      {
        question: "Puis-je garder mon nom de domaine et mes adresses e-mail ?",
        answer:
          "Oui. Le domaine reste le vôtre ; seuls les enregistrements nécessaires au nouveau site sont modifiés. Les e-mails associés au domaine sont vérifiés avant la bascule pour éviter toute interruption.",
      },
      {
        question: "Mon site est sous WordPress, Wix ou un autre outil. Pouvez-vous le reprendre ?",
        answer:
          "L’audit commence quel que soit l’outil. Selon le résultat, on améliore l’existant ou on migre vers une solution plus adaptée. Le choix est argumenté, sans changement imposé.",
      },
      {
        question: "Faut-il forcément tout refaire ?",
        answer:
          "Non. Quand la base est saine, des corrections ciblées coûtent moins cher et donnent des résultats plus rapides. L’audit permet d’éviter une refonte complète quand elle n’est pas utile.",
      },
    ],
    related: ["referencement-seo", "maintenance-site-internet", "creation-site-vitrine"],
    cta: { label: "Faire le point sur mon site", href: "/estimation?format=complet&type=refonte" },
  },
  {
    slug: "developpement-application-web",
    name: "Développement d’application web sur mesure",
    shortName: "Application web",
    icon: "application",
    art: "app",
    metaTitle: "Développement d’application web sur mesure à Orléans",
    metaDescription:
      "Applications web, logiciels métier, espaces clients, outils internes et automatisations sur mesure à Orléans. Développement full-stack TypeScript, React et Next.js.",
    title: ["Un outil taillé", "pour votre façon de travailler."],
    intro:
      "Tableurs partagés, ressaisies, échanges d’e-mails à rallonge : quand les outils du marché ne collent pas à votre organisation, une application web sur mesure fait gagner un temps précieux. Je conçois et développe des applications fiables, accessibles depuis un navigateur, sur ordinateur comme sur mobile.",
    hubTitle: "Répondre à un besoin précis.",
    summary:
      "Outil interne, espace client, réservation ou logiciel métier : un développement spécifique qui commence par un besoin bien défini et une première version réaliste.",
    highlights: ["Cadrage fonctionnel", "Intégration avec vos outils", "Développement full-stack"],
    needsTitle: "Ce qu’une application web peut changer pour vous",
    needs: [
      {
        title: "Un outil interne.",
        text: "Suivi d’interventions, planning, devis, stock ou tableau de bord : une interface unique à la place des fichiers dispersés.",
      },
      {
        title: "Un espace client ou partenaire.",
        text: "Vos clients consultent leurs documents, suivent une commande, réservent ou échangent avec vous dans un espace sécurisé.",
      },
      {
        title: "Des outils qui se parlent.",
        text: "Connexion à votre CRM, à votre outil de facturation, à un agenda ou à une API : les données circulent sans ressaisie et les tâches répétitives s’automatisent.",
      },
    ],
    includedTitle: "Ce que comprend le développement de votre application",
    included: [
      "Un atelier de cadrage : utilisateurs, parcours, règles métier et priorités",
      "Les maquettes des écrans clés, validées avant le développement",
      "Le développement full-stack : interface, serveur, base de données et API",
      "L’authentification, les rôles et les droits d’accès",
      "Les intégrations avec vos outils existants et les automatisations",
      "Des tests automatisés sur les parcours critiques",
      "Le déploiement, les sauvegardes et la documentation technique",
      "La remise du code source et des accès selon le contrat",
    ],
    technology:
      "Technologies principales : TypeScript, React, Next.js et Node.js, avec une base de données adaptée au projet. Ce sont des technologies répandues et documentées : votre application reste maintenable, y compris par une autre équipe.",
    pricing: {
      title: "Quel budget pour une application web ?",
      lead: "Une application se chiffre à partir de ses fonctionnalités, après cadrage.",
      items: [
        {
          label: "Commencer par l’essentiel",
          text: "Une première version centrée sur les usages prioritaires, puis des évolutions décidées à partir de l’usage réel. Le budget reste maîtrisé à chaque étape.",
        },
        {
          label: "Ce qui fait varier le prix",
          text: "Le nombre d’écrans et de rôles, la complexité des règles métier, les intégrations et les exigences de sécurité ou d’hébergement.",
        },
        {
          label: "Les coûts récurrents",
          text: "Hébergement, base de données, services tiers éventuels et maintenance. Ils sont estimés dès le devis pour éviter les surprises.",
        },
      ],
    },
    approach: {
      title: "Une méthode pour livrer un outil vraiment utilisé",
      description:
        "Des étapes courtes, des versions testables et des décisions prises à partir de l’usage réel.",
      steps: [
        {
          title: "Comprendre le métier.",
          text: "Qui utilise l’outil, pour faire quoi, avec quelles contraintes ? On écrit les parcours et les règles avant le code.",
          deliverable: "Un périmètre priorisé",
        },
        {
          title: "Valider les écrans.",
          text: "Les maquettes des écrans principaux permettent de corriger le tir tôt, quand c’est encore peu coûteux.",
          deliverable: "Des maquettes validées",
        },
        {
          title: "Livrer par étapes.",
          text: "Le développement avance par lots fonctionnels, testables sur un environnement de démonstration.",
          deliverable: "Des versions à tester",
        },
        {
          title: "Mettre en service, puis améliorer.",
          text: "Déploiement, prise en main, documentation, puis évolutions selon les retours des utilisateurs.",
          deliverable: "Une application en production",
        },
      ],
    },
    faqs: [
      {
        question: "Quelle différence entre une application web et un site internet ?",
        answer:
          "Un site internet présente des informations. Une application web permet d’agir : se connecter, saisir, calculer, réserver, suivre un dossier. Elle fonctionne dans le navigateur, sans installation, sur ordinateur, tablette et téléphone.",
      },
      {
        question: "Application web ou application mobile : que choisir ?",
        answer:
          "Une application web est accessible partout via un lien et se met à jour instantanément ; c’est souvent le meilleur point de départ. Une application mobile installée se justifie pour un usage très fréquent, les notifications, l’appareil photo, le mode hors connexion ou une présence sur les stores. Les deux peuvent partager le même serveur.",
      },
      {
        question: "Serai-je propriétaire du code ?",
        answer:
          "Les droits cédés, la remise du code source et des accès sont définis au contrat. L’objectif est que vous ne dépendiez pas d’un prestataire unique : code structuré, documenté et technologies répandues.",
      },
      {
        question: "Pouvez-vous reprendre une application existante ?",
        answer:
          "Oui, après un audit du code et de l’infrastructure. Il permet de savoir s’il vaut mieux corriger, faire évoluer progressivement ou reconstruire certaines parties.",
      },
      {
        question: "Comment mes données sont-elles protégées ?",
        answer:
          "La sécurité est traitée dès la conception : authentification, droits par rôle, échanges chiffrés, validation des données, sauvegardes et hébergement choisi selon vos contraintes, en Europe lorsque c’est nécessaire.",
      },
    ],
    related: ["developpement-saas-mvp", "creation-application-mobile", "maintenance-site-internet"],
    cta: { label: "Étudier mon besoin", href: "/estimation?format=complet&type=application" },
  },
  {
    slug: "creation-application-mobile",
    name: "Création d’application mobile iOS et Android",
    shortName: "Application mobile",
    icon: "mobile",
    art: "vitrine",
    metaTitle: "Création d’application mobile iOS et Android à Orléans",
    metaDescription:
      "Développement d’applications mobiles iOS et Android à Orléans : cadrage, design, développement multiplateforme, publication sur l’App Store et Google Play, suivi.",
    title: ["Votre application,", "dans la poche de vos clients."],
    intro:
      "Une application mobile se justifie quand vos utilisateurs reviennent souvent, ont besoin de notifications, de l’appareil photo, de la géolocalisation ou d’un fonctionnement hors connexion. J’accompagne la conception et le développement d’applications iOS et Android, de la première version à la publication sur les stores.",
    hubTitle: "Être sur l’écran d’accueil.",
    summary:
      "Une application iOS et Android pour vos clients ou vos équipes terrain, développée sur une base de code commune et publiée sur les stores à votre nom.",
    highlights: ["iOS et Android", "Publication sur les stores", "Back-office connecté"],
    needsTitle: "Dans quels cas créer une application mobile ?",
    needs: [
      {
        title: "Fidéliser vos clients.",
        text: "Réservation, carte de fidélité, suivi de commande ou contenus réservés : un accès direct depuis l’écran d’accueil du téléphone.",
      },
      {
        title: "Équiper vos équipes terrain.",
        text: "Rapports d’intervention, photos, signatures, check-lists : vos équipes saisissent sur place, même avec une connexion fragile.",
      },
      {
        title: "Lancer un produit.",
        text: "Une application grand public ou professionnelle, testée auprès de premiers utilisateurs avant d’investir davantage.",
      },
    ],
    includedTitle: "Ce que comprend la création de votre application mobile",
    included: [
      "Le cadrage : usages, fonctionnalités prioritaires et modèle de publication",
      "Des maquettes respectant les conventions d’iOS et d’Android",
      "Un développement multiplateforme : une base de code pour iOS et Android",
      "Un back-office ou une API pour gérer les contenus et les données",
      "Notifications, authentification et paiements intégrés selon le besoin",
      "Des tests sur appareils réels et des versions bêta",
      "La publication sur l’App Store et Google Play",
      "Le suivi des évolutions des systèmes et des règles des stores",
    ],
    technology:
      "Le développement multiplateforme avec React Native partage l’essentiel du code entre iOS et Android, ce qui réduit le coût initial et simplifie la maintenance. L’application peut s’appuyer sur le même serveur qu’une application web ou un site existant.",
    pricing: {
      title: "Combien coûte une application mobile ?",
      lead: "Chaque application est chiffrée sur devis, à partir d’une première version priorisée.",
      items: [
        {
          label: "Ce qui fait varier le prix",
          text: "Le nombre d’écrans, les fonctions natives utilisées (caméra, localisation, hors connexion), le back-office et les intégrations.",
        },
        {
          label: "Les frais des stores",
          text: "Un compte Apple Developer, facturé chaque année, et un compte Google Play Console, payé une fois. Ils sont ouverts à votre nom.",
        },
        {
          label: "Après la publication",
          text: "Hébergement du serveur, services tiers éventuels et maintenance pour suivre les nouvelles versions d’iOS et d’Android.",
        },
      ],
    },
    approach: {
      title: "De l’idée à la publication sur les stores",
      description:
        "Une première version utile, testée par de vrais utilisateurs avant la publication.",
      steps: [
        {
          title: "Cadrer les usages.",
          text: "Qui ouvre l’application, à quel moment et pour quoi faire ? On garde l’essentiel pour la première version.",
          deliverable: "Un périmètre de V1",
        },
        {
          title: "Prototyper.",
          text: "Les écrans clés sont maquettés et validés avec vous, selon les conventions de chaque système.",
          deliverable: "Des maquettes validées",
        },
        {
          title: "Tester en bêta.",
          text: "L’application est installée sur des téléphones réels via les programmes de test d’Apple et de Google.",
          deliverable: "Une version bêta",
        },
        {
          title: "Publier et suivre.",
          text: "Préparation des fiches des stores, soumission, puis mises à jour selon les retours et les évolutions des systèmes.",
          deliverable: "Une application publiée",
        },
      ],
    },
    faqs: [
      {
        question: "Faut-il développer deux applications, une pour iOS et une pour Android ?",
        answer:
          "Pas nécessairement. Une approche multiplateforme partage l’essentiel du code entre les deux systèmes, ce qui réduit les coûts et simplifie la maintenance. Un développement natif séparé reste pertinent pour des besoins très spécifiques.",
      },
      {
        question: "Une application web progressive (PWA) peut-elle suffire ?",
        answer:
          "Parfois, oui. Une PWA s’installe depuis le navigateur, peut fonctionner en partie hors connexion et évite la validation des stores. Elle a des limites, notamment sur iPhone. On choisit selon vos usages.",
      },
      {
        question: "Combien de temps faut-il pour publier une application ?",
        answer:
          "Le calendrier dépend du périmètre de la première version. Après le développement et les tests, l’examen par Apple et Google prend généralement de quelques heures à quelques jours, avec parfois des ajustements demandés.",
      },
      {
        question: "À quel nom l’application est-elle publiée ?",
        answer:
          "Au vôtre. L’application est publiée sur vos comptes développeur. Je vous accompagne pour leur création et je prépare les fiches des stores : captures, textes et informations de confidentialité.",
      },
      {
        question: "Que se passe-t-il après la publication ?",
        answer:
          "iOS et Android évoluent chaque année. Une maintenance garde l’application compatible, corrige les anomalies et ajoute des fonctionnalités selon les retours des utilisateurs.",
      },
    ],
    related: [
      "developpement-application-web",
      "developpement-saas-mvp",
      "maintenance-site-internet",
    ],
    cta: {
      label: "Parler de mon application",
      href: "/estimation?format=complet&type=application",
    },
  },
  {
    slug: "developpement-saas-mvp",
    name: "Développement SaaS et création de MVP",
    shortName: "SaaS & MVP",
    icon: "saas",
    art: "app",
    metaTitle: "Développement SaaS et création de MVP à Orléans",
    metaDescription:
      "Vous lancez un logiciel en ligne ? Atelier produit, MVP, plateforme SaaS, abonnements, déploiement et évolutions. Développeur full-stack à Orléans.",
    title: ["De l’idée au produit,", "une version après l’autre."],
    intro:
      "Porteur de projet, startup ou entreprise qui veut proposer son savoir-faire sous forme de logiciel : je vous aide à transformer une idée en produit en ligne. On commence par un MVP, une première version utile et mesurable, avant d’investir dans la suite.",
    hubTitle: "Lancer votre produit.",
    summary:
      "Un MVP pour tester votre idée, puis une plateforme SaaS solide : comptes, abonnements, administration et déploiement continu.",
    highlights: ["Atelier produit", "MVP mesurable", "Abonnements et paiements"],
    needsTitle: "Un accompagnement technique pour les créateurs de produits",
    needs: [
      {
        title: "Tester une idée rapidement.",
        text: "Un MVP centré sur le problème principal, pour obtenir les premiers retours d’utilisateurs et, idéalement, de premiers clients.",
      },
      {
        title: "Construire une plateforme.",
        text: "Comptes, organisations, rôles, abonnements et tableau de bord d’administration : les fondations d’un SaaS durable.",
      },
      {
        title: "Reprendre un prototype.",
        text: "Un prototype no-code ou un premier code qui atteint ses limites : on stabilise, on sécurise et on prépare la croissance.",
      },
    ],
    includedTitle: "Ce que comprend le développement de votre SaaS",
    included: [
      "Un atelier produit : problème, utilisateurs, proposition de valeur et périmètre du MVP",
      "Une architecture évolutive et des choix techniques argumentés",
      "Les comptes utilisateurs, les équipes et la gestion des droits",
      "Les abonnements et paiements récurrents",
      "Un back-office d’administration et des indicateurs clés",
      "Les e-mails transactionnels et les notifications",
      "Un déploiement continu, avec environnements de test et de production",
      "La mesure d’usage pour décider des prochaines fonctionnalités",
    ],
    technology:
      "Une base TypeScript de bout en bout (React, Next.js, Node.js) pour avancer vite sans sacrifier la qualité : un seul langage, des tests automatisés et un code que d’autres développeurs pourront reprendre quand votre équipe grandira.",
    pricing: {
      title: "Comment est chiffré un MVP ?",
      lead: "Sur devis, par étapes : vous gardez la maîtrise du budget.",
      items: [
        {
          label: "Le MVP",
          text: "Un devis détaillé sur un périmètre priorisé lors de l’atelier produit, avec un calendrier et des livrables définis.",
        },
        {
          label: "Les évolutions",
          text: "Chiffrées par lots, à partir des retours des utilisateurs et des indicateurs d’usage.",
        },
        {
          label: "Les coûts d’exploitation",
          text: "Hébergement, base de données, envoi d’e-mails, paiement : estimés dès le départ et proportionnés au nombre d’utilisateurs.",
        },
      ],
    },
    approach: {
      title: "Du premier atelier aux premiers clients",
      description: "Chaque étape réduit une incertitude avant d’engager la suivante.",
      steps: [
        {
          title: "Définir le plus petit produit utile.",
          text: "On identifie le problème principal, les premiers utilisateurs et ce qui peut attendre une version suivante.",
          deliverable: "Un périmètre de MVP",
        },
        {
          title: "Construire les fondations.",
          text: "Comptes, données, sécurité et déploiement : des bases saines pour ne pas tout reprendre ensuite.",
          deliverable: "Une architecture documentée",
        },
        {
          title: "Lancer auprès des premiers utilisateurs.",
          text: "Mise en production, accompagnement des premiers comptes et collecte des retours.",
          deliverable: "Un MVP en ligne",
        },
        {
          title: "Itérer à partir des données.",
          text: "Les prochaines fonctionnalités sont choisies selon l’usage réel, pas selon les intuitions de départ.",
          deliverable: "Une feuille de route",
        },
      ],
    },
    faqs: [
      {
        question: "Qu’est-ce qu’un MVP ?",
        answer:
          "Un MVP, ou produit minimum viable, est la première version d’un produit qui résout le problème principal de ses utilisateurs, sans les fonctions secondaires. Il permet de vérifier l’intérêt du marché avant d’investir dans un développement complet.",
      },
      {
        question: "Combien de temps faut-il pour développer un MVP ?",
        answer:
          "Tout dépend du périmètre. Un MVP doit justement rester court : on retire tout ce qui n’est pas indispensable pour atteindre les premiers utilisateurs. Le calendrier est fixé au devis, après l’atelier de cadrage.",
      },
      {
        question: "No-code ou développement sur mesure ?",
        answer:
          "Les outils no-code permettent de tester très vite, mais montrent leurs limites sur la performance, les coûts à grande échelle ou les règles métier. Le sur-mesure demande un investissement initial plus élevé et offre une liberté complète. Commencer en no-code puis migrer reste une option raisonnable.",
      },
      {
        question: "Pouvez-vous accompagner un fondateur sans équipe technique ?",
        answer:
          "Oui. Je traduis les besoins en choix techniques, j’explique les arbitrages et je documente le produit pour qu’une future équipe puisse le reprendre sans repartir de zéro.",
      },
    ],
    related: [
      "developpement-application-web",
      "creation-application-mobile",
      "maintenance-site-internet",
    ],
    cta: { label: "Présenter mon projet", href: "/estimation?format=complet&type=application" },
  },
  {
    slug: "referencement-seo",
    name: "Référencement naturel (SEO)",
    shortName: "Référencement SEO",
    icon: "seo",
    art: "cms",
    metaTitle: "Référencement naturel SEO à Orléans",
    metaDescription:
      "Audit SEO, optimisation technique, contenus et référencement local à Orléans : améliorez la visibilité de votre site sur Google, sans promesse irréaliste.",
    title: ["Être trouvé", "par les bons clients."],
    intro:
      "Un beau site ne suffit pas : encore faut-il que vos futurs clients le trouvent quand ils cherchent vos services à Orléans et aux alentours. J’améliore les fondations techniques, la structure et les contenus de votre site, et je vous aide à renforcer votre présence locale.",
    hubTitle: "Être trouvé sur Google.",
    summary:
      "Audit technique, contenus utiles et référencement local : une visibilité durable sur les recherches de vos futurs clients, sans promesse irréaliste.",
    highlights: ["Audit technique", "Contenus et structure", "Référencement local"],
    needsTitle: "Le référencement naturel, quand et pourquoi ?",
    needs: [
      {
        title: "Votre site est introuvable.",
        text: "Il n’apparaît pas quand on cherche votre métier et votre ville, parfois même pas sur votre propre nom.",
      },
      {
        title: "Vous lancez un nouveau site.",
        text: "Intégrer le référencement dès la conception évite des corrections coûteuses : structure, contenus et performances.",
      },
      {
        title: "Vous dépendez de la publicité.",
        text: "Le référencement naturel construit une visibilité durable, complémentaire des annonces payantes.",
      },
    ],
    includedTitle: "Ce que comprend l’accompagnement SEO",
    included: [
      "Un audit technique : indexation, vitesse, mobile, erreurs et données structurées",
      "L’analyse des recherches réellement effectuées par vos clients",
      "L’optimisation des titres, descriptions, contenus et liens internes",
      "Des pages de services claires, sans bourrage de mots-clés",
      "Le référencement local : cohérence des coordonnées, fiche Google Business Profile, avis authentiques",
      "La configuration de Google Search Console et le suivi des performances",
      "Un plan d’actions priorisé et compréhensible",
    ],
    pricing: {
      title: "Quel budget pour le référencement ?",
      lead: "Sur devis, selon votre site et vos objectifs.",
      items: [
        {
          label: "Un audit ponctuel",
          text: "Un état des lieux technique et éditorial, avec des recommandations priorisées que vous pouvez appliquer vous-même ou me confier.",
        },
        {
          label: "Un accompagnement suivi",
          text: "Corrections, contenus et suivi des résultats dans Google Search Console sur plusieurs mois.",
        },
        {
          label: "Inclus dans chaque création",
          text: "Les bases du référencement font partie de chaque site créé par Webase : structure, métadonnées, performance et données locales.",
        },
      ],
    },
    faqs: [
      {
        question: "Pouvez-vous garantir la première position sur Google ?",
        answer:
          "Non, et personne ne le peut honnêtement : Google ne vend pas les positions naturelles. Je travaille sur ce qui améliore réellement vos chances : un site techniquement sain, des contenus utiles et une présence locale cohérente.",
      },
      {
        question: "Combien de temps avant de voir des résultats ?",
        answer:
          "Les corrections techniques peuvent être prises en compte en quelques semaines. Un positionnement durable sur des recherches concurrentielles se construit généralement sur plusieurs mois.",
      },
      {
        question: "Qu’est-ce que le référencement local ?",
        answer:
          "C’est la visibilité sur les recherches liées à un lieu, comme « plombier Olivet » ou « fleuriste Orléans », dans les résultats classiques et sur Google Maps. Elle repose notamment sur votre fiche Google Business Profile, la cohérence de vos coordonnées, vos avis clients et des pages qui décrivent clairement vos services et votre zone d’intervention.",
      },
      {
        question: "Faut-il publier des articles de blog ?",
        answer:
          "Seulement s’ils répondent à de vraies questions de vos clients. Quelques contenus utiles et à jour valent mieux qu’une publication régulière sans valeur.",
      },
    ],
    related: ["creation-site-vitrine", "refonte-site-internet", "maintenance-site-internet"],
    cta: { label: "Faire auditer mon site", href: "/contact" },
  },
  {
    slug: "maintenance-site-internet",
    name: "Maintenance de site internet",
    shortName: "Maintenance",
    icon: "maintenance",
    art: "refonte",
    metaTitle: "Maintenance de site internet à Orléans",
    metaDescription:
      "Maintenance de site web et d’application à Orléans : mises à jour, sauvegardes, sécurité, surveillance et performance. Dès 59 € HT par mois, périmètre au contrat.",
    title: ["Un site entretenu,", "c’est un site qui dure."],
    intro:
      "Mises à jour, sauvegardes, certificat HTTPS, formulaire qui cesse de fonctionner sans prévenir : un site ou une application en ligne demande un entretien régulier. Je m’en occupe pour que vous puissiez vous concentrer sur votre activité, y compris pour les sites et applications développés sur mesure, souvent oubliés des formules de maintenance classiques.",
    hubTitle: "Garder un site en forme.",
    summary:
      "Mises à jour, sauvegardes, surveillance et performance : un entretien régulier pour un site rapide, sûr et disponible.",
    highlights: ["Mises à jour et sauvegardes", "Surveillance", "Performance web"],
    needsTitle: "Une maintenance pour quels sites ?",
    needs: [
      {
        title: "Après la création de votre site.",
        text: "Vous prolongez l’accompagnement avec la personne qui connaît déjà votre site et ses choix techniques.",
      },
      {
        title: "Un site créé par un autre prestataire.",
        text: "Je peux reprendre la maintenance d’un site existant, après un état des lieux des accès, de l’hébergement et des risques.",
      },
      {
        title: "Un site qui ralentit.",
        text: "Images trop lourdes, scripts superflus, hébergement inadapté : on mesure, on corrige, puis on vérifie.",
      },
    ],
    includedTitle: "Ce que peut couvrir la maintenance",
    included: [
      "Les mises à jour de sécurité des composants et des dépendances",
      "Des sauvegardes régulières et la vérification de leur restauration",
      "La surveillance de la disponibilité et des formulaires",
      "Le contrôle du certificat HTTPS et du nom de domaine",
      "Le suivi des performances (Core Web Vitals) et leurs corrections",
      "Un interlocuteur unique en cas de problème",
    ],
    pricing: {
      title: "Combien coûte la maintenance d’un site ?",
      lead: "Une formule facultative, adaptée à la solution technique de votre site.",
      from: 59,
      items: [
        {
          label: "Dès 59 € HT / mois",
          text: "Mises à jour, surveillance et sauvegardes selon la solution retenue. Périmètre et fréquence précisés au contrat.",
        },
        {
          label: "Les évolutions",
          text: "Nouvelles pages, nouvelles fonctionnalités ou refonte partielle font l’objet d’un devis distinct.",
        },
        {
          label: "Un site existant",
          text: "La maintenance d’un site que je n’ai pas créé est chiffrée après un état des lieux.",
        },
      ],
    },
    faqs: [
      {
        question: "La maintenance est-elle obligatoire ?",
        answer:
          "Non, elle est facultative. Sans maintenance, vous restez libre de gérer les mises à jour vous-même ou avec un autre prestataire ; les interventions ponctuelles sont alors chiffrées à la demande.",
      },
      {
        question: "Pouvez-vous maintenir un site que vous n’avez pas créé ?",
        answer:
          "Oui, après un état des lieux : technologie, hébergement, accès et sauvegardes. Il permet de chiffrer la maintenance et de signaler les risques à traiter en priorité.",
      },
      {
        question: "Que se passe-t-il si mon site tombe en panne ?",
        answer:
          "La surveillance permet d’être alerté rapidement. Le diagnostic et la remise en service sont traités selon les conditions prévues au contrat.",
      },
      {
        question: "Améliorer la vitesse de mon site, est-ce vraiment utile ?",
        answer:
          "Oui. Un site rapide est plus agréable, perd moins de visiteurs et Google tient compte de l’expérience sur la page, dont les Core Web Vitals. Les optimisations portent souvent sur les images, les polices, les scripts tiers et l’hébergement.",
      },
    ],
    related: ["refonte-site-internet", "referencement-seo", "developpement-application-web"],
    cta: { label: "Parler de mon site", href: "/contact" },
  },
] as const satisfies readonly Service[];

export type ServiceSlug = (typeof services)[number]["slug"];
export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
export function servicePath(slug: string) {
  return `/services/${slug}`;
}
