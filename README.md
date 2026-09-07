# Webase

Site du studio indépendant de Luis Doudeau, à Orléans. Refonte du projet Next.js existant : identité cohérente, offres cadrées, portfolio configurable et demandes de devis envoyées par e-mail.

## Développement

Node.js 24 LTS recommandé (`.nvmrc`), pnpm 10.26.1.

```bash
pnpm install --frozen-lockfile
[ -f .env.local ] || cp .env.example .env.local
pnpm dev
```

Ouvrir http://localhost:3000. Aucun secret n’est requis pour parcourir le site. Les formulaires affichent une erreur réelle tant que le service mail n’est pas configuré.

## Commandes

| Commande          | Rôle                                                                      |
| ----------------- | ------------------------------------------------------------------------- |
| pnpm dev          | Serveur local                                                             |
| pnpm check        | ESLint, types et tests                                                    |
| pnpm build        | Build de production                                                       |
| pnpm start        | Serveur du build                                                          |
| pnpm test         | Tests validation, devis, mails, antispam et parcours React                |
| pnpm test:e2e     | Tests Firefox et Chromium : navigation, formulaires, scroll et responsive |
| pnpm format:check | Vérifier la présentation du code                                          |
| pnpm preflight    | Vérifier la configuration de mise en ligne, sans envoyer de mail          |
| pnpm smoke        | Vérifier les routes et les liens internes sur le serveur local            |
| pnpm audit --prod | Audit des dépendances de production                                       |

Pour les tests navigateur, installer Firefox et Chromium une fois dans le projet :

```bash
PLAYWRIGHT_BROWSERS_PATH="$PWD/.cache/playwright" pnpm exec playwright install firefox chromium
pnpm test:e2e
pnpm test:e2e --project=firefox
```

Les captures de revue sont produites dans `.cache/visual-review/firefox/` et `.cache/visual-review/chromium/`. Le rapport JSON et les observations de défilement se trouvent dans `.cache/e2e-report.json`. Les profils de test sont indépendants des navigateurs personnels.

Pour juger la fluidité, utiliser le build de production : `pnpm build`, puis `pnpm start --port 3001`. Le mode développement charge aussi le compilateur côté serveur, le rechargement à chaud et les outils React/Next ; il n’est pas représentatif du poids livré aux visiteurs. Pour tester ce build dans Chromium : `E2E_BASE_URL=http://127.0.0.1:3001 pnpm test:e2e`.

## Architecture

```text
src/app/                 Routes, metadata, layout partagé
src/components/ui/       Primitives du design system
src/components/layout/   Navigation et footer
src/components/sections/ Sections réutilisées
src/components/forms/    Contrôles et questionnaires
src/components/projects/ Cartes de réalisations
src/content/             Identité, offres, projets et articles locaux
src/lib/                 Validation et estimation partagées
src/lib/server/          Mail et protection, jamais envoyés au navigateur
src/actions/             Point d’entrée de soumission
src/styles/              Design tokens
tests/                   Contrats et parcours, sans envoi externe
docs/                    Décisions, design system, exploitation
```

Next.js App Router, React, TypeScript strict et Tailwind sont conservés. Les pages sont rendues au serveur ; le menu, l’aide au choix et les formulaires sont interactifs. La police variable est locale. Les dépendances d’animation, de 3D et les composants obsolètes ont été retirés.

## Modifier le site

- Offres, FAQ, navigation, identité : `src/content/site.ts`.
- Prix de départ : `offerStartingPrices` dans ce même fichier, communs aux offres et à l’estimation.
- Présentation des briefs : `src/content/briefs.ts` et `BriefCards`, partagés entre l’accueil, la page d’estimation et le changement de format.
- Aide au choix des offres : `src/lib/offer-finder.ts`. Le tarif vient toujours des offres ; aucun prix supplémentaire à synchroniser.
- Couleurs, échelles et rayons : `src/styles/tokens.css`.
- Styles partagés : `src/styles/*.css`, assemblés par `src/app/globals.css`.
- Projets : `src/content/projects.ts` et `public/projects/`.
- Articles : `src/content/posts/*.mdx`. Uniquement du contenu local de confiance ; pas de MDX provenant de visiteurs.
- Règles des questionnaires : `src/lib/lead-schema.ts`.
- Calcul indicatif : `src/lib/estimate.ts`.

## Parcours clients

- L’accueil donne accès aux deux briefs dans la section « Votre projet », également ciblée par son bouton principal.
- `/estimation` présente les formats, leur durée, les informations attendues et la suite de la demande. `?format=express` ouvre les deux étapes ; `?format=complet` ouvre les cinq étapes.
- L’aide au choix de `/offres` fonctionne sans compte, coordonnées ni stockage. Elle oriente selon le besoin et l’autonomie éditoriale, puis préremplit le brief. Une refonte, des fonctions complexes ou un besoin incertain restent à cadrer personnellement.
- Les offres peuvent être transmises avec `?offre=essentiel|vitrine|evolutif`. Les paramètres sont validés ; le visiteur peut modifier son périmètre dans le questionnaire.
- La réservation de rendez-vous pourra pointer vers un véritable agenda une fois le lien du studio fourni. Aucun créneau ni lien de réservation fictif n’est publié.

## Documentation

- [Analyse, références et positionnement](docs/ANALYSE.md)
- [Design system](docs/DESIGN-SYSTEM.md)
- [Ajouter une réalisation](docs/PROJECTS.md)
- [Activer la réception des demandes](docs/MAILING.md)
- [Résultats et limites des vérifications](docs/VERIFICATION.md)
- [Revue technique et décision de mise en production](docs/REVUE-PRODUCTION.md)

## Mise en ligne

Le domaine public confirmé est **https://webase.fr**. La configuration locale le renseigne dans `SITE_URL` ; reporter cette valeur dans l’environnement de production avant le build. Le sous-domaine `mail.webase.fr` est prévu pour l’expédition via Resend et reste à vérifier chez le fournisseur.

Le site requiert un hébergement Next.js avec runtime Node.js et Server Actions ; l’export HTML statique ne suffit pas aux formulaires. Aucun service n’est provisionné et aucun déploiement n’est déclenché par le dépôt.

Renseigner le domaine public, la configuration Resend, Redis et les coordonnées de l’hébergeur dans l’environnement, exécuter `pnpm preflight`, puis `pnpm check && pnpm build`. Garder les secrets côté serveur.

`SITE_URL` vide désactive l’indexation et produit un sitemap vide. Les informations légales d’hébergement sont issues de `HOSTING_NAME`, `HOSTING_ADDRESS` et `HOSTING_CONTACT` au build.

La réception réelle doit être vérifiée avec les identifiants de production. Les tests automatisés simulent les réponses des prestataires ; ils ne prouvent pas l’arrivée dans Gmail.
