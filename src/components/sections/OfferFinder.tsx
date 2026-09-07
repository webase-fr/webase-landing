"use client";
import { useState } from "react";
import { ArrowUpRight, Plus, SlidersHorizontal } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import {
  editingNeeds,
  findOffer,
  siteNeeds,
  type EditingNeed,
  type SiteNeed,
} from "@/lib/offer-finder";
import { formatPrice } from "@/lib/estimate";

export function OfferFinder() {
  const [need, setNeed] = useState<SiteNeed | "">("");
  const [editing, setEditing] = useState<EditingNeed | "">("");
  const result = need && editing ? findOffer(need, editing) : null;
  return (
    <details className="offer-finder" id="trouver-mon-offre">
      <summary>
        <SlidersHorizontal size={22} strokeWidth={1.5} />
        <span>
          <strong>Vous hésitez entre les offres ?</strong>
          <small>Trouvez un point de départ en deux questions. Sans coordonnées à laisser.</small>
        </span>
        <Plus size={22} className="finder-toggle" />
      </summary>
      <div className="finder-content">
        <div className="finder-questions">
          <fieldset>
            <legend>01 / Que doit faire votre site ?</legend>
            {siteNeeds.map((option) => (
              <label className="choice-label" key={option.value}>
                <input
                  type="radio"
                  name="site-need"
                  value={option.value}
                  checked={need === option.value}
                  onChange={() => setNeed(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>02 / Souhaitez-vous modifier les contenus vous-même ?</legend>
            {editingNeeds.map((option) => (
              <label className="choice-label" key={option.value}>
                <input
                  type="radio"
                  name="editing-need"
                  value={option.value}
                  checked={editing === option.value}
                  onChange={() => setEditing(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
            <p className="finder-hint">
              Textes, photos, actualités… Il s’agit de faire vivre le site, sans avoir à toucher au
              code.
            </p>
          </fieldset>
        </div>
        <div className="finder-result" role="status" aria-atomic="true">
          {result ? (
            <>
              <div>
                <p className="eyebrow">Votre point de départ</p>
                <h3>{result.title}</h3>
                <p>{result.reason}</p>
                {result.offer && (
                  <strong className="finder-price">
                    À partir de {formatPrice(result.offer.price)} HT{" "}
                    <span>· {result.offer.timeline}, à titre indicatif</span>
                  </strong>
                )}
              </div>
              <ButtonLink href={result.href}>
                Préciser mon projet <ArrowUpRight size={18} />
              </ButtonLink>
              <p className="finder-disclaimer">
                Une orientation, pas un devis. Le périmètre, les frais externes et le prix final
                sont validés ensemble avant tout engagement.
              </p>
            </>
          ) : (
            <p>Choisissez une réponse à chaque question pour voir votre orientation.</p>
          )}
        </div>
      </div>
    </details>
  );
}
