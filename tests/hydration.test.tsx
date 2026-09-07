// @vitest-environment jsdom
import { act } from "react";
import { hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import RootLayout from "../src/app/layout";

vi.mock("next/font/local", () => ({ default: () => ({ variable: "font-test" }) }));
vi.mock("../src/components/layout/Navbar", () => ({ Navbar: () => <nav>Navigation</nav> }));
vi.mock("../src/components/layout/Footer", () => ({ Footer: () => <footer>Webase</footer> }));

let root: Root | undefined;
afterEach(async () => {
  if (root) await act(() => root?.unmount());
  root = undefined;
  vi.unstubAllGlobals();
});

async function hydrateModifiedDocument(change: (doc: Document) => void) {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  const errors = vi.spyOn(console, "error").mockImplementation(() => {});
  const content = (
    <RootLayout>
      <div id="application-content" data-version="expected">
        Votre projet
      </div>
    </RootLayout>
  );
  const doc = new DOMParser().parseFromString(renderToString(content), "text/html");
  change(doc);
  await act(() => {
    root = hydrateRoot(doc, content);
  });
  return { doc, messages: errors.mock.calls.map((args) => args.join(" ")) };
}

describe("Hydratation du layout et attributs d’extensions", () => {
  it("tolère l’attribut ajouté par une extension sur body", async () => {
    const { doc, messages } = await hydrateModifiedDocument((doc) =>
      doc.body.setAttribute("cz-shortcut-listen", "true"),
    );
    expect(doc.body.getAttribute("cz-shortcut-listen")).toBe("true");
    expect(messages).toEqual([]);
  });
  it("continue de signaler les divergences dans les composants du site", async () => {
    const { messages } = await hydrateModifiedDocument((doc) =>
      doc.getElementById("application-content")?.setAttribute("data-version", "unexpected"),
    );
    expect(
      messages.some((message) => message.includes("hydrated") && message.includes("data-version")),
    ).toBe(true);
  });
});
