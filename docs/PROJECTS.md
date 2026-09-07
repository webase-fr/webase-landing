# Ajouter une réalisation

La galerie `/realisations` est prête. Aucun faux projet n’est publié.

1. Placer une capture dans `public/projects/`, idéalement WebP ou AVIF, environ 1600 × 1100 px. Vérifier qu’aucune donnée privée n’est visible et que la publication est autorisée.
2. Ajouter l’objet à la liste de `src/content/projects.ts`. Les champs sont vérifiés par Zod au build.
3. Lancer `pnpm check && pnpm build`, puis vérifier la carte et le lien dans le navigateur.

Exemple à adapter avec un **vrai** projet :

```ts
export const projects: Project[] = z.array(projectSchema).parse([
  {
    slug: "nom-du-projet",
    title: "Nom du client",
    category: "Site vitrine",
    description: "Le besoin du client et ce qui a été livré, en une ou deux phrases.",
    image: "/projects/nom-du-projet.webp",
    imageAlt: "Capture de la page d’accueil du site de Nom du client",
    url: "https://domaine-reel-du-client.fr",
    year: 2026,
  },
]);
```

Catégories acceptées : Site vitrine, Site administrable, Application web, E-commerce.

Le composant `ProjectGrid` fournit l’image responsive, le titre, la catégorie, l’année, la description et le bouton « Visiter le site ». Le lien ouvre un onglet avec `noopener noreferrer`. Les deux premiers projets apparaissent aussi sur l’accueil dès que la liste est renseignée.

Les images sont locales et les liens publics utilisent HTTPS. Les URL de scripts et les chemins sortant de `public/projects` sont refusés. Garder un slug unique pour chaque carte.

Cette version utilise un fichier typé dans le dépôt. Elle ne contient pas de back-office de publication ni de faux bouton d’administration.
