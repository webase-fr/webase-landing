"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Check, Info } from "lucide-react";

export function OffersCards() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch w-full">
        {copy.offres.items.map((item, idx) => {
          // Color Theme Logic
          // 0: Black/Dark (Starter)
          // 1: Brand/Blue (Pro)
          // 2: White/Surface (Enterprise)

          let headerBgClass = "bg-surface-1";
          let headerTextClass = "text-text";
          let priceTextClass = "text-text";
          let titleColorClass = "text-brand";
          let headerBorderClass = "border-transparent";

          let buttonClass = "bg-brand text-white hover:bg-brand-dark";
          let checkIconClass = "text-brand";
          let mutedColorClass = "text-text-muted"; // Default muted text for white body

          if (idx === 0) {
            // Starter: Black Header
            headerBgClass = "bg-[#0a0a0a]";
            headerTextClass = "text-white";
            priceTextClass = "text-white";
            titleColorClass = "text-white";

            buttonClass = "bg-[#0a0a0a] text-white hover:bg-neutral-800";
            checkIconClass = "text-brand";
          } else if (idx === 1) {
            // Pro: Blue Header
            headerBgClass = "bg-brand";
            headerTextClass = "text-white";
            priceTextClass = "text-white";
            titleColorClass = "text-white";

            buttonClass = "bg-brand text-white hover:bg-blue-600";
            checkIconClass = "text-brand";
          } else {
            // Enterprise: White Header (same as body) but delimited
            headerBgClass = "bg-white dark:bg-surface-1";
            headerTextClass = "text-text";
            priceTextClass = "text-text";
            titleColorClass = "text-brand";
            headerBorderClass = "border-b border-border/50"; // Separator

            buttonClass = "bg-slate-800 text-white hover:bg-slate-900";
            checkIconClass = "text-brand";
          }

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={cn(
                "relative flex flex-col rounded-[32px] overflow-hidden border border-border/40 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-white dark:bg-surface-1",
                "h-full"
              )}
            >
              {/* HEADER BLOCK */}
              <div className={cn("p-8 pt-10 pb-10 flex flex-col items-center text-center", headerBgClass, headerBorderClass)}>
                <h3 className={cn("text-2xl font-bold mb-4", titleColorClass)}>{item.name}</h3>

                <div className="mb-0">
                  <span className={cn("text-sm font-medium block mb-1 opacity-90", headerTextClass)}>
                    {item.price !== "Sur devis" ? "À partir de" : "Projet sur-mesure"}
                  </span>
                  <span className={cn("text-5xl tracking-tight", priceTextClass, item.price === "Sur devis" ? "font-bold" : "font-extrabold")}>
                    {item.price}
                  </span>
                </div>
              </div>

              {/* BODY BLOCK */}
              <div className="p-8 pt-8 flex flex-col flex-grow bg-white dark:bg-surface-1">

                <p className="text-center text-text-muted font-medium mb-8 min-h-[48px] text-balance">
                  {item.tagline}
                </p>

                <ul className="space-y-4 mb-8 flex-grow text-left w-full">
                  {item.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start text-sm font-medium text-text-muted hover:text-text transition-colors">
                      <Check className={cn("w-5 h-5 mr-3 flex-shrink-0", checkIconClass)} strokeWidth={2.5} />
                      <span>{feature}</span>
                    </li>
                  ))}
                  <li className={cn("flex items-center gap-2 text-sm font-semibold cursor-pointer hover:underline mt-4", "text-brand")}>
                    <Check className="w-5 h-5 opacity-0" /> {/* Spacer */}
                    <Link href={`#${item.id}`} className="flex items-center gap-1">
                      Détails & fonctionnalités
                      <Info size={14} />
                    </Link>
                  </li>
                </ul>

                {/* Button - Pushed to bottom */}
                <div className="mt-auto pt-4 flex justify-center w-full">
                  <Link
                    href="/estimation"
                    className={cn(
                      "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200",
                      "h-12 px-8 w-full max-w-[240px] shadow-lg",
                      buttonClass
                    )}
                  >
                    Demander un devis
                  </Link>
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
