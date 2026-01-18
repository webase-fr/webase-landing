"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const STEP_COLORS = [
  "text-brand", // Orange/Brand
  "text-purple-500", // Purple
  "text-blue-500", // Blue
  "text-emerald-500", // Green
];

const STEP_BORDERS = [
  "border-brand",
  "border-purple-500",
  "border-blue-500",
  "border-emerald-500",
];

const STEP_BG_SHADOWS = [
  "shadow-brand/5",
  "shadow-purple-500/5",
  "shadow-blue-500/5",
  "shadow-emerald-500/5",
];

export function MethodStations() {
  const [activeStep, setActiveStep] = useState<number | null>(0);

  return (
    <Section className="bg-surface-1/50 border-y border-border overflow-hidden">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{copy.methode.title}</h2>
          <p className="text-text-muted">Simple. Carré. Efficace.</p>
        </div>

        {/* Desktop Stations */}
        <div className="hidden md:flex justify-center items-stretch gap-4 h-[400px]">
          {copy.methode.steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const colorClass = STEP_COLORS[idx % STEP_COLORS.length];
            const borderClass = STEP_BORDERS[idx % STEP_BORDERS.length];
            const shadowClass = STEP_BG_SHADOWS[idx % STEP_BG_SHADOWS.length];

            return (
              <motion.div
                key={idx}
                layout
                onClick={() => setActiveStep(idx)}
                onHoverStart={() => setActiveStep(idx)}
                className={cn(
                  "relative rounded-3xl border cursor-pointer overflow-hidden transition-all duration-300",
                  isActive
                    ? `flex-[3] bg-bg ${borderClass} shadow-2xl ${shadowClass}`
                    : "flex-[1] bg-surface-1 border-border hover:bg-surface-2"
                )}
              >
                {/* Background Number */}
                <div className={cn(
                  "absolute -bottom-10 -right-10 text-[10rem] font-bold leading-none transition-all duration-500 select-none",
                  isActive ? "text-text/5" : "text-text-muted/5 scale-50"
                )}>
                  {step.number}
                </div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className={cn(
                    "absolute top-8 left-8 transition-all duration-500 flex items-center gap-4",
                    isActive ? colorClass : "text-text-muted"
                  )}>
                    <div className={cn(
                      "w-10 h-10 rounded-full border flex items-center justify-center font-bold transition-colors",
                      isActive ? "border-current bg-current/10" : "border-border bg-transparent"
                    )}>
                      {step.number}
                    </div>

                    {/* Title: Only show at top when Active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, transition: { duration: 0 } }} // Instant exit
                          className="font-bold text-xl uppercase tracking-wider"
                        >
                          {step.title}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Title: Vertical when Inactive */}
                  {!isActive && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-2xl font-bold text-text-muted tracking-tight transition-opacity duration-300">
                      {step.title}
                    </div>
                  )}

                  {/* Description: Slide up when Active */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key="desc"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0 } }} // Instant exit
                        transition={{ delay: 0.1 }}
                      >
                        <p className="text-xl text-text leading-relaxed max-w-md">
                          {step.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Vertical List (Unchanged) */}
        <div className="md:hidden space-y-4">
          {copy.methode.steps.map((step, idx) => (
            <div key={idx} className="bg-bg border border-border rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-brand font-bold text-lg">{step.number}</span>
                <h3 className="font-bold text-xl">{step.title}</h3>
              </div>
              <p className="text-text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
