export const copy = {
  hero: {
    title: "Agence Web & Mobile.",
    subtitle: "Modernisez votre image. Inspirez confiance. Gagnez de nouveaux clients. Une refonte complète de votre présence en ligne, rapide et sans compromis.",
    ctaPrimary: "Lancer la transformation",
    ctaSecondary: "Voir des exemples",
  },
  services: {
    title: "Votre vision ? Nous la rendons *réelle*.",
    items: [
      {
        title: "Sites Vitrines & Landing Pages",
        description: "Conversion + Crédibilité. Pour présenter votre activité avec impact.",
        features: ["Design unique", "Pack SEO base", "Responsive parfait"],
        image: "/images/shape-vitrine.png",
      },
      {
        title: "Sites Dynamiques / CMS",
        description: "Autonomie + SEO. Pour gérer votre contenu sans développeur.",
        features: ["CMS sur-mesure", "Blog / Actualités", "Formation admin"],
        image: "/images/shape-cms.png",
      },
      {
        title: "Web Apps / Plateformes",
        description: "MVP & Outils internes. Pour digitaliser vos processus métier.",
        features: ["Dashboard", "Auth utilisateurs", "API & Intégrations"],
        image: "/images/shape-app.png",
      },
    ],
  },
  offres: {
    title: "Nos Offres",
    items: [
      {
        id: "essentiel",
        name: "Essentiel",
        tagline: "Pour les petites entreprises qui veulent un site simple et efficace.",
        price: "490€",
        features: ["Equipe projet dédiée", "Basé sur un template optimisé", "Couleurs et polices à votre charte", "Config. et sécurisation CMS", "Design responsive", "Optimisations SEO et GEO", "Maintenance et hébergement (Optionnel)"],
      },
      {
        id: "professionnel",
        name: "Professionnel",
        tagline: "Pour les sociétés en croissance cherchant plus de personnalisation visuelle.",
        price: "990€",
        features: ["Equipe projet dédiée", "Constructions de maquettes UX", "Design par un Designer Senior", "Config. et sécurisation CMS", "Design responsive", "Optimisations SEO et GEO", "Maintenance et hébergement (Optionnel)"],
      },
      {
        id: "entreprise",
        name: "Entreprise",
        tagline: "Pour les marques exigeantes qui veulent un site unique et stratégique.",
        price: "Sur devis",
        features: ["Atelier stratégique", "Maquette UX sur-mesure", "Webdesign Senior", "Développements spécifiques", "Back-office personnalisé", "Optimisations SEO et GEO", "Config. et sécurisation CMS"],
      },
    ],
  },

  methode: {
    title: "Notre Méthode",
    steps: [
      {
        number: "01",
        title: "Cadrage",
        description: "On définit l'objectif, l'audience et les contraintes. Pas de flou.",
      },
      {
        number: "02",
        title: "Spec & Design",
        description: "Maquette des pages clés et validation des parcours utilisateurs.",
      },
      {
        number: "03",
        title: "Dev & QA",
        description: "Développement propre, tests de performance et d'accessibilité.",
      },
      {
        number: "04",
        title: "Livraison",
        description: "Mise en ligne, formation et remise des accès complets.",
      },
    ],
  },
  ai: {
    title: "L'Intelligence Artificielle, invisible mais partout.",
    subtitle: "Ne vous contentez pas d'un site statique. Intégrez l'IA pour automatiser, personnaliser et accélérer votre business.",
    features: [
      {
        title: "Support Client Autonome",
        description: "Des assistants qui comprennent votre business et répondent 24/7.",
      },
      {
        title: "Génération de Contenu",
        description: "Articles, fiches produits, posts sociaux : tout est prêt à valider.",
      },
      {
        title: "Analyse de Données",
        description: "Transformez vos chiffres en recommandations stratégiques claires.",
      },
    ],
  },
  faq: {
    title: "Questions Fréquentes",
    items: [
      {
        question: "Combien de temps avant la mise en ligne ?",
        answer: "Pour l'offre Essentiel, comptez 5 à 7 jours ouvrés. Pour l'offre Pro, environ 2 à 3 semaines selon la complexité et vos retours.",
      },
      {
        question: "Suis-je propriétaire de mon site ?",
        answer: "À 100%. Une fois livré, vous avez tous les accès, le code source et la propriété intellectuelle complète.",
      },
      {
        question: "Et si j'ai besoin de modifier quelque chose après ?",
        answer: "Nos sites sont conçus pour être mis à jour facilement. Pour des changements majeurs, nous restons disponibles à un tarif horaire préférentiel.",
      },
    ],
  },
  techStack: [
    "Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "Supabase", "Shopify", "Framer Motion", "OpenAI"
  ],
  testimonials: {
    title: "Ce qu'ils disent de nous",
    items: [
      {
        text: "Une équipe ultra réactive. Notre site est passé de 'moyen' à 'exceptionnel' en 3 semaines. Le design fait toute la différence.",
        author: "Thomas D.",
        role: "CEO, TechStart",
      },
      {
        text: "J'avais peur que ce soit compliqué à gérer, mais le CMS est super simple. Et le site charge instantanément.",
        author: "Sarah L.",
        role: "Fondatrice, Mode&Co",
      },
      {
        text: "L'intégration de l'IA pour notre support client a divisé nos tickets par deux. Investissement rentabilisé en 1 mois.",
        author: "Marc R.",
        role: "Directeur Ops, LogiFlow",
      },
    ],
  },
  servicesPage: {
    hero: {
      title: "Expertise & Savoir-faire",
      subtitle: "Nous ne faisons pas \"juste\" des sites web. Nous construisons des outils digitaux performants, pensés pour la croissance et conçus pour durer.",
    },
    items: [
      {
        title: "Landing Pages & Sites Vitrines",
        category: "Présence",
        description: "Votre première impression doit être parfaite. Nous concevons des pages ultra-rapides et persuasives pour lancer un produit, valider une idée ou présenter votre activité.",
        stack: ["Next.js", "Framer Motion", "SEO Avancé"],
        deliverables: ["Landing Page conversion", "Site Corporate", "Portfolio", "Intégration Analytics"],
        image: "/images/service-landing.png",
        offerLink: "/offres",
      },
      {
        title: "Applications Web & SaaS",
        category: "Produit",
        description: "Plus qu'un site, un outil métier. Dashboards, plateformes de réservation, places de marché ou outils internes : nous digitalisons vos processus complexes.",
        stack: ["React", "Supabase/Node", "Stripe"],
        deliverables: ["Dashboard Admin", "E-commerce", "SaaS B2B", "Gestion Utilisateurs"],
        image: "/images/service-saas.png",
        offerLink: "/offres",
      },
      {
        title: "Mobile & PWA",
        category: "Mobile",
        description: "Offrez une expérience native sans les contraintes des stores. Vos utilisateurs accèdent à votre service directement depuis leur écran d'accueil, avec ou sans réseau.",
        stack: ["PWA", "React Native", "Offline-first"],
        deliverables: ["App Installable", "Notifications Push", "Mode Hors-ligne", "UX Mobile First"],
        image: "/images/service-mobile.png",
        offerLink: "/offres",
      },
      {
        title: "Audit & Sauvetage",
        category: "Technique",
        description: "Un projet qui patine ? Un code impossible à maintenir ? Nous reprenons l'existant pour l'assainir, l'optimiser et le relancer sur de bonnes bases.",
        stack: ["Refactoring", "Performance", "Sécurité"],
        deliverables: ["Audit Technique", "Correction de Bugs", "Optimisation Vitesse", "Reprise de Code"],
        image: "/images/service-audit.png",
        offerLink: "/offres",
      },
    ],
  },
  offersPage: {
    hero: {
      title: "Investissez dans votre croissance",
      subtitle: "Des tarifs transparents, sans frais cachés. Choisissez la puissance dont vous avez besoin aujourd'hui, évoluez demain.",
    },
    items: [
      {
        id: "essentiel",
        name: "Essentiel",
        price: "490€",
        tagline: "Pour lancer votre activité.",
        description: "L'option parfaite pour démarrer avec un site vitrine professionnel. Une présence en ligne soignée, basée sur un template optimisé mais adapté à votre image.",
        bestFor: "Indépendants, Artisans, TPE",
        features: [
          "Equipe projet dédiée",
          "Basé sur un template optimisé",
          "Couleurs et polices à votre charte",
          "Configuration et sécurisation complète du CMS",
          "Design responsive",
          "Optimisations SEO et GEO",
          "Maintenance et hébergement (Optionnel)"
        ],
      },
      {
        id: "professionnel",
        name: "Professionnel",
        price: "990€",
        tagline: "Pour développer votre visibilité.",
        description: "Un site dynamique plus poussé pour aller plus loin. Des maquettes UX personnalisées et un design réalisé par un expert pour une image de marque forte.",
        bestFor: "PME, Agences, Commerçants",
        features: [
          "Equipe projet dédiée",
          "Constructions de maquettes UX",
          "Design des pages par un Designer Senior",
          "Configuration et sécurisation complète du CMS",
          "Design responsive",
          "Optimisations SEO et GEO",
          "Maintenance et hébergement (Optionnel)"
        ],
      },
      {
        id: "entreprise",
        name: "Entreprise",
        price: "Sur devis",
        tagline: "SaaS, Mobile & E-commerce.",
        description: "Pour les marques exigeantes. Un accompagnement stratégique complet, du cadrage aux développements spécifiques, pour un site unique.",
        bestFor: "Startups, E-commerce, Innovation",
        features: [
          "Equipe projet dédiée",
          "Atelier stratégique avec vos équipes",
          "Atelier arborescence & persona",
          "Maquette UX sur-mesure",
          "Webdesign par un designer Senior",
          "Développements spécifiques",
          "Back-office personnalisé",
          "Constitution et sécurisation CMS",
          "Optimisations SEO et GEO"
        ],
      },
    ],
    reassurance: [
      {
        title: "Paiement en 2 fois",
        text: "50% à la commande pour lancer le projet, 50% à la livraison une fois que vous êtes satisfait.",
      },
      {
        title: "Propriété Totale",
        text: "Vous êtes propriétaire de votre site, de votre nom de domaine et de tout le code. Zéro loyer caché.",
      },
      {
        title: "Formation Incluse",
        text: "On ne vous laisse pas seul. Chaque site est livré avec une formation vidéo pour apprendre à le gérer.",
      },
    ],
    comparison: [
      {
        feature: "Design",
        essentiel: "Template Premium",
        pro: "Sur-mesure",
        surmesure: "Direction Artistique"
      },
      {
        feature: "Nombre de pages",
        essentiel: "Jusqu'à 5 Pages",
        pro: "Jusqu'à 15 Pages",
        surmesure: "Illimité"
      },
      {
        feature: "SEO & Performance",
        essentiel: "Base (Meta tags)",
        pro: "Avancé (Structure + Speed)",
        surmesure: "Audit Complet + Suivi"
      },
      {
        feature: "Gestion de contenu (CMS)",
        essentiel: "Non",
        pro: "Oui (Headless CMS)",
        surmesure: "Oui (Custom)"
      },
      {
        feature: "Analytics",
        essentiel: "Google Analytics",
        pro: "Dashboard Custom (PostHog)",
        surmesure: "Tracking Avancé"
      },
      {
        feature: "Support & Formation",
        essentiel: "Email (48h)",
        pro: "Email + Visio (24h)",
        surmesure: "Slack Dédié + Tel"
      },
       {
        feature: "Délai moyen",
        essentiel: "1 semaine",
        pro: "3-4 semaines",
        surmesure: "Sur planning"
      },
    ],
  },
};
