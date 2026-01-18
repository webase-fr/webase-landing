"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <Section className="py-32 md:py-48 relative overflow-hidden bg-black flex flex-col items-center justify-center text-center border-t border-white/10">

      {/* Optimized Background - No Blend Modes to prevent lag */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-[radial-gradient(circle_at_center,_var(--brand-dark)_0%,_#000000_70%)] opacity-30" />

      {/* Subtle Breathing Glow - CSS Transform based for performance */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[80px]"
      />

      <Container className="relative z-10 max-w-4xl">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-8 leading-[1.1]">
          On commence <span className="font-serif italic font-medium text-white">maintenant</span> ?
        </h2>

        <p className="text-xl md:text-2xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
          Discutons de votre projet. Sans engagement, juste de la valeur.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button
            size="lg"
            className="h-16 px-10 text-xl w-full sm:w-auto bg-brand hover:bg-brand-light text-white transition-all duration-300"
          >
            Réserver un appel
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-16 px-10 text-xl w-full sm:w-auto border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm"
          >
            M&apos;écrire par email
          </Button>
        </div>
      </Container>
    </Section>
  );
}
