import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import "../styles/tokens.css";

const sora = Sora({ subsets: ["latin"] });

import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  title: "Webase | Du web propre. Qui vend.",
  description: "Agence web moderne. Sites vitrines, plateformes, web apps. Performance, SEO, et design premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${sora.className} antialiased bg-bg text-text selection:bg-brand selection:text-white`}
      >
        <SmoothScroll />
        <Navbar />
        <div className="min-h-screen flex flex-col pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
