"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function ServiceDetailRows() {
  return (
    <Section className="bg-bg border-t border-border space-y-32 py-20">
      <Container>
        <div className="space-y-32">
          {copy.servicesPage.items.map((item, idx) => {
            const isEven = idx % 2 === 0;

            const slug = (item as any).category
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/ & /g, '-')
              .replace(/ /g, '-');

            // presence, produit, mobile, technique

            return (
              <div id={slug} key={idx} className={`scroll-mt-32 flex flex-col md:items-center gap-12 md:gap-24 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                {/* Content Side */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1"
                >
                  {/* Category Label */}
                  <span className="inline-block text-sm font-bold uppercase tracking-widest text-brand mb-4">
                    {(item as any).category}
                  </span>

                  {/* Title - Fixed Text Color */}
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-text">
                    {item.title}
                  </h3>

                  <p className="text-xl text-text-muted leading-relaxed mb-8">
                    {item.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="mb-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted/60 mb-4">Livrables inclus</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                      {item.deliverables.map((d, i) => (
                        <div key={i} className="flex items-center gap-3 text-text font-medium text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Chips - Separate from Button */}
                  <div className="mb-10">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted/60 mb-4">Architecture Technique</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.stack.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 bg-surface-1 border border-border rounded-lg text-xs font-semibold text-text-muted">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Prominent CTA Button */}
                  <div>
                    <a
                      href={(item as any).offerLink}
                      className="group inline-flex items-center justify-between w-full sm:w-auto min-w-[200px] px-6 py-4 rounded-xl bg-text text-bg font-bold text-base tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl shadow-brand/10"
                    >
                      <span>Voir l&apos;offre associée</span>
                      <ArrowRight className="w-5 h-5 ml-4 text-brand transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.div>

                {/* Visual Side */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex-1 w-full"
                >
                  <div className="aspect-[4/3] w-full rounded-3xl bg-surface-1 border border-border relative overflow-hidden group shadow-2xl">
                    <Image
                      src={(item as any).image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                    {/* Floating Badge (Decorative) */}
                    <div className="absolute top-6 right-6 bg-brand/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      Visionner
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
