# Stratégie SEO de Webase

Date : 24 octobre 2026. Ce document explique pourquoi le site est organisé ainsi, comment le faire évoluer sans casser le référencement, et ce qui reste à faire hors du code.

## Diagnostic initial

- **Production désindexée.** `SITE_URL` n’était pas défini sur Vercel. Résultat : `robots.txt` en `Disallow: /`, `noindex, nofollow` sur toutes les pages, canonical `http://localhost:3000` et sitemap vide. Lighthouse SEO : 66/100. C’était le blocage principal.
- **Une version ancienne est encore dans l’index.** Google affiche d’anciens tarifs (490 € / 990 €) pour `webase.fr` : il faut demander une nouvelle exploration.
- **Une seule page couvrait tous les services.** Applications web et mobiles, SaaS, e-commerce, SEO et maintenance n’avaient pas de page qui leur soit propre.
- **H1 sans intitulé descriptif, aucune donnée structurée.** L’image de partage n’apparaissait que sur l’accueil, car l’objet `openGraph` de chaque page écrasait celui du layout.
- **Performances déjà très bonnes, à préserver.** Lighthouse production : 99 sur mobile, 100 sur desktop, CLS 0.

## Architecture

| Page                                      | Intention principale                                                 |
| ----------------------------------------- | -------------------------------------------------------------------- |
| `/`                                       | création de site internet Orléans, développeur web Orléans, marque   |
| `/services`                               | hub : services web à Orléans                                         |
| `/services/creation-site-vitrine`         | création de site vitrine (Orléans), prix d’un site vitrine           |
| `/services/creation-site-e-commerce`      | création de site e-commerce / boutique en ligne                      |
| `/services/refonte-site-internet`         | refonte de site internet, migration sans perte de SEO                |
| `/services/developpement-application-web` | application web sur mesure, logiciel métier, outils internes, API    |
| `/services/creation-application-mobile`   | application mobile iOS et Android                                    |
| `/services/developpement-saas-mvp`        | développement SaaS, création de MVP                                  |
| `/services/referencement-seo`             | référencement naturel SEO Orléans, référencement local               |
| `/services/maintenance-site-internet`     | maintenance de site, performance, sécurité                           |
| `/offres`                                 | prix d’un site internet, tarifs                                      |
| `/studio`                                 | Luis Doudeau, développeur web freelance Orléans (personne et marque) |
| `/blog/*`                                 | questions informationnelles (prix, préparation, référencement local) |
| `/contact`, `/estimation`                 | conversion                                                           |

Règles :

- **Une intention par page.** Le titre, le H1 et la description d’une page de service ne doivent pas viser la requête d’une autre page. `tests/seo.test.ts` vérifie que slugs, titres et descriptions sont uniques.
- **Aucune page par commune.** Les pages-villes au contenu similaire sont des pages satellites au sens des règles anti-spam de Google. La zone d’intervention est décrite une seule fois, sur `/studio`, avec les 22 communes d’Orléans Métropole, et dans `areaServed`.
- **Maillage interne.**
  - L’accueil renvoie vers chaque service. Le footer liste les 8 services sur toutes les pages.
  - Chaque service renvoie vers 3 services liés. Chaque article renvoie vers ses services (`services` dans le frontmatter).
  - La FAQ renvoie vers les pages utiles.
- **Ajouter un service** : une entrée dans `src/content/services.ts` avec un contenu réellement spécifique. Page, sitemap, footer, hub, JSON-LD et image de partage sont générés automatiquement.
- **Changer une URL** : ajouter une redirection permanente dans `next.config.ts`, comme `/blog/hello-world`.

## Technique

- `src/lib/metadata.ts` : origine canonique, règle d’indexation (`isIndexable`), `pageMetadata` avec l’image de partage.
- `src/lib/structured-data.ts` :
  - `LocalBusiness` et `Person` sur l’accueil et `/studio`, plus `WebSite` (avec `alternateName` : WeBase, We base) sur l’accueil seulement.
  - `Service` sur chaque service, `OfferCatalog` sur `/offres`, `BlogPosting` sur les articles, `BreadcrumbList` partout où un fil d’Ariane est visible.
  - Aucun avis, note, téléphone ni adresse de rue : rien de tout cela n’est publié par ailleurs. Webase n’accueille pas de clients dans un local.
  - Pas de `FAQPage` : Google ne l’affiche plus depuis mai 2026.
- `/realisations` reste en `noindex, follow` et hors sitemap tant que la galerie est vide. Elle redevient indexable dès qu’un projet est ajouté.
- Le sitemap ne publie `lastmod` que pour les articles (champ `updated` du frontmatter). Google ignore `priority` et `changefreq`.
- `pnpm seo` (serveur lancé) parcourt le sitemap et contrôle title, description, canonical, robots, H1 unique, image de partage et validité du JSON-LD.

## Actions externes, par priorité

1. **Déployer, puis Google Search Console.**
   - Ajouter la propriété de domaine `webase.fr` (vérification DNS).
   - Soumettre `https://webase.fr/sitemap.xml`.
   - Demander l’indexation de l’accueil, de `/services` et des 8 pages de services.
   - Surveiller le rapport « Pages ».
2. **Google Business Profile.** Créer une fiche d’établissement de service :
   - Nom réel « Webase », sans mot-clé ajouté.
   - Adresse masquée, zone desservie : Orléans, Orléans Métropole, Loiret (20 zones maximum).
   - Catégorie principale : la plus proche de « Concepteur de sites Web » dans l’interface, avec le moins de catégories possible.
   - Lien vers `https://webase.fr`, description fidèle au site, photos de travaux réels.
   - Ajouter ensuite l’URL de la fiche dans `site.profiles`.
3. **Bing Webmaster Tools.** Importer la propriété depuis Search Console.
4. **Avis authentiques.** Les demander à chaque client satisfait via le lien de la fiche, et répondre à chacun. Ne jamais en acheter ni en rédiger.
5. **Profils et citations cohérents** : LinkedIn, GitHub, Malt, Codeur, PagesJaunes, La Fabrique du Net, annuaire-entreprises.data.gouv.fr. Mêmes nom, ville, site et e-mail partout. Ajouter les profils maintenus à `site.profiles`.
6. **Écosystème local** : LAB’O Village by CA, Digital Loire Valley, CCI Loiret, Initiative Loiret, réseaux d’entreprises. Ils apportent des liens et des mentions locales légitimes. Pas d’achat de liens.
7. **Réalisations réelles**, avec l’accord des clients (`docs/PROJECTS.md`). C’est la preuve qui manque le plus face aux concurrents locaux.

## Contenus à produire ensuite

Uniquement s’ils apportent une réponse utile, signés et relus :

- Freelance ou agence web : comment choisir ?
- WordPress ou développement sur mesure ?
- Combien coûte une application mobile ou un MVP ?
- Refonte sans perdre son référencement.
- Études de cas de projets réels, avec mesures de performance avant et après.

Mettre à jour `updated` seulement lors d’une modification significative : changer la date sans changer le fond n’aide pas et peut nuire.

## Suivi

Mensuellement dans Search Console :

- impressions et clics par page ;
- requêtes « Orléans » ;
- pages non indexées ;
- Core Web Vitals (seuils : LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1).

Ajuster titres et contenus à partir des requêtes réelles, pas d’hypothèses.
