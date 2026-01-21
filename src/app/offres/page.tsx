import { OffersClassicHero } from "@/components/sections/OffersClassicHero";
import { OffersCards } from "@/components/sections/OffersCards";
import { AdaptedOffer } from "@/components/sections/AdaptedOffer";
import { OfferDeepDive } from "@/components/sections/OfferDeepDive";
import { PricingComparison } from "@/components/sections/PricingComparison";
import { ReassuranceSection } from "@/components/sections/ReassuranceSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/layout/Footer";

export default function OffersPage() {
  return (
    <main className="min-h-screen text-text font-figtree overflow-x-hidden">

      {/* Hero - Classic Design (Services Style) */}
      <OffersClassicHero />

      {/* Summary Cards (Quick View) */}
      <div className="py-20 relative z-10">
        <OffersCards />
      </div>

      {/* Visual Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-32 opacity-100" />

      {/* Deep Dive Offers */}
      <OfferDeepDive />

      {/* Adapted Offer Section */}
      <div className="py-20 border-t border-border/50">
        <AdaptedOffer />
      </div>

      {/* Comparison Table */}
      <PricingComparison />

      {/* Reassurance */}
      <ReassuranceSection />

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
