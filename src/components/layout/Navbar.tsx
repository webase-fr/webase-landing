"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#offres", label: "Offres" },
    { href: "#realisations", label: "Projets" },
    { href: "#methode", label: "Méthode" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-bg/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-end gap-2">
            {/* Logo - Smaller, aligned at bottom */}
            <Image
              src="/logo_webase.svg"
              alt="Webase Logo"
              width={32}
              height={24}
              className="object-contain mb-[2px]" // Slight lift to match baseline
            />
            <span className="text-2xl font-soft tracking-tight leading-none">
              Webase<span className="text-brand">.</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-muted hover:text-text transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="outline" size="sm">
                Estimation
              </Button>
              <Button size="sm">
                Contact
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 -mr-2 text-text hover:bg-surface-1 rounded-md transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl pt-24 pb-8 px-6 md:hidden flex flex-col overflow-y-auto"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="text-3xl font-medium tracking-tight text-text hover:text-brand transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-auto flex flex-col gap-4 pt-12"
            >
              <Button size="lg" className="w-full text-lg" onClick={() => setIsOpen(false)}>
                Demander un devis
              </Button>
              <Button variant="outline" size="lg" className="w-full text-lg" onClick={() => setIsOpen(false)}>
                Estimation de projet
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
