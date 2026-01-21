"use client";

import { Container } from "@/components/ui/Container";
import { copy } from "@/lib/copy";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SimplePremiumHero() {
  return (
    <section className="relative pt-32 pb-20 min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* 
        1. Deep "Aurora" Background 
        Using pure CSS radial gradients for a rich, deep feel without WebGL.
      */}
      <div className="absolute inset-0 -z-10 bg-bg">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-brand/20 blur-[120px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[40%] left-[40%] w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[100px] mix-blend-screen" />
      </div>

      <Container className="relative z-10 flex flex-col items-center">

        {/* 
          2. The "Glass Card"
          A central contained element with backdrop blur to frame the content.
        */}
        <div className="max-w-4xl w-full text-center p-8 md:p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl ring-1 ring-white/10">

          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-bold text-brand uppercase tracking-wider mb-8">
            Investissez dans votre avenir
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-text">
            {copy.offersPage.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            {copy.offersPage.hero.subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg shadow-lg shadow-brand/20">Commencer maintenant</Button>
            <Button variant="ghost" size="lg" className="h-14 px-8 text-lg">Voir les tarifs</Button>
          </div>
        </div>

      </Container>

      {/* 
        3. Scroll Indicator 
        Simple CSS bounce animation.
      */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
        <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Découvrir</span>
        <ArrowDown className="w-5 h-5 text-text-muted" />
      </div>

    </section>
  );
}
