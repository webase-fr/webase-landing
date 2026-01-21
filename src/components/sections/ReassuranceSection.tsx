"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ShieldCheck, CreditCard, GraduationCap } from "lucide-react";

export function ReassuranceSection() {
  const icons = [CreditCard, ShieldCheck, GraduationCap];

  return (
    <Section className="py-32 relative overflow-hidden bg-surface-1/50 border-t border-border">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text">Votre sérénité, notre priorité</h2>
          <p className="text-xl text-text-muted">Nous avons tout prévu pour que vous puissiez vous concentrer sur votre business.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {copy.offersPage.reassurance.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative"
              >
                <div className="h-full p-8 rounded-3xl bg-surface-1 border border-border transition-all duration-300 hover:shadow-xl hover:border-brand/30 hover:-translate-y-1">
                  {/* Icon Box */}
                  <div className="w-14 h-14 rounded-2xl bg-brand/5 text-brand flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                    <Icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-xl font-bold text-text mb-4">
                    {item.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
