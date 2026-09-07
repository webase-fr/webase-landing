"use client";
import { BriefCards } from "@/components/sections/BriefCards";
import { formatPrice } from "@/lib/estimate";
import type { Quote } from "@/lib/lead-schema";
export function QuoteModeSelector({
  selectedOffer,
  chooseMode,
}: {
  selectedOffer?: { name: string; price: number };
  chooseMode: (mode: Quote["mode"]) => void;
}) {
  return (
    <div className="quote-mode-selector">
      <p className="eyebrow">À votre rythme</p>
      <h2 className="form-panel-title">Comment souhaitez-vous commencer ?</h2>
      <p className="form-introduction">
        Une première idée ou un projet déjà réfléchi : choisissez le format qui vous convient.
      </p>
      {selectedOffer && (
        <p className="notice">
          Votre point de départ : <strong>{selectedOffer.name}</strong>, dès{" "}
          {formatPrice(selectedOffer.price)} HT. Vous pourrez préciser votre besoin.
        </p>
      )}
      <BriefCards onChoose={chooseMode} />
      <p className="form-privacy">
        Gratuit et sans engagement. Vos réponses restent sur cette page jusqu’à l’envoi.
      </p>
    </div>
  );
}
