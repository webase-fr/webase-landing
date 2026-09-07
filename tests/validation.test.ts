import { describe, expect, it } from "vitest";
import { contactSchema, quoteSchema, validationErrors } from "../src/lib/lead-schema";
import { estimateProject } from "../src/lib/estimate";
import { projectSchema } from "../src/content/projects";
import { contact, quote, fullQuote } from "./fixtures";
describe("Validation des demandes", () => {
  it("accepte les trois parcours valides", () => {
    expect(contactSchema.safeParse(contact).success).toBe(true);
    expect(quoteSchema.safeParse(quote).success).toBe(true);
    expect(quoteSchema.safeParse(fullQuote).success).toBe(true);
  });
  it("refuse les champs manquants et les e-mails invalides", () => {
    const result = contactSchema.safeParse({ ...contact, name: "", email: "invalid", message: "" });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(Object.keys(validationErrors(result.error))).toEqual(
        expect.arrayContaining(["name", "email", "message"]),
      );
  });
  it("bloque l’injection d’en-têtes et exige l’information de confidentialité", () => {
    expect(
      contactSchema.safeParse({ ...contact, email: "x@test.fr\r\nBcc: other@test.fr" }).success,
    ).toBe(false);
    expect(contactSchema.safeParse({ ...contact, name: "Name\nBcc: recipient" }).success).toBe(
      false,
    );
    expect(contactSchema.safeParse({ ...contact, privacy: false }).success).toBe(false);
  });
  it("ne laisse pas un brief complet contourner ses champs obligatoires", () => {
    const result = quoteSchema.safeParse({ ...quote, mode: "complet" });
    expect(result.success).toBe(false);
    if (!result.success)
      expect(Object.keys(validationErrors(result.error))).toEqual(
        expect.arrayContaining(["activity", "audience", "objectives", "pages", "content"]),
      );
  });
  it("limite les longueurs et refuse les options forgées et doublons", () => {
    expect(contactSchema.safeParse({ ...contact, message: "x".repeat(5001) }).success).toBe(false);
    expect(quoteSchema.safeParse({ ...quote, features: ["admin"] }).success).toBe(false);
    expect(quoteSchema.safeParse({ ...fullQuote, features: ["cms", "cms"] }).success).toBe(false);
  });
  it("refuse les URL de script, accepte un site actuel HTTPS", () => {
    expect(quoteSchema.safeParse({ ...quote, existingUrl: "javascript:alert(1)" }).success).toBe(
      false,
    );
    expect(quoteSchema.safeParse({ ...quote, existingUrl: "https://example.test" }).success).toBe(
      true,
    );
  });
});
describe("Estimation du périmètre", () => {
  it("utilise le périmètre et jamais le budget déclaré", () => {
    expect(estimateProject(quote)).toMatchObject({ min: 1990, max: 2990 });
    expect(estimateProject({ ...quote, projectType: "landing" })).toMatchObject({
      min: 990,
      max: 1490,
    });
    expect(estimateProject(fullQuote)).toMatchObject({ min: 3490 });
  });
  it("renvoie les fonctions complexes vers un vrai chiffrage", () => {
    for (const projectType of ["application", "boutique", "refonte", "conseil"] as const)
      expect(estimateProject({ ...quote, projectType })).toBeNull();
    expect(estimateProject({ ...quote, features: ["paiement"] })).toBeNull();
    expect(estimateProject({ ...quote, pages: "9-plus" })).toBeNull();
  });
  it("augmente le périmètre multilingue de manière explicite", () => {
    expect(estimateProject({ ...quote, features: ["multilingue"] })).toMatchObject({
      min: 2590,
      max: 4190,
    });
  });
});
describe("Publication de projets", () => {
  const project = {
    slug: "atelier",
    title: "Atelier",
    description: "Un site vitrine",
    category: "Site vitrine",
    image: "/projects/atelier.webp",
    imageAlt: "Page d’accueil de l’atelier",
    url: "https://example.test",
    year: 2026,
  };
  it("vérifie la structure des vrais projets", () =>
    expect(projectSchema.safeParse(project).success).toBe(true));
  it("refuse les chemins sortants, les URL dangereuses et les alt vides", () => {
    expect(
      projectSchema.safeParse({ ...project, image: "/projects/../../secret.png" }).success,
    ).toBe(false);
    expect(projectSchema.safeParse({ ...project, url: "javascript:alert(1)" }).success).toBe(false);
    expect(projectSchema.safeParse({ ...project, imageAlt: "" }).success).toBe(false);
  });
});
