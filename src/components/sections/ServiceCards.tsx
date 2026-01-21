"use client";

import { motion } from "framer-motion";
import { copy } from "@/lib/copy";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

// Define theme colors for the cards to match the reference aesthetic
const CARD_THEMES = [
    { bg: "bg-[#e0f2f1]", accent: "text-teal-600", hoverText: "group-hover:text-teal-700", border: "border-teal-100", tag: "bg-white text-teal-700 border-teal-200" }, // Soft Teal (Stairs)
    { bg: "bg-[#fff8e1]", accent: "text-amber-600", hoverText: "group-hover:text-amber-700", border: "border-amber-100", tag: "bg-white text-amber-700 border-amber-200" }, // Soft Beige (Spheres)
    { bg: "bg-[#f3e5f5]", accent: "text-purple-600", hoverText: "group-hover:text-purple-700", border: "border-purple-100", tag: "bg-white text-purple-700 border-purple-200" }, // Soft Purple (Fluid)
];

export function ServiceCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {copy.services.items.map((item, idx) => {
                const theme = CARD_THEMES[idx % CARD_THEMES.length];
                // Map home cards to service page anchors
                // 0: Vitrines -> Présence (#presence)
                // 1: CMS -> Produit (#produit) (CMS fits in Product/SaaS loosely or just Presence, but let's map to Product for now or Presence)
                // Actually CMS is closest to Product or Presence. Let's send 1 to #produit and 2 to #produit too?
                // Let's map explicitly:
                const anchors = ["presence", "produit", "produit"];
                const targetId = anchors[idx] || "presence";

                return (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        className="group flex flex-col gap-6 transition-transform duration-300 ease-out hover:scale-[0.98]"
                    >
                        {/* Image Container (Top) */}
                        <div className={cn(
                            "relative w-full aspect-[4/3] rounded-[32px] overflow-hidden",
                            theme.bg
                        )}>
                            {/* 3D Asset */}
                            {item.image && (
                                <div className="absolute inset-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Content Container (Bottom) */}
                        <div className="flex flex-col items-start px-2">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {item.features.slice(0, 2).map((feature, fIdx) => (
                                    <span key={fIdx} className={cn(
                                        "px-4 py-2 rounded-full text-sm font-bold border",
                                        theme.tag
                                    )}>
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h3 className={cn(
                                "text-2xl md:text-3xl font-medium text-gray-900 mb-3 leading-tight transition-colors",
                                theme.hoverText
                            )}>
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-500 text-lg leading-relaxed mb-6 line-clamp-3">
                                {item.description}
                            </p>

                            {/* CTA (Optional / Visual indicator) */}
                            <div className="mt-auto">
                                <Link href={`/services#${targetId}`} className={cn(
                                    "inline-flex items-center text-sm font-bold transition-all group-hover:gap-2",
                                    theme.accent
                                )}>
                                    En savoir plus
                                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
