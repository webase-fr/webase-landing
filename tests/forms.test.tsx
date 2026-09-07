// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { QuoteForm } from "../src/components/forms/QuoteForm";
import { ContactForm } from "../src/components/forms/ContactForm";
import { Navbar } from "../src/components/layout/Navbar";
const submitLead = vi.hoisted(() => vi.fn());
vi.mock("../src/actions/send-email", () => ({ submitLead }));
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
  window.matchMedia = vi
    .fn()
    .mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() });
  submitLead.mockResolvedValue({
    status: "success",
    message: "Envoyé",
    reference: "WB-TEST123456",
  });
});
afterEach(() => cleanup());

async function fillExpress(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("radio", { name: /Présenter mon activité/ }));
  await user.type(
    screen.getByLabelText(/Racontez votre projet/),
    "Un site pour présenter mon atelier et recevoir des demandes.",
  );
  await user.selectOptions(screen.getByLabelText(/Budget prévu/), "2000-4000");
  await user.selectOptions(screen.getByLabelText(/Mise en ligne souhaitée/), "1-3-mois");
  await user.click(screen.getByRole("button", { name: "Continuer" }));
}
async function fillContactDetails(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Votre nom/), "Camille Martin");
  await user.type(screen.getByLabelText(/Votre e-mail/), "camille@example.test");
  await user.click(screen.getByRole("checkbox", { name: /J’ai lu les informations/ }));
}
describe("Questionnaires dans le DOM, sans navigateur", () => {
  it("propose deux formats et valide l’étape avant de continuer", async () => {
    const user = userEvent.setup();
    render(<QuoteForm />);
    await user.click(screen.getByRole("button", { name: /Commencer le brief express/ }));
    await user.click(screen.getByRole("button", { name: "Continuer" }));
    expect(screen.getByText(/Choisissez le type de projet/)).toBeVisible();
    expect(screen.getByText(/Décrivez votre projet en 20/)).toBeVisible();
    expect(submitLead).not.toHaveBeenCalled();
  });
  it("réalise le brief express, conserve les réponses en arrière et transmet une seule demande", async () => {
    const user = userEvent.setup();
    render(<QuoteForm initialMode="express" />);
    await fillExpress(user);
    expect(screen.getByText(/1 990/)).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Retour" }));
    expect(screen.getByLabelText(/Racontez votre projet/)).toHaveValue(
      "Un site pour présenter mon atelier et recevoir des demandes.",
    );
    await user.click(screen.getByRole("button", { name: "Continuer" }));
    await fillContactDetails(user);
    await user.click(screen.getByRole("button", { name: /Envoyer ma demande/ }));
    expect(await screen.findByRole("heading", { name: "Merci, c’est envoyé." })).toBeVisible();
    expect(submitLead).toHaveBeenCalledTimes(1);
    expect(submitLead.mock.calls[0][0]).toMatchObject({
      kind: "quote",
      mode: "express",
      projectType: "vitrine",
      email: "camille@example.test",
      budget: "2000-4000",
    });
    expect(submitLead.mock.calls[0][0].requestId).toMatch(/^[a-f0-9-]{36}$/);
  });
  it("ne laisse pas passer une activité vide dans le brief complet", async () => {
    const user = userEvent.setup();
    render(<QuoteForm initialMode="complet" />);
    await user.click(screen.getByRole("button", { name: "Continuer" }));
    expect(screen.getByRole("heading", { name: "Commençons par votre activité." })).toBeVisible();
    expect(screen.getByText(/Décrivez votre activité/)).toBeVisible();
  });
  it("transmet les cinq étapes du brief complet et toutes leurs réponses", async () => {
    const user = userEvent.setup();
    render(<QuoteForm initialMode="complet" />);
    await user.type(screen.getByLabelText(/^Votre activité/), "Menuiserie artisanale");
    await user.type(screen.getByLabelText(/Qui sont vos clients/), "Les particuliers du Loiret");
    await user.click(screen.getByRole("checkbox", { name: "Recevoir des demandes" }));
    await user.click(screen.getByRole("button", { name: "Continuer" }));
    await user.click(screen.getByRole("radio", { name: /Présenter mon activité/ }));
    await user.type(
      screen.getByLabelText(/Racontez votre projet/),
      "Je souhaite présenter mes réalisations et mes services.",
    );
    await user.type(screen.getByLabelText(/Votre site actuel/), "https://example.test");
    await user.click(screen.getByRole("button", { name: "Continuer" }));
    await user.selectOptions(screen.getByLabelText(/Combien de pages/), "2-5");
    await user.selectOptions(screen.getByLabelText(/Où en êtes-vous/), "partiel");
    await user.click(screen.getByRole("checkbox", { name: "Modifier mes contenus" }));
    await user.type(
      screen.getByLabelText(/Des sites ou des styles/),
      "Des compositions sobres et une galerie.",
    );
    await user.type(screen.getByLabelText(/Autres précisions/), "Je fournis les photos.");
    await user.click(screen.getByRole("button", { name: "Continuer" }));
    await user.selectOptions(screen.getByLabelText(/Budget prévu/), "4000-7000");
    await user.selectOptions(screen.getByLabelText(/Mise en ligne souhaitée/), "flexible");
    await user.click(screen.getByRole("button", { name: "Continuer" }));
    expect(screen.getByText("Menuiserie artisanale")).toBeVisible();
    expect(screen.getByText("Je fournis les photos.")).toBeVisible();
    await fillContactDetails(user);
    await user.click(screen.getByRole("button", { name: /Envoyer ma demande/ }));
    await screen.findByRole("heading", { name: "Merci, c’est envoyé." });
    expect(submitLead.mock.calls[0][0]).toMatchObject({
      mode: "complet",
      activity: "Menuiserie artisanale",
      objectives: ["contacts"],
      features: ["cms"],
      pages: "2-5",
      content: "partiel",
      notes: "Je fournis les photos.",
      existingUrl: "https://example.test",
    });
  });
  it("garde les réponses après échec et réutilise l’identifiant au nouvel envoi", async () => {
    submitLead.mockResolvedValueOnce({
      status: "error",
      message: "Service temporairement indisponible.",
    });
    const user = userEvent.setup();
    render(<QuoteForm initialMode="express" />);
    await fillExpress(user);
    await fillContactDetails(user);
    await user.click(screen.getByRole("button", { name: /Envoyer ma demande/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Service temporairement indisponible.",
    );
    expect(screen.getByLabelText(/Votre e-mail/)).toHaveValue("camille@example.test");
    await user.click(screen.getByRole("button", { name: /Envoyer ma demande/ }));
    await screen.findByRole("heading", { name: "Merci, c’est envoyé." });
    expect(submitLead.mock.calls[0][0].requestId).toBe(submitLead.mock.calls[1][0].requestId);
  });
  it("désactive l’envoi pendant le traitement", async () => {
    let resolve: (value: unknown) => void = () => {};
    submitLead.mockImplementationOnce(
      () =>
        new Promise((done) => {
          resolve = done;
        }),
    );
    const user = userEvent.setup();
    render(<QuoteForm initialMode="express" />);
    await fillExpress(user);
    await fillContactDetails(user);
    await user.click(screen.getByRole("button", { name: /Envoyer ma demande/ }));
    expect(screen.getByRole("button", { name: /Envoi en cours/ })).toBeDisabled();
    expect(screen.getByLabelText(/Votre e-mail/)).toBeDisabled();
    resolve({ status: "success", message: "OK" });
    await screen.findByRole("heading", { name: "Merci, c’est envoyé." });
  });
  it("garde un formulaire de contact utilisable après une erreur", async () => {
    submitLead.mockResolvedValueOnce({ status: "error", message: "Échec de l’envoi." });
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.type(screen.getByLabelText(/Votre nom/), "Camille Martin");
    await user.type(screen.getByLabelText(/Votre e-mail/), "camille@example.test");
    await user.type(screen.getByLabelText(/Le sujet de votre message/), "Un premier échange");
    await user.type(
      screen.getByLabelText(/Votre message/),
      "Je voudrais discuter de mon nouveau site internet.",
    );
    await user.click(screen.getByRole("checkbox", { name: /J’ai lu les informations/ }));
    await user.click(screen.getByRole("button", { name: /Envoyer mon message/ }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Échec de l’envoi.");
    expect(screen.getByLabelText(/Votre message/)).toHaveValue(
      "Je voudrais discuter de mon nouveau site internet.",
    );
  });
  it("ouvre et ferme le menu au clavier en restaurant le focus", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByRole("button", { name: "Ouvrir le menu" });
    await user.click(toggle);
    expect(screen.getByRole("navigation", { name: "Navigation mobile" })).toBeVisible();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(toggle).toHaveAttribute("aria-expanded", "false"));
    expect(toggle).toHaveFocus();
  });
});
