# Webase — design system

## Source de vérité

- `src/styles/tokens.css` : couleurs sémantiques, police, tailles fluides, espacements, rayons, transitions.
- `src/app/globals.css` : point d’entrée unique des styles ; `src/styles/base.css`, `layout.css`, `sections.css`, `illustration.css`, `pages.css`, `forms.css`, `briefs.css`, `offer-finder.css`, `content.css` et `responsive.css` séparent leurs responsabilités.
- `src/components/ui` : primitives React réutilisables.
- `src/components/sections` : compositions métier partagées.
- `src/components/forms` : contrôles, étapes et retours de formulaires.
- `src/content/site.ts` : identité publique, navigation, offres, méthode et FAQ.
- `/design-system` : planche de référence locale, désactivée en production.

## Intention

« Une bonne base change tout. » Une marque de studio indépendant, calme, précise, concrète. Beaucoup d’air ; la hiérarchie vient de la taille, de l’alignement et de la couleur, pas d’une multiplication des effets.

## Couleurs

| Token     | Valeur  | Usage                                        |
| --------- | ------- | -------------------------------------------- |
| paper     | #F8F8F2 | Fond principal ivoire                        |
| white     | #FFFFFF | Surfaces de formulaire et éléments en relief |
| ink       | #20261F | Titres et texte principal                    |
| muted     | #62685E | Texte secondaire lisible                     |
| line      | #DCDED4 | Séparation décorative                        |
| blue      | #345BFF | Identité, liens et action principale         |
| blue-wash | #ECEEFF | Sélection et aides d’estimation              |
| forest    | #253E31 | Bloc studio                                  |
| lime      | #DCF59E | Contraste dans les surfaces sombres          |
| error     | #A52D32 | Erreurs de validation                        |
| success   | #24613E | Confirmation d’envoi                         |

Le bleu sur ivoire et le blanc sur bleu sont les couples de l’action principale. Les bordures claires décorent ; l’état actif et le focus ont un contraste plus marqué. Le choix d’une identité claire est intentionnel : pas de thème sombre incomplet.

## Typographie

Figtree variable 300–900, distribuée localement via `@fontsource-variable/figtree` et `next/font/local`. Aucun appel Google Fonts au chargement, aucune fonte téléchargée pendant le build.

Titres fluides via `clamp()`, graisse 500, approche resserrée. Corps lisible et interligne 1,6–1,8. Les petites capitales sont réservées aux catégories ; les contenus importants et les contrôles restent en casse courante.

## Primitives

`Container` limite la largeur et applique les marges adaptatives. `Section` règle le rythme vertical. `SectionHeading` rassemble surtitre, titre, description et éventuel lien. `PageIntro` introduit les pages internes.

`Button` déclenche une action ; `ButtonLink` navigue. Variantes : primary, secondary, inverse, ghost ; tailles md et sm. Ne jamais imbriquer bouton et lien. Les icônes viennent de Lucide, avec taille explicite.

`Brand` conserve le symbole origami Webase et fournit un nom accessible. Le header et le footer sont rendus une seule fois par le layout.

La navbar utilise une surface opaque, sans filtre de flou recalculé pendant le défilement. Le lien actif est souligné sur toute sa largeur, avec `aria-current`. La navigation utilise le défilement natif immédiat ; aucun moteur d’inertie ni animation de page ne s’interpose.

`BriefCards` partage les mêmes textes et actions entre l’accueil et les deux points de sélection du formulaire. Le choix se formule selon la maturité du projet. Une surface blanche/bleue identifie l’express, une surface forêt/citron identifie le complet ; la durée est visible en tête et le bouton explicite se trouve en bas. Deux colonnes sur grand écran, une seule sur mobile ou dans le panneau étroit du formulaire. Les liens servent à ouvrir un parcours, les boutons à changer le format sans perdre les réponses.

`OfferFinder` reste replié par défaut dans les offres. Deux groupes de radios accessibles produisent une orientation annoncée par une région de statut. Les réponses restent en mémoire, aucun renseignement personnel n’est demandé.

## Formulaires

`Field`, `TextArea`, `Select`, `Choices`, `Privacy`, `FormFeedback` et `FormSuccess` partagent leurs styles. Chaque entrée possède un label lié, un message associé et un état invalide. L’étape est validée avant d’avancer ; le formulaire complet est revalidé au serveur.

Les réponses sont gardées dans l’état React pendant la visite, y compris après un refus du serveur. Aucune donnée de devis dans localStorage. Retour arrière, changement de format et erreur sont des états prévus.

## Adaptation et accessibilité

Grilles qui passent de trois colonnes à une, marges fluides, navigation mobile avec fermeture Échap et restauration du focus, liens d’évitement et cible de focus des étapes. La FAQ utilise details/summary. Le défilement et les effets respectent prefers-reduced-motion.

Largeurs à vérifier dans un navigateur : 320, 375, 390, 768, 1024 et 1440 px, plus zoom 200 %. Les tests DOM ne prouvent pas à eux seuls l’absence de débordement ou la qualité visuelle : une revue navigateur reste nécessaire.

## Ajouter un composant

Réutiliser d’abord les primitives et tokens. Une variante doit correspondre à un besoin répétable. Garder les pages rendues au serveur ; ajouter `use client` uniquement aux interactions. Les couleurs propres à l’illustration du hero sont un asset graphique, pas de nouveaux tokens métier.

Ne pas publier de faux avis, de métriques non mesurées, de badges commerciaux invérifiables ou de projets fictifs. Un état vide explicite fait partie du système.
