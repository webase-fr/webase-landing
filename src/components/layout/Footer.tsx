"use client";

import { Container } from "@/components/ui/Container";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-bg border-t border-border pt-16 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-end gap-2">
              <Image
                src="/logo_webase.svg"
                alt="Webase Logo"
                width={32}
                height={24}
                className="object-contain mb-[2px]"
              />
              <span className="text-2xl font-soft tracking-tight leading-none text-text">
                Webase<span className="text-brand">.</span>
              </span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Agence web & product spécialisée Next.js. Nous transformons votre vision en réalité digitale performante.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-4">
            <h4 className="font-bold text-text">Navigation</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><a href="#" className="hover:text-brand transition-colors">Accueil</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Expertise</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Notre Méthode</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Tarifs</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-4">
            <h4 className="font-bold text-text">Légal</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><a href="#" className="hover:text-brand transition-colors">Mentions Légales</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">CGV / CGU</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Confidentialité</a></li>
            </ul>
          </div>

          {/* Socials Column */}
          <div className="space-y-4">
            <h4 className="font-bold text-text">Réseaux</h4>
            <div className="flex gap-4">
              {/* X / Twitter */}
              <a href="#" className="w-10 h-10 rounded-full bg-surface-1 border border-border flex items-center justify-center text-text-muted hover:text-brand hover:border-brand transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-10 h-10 rounded-full bg-surface-1 border border-border flex items-center justify-center text-text-muted hover:text-brand hover:border-brand transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              {/* Mail */}
              <a href="#" className="w-10 h-10 rounded-full bg-surface-1 border border-border flex items-center justify-center text-text-muted hover:text-brand hover:border-brand transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">© 2024 Webase Digital. Tous droits réservés.</p>
          {/* Removed Operational Status */}
        </div>
      </Container>
    </footer>
  );
}
