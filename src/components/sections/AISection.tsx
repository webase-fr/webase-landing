"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function AISection() {
  return (
    <Section className="bg-neutral-950 text-white relative overflow-hidden border-y border-white/10">
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand/20 rounded-full blur-[120px] mix-blend-screen opacity-20 animate-pulse" />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-brand mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand mr-2 animate-pulse"></span>
              Intelligence Native
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight text-white">
              {copy.ai.title}
            </h2>
            <p className="text-lg text-white/60 leading-relaxed text-balance">
              {copy.ai.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {copy.ai.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-brand/30 transition-all duration-300 backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-brand text-xl font-bold">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
