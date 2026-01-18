"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function OffersCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto items-stretch">
      {copy.offres.items.map((item, idx) => {
        const isPro = idx === 1;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={cn(
              "group relative flex flex-col p-8 md:p-10 rounded-[32px] transition-all duration-300 border",
              isPro
                ? "bg-surface-1 border-brand z-10 shadow-xl shadow-brand/10 md:scale-[1.05]"
                : "bg-surface-1/50 border-border hover:border-brand/50 hover:shadow-lg"
            )}
          >
            {isPro && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm whitespace-nowrap z-20">
                Recommandé
              </div>
            )}

            <div className="flex flex-col gap-4 mb-8">
              <h3 className="text-2xl font-bold text-text">{item.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-bold tracking-tight text-text">
                  {item.price}
                </span>
              </div>
              <p className="text-text-muted font-medium text-lg leading-relaxed text-balance">
                {item.tagline}
              </p>
            </div>

            <div className="w-full h-px bg-border/50 mb-8" />

            <ul className="space-y-4 mb-10 flex-grow">
              {item.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start text-base text-text-muted group-hover:text-text transition-colors">
                  <svg
                    className={cn("w-6 h-6 mr-3 flex-shrink-0 transition-colors", isPro ? "text-brand" : "text-text-muted group-hover:text-brand")}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              variant={isPro ? 'primary' : 'outline'}
              className="w-full h-12 text-base font-semibold"
            >
              Choisir {item.name}
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}
