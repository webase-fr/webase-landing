"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Check } from "lucide-react";
import { useFormState } from "react-dom";
import { sendContactEmail } from "@/actions/send-email"; // Ensure this import exists

const initialState = {
  success: false,
  message: "",
};

export default function ContactPage() {
  const [state, dispatch] = useFormState(sendContactEmail, initialState);

  // Optional: Reset form or show toast on success/error if needed
  // UI logic handles the "submitted" view based on state.success

  return (
    <main className="min-h-screen bg-bg text-text font-figtree">
      <Section className="pt-32 md:pt-48 pb-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <Container className="max-w-2xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center rounded-full border border-border bg-surface-1 px-3 py-1 text-sm font-medium text-text-muted mb-6">
              <span className="flex h-2 w-2 rounded-full bg-brand mr-2"></span>
              Contact
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Discutons de votre projet
            </h1>
            <p className="text-lg text-text-muted">
              Une question ? Un besoin ? Nous sommes à votre écoute.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-surface-1/50 backdrop-blur-sm border border-border rounded-3xl p-8 md:p-10 shadow-xl"
          >
            {state.success ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-6 text-brand">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message envoyé !</h3>
                <p className="text-text-muted mb-8">
                  Merci de nous avoir contactés. Nous reviendrons vers vous sous 24h.
                </p>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Envoyer un autre message
                </Button>
              </div>
            ) : (
              <form action={dispatch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstname">Prénom</Label>
                    <Input id="firstname" name="firstname" placeholder="Jean" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Nom</Label>
                    <Input id="lastname" name="lastname" placeholder="Dupont" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="jean.dupont@exemple.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Sujet (Optionnel)</Label>
                  <Input id="subject" name="subject" placeholder="Demande d'information..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Dites-nous en plus sur votre besoin..."
                    className="min-h-[150px]"
                    required
                  />
                </div>

                {state.message && !state.success && (
                  <p className="text-red-500 text-sm">{state.message}</p>
                )}

                <Button type="submit" size="lg" className="w-full text-lg h-12">
                  Envoyer le message
                </Button>
              </form>
            )}
          </motion.div>
        </Container>
      </Section>
    </main>
  );
}
