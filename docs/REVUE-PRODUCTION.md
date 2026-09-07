# Revue technique — 8 septembre 2026

## Décision

Les vérifications de code et de navigateur passent. La publication commerciale reste en attente de l’activation du mail, de Redis et des informations d’hébergement. Les freezes ressentis au trackpad n’ont pas été reproduits dans le Firefox de test ; une confirmation sur l’appareil concerné reste utile. Aucun déploiement n’a été effectué.

Le contenu public, les prix affichés et les styles ont été conservés. Les captures PNG de l’accueil Firefox avant/après sont identiques, octet pour octet, à 390 et 1440 px.

## Erreur d’hydratation

Le diff signalé porte sur `cz-shortcut-listen="true"`, ajouté sur `body` en dehors de l’application. Aucun composant Webase ne génère cet attribut. Une injection avant l’hydratation reproduisait exactement le message d’erreur fourni.

Le layout tolère maintenant les différences d’attributs sur `body` via `suppressHydrationWarning`. C’est une exception limitée à cet élément, qui ne porte actuellement aucun attribut métier de l’application. Aucun script ne supprime l’attribut de l’extension, aucun rendu serveur n’a été désactivé et aucun filtre global de console n’a été ajouté.

Un test avec le véritable `RootLayout` échouait avant correction et passe après. Un second test injecte une divergence dans un descendant et vérifie qu’elle reste signalée. Les tests navigateur vérifient également que le menu s’hydrate et fonctionne après l’injection sur `body`.

Références : [cause « extension du navigateur » et solutions Next.js](https://nextjs.org/docs/messages/react-hydration-error), [portée d’un niveau de l’exception React](https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors).

## Défilement Firefox

Tests effectués avec Firefox 155 fourni par Playwright, dans un profil isolé. Aucun profil personnel ni réglage d’extension du navigateur de l’utilisateur n’a été modifié.

- Défilement par événements `wheel` en pixels, dans les deux sens, sur l’accueil, les offres et le brief complet.
- Aucun événement annulé par l’application, aucun retour de position à contre-sens et aucune dérive de la navbar fixe pendant les scénarios.
- L’examen du code ne trouve aucun moteur de défilement, boucle d’animation permanente ni écouteur `wheel`, `scroll` ou `touchmove` applicatif. Le défilement est géré par Firefox.
- Sur l’accueil, les premières mesures locales donnaient zéro intervalle `requestAnimationFrame` supérieur à 50 ms, en développement comme en production.
- Un essai Firefox avec fenêtre visible et trois séries de 65 impulsions rapprochées n’a pas reproduit de freeze : 658 intervalles observés, 95e percentile de 9,3 ms, aucun intervalle supérieur à 50 ms, aucun saut inverse.

Ces mesures indiquent la disponibilité de la boucle de rendu ; elles ne mesurent pas directement chaque image présentée par le GPU. Les événements automatisés ne reproduisent pas toute la chaîne matérielle et l’inertie native d’un trackpad macOS. On ne peut donc pas conclure que la sensation sur l’appareil de l’utilisateur est résolue, ni l’attribuer avec certitude à une extension ou au GPU.

Un problème distinct a été corrigé dans le questionnaire : `focus()` provoquait un premier déplacement implicite avant `scrollIntoView()`. Le focus utilise désormais `preventScroll`, suivi d’un seul déplacement explicite. Cela concerne le changement d’étape, pas les freezes généraux signalés.

## Revue du code

- Les prix de départ sont centralisés dans `offerStartingPrices` : offres, aide au choix et estimation utilisent le même référentiel. Les fourchettes actuelles restent identiques.
- Validation des demandes au navigateur et au serveur, bornes de taille globales et par champ, options contrôlées, champs pièges et protection partagée contre les envois abusifs.
- Destinataire mail fixé au serveur, HTML échappé, réponses en texte brut, Reply-To du client et idempotence. Aucune clé de service dans les composants clients.
- Un succès n’est affiché qu’après acceptation du mail par le fournisseur. En production, Redis non configuré ou indisponible bloque l’envoi ; aucune réussite simulée.
- MDX limité aux fichiers locaux, slugs contrôlés, projets validés et liens externes protégés. Aucun projet fictif n’a été ajouté.
- Pages majoritairement rendues au serveur, police locale, sections partagées et aucun changement CSS nécessaire pendant cette revue.
- Les secrets locaux et les rapports de test restent exclus de Git. La CI exécute désormais Firefox et Chromium.

## Résultats

| Contrôle                            | Résultat                                                      |
| ----------------------------------- | ------------------------------------------------------------- |
| ESLint et TypeScript strict         | Réussis                                                       |
| Vitest                              | 50 tests réussis                                              |
| Build de production                 | Réussi                                                        |
| Playwright sur le build final       | 30 tests réussis : 15 Firefox, 15 Chromium                    |
| Responsive                          | 10 pages, 5 largeurs de 320 à 1440 px, dans chaque navigateur |
| Axe WCAG 2 A/AA et 2.1 AA           | Aucune violation détectée sur les parcours couverts           |
| Contrôle HTTP                       | 15 variantes de routes et 40 liens internes vérifiés          |
| Audit des dépendances de production | Aucune vulnérabilité connue signalée                          |

Les tests mail utilisent des réponses fournisseur simulées. Ces résultats ne prouvent pas une livraison réelle dans Gmail et ne constituent pas une certification complète d’accessibilité.

## Conditions restantes avant publication

`pnpm preflight` signale encore six paramètres absents : `RESEND_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `HOSTING_NAME`, `HOSTING_ADDRESS`, `HOSTING_CONTACT`.

Le domaine public `https://webase.fr` et l’expéditeur prévu `Webase <projets@mail.webase.fr>` sont renseignés. Il faut vérifier le domaine d’envoi dans Resend, renseigner les paramètres serveur, compléter l’hébergement et contrôler la réception réelle des trois parcours dans `luis.doudeau@gmail.com`. Le mot de passe Gmail n’est pas nécessaire. Voir [la procédure mail](MAILING.md).

Le lien de réservation d’agenda et les réalisations restent des ajouts possibles ; ils ne sont pas nécessaires à l’activation des parcours déjà présents.

## Reproduire les contrôles

```bash
pnpm check
pnpm build
pnpm start --hostname 127.0.0.1 --port 3001
```

Dans un autre terminal :

```bash
PLAYWRIGHT_BROWSERS_PATH="$PWD/.cache/playwright" pnpm exec playwright install firefox chromium
E2E_BASE_URL=http://127.0.0.1:3001 pnpm test:e2e
SMOKE_URL=http://127.0.0.1:3001 pnpm smoke
pnpm audit --prod
pnpm preflight
```

Le rapport `.cache/e2e-report.json` contient les observations brutes du défilement. Les captures sont séparées dans `.cache/visual-review/firefox/` et `.cache/visual-review/chromium/`. Pour isoler Firefox : `pnpm test:e2e --project=firefox`. Le test Vitest d’hydratation utilise React en développement afin que l’absence d’avertissement en production ne masque pas une régression.
