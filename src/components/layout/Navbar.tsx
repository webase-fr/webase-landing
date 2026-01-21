"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Link from "next/link";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Services" },
    { href: "/offres", label: "Offres" },
    { href: "/methode", label: "Méthode" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b",
          isScrolled
            ? "bg-white/80 dark:bg-bg/80 backdrop-blur-md border-border h-20"  // Scrolled State
            : "bg-white dark:bg-bg border-transparent h-28" // Top State (Taller, Transparent Border, Solid)
        )}
      >
        <Container className="flex h-full items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            {/* Logo - Adjusted Size (36px) & Visual Alignment */}
            <Image
              src="/logo-webase.svg"
              alt="Webase Logo"
              width={130}
              height={50}
              className="object-contain transition-transform group-hover:scale-105 mb-1"
            />
          </Link>

          {/* Desktop Nav - Scaled Up Text */}
          <nav className="hidden md:flex items-center gap-10 text-base font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-muted hover:text-text transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <ThemeToggle />

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/estimation">
                <Button variant="outline" className="text-base px-6">
                  Estimation
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="text-base px-6">
                  Contact
                </Button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 -mr-2 text-text hover:bg-surface-1 rounded-md transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
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
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl pt-32 pb-8 px-6 md:hidden flex flex-col overflow-y-auto"
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
              <Link href="/estimation" onClick={() => setIsOpen(false)} className="w-full">
                <Button size="lg" className="w-full text-lg">
                  Demander un devis
                </Button>
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="w-full">
                <Button variant="outline" size="lg" className="w-full text-lg">
                  Nous contacter
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
