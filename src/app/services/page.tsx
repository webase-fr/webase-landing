"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { copy } from "@/lib/copy";
import { ServiceDetailRows } from "@/components/sections/ServiceDetailRows";
import { TechStack } from "@/components/sections/TechStack";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-bg text-text font-figtree overflow-x-hidden">
      {/* Navbar needed here since it's not in layout for this specific page structure if layout is global? 
          Actually layout is global, so Navbar is already there. 
          I will just render the main content.
      */}

      {/* Hero */}
      <Section className="pt-32 md:pt-48 pb-20 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center rounded-full border border-border bg-surface-1 px-3 py-1 text-sm font-medium text-text-muted mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brand mr-2"></span>
              Nos Expertises
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
              {copy.servicesPage.hero.title}
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
              {copy.servicesPage.hero.subtitle}
            </p>
          </motion.div>
        </Container>
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      </Section>

      {/* Tech Stack Marquee */}
      {/* Tech Stack Marquee Removed per user request */}

      {/* Main Content */}
      <ServiceDetailRows />

      {/* Trust/Process Reminder (Reusing Method if fitting, or just jump to CTA) */}
      {/* Let's keep it focused on services for now */}

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
