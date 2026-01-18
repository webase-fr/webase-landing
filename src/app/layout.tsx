import type { Metadata } from "next";
import { Outfit, Figtree } from "next/font/google";
import "./globals.css";
import "../styles/tokens.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  title: "Webase | Du web propre. Qui vend.",
  description: "Agence web moderne. Sites vitrines, plateformes, web apps. Performance, SEO, et design premium.",
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${figtree.variable} font-sans antialiased bg-bg text-text selection:bg-brand selection:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll />
          <Navbar />
          <div className="min-h-screen flex flex-col pt-16">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
