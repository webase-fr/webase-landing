import { ogSize, renderOgImage } from "@/lib/og-image";
export const alt =
  "Webase — Votre savoir-faire. Un site à sa hauteur. Création de sites internet et d’applications à Orléans.";
export const size = ogSize;
export const contentType = "image/png";
export default function OpenGraphImage() {
  return renderOgImage({
    label: "DÉVELOPPEUR WEB INDÉPENDANT · ORLÉANS",
    title: "Votre savoir-faire.",
    accent: "Un site à sa hauteur.",
    footer: "Sites internet, applications web et mobiles pour indépendants, TPE et PME.",
  });
}
