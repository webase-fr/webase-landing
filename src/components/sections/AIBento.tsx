"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

// Typing Animation Subcomponent
const TypingEffect = ({ text }: { text: string }) => {
  return (
    <div className="font-mono text-sm leading-relaxed text-white/80">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: i * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-2 h-4 bg-brand ml-1 align-middle"
      />
    </div>
  );
};

export function AIBento() {
  return (
    <Section className="bg-neutral-950 text-white relative overflow-hidden border-y border-white/10">
      {/* Ambient Pulse */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-brand mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-brand mr-2 animate-pulse"></span>
            Intelligence Native
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">{copy.ai.title}</h2>
          <p className="text-white/60 text-lg">{copy.ai.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 min-h-[600px]">
          {/* Card 1: Large - Chatbot Mockup (Customer Inquiry) */}
          <div className="md:col-span-2 md:row-span-1 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group flex flex-col justify-between">
            <div className="relative z-10 mb-6">
              <h3 className="text-2xl font-bold mb-2">Support 24/7</h3>
              <p className="text-white/50">{copy.ai.features[0].description}</p>
            </div>

            {/* Visual Mockup - Chat Interface */}
            <div className="flex-1 bg-neutral-900/50 border border-white/10 rounded-xl p-4 w-full backdrop-blur-sm shadow-inner flex flex-col gap-4">
              {/* User Msg */}
              <div className="flex gap-3 justify-end items-end">
                <div className="bg-brand text-white rounded-2xl rounded-tr-none px-4 py-2 text-sm max-w-[80%]">
                  Bonjour, avez-vous des disponibilités pour un consulting ce jeudi ?
                </div>
                <div className="w-6 h-6 rounded-full bg-white/20 flex-shrink-0" />
              </div>

              {/* AI Response */}
              <div className="flex gap-3 items-end">
                <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center text-[10px] font-bold text-brand flex-shrink-0 border border-brand/20">AI</div>
                <div className="bg-white/10 rounded-2xl rounded-tl-none px-4 py-2 text-sm text-white/90 max-w-[80%]">
                  Bonjour ! Oui, il nous reste un créneau à 14h30 ce jeudi. Je vous le réserve ?
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Tall - Content Generation (Typing Animation) */}
          <div className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-3xl p-8 relative overflow-hidden group flex flex-col">
            <div className="relative z-10 mb-6">
              <h3 className="text-2xl font-bold mb-2">Contenu infini</h3>
              <p className="text-white/50 mb-4">{copy.ai.features[1].description}</p>
            </div>

            <div className="flex-1 bg-neutral-900 border border-white/10 rounded-xl p-4 overflow-hidden relative">
              <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
                <span className="text-[10px] text-white/30 ml-2">article_generator.tsx</span>
              </div>
              <TypingEffect text="L'intelligence artificielle transforme radicalement l'expérience utilisateur. En analysant les comportements en temps réel, nous pouvons offrir..." />
            </div>
          </div>

          {/* Card 3: Standard - Data (Better Visualization) */}
          <div className="md:col-span-2 md:row-span-1 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
            <div className="flex-1 relative z-10">
              <h3 className="text-2xl font-bold mb-2">Data Driven</h3>
              <p className="text-white/50">{copy.ai.features[2].description}</p>
            </div>
            <div className="flex-1 w-full h-32 md:h-full relative flex items-end gap-3 px-4 pb-4">
              {/* Bar Chart with Values */}
              {[
                { h: '40%', val: '20' },
                { h: '70%', val: '45' },
                { h: '55%', val: '32' },
                { h: '90%', val: '89' },
                { h: '60%', val: '50' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: item.h }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex-1 bg-brand/20 border-t border-brand/50 rounded-t-sm relative group/bar hover:bg-brand/40 transition-colors"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-brand opacity-0 group-hover/bar:opacity-100 transition-opacity">
                    {item.val}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
