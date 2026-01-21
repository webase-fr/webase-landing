"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { Container } from "@/components/ui/Container";
import { Check, Zap, Star, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function OfferDeepDive() {
  return (
    <div className="flex flex-col">
      {copy.offersPage.items.map((item, idx) => {
        const isReversed = idx % 2 !== 0;

        // Define styles based on index for the 3-card pattern (Black, Blue, White)
        // 0: Essentiel (Black/Dark)
        // 1: Pro (Blue/Brand)
        // 2: Sur-Mesure (White/Surface)

        let cardBgClass = "bg-surface-1 border-border/50";
        let cardTextClass = "text-text";
        let cardMutedTextClass = "text-text-muted";
        let buttonClass = "bg-brand text-white hover:bg-brand-dark";
        let iconBgClass = "bg-brand/10 text-brand";

        // Alternating white/slate in light mode, bg/surface-1 in dark mode
        let sectionBgClass = idx % 2 === 0
          ? "bg-white dark:bg-bg"
          : "bg-slate-50 dark:bg-surface-1";

        if (idx === 0) {
          // Black/Dark Theme - Keeps dark look in both modes usually, or adapts slightly
          cardBgClass = "bg-[#0a0a0a] border-white/10 text-white";
          cardTextClass = "text-white";
          cardMutedTextClass = "text-gray-400";
          buttonClass = "bg-white text-black hover:bg-gray-200";
          iconBgClass = "bg-white/10 text-white";
        } else if (idx === 1) {
          // Blue/Brand Theme - Keeps brand look
          cardBgClass = "bg-brand border-brand-light/20 text-white";
          cardTextClass = "text-white";
          cardMutedTextClass = "text-blue-100";
          buttonClass = "bg-white text-brand hover:bg-blue-50";
          iconBgClass = "bg-white/20 text-white";
        } else {
          // White/Standard Theme -> Adapts to Dark Mode with Premium Glassmorphism
          // Light: White card | Dark: Transparent Glass + Blur + Subtle Border
          cardBgClass = "bg-white dark:bg-white/5 dark:backdrop-blur-md border-border/50 shadow-xl dark:border-white/10 dark:shadow-2xl";
          // Text classes use default text-text which handles dark mode automatically, 
          // but we might want slightly brighter text in dark mode if needed. 
          // Default should be fine as 'text-text' is usually white-ish in dark mode.
        }

        return (
          <section id={(item as any).id} key={idx} className={`scroll-mt-24 py-24 relative overflow-hidden ${sectionBgClass}`}>
            <Container className="relative">
              <div className={`flex flex-col lg:flex-row gap-20 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>

                {/* Offer Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="w-full lg:w-5/12 flex-shrink-0"
                >
                  <div
                    className={`
                        relative p-10 rounded-[2.5rem] 
                        ${cardBgClass} border 
                        shadow-2xl transition-transform duration-500 ease-out
                        hover:scale-95
                    `}
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Icon */}
                      <div className={`p-4 rounded-2xl mb-8 ${iconBgClass}`}>
                        {idx === 0 && <Star className="w-8 h-8" />}
                        {idx === 1 && <Zap className="w-8 h-8" />}
                        {idx === 2 && <Shield className="w-8 h-8" />}
                      </div>

                      <h3 className={`text-2xl font-bold mb-2 ${cardTextClass}`}>{item.name}</h3>
                      <div className={`text-5xl md:text-6xl font-bold mb-8 tracking-tighter ${cardTextClass}`}>
                        {item.price}
                      </div>

                      <Link
                        href={`/contact?offer=${(item as any).id}`}
                        className={cn(
                          "inline-flex items-center justify-center font-bold rounded-xl transition-all border-none w-full h-14 text-lg shadow-lg shadow-brand/10",
                          buttonClass
                        )}
                      >
                        Demander un devis
                      </Link>

                      <p className={`mt-6 text-sm font-medium ${cardMutedTextClass}`}>
                        {idx === 2 ? 'Devis gratuit sous 24h' : 'Démarrage immédiat'}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Content Side */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex-1"
                >
                  <div className="mb-10">
                    <span className="text-sm font-bold uppercase tracking-widest mb-4 inline-block border-b-2 border-brand pb-1 text-brand">
                      Offre {item.name}
                    </span>
                    <h4 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-text text-balance">
                      {(item as any).tagline}
                    </h4>
                    <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                      {(item as any).description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {(item as any).features.map((feature: string, fIdx: number) => (
                      <div key={fIdx} className="flex items-center gap-3 p-2 pr-3 rounded-lg bg-surface-1/0 border border-transparent hover:border-border/30 transition-colors">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-brand/10 text-brand">
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        </div>
                        <span className="text-base text-text font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>
            </Container>
          </section>
        );
      })}
    </div>
  );
}
