"use client";

"use client";

import { Container } from "@/components/ui/Container";
import { copy } from "@/lib/copy";
import { buttonVariants, buttonSizes } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function OffersClassicHero() {
  return (
    <section className="pt-24 md:pt-36 pb-16 md:pb-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge - matching Services style exactly */}
          <div className="inline-flex items-center rounded-full border border-border bg-surface-1 px-3 py-1 text-sm font-medium text-text-muted mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand mr-2"></span>
            Investissez dans votre avenir
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight text-text">
            {copy.offersPage.hero.title}
          </h1>

          <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            {copy.offersPage.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center justify-center font-semibold rounded-[var(--radius-sm)] transition-all duration-200",
                  buttonVariants.primary,
                  buttonSizes.lg,
                  "h-12 px-8 text-lg"
                )}
              >
                Commencer maintenant
              </Link>
              <Link
                href="#offers"
                className={cn(
                  "inline-flex items-center justify-center font-semibold rounded-[var(--radius-sm)] transition-all duration-200",
                  buttonVariants.outline,
                  buttonSizes.lg,
                  "h-12 px-8 text-lg"
                )}
              >
                Voir les tarifs
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Background Glow - matching Services */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Visual Separator */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
