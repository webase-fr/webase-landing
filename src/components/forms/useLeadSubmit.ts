"use client";
import { useRef, useState, useTransition } from "react";
import { submitLead } from "@/actions/send-email";
import { initialActionState, type ActionState, type Lead } from "@/lib/lead-schema";

export function useLeadSubmit() {
  const [state, setState] = useState<ActionState>(initialActionState);
  const [pending, startTransition] = useTransition();
  const requestId = useRef("");
  const inFlight = useRef(false);
  function getRequestId(): string {
    if (!requestId.current) requestId.current = crypto.randomUUID();
    return requestId.current;
  }
  function submit(data: Lead) {
    if (inFlight.current) return;
    inFlight.current = true;
    startTransition(async () => {
      try {
        setState(await submitLead(data));
      } catch {
        setState({
          status: "error",
          message:
            "La connexion a été interrompue. Vos réponses sont conservées sur cette page. Réessayez pour confirmer l’envoi.",
        });
      } finally {
        inFlight.current = false;
      }
    });
  }
  return {
    state,
    pending,
    submit,
    getRequestId,
    clearFeedback: () => setState(initialActionState),
  };
}
