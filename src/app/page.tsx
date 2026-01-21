// No formatting change needed, just checking context. 
// Actually I will verify page.tsx first.
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Link from "next/link";
import { Scene } from "@/components/three/Scene";
import { copy } from "@/lib/copy";
import { WordRotate } from "@/components/ui/WordRotate";
import { GravityGrid } from "@/components/three/GravityGrid";
import { FloatingParticles } from "@/components/three/FloatingParticles";

// Components
import { ServiceCards } from "@/components/sections/ServiceCards";
import { OffersCards } from "@/components/sections/OffersCards";
import { FAQSection } from "@/components/sections/FAQSection";
import { TechStack } from "@/components/sections/TechStack";
import { AIBento } from "@/components/sections/AIBento";
import { MethodStations } from "@/components/sections/MethodStations";
import { TestimonialsBubbles } from "@/components/sections/TestimonialsBubbles";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="flex-1 overflow-x-hidden">
      {/* Hero Section */}
      <Section className="pt-32 md:pt-48 pb-20 flex flex-col items-center justify-start min-h-[100dvh] relative overflow-hidden">
        {/* Background Gradient Orb */}
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
          {/* Increased opacity for mobile visibility */}
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] md:w-[1400px] h-[600px] md:h-[1000px] bg-brand/10 md:bg-brand/5 blur-[80px] md:blur-[120px] rounded-full mix-blend-normal opacity-80 md:opacity-50 dark:opacity-20" />
        </div>

        {/* 3D Scene Background (Gravity Grid) */}
        <div className="absolute inset-0 -z-10 opacity-60 pointer-events-none">
          <Scene className="w-full h-full">
            <GravityGrid />
            <FloatingParticles />
          </Scene>
        </div>

        <Container className="text-center space-y-8 relative z-10">
          <div className="inline-flex items-center rounded-full border border-border bg-surface-1 px-3 py-1 text-sm font-medium text-text-muted mb-4">
            <span className="flex h-2 w-2 rounded-full bg-brand mr-2"></span>
            Agence Web
          </div>

          <h1 className="text-5xl md:text-[6rem] font-bold tracking-tight text-text leading-[1.0] md:leading-[1.1] max-w-6xl mx-auto">
            {copy.hero.title}<br />
            {/* Mobile: Flex-Col + Centered. Desktop: Flex-Row + Baseline. */}
            <span className="flex flex-col md:flex-row items-center md:items-baseline justify-center gap-x-6 mt-6 md:mt-4 gap-y-2 md:gap-y-6">
              <span className="text-text-muted font-medium italic font-serif text-4xl md:text-7xl">Simplement</span>
              <WordRotate
                className="text-brand text-center md:text-left text-4xl md:text-7xl md:translate-y-[5px]"
                words={["Premium", "Impactants", "Sur-mesure", "Performants"]}
              />
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-text-muted max-w-4xl mx-auto leading-relaxed font-normal text-balance mt-6 md:mt-6 px-2 md:px-0">
            <span className="md:hidden">Transformez votre vision en réalité digitale. Rapidement.</span>
            <span className="hidden md:inline">{copy.hero.subtitle}</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/estimation">
              <Button size="lg" className="h-14 px-8 text-lg">{copy.hero.ctaPrimary}</Button>
            </Link>
            <Link href="/offres">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg bg-surface-1/50 backdrop-blur">{copy.hero.ctaSecondary}</Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Tech Stack Marquee */}
      {/* Tech Stack Marquee Removed per user request */}

      {/* Content */}
      <div className="font-figtree">
        {/* Services Section */}
        <Section className="bg-bg border-t border-border">
          <Container>
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-medium mb-6 tracking-tight text-balance">
                {copy.services.title.split('*').map((part, index) => (
                  index % 2 === 1 ? (
                    <span key={index} className="font-serif font-bold italic block mt-2 md:inline md:mt-0">
                      {part}
                    </span>
                  ) : (
                    <span key={index}>{part}</span>
                  )
                ))}
              </h2>
            </div>
            <ServiceCards />
          </Container>
        </Section>

        {/* AI Section (Bento) */}
        <AIBento />

        {/* Methode Section (Stations) */}
        <MethodStations />

        {/* Testimonials (Bubbles) */}
        <TestimonialsBubbles />

        {/* FAQ Section */}
        <FAQSection />

        {/* Offres Section */}
        <Section className="bg-surface-1/50 border-t border-border">
          <Container>
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{copy.offres.title}</h2>
              <p className="text-text-muted">Des forfaits clairs. Pas de surprise.</p>
            </div>

            <OffersCards />

          </Container>
        </Section>

        {/* Contact / CTA Section (Aurora) */}
        <CTASection />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
