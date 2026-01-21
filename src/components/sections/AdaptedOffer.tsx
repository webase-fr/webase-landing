"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Check } from "lucide-react";
import Image from "next/image";

export function AdaptedOffer() {
  const points = [
    "Une équipe projet dédiée",
    "Un site fiable, performant et évolutif",
    "Un design professionnel",
    "Un accompagnement long terme"
  ];

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-bg relative overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-text leading-tight">
              Une offre adaptée à <span className="text-brand">chaque projet</span>
            </h2>

            <p className="text-xl text-text-muted leading-relaxed max-w-xl">
              Chez Webase, nous adaptons chaque réalisation aux besoins de votre entreprise.
              Nos sites sont conçus pour rester rapides, sécurisés et faciles à faire évoluer afin de soutenir votre activité sur le long terme.
            </p>

            <div className="space-y-4">
              <h3 className="tex-lg font-semibold text-text">Vous choisissez Webase pour :</h3>
              <ul className="space-y-3">
                {points.map((point, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3 text-text-muted"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-2 flex items-center justify-center text-brand">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Image / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-surface-1 border border-border">
              {/* Abstract decorative elements since we might not have a specific 'team' photo yet */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand/10 blur-[100px] rounded-full" />

              <Image
                src="/images/service-landing.png" // Reusing an existing high-quality asset
                alt="Webase Adaptation"
                fill
                className="object-cover opacity-80"
              />
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
