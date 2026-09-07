import { ArrowUpRight, Check, MousePointer2 } from "lucide-react";

/** CSS illustration: no canvas, stock imagery, or invented client result. */
export function HeroVisual() {
  return (
    <figure className="hero-visual">
      <div className="visual-canvas" aria-hidden="true">
        <div className="visual-coordinate">W / DESIGN & DÉVELOPPEMENT</div>
        <div className="visual-orbit" />
        <div className="mock-browser">
          <div className="mock-toolbar">
            <span />
            <span />
            <span />
            <span className="mock-address">Une nouvelle perspective.</span>
          </div>
          <div className="mock-page">
            <div className="mock-nav">
              <span className="mock-logo">
                atelier<span>®</span>
              </span>
              <span>Les espaces &nbsp;&nbsp; Le studio &nbsp;&nbsp; ↗</span>
            </div>
            <div className="mock-content">
              <span className="mock-eyebrow">ARCHITECTURE INTÉRIEURE</span>
              <div className="mock-title">
                De l’espace.
                <br />
                Pour vos idées.
              </div>
              <div className="mock-link">
                Imaginer votre intérieur <ArrowUpRight size={12} />
              </div>
              <div className="architecture">
                <div className="architecture-wall" />
                <div className="architecture-arch" />
                <div className="architecture-plinth" />
                <div className="architecture-sphere" />
                <div className="architecture-shadow" />
              </div>
              <div className="mock-bottom">
                <span>Des lieux qui vous ressemblent.</span>
                <span>01 / 03</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mock-mobile">
          <div className="mobile-speaker" />
          <div className="mobile-wordmark">
            atelier® <span>☰</span>
          </div>
          <p>
            Vos idées.
            <br />
            Partout.
          </p>
          <div className="mobile-arch" />
          <span className="mobile-link">Découvrir ↗</span>
        </div>
        <div className="visual-quality">
          <span>
            <Check size={16} />
          </span>
          <div>
            Beau. Clair. Fonctionnel.<small>Sur tous les écrans.</small>
          </div>
        </div>
        <div className="visual-cursor">
          <MousePointer2 size={23} fill="currentColor" />
          <span>Votre prochaine étape</span>
        </div>
        <div className="visual-baseline">
          <span>UNE BONNE BASE CHANGE TOUT.</span>
          <span>↗</span>
        </div>
      </div>
      <figcaption>
        Exploration graphique Webase · Exemple de site, pas une réalisation client.
      </figcaption>
    </figure>
  );
}
