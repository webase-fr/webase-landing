import type { Quote } from "./lead-schema";
import { offerStartingPrices } from "@/content/site";

export type Estimate = { min: number; max: number; label: string } | null;
/** A scope-based indication, never a binding quote or a budget-based price. */
export function estimateProject(
  project: Pick<Quote, "projectType" | "pages" | "features">,
): Estimate {
  if (
    ["refonte", "boutique", "application", "conseil"].includes(project.projectType) ||
    project.pages === "9-plus"
  )
    return null;
  if (
    project.features.some((feature) =>
      ["paiement", "espace-client", "reservation"].includes(feature),
    )
  )
    return null;
  const onePage = project.pages ? project.pages === "1" : project.projectType === "landing";
  let min: number = onePage ? offerStartingPrices.essentiel : offerStartingPrices.vitrine;
  let max = min + (onePage ? 500 : 1000);
  if (project.pages === "6-8") {
    min += 700;
    max += 1000;
  }
  if (project.features.includes("cms") || project.features.includes("blog")) {
    min = Math.max(min, offerStartingPrices.evolutif);
    max = Math.max(max, offerStartingPrices.evolutif + 1000);
  }
  if (project.features.includes("multilingue")) {
    min += 600;
    max += 1200;
  }
  return { min, max, label: onePage ? "Page de présentation" : "Site vitrine" };
}
export function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-FR").format(value) + " €";
}
