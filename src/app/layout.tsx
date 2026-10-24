import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";
import { getSiteUrl, isIndexable } from "@/lib/metadata";
import "./globals.css";

const figtree = localFont({
  src: "../../node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2",
  variable: "--font-figtree",
  display: "swap",
  weight: "300 900",
});
export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Webase — Création de sites internet et d’applications à Orléans",
    template: "%s | Webase",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.owner, url: "/studio" }],
  robots: isIndexable() ? { index: true, follow: true } : { index: false, follow: false },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={figtree.variable}>
      {/* Extensions may add body attributes before hydration (e.g. cz-shortcut-listen).
          Scope this exception to body; descendants must still match the server HTML. */}
      <body suppressHydrationWarning>
        <a className="skip-link" href="#contenu">
          Aller au contenu
        </a>
        <Navbar />
        <main id="contenu" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
