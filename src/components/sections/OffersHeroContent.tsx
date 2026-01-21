"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { copy } from "@/lib/copy";
import { ArrowDown } from "lucide-react";

export function OffersHeroContent() {
  return (
    <>
      <Container className="text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-sm font-bold text-brand uppercase tracking-wider mb-6">
            Investissez dans votre avenir
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight text-text">
            {copy.offersPage.hero.title}
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            {copy.offersPage.hero.subtitle}
          </p>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="p-3 rounded-full bg-surface-1/50 backdrop-blur border border-border text-text-muted">
          <ArrowDown className="w-6 h-6" />
        </div>
      </motion.div>
    </>
  );
}
