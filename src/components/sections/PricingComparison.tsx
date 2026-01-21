"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Check, Minus } from "lucide-react";

export function PricingComparison() {
  return (
    <Section className="py-20 bg-surface-1/50 border-t border-border">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-text">Comparatif détaillé</h2>
          <p className="text-text-muted">Tout ce qui est inclus, ligne par ligne.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-border/50">
                <th className="p-4 text-sm text-text-muted font-medium w-1/4">Fonctionnalité</th>
                <th className="p-4 text-lg font-bold text-text w-1/4">Essentiel</th>
                <th className="p-4 text-lg font-bold text-brand w-1/4">Pro</th>
                <th className="p-4 text-lg font-bold text-text w-1/4">Sur-Mesure</th>
              </tr>
            </thead>
            <tbody>
              {copy.offersPage.comparison.map((row, idx) => (
                <tr key={idx} className="border-b border-border/30 hover:bg-surface-1/50 transition-colors">
                  <td className="p-4 text-sm font-semibold text-text">{row.feature}</td>
                  <td className="p-4 text-sm text-text-muted">{row.essentiel}</td>
                  <td className="p-4 text-sm text-text-muted font-medium bg-brand/5 border-x border-brand/5 relative">
                    {row.pro}
                  </td>
                  <td className="p-4 text-sm text-text-muted">{row.surmesure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
