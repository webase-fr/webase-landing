"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

export function TestimonialsBubbles() {
  return (
    <Section className="bg-bg border-t border-border">
      <Container>
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{copy.testimonials.title}</h2>
          <p className="text-text-muted">Des vrais humains. Des vrais résultats.</p>
        </div>

        <div className="mac-w-4xl mx-auto flex flex-col gap-8 md:gap-12 pl-4 pr-4">
          {copy.testimonials.items.map((item, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`
                    max-w-xl p-6 md:p-8 rounded-3xl relative shadow-sm
                    ${isLeft ? 'bg-surface-1 rounded-bl-none border border-border' : 'bg-brand text-white rounded-br-none shadow-lg shadow-brand/20'}
                 `}>
                  <p className={`text-lg md:text-xl font-medium leading-relaxed mb-6 ${isLeft ? 'text-text' : 'text-white'}`}>
                    &quot;{item.text}&quot;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm uppercase ${isLeft ? 'bg-brand text-white' : 'bg-white text-brand'
                      }`}>
                      {item.author.charAt(0)}
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${isLeft ? 'text-text' : 'text-white'}`}>{item.author}</div>
                      <div className={`text-xs uppercase tracking-wider ${isLeft ? 'text-text-muted' : 'text-white/70'}`}>{item.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
