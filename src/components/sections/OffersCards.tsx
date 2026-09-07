import { ArrowUpRight, Check } from "lucide-react";
import { offers } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
export function OffersCards() {
  return (
    <div className="offers-grid">
      {offers.map((offer) => (
        <article
          className={`offer-card ${offer.featured ? "offer-card--featured" : ""}`}
          key={offer.id}
          id={offer.id}
        >
          <div className="offer-top">
            <span className="offer-category">{offer.category}</span>
            {offer.featured && <span className="badge badge--blue">Le bon équilibre</span>}
          </div>
          <h3>{offer.name}</h3>
          <p className="offer-description">{offer.description}</p>
          <div className="offer-price">
            <span>À partir de</span>
            <strong>
              {new Intl.NumberFormat("fr-FR").format(offer.price)} €<small> HT</small>
            </strong>
            <span>à la création · sans abonnement imposé</span>
          </div>
          <ButtonLink
            href={`/estimation?offre=${offer.id}`}
            variant={offer.featured ? "primary" : "secondary"}
          >
            Parlons de ce projet <ArrowUpRight size={17} />
          </ButtonLink>
          <div className="offer-scope">
            <strong>{offer.pages}</strong>
            <span>Délai indicatif : {offer.timeline}</span>
          </div>
          <ul className="check-list">
            {offer.features.map((feature) => (
              <li key={feature}>
                <Check size={16} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
