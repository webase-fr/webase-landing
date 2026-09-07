# Webase — analyse et décisions de refonte

Date : 7 septembre 2026. Travail limité au dépôt existant.

## Le problème initial

Le projet utilisait déjà Next.js, React, TypeScript et Tailwind. Cette base est conservée. Le défaut venait de la superposition de directions graphiques et de composants : plusieurs heroes, animations GSAP/Framer/Three, footer dupliqué dans les pages, double import de tokens, thème et polices appliqués de manière variable.

Le discours décrivait une agence avec équipe dédiée et designer senior, alors que Webase est l’activité indépendante de Luis Doudeau. Les avis clients et entreprises cités ne disposaient d’aucune source dans le dépôt. Ils ont été retirés. Les offres à 490 € et 990 € promettaient des périmètres et moyens disproportionnés.

La messagerie utilisait un mot de passe de démonstration, une adresse IP constante pour tous les visiteurs et du HTML non échappé. Le formulaire de devis ne validait pas sérieusement les entrées. Les pages légales et le portfolio manquaient.

## Références et direction retenue

Les références ont été consultées par le web. Le navigateur intégré n’étant pas disponible, aucune comparaison visuelle par capture n’est revendiquée.

- [Elevo](https://www.elevo.fr/) : relier chaque service à un besoin compréhensible ; articuler présentation, accompagnement et questions fréquentes.
- [Qonto](https://qonto.com/fr) : rendre les offres et les parcours de choix accessibles aux petites entreprises ; expliquer les coûts et les services.
- [Pentagram](https://www.pentagram.com/) : laisser une place importante au travail montré et à l’identité de chaque projet.
- [Isomorphic Labs](https://www.isomorphiclabs.com/) : construire un récit et une identité reconnaissables plutôt qu’accumuler des fonctionnalités.

Interprétation pour Webase : compositions éditoriales, grands titres, espaces généreux, grilles stables, peu d’effets, hiérarchie claire. Aucun de ces sites n’est copié.

Palette : ivoire, encre et bleu existant du logo. Vert profond et citron doux pour les sections d’accompagnement. Une seule famille variable, Figtree, hébergée avec l’application. Le symbole origami existant est conservé dans le composant Brand.

Le hero montre une exploration graphique en HTML/CSS, explicitement identifiée comme telle. Il ne présente pas une maquette fictive comme une réalisation client. Les anciennes images génératives décoratives ont été retirées des parcours.

## Positionnement et offres

Cible principale : artisans, indépendants, métiers de service et petites entreprises françaises. Point d’ancrage : Orléans. Travail à distance possible partout en France.

Promesse : un site à la hauteur du métier, un interlocuteur direct, un périmètre compris avant engagement.

Les repères publics [France Num](https://www.francenum.gouv.fr/guides-et-conseils/developpement-commercial/site-web/combien-payer-pour-un-site-web-ou-un-site-e) donnent notamment des fourchettes pour une page de présentation, un site basique et une boutique, et rappellent les coûts récurrents. La [grille publique Codecircle](https://codecircle.fr/prix-site-internet/) apporte un second point de comparaison pour les petites structures. Les offres ci-dessous sont une proposition commerciale propre à Webase, pas une moyenne statistique du marché.

| Offre       | Départ HT | Périmètre                                                   | Délai indicatif |
| ----------- | --------: | ----------------------------------------------------------- | --------------- |
| L’essentiel |     990 € | 1 page, 6 sections maximum                                  | 1–2 semaines    |
| La vitrine  |   1 990 € | Jusqu’à 5 pages, maquettes et galerie                       | 3–4 semaines    |
| L’évolutif  |   3 490 € | Jusqu’à 8 pages, contenus administrables, blog et formation | 4–6 semaines    |

Hypothèses : contenus fournis, validations régulières, fonctionnalités définies au devis, acquisition du domaine et de l’hébergement par le client. Les ressources et licences tierces sont séparées. La maintenance facultative démarre à 59 € HT/mois, avec périmètre à contractualiser. Les boutiques, applications, refontes et intégrations complexes sont étudiées sur devis.

Ces tarifs doivent rester reliés au temps réellement passé : suivre les heures de cadrage, design, développement, échanges et livraison, puis réajuster les prix ou le périmètre. La rentabilité dépend aussi des charges réelles de l’entreprise. Aucun chiffre de marge fictif n’est avancé.

## Parcours

1. Accueil : comprendre Webase et son public, voir les prix, découvrir la méthode, prendre contact.
2. Offres : comparer les périmètres, comprendre ce qui est inclus et les frais annexes.
3. Devis : express en environ 2 minutes ou complet en 5 à 8 minutes, puis récapitulatif et envoi.
4. Réalisations : galerie basée sur des données validées ; état vide honnête tant qu’aucun projet réel n’est ajouté.
5. Studio : identité réelle de l’entrepreneur et fonctionnement de la collaboration.
6. Contact, journal et informations légales : compléter la compréhension et la confiance.

Les durées des questionnaires sont des objectifs de conception, pas des résultats d’un test chronométré avec des clients.

## Choix techniques

Pages rendues sur le serveur par défaut. JavaScript interactif limité au menu et aux formulaires. Défilement natif, FAQ native, respect de la réduction des animations. Composants partagés et design tokens documentés.

Zod partage les règles de validation entre client et serveur. Resend fournit l’envoi par API et l’idempotence : [documentation officielle](https://resend.com/docs/send-with-nextjs), [clés d’idempotence](https://resend.com/docs/dashboard/emails/idempotency-keys). Redis Upstash porte les compteurs d’abus en production. La mémoire du processus est réservée au développement.

Les formulaires informent sur l’usage des données, avec référence aux [exemples de mentions de la CNIL](https://www.cnil.fr/fr/passer-laction/rgpd-exemples-de-mentions-dinformation). La case n’inscrit à aucune prospection. Les sous-traitants et leur rôle sont indiqués.

## Points restant dépendants de l’exploitation

Domaine public, domaine d’envoi Resend vérifié, clé d’envoi, Redis et coordonnées de l’hébergeur. Les projets réels seront ajoutés par le propriétaire. Le statut de livraison effective des mails se vérifie dans le tableau de bord du fournisseur et dans la boîte Gmail. La suppression à 12 mois des échanges sans suite est une tâche de gestion de la messagerie, pas une automatisation déjà présente.
