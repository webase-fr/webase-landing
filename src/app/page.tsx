// No formatting change needed, just checking context. 
// Actually I will verify page.tsx first.
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Scene } from "@/components/three/Scene";
import { copy } from "@/lib/copy";
import { Card } from "@/components/ui/Card";
import { WordRotate } from "@/components/ui/WordRotate";
import { GravityGrid } from "@/components/three/GravityGrid";
import { FloatingParticles } from "@/components/three/FloatingParticles";
import { ServiceCards } from "@/components/sections/ServiceCards";

export default function Home() {
  return (
    <main className="flex-1 overflow-x-hidden">
      {/* Hero Section */}
      <Section className="pt-32 md:pt-48 pb-32 flex flex-col items-center justify-start min-h-[100dvh] relative overflow-hidden">
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
            Agence Web & Product Next.js
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
            <Button size="lg" className="h-14 px-8 text-lg">{copy.hero.ctaPrimary}</Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg bg-surface-1/50 backdrop-blur">{copy.hero.ctaSecondary}</Button>
          </div>
        </Container>
      </Section>

      {/* Content using Figtree */}
      <div className="font-figtree">
        {/* Services Section */}
        <Section className="bg-bg border-t border-border">
          <Container>
            <div className="mb-16 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{copy.services.title}</h2>
            </div>
            <ServiceCards />
          </Container>
        </Section>

        {/* Offres Section */}
        <Section className="bg-surface-1/50 border-t border-border">
          <Container>
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{copy.offres.title}</h2>
              <p className="text-text-muted">Des forfaits clairs. Pas de surprise.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {copy.offres.items.map((item, idx) => (
                <Card key={idx} className={
                  `flex flex-col p-8 relative transition-all duration-300 ${idx === 1
                    ? 'border-brand bg-bg shadow-lg shadow-brand/5 ring-1 ring-brand/20 z-10 scale-[1.02]'
                    : 'bg-surface-1 hover:border-text/20'
                  }`
                } noHover={idx === 1}>
                  {idx === 1 && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      Recommandé
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <div className="text-4xl font-bold text-text mb-2 tracking-tight">{item.price}</div>
                    <p className="text-sm text-text-muted/80 font-medium">{item.tagline}</p>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    {item.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start text-sm text-text-muted">
                        <svg className="w-5 h-5 text-brand mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant={idx === 1 ? 'primary' : 'outline'} className="w-full">
                    Choisir {item.name}
                  </Button>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* Realisations Section */}
        <Section className="bg-bg border-y border-border">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{copy.realisations.title}</h2>
                <p className="text-text-muted">Nos derniers déploiements.</p>
              </div>
              <Button variant="outline">Voir tout le portfolio</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {copy.realisations.items.map((project, idx) => (
                <div key={idx} className="group relative bg-surface-1 aspect-[4/3] flex flex-col justify-between p-6 border border-border hover:border-brand hover:shadow-lg transition-all cursor-pointer">
                  {/* Visual placeholder for "No Image" style */}
                  <div className="absolute top-6 right-6 w-12 h-12 border-2 border-surface-2 rounded-full flex items-center justify-center group-hover:border-brand transition-colors">
                    <svg className="w-5 h-5 text-text-muted group-hover:text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  <div className="mt-auto">
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {project.stack.slice(0, 2).map((tech, tIdx) => (
                        <span key={tIdx} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-bg text-text border border-border">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-1 group-hover:text-brand transition-colors">{project.title}</h3>
                    <p className="text-sm text-text-muted">{project.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Methode Section */}
        <Section className="bg-surface-1/50">
          <Container>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.methode.title}</h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-0 relative border-l border-border ml-4 md:ml-0 pl-10 md:pl-0">
              {copy.methode.steps.map((step, idx) => (
                <div key={idx} className="relative pb-16 last:pb-0 md:pl-16">
                  {/* Timeline dot */}
                  <div className="absolute left-[-41px] md:left-0 top-0 w-3 h-3 bg-brand rounded-full -translate-x-[50%] z-10" />

                  <h3 className="text-lg font-bold text-brand mb-1 tracking-widest uppercase text-xs">{step.number} — {step.title}</h3>
                  <p className="text-xl md:text-2xl font-medium text-text mt-2 max-w-2xl">{step.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Contact / CTA Section */}
        <Section className="py-32 flex flex-col items-center text-center bg-bg border-t border-border">
          <Container className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter text-balance">On commence quand ?</h2>
            <p className="text-lg text-text-muted mb-10 max-w-lg mx-auto">
              Pas de forcing, juste une discussion claire sur vos besoins et la faisabilité.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-16 px-10 text-xl w-full sm:w-auto shadow-xl shadow-brand/10">Réserver un appel</Button>
              <Button variant="outline" size="lg" className="h-16 px-10 text-xl w-full sm:w-auto bg-surface-1">m&apos;écrire un email</Button>
            </div>
          </Container>
        </Section>

        {/* More sections to follow */}
      </div>
    </main>
  );
}
