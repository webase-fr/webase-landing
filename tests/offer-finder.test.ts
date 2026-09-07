import { describe, expect, it } from "vitest";
import { findOffer } from "../src/lib/offer-finder";
import { offers } from "../src/content/site";

describe("Orientation commerciale", () => {
  it("oriente un site de présentation vers le périmètre utile", () => {
    expect(findOffer("page", "no").offer).toBe(offers.find((o) => o.id === "essentiel"));
    expect(findOffer("site", "no").offer).toBe(offers.find((o) => o.id === "vitrine"));
  });
  it("préserve le besoin d’une seule page avec gestion autonome dans le lien du brief", () => {
    const result = findOffer("page", "yes");
    expect(result.offer?.id).toBe("evolutif");
    const query = new URL(result.href, "https://example.test").searchParams;
    expect(query.get("type")).toBe("landing");
    expect(query.get("offre")).toBe("evolutif");
  });
  it("ne donne pas de prix forfaitaire aux refontes et aux fonctions complexes", () => {
    expect(findOffer("refonte", "yes").offer).toBeNull();
    expect(findOffer("advanced", "no").offer).toBeNull();
    expect(findOffer("refonte", "yes").href).toContain("type=refonte");
  });
  it("propose un échange, sans offre imposée, quand le besoin reste à préciser", () => {
    for (const result of [findOffer("unknown", "yes"), findOffer("page", "unknown")]) {
      expect(result.offer).toBeNull();
      expect(result.href).toContain("format=express");
    }
  });
});
