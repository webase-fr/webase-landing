import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

const routes = [
  "/",
  "/offres",
  "/services",
  "/studio",
  "/realisations",
  "/contact",
  "/estimation",
  "/blog",
  "/mentions-legales",
  "/confidentialite",
];
for (const width of [320, 390, 768, 1024, 1440]) {
  test(`mise en page sans débordement à ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("main h1")).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `Débordement de ${route} à ${width}px`).toBeLessThanOrEqual(1);
    }
    expect(errors).toEqual([]);
  });
}
test("menu mobile, fermeture clavier et navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Ouvrir le menu" });
  await toggle.click();
  await expect(page.getByRole("navigation", { name: "Navigation mobile" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Navigation mobile" })
    .getByRole("link", { name: "Offres & tarifs" })
    .click();
  await expect(page).toHaveURL(/\/offres$/);
  await expect(page.getByRole("navigation", { name: "Navigation mobile" })).toBeHidden();
});
test("le menu mobile disparaît quand l’écran s’élargit", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(page.getByRole("navigation", { name: "Navigation mobile" })).toBeHidden();
});
test("questionnaire hydraté, validation, récapitulatif et retour", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/estimation?format=express");
  await page.getByRole("button", { name: "Continuer" }).click();
  await expect(page.getByText(/Choisissez le type de projet/)).toBeVisible();
  await page.getByRole("radio", { name: /Présenter mon activité/ }).check();
  await page
    .getByLabel(/Racontez votre projet/)
    .fill("Je souhaite présenter mon atelier et mes réalisations.");
  await page.getByLabel(/Budget prévu/).selectOption("2000-4000");
  await page.getByLabel(/Mise en ligne souhaitée/).selectOption("1-3-mois");
  await page.getByRole("button", { name: "Continuer" }).click();
  await expect(page.getByRole("heading", { name: "Et pour vous répondre ?" })).toBeVisible();
  await expect(page.locator(".estimate-result")).toContainText("1 990");
  await page.getByRole("button", { name: "Envoyer ma demande" }).click();
  await expect(page.getByText(/Saisissez une adresse e-mail valide/)).toBeVisible();
  await page.getByRole("button", { name: "Retour" }).click();
  await expect(page.getByLabel(/Racontez votre projet/)).toHaveValue(
    "Je souhaite présenter mon atelier et mes réalisations.",
  );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
  ).toBeLessThanOrEqual(1);
});
test("FAQ accessible au clavier", async ({ page }) => {
  await page.goto("/");
  const summary = page.locator("summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).not.toHaveAttribute("open", "");
});
test("captures de revue visuelle", async ({ page }, testInfo) => {
  const directory = `.cache/visual-review/${testInfo.project.name}`;
  await mkdir(directory, { recursive: true });
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `${directory}/home-${width}.png` });
    await page.locator(".offers-section").screenshot({ path: `${directory}/offers-${width}.png` });
    await page.locator(".brief-section").screenshot({ path: `${directory}/briefs-${width}.png` });
    await page.goto("/estimation");
    await expect(page.locator("main h1")).toBeVisible();
    await page.screenshot({ path: `${directory}/quote-${width}.png`, fullPage: true });
  }
});

test("accessibilité automatisée des pages et des formulaires", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    "/",
    "/offres",
    "/contact",
    "/estimation",
    "/estimation?format=express",
    "/estimation?format=complet",
    "/realisations",
  ]) {
    await page.goto(route);
    await expect(page.locator("main h1")).toBeVisible();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations, route).toEqual([]);
  }
});

test("les deux briefs sont accessibles directement depuis l’accueil", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [mode, title] of [
    ["express", "Votre projet, en quelques mots."],
    ["complet", "Commençons par votre activité."],
  ]) {
    await page.goto("/");
    await page.locator(".hero").getByRole("link", { name: "Parlons de votre projet" }).click();
    await expect(page).toHaveURL(/#votre-projet$/);
    await page
      .locator(".brief-section")
      .getByRole("link", { name: `Commencer le brief ${mode}` })
      .click();
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
  }
});

test("l’aide au choix conserve la page unique et l’autonomie dans le brief", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/offres");
  await page.locator(".offer-finder summary").click();
  await page.getByRole("radio", { name: "Présenter une offre sur une page", exact: true }).check();
  await page.getByRole("radio", { name: "Oui, je veux être autonome", exact: true }).check();
  await expect(page.locator(".finder-result")).toContainText("L’évolutif");
  expect(
    (await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze())
      .violations,
  ).toEqual([]);
  await page.getByRole("link", { name: "Préciser mon projet" }).click();
  await page.getByLabel(/^Votre activité/).fill("Menuiserie artisanale");
  await page.getByLabel(/Qui sont vos clients/).fill("Les particuliers du Loiret");
  await page.getByRole("checkbox", { name: "Recevoir des demandes" }).check();
  await page.getByRole("button", { name: "Continuer" }).click();
  await expect(page.locator('input[name="projectType"][value="landing"]')).toBeChecked();
  await page
    .getByLabel(/Racontez votre projet/)
    .fill("Une page pour présenter mon atelier et mes réalisations.");
  await page.getByRole("button", { name: "Continuer" }).click();
  await expect(page.getByLabel(/Combien de pages/)).toHaveValue("1");
  await expect(page.getByRole("checkbox", { name: "Modifier mes contenus" })).toBeChecked();
});
