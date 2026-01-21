"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function EstimationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1500);
  };

  const budgetOptions = [
    "< 500€", "500€ - 2k€", "2k€ - 5k€", "5k€ - 10k€", "> 10k€"
  ];

  const typeOptions = [
    "Site Vitrine", "E-commerce", "Application Web", "Refonte", "Autre"
  ];

  return (
    <main className="min-h-screen bg-bg text-text font-figtree">
      <Section className="pt-24 md:pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <Container className="max-w-3xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center rounded-full border border-border bg-surface-1 px-3 py-1 text-sm font-medium text-text-muted mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brand mr-2"></span>
              Démarrage de projet
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Lançons la transformation
            </h1>
            <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
              Parlez-nous de vos ambitions. Nous construirons la solution adaptée.
              <br className="hidden md:block" /> Ce formulaire nous aide à préparer notre premier échange.
            </p>
          </motion.div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface-1/50 backdrop-blur-sm border border-border rounded-[32px] p-12 text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Check size={40} strokeWidth={3} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Projet reçu 🚀</h2>
              <p className="text-xl text-text-muted mb-8 max-w-lg mx-auto">
                Merci de votre confiance. Notre équipe va analyser votre demande et vous recontactera sous 24h pour fixer un rendez-vous.
              </p>
              <Button asChild size="lg" className="text-lg">
                <a href="/">Retour à l'accueil</a>
              </Button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-12"
            >
              {/* Section 1: Qui êtes-vous ? */}
              <div className="bg-surface-1/30 border border-border/50 rounded-3xl p-8 md:p-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand text-white text-sm font-bold">1</span>
                  Vos Coordonnées
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="est-firstname">Prénom *</Label>
                    <Input id="est-firstname" required placeholder="Votre prénom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="est-lastname">Nom *</Label>
                    <Input id="est-lastname" required placeholder="Votre nom" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="est-email">Email pro *</Label>
                    <Input id="est-email" type="email" required placeholder="nom@entreprise.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="est-company">Entreprise / Organisation</Label>
                    <Input id="est-company" placeholder="Nom de votre société" />
                  </div>
                </div>
              </div>

              {/* Section 2: Le Projet */}
              <div className="bg-surface-1/30 border border-border/50 rounded-3xl p-8 md:p-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand text-white text-sm font-bold">2</span>
                  Votre Projet
                </h3>

                <div className="space-y-8">
                  {/* Type */}
                  <div className="space-y-3">
                    <Label>Type de projet (Optionnel)</Label>
                    <div className="flex flex-wrap gap-3">
                      {typeOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedType(opt)}
                          className={cn(
                            "px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200",
                            selectedType === opt
                              ? "bg-brand text-white border-brand shadow-lg shadow-brand/20"
                              : "bg-surface-1 border-border text-text-muted hover:border-brand/50 hover:text-text"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="space-y-3">
                    <Label>Budget estimé (Optionnel)</Label>
                    <div className="flex flex-wrap gap-3">
                      {budgetOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setSelectedBudget(opt)}
                          className={cn(
                            "px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200",
                            selectedBudget === opt
                              ? "bg-brand text-white border-brand shadow-lg shadow-brand/20"
                              : "bg-surface-1 border-border text-text-muted hover:border-brand/50 hover:text-text"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="est-desc">Description du projet</Label>
                    <Textarea
                      id="est-desc"
                      placeholder="Contexte, objectifs, fonctionnalités clés, délais..."
                      className="min-h-[160px] text-base"
                    />
                    <p className="text-xs text-text-muted">Ne vous inquiétez pas si c'est flou, nous clarifierons tout ensemble.</p>
                  </div>

                  {/* File Attachment */}
                  <div className="space-y-2">
                    <Label htmlFor="est-file">Pièce jointe (Optionnel)</Label>
                    <Input
                      id="est-file"
                      type="file"
                      className="cursor-pointer file:cursor-pointer file:text-brand file:font-semibold file:bg-brand/10 file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-4 hover:file:bg-brand/20 transition-colors"
                    />
                    <p className="text-xs text-text-muted">Cahier des charges, maquettes, document explicatif...</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" className="h-14 px-10 text-xl w-full md:w-auto shadow-xl shadow-brand/20">
                  Valider ma demande <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.form>
          )}
        </Container>
      </Section>
    </main>
  );
}
