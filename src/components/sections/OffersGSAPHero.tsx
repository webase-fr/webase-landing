"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/Container";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function OffersGSAPHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const textTopRef = useRef<HTMLHeadingElement>(null);
  const textBottomRef = useRef<HTMLHeadingElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!triggerRef.current || !textTopRef.current || !textBottomRef.current) return;

    // 0. Initial Setup: Set pivots for skewing
    gsap.set(".char-span", { yPercent: 120, skewY: 10, opacity: 0 });
    gsap.set(centerContentRef.current, { scaleY: 0, opacity: 0 });

    const tl = gsap.timeline();

    // 1. Intro Animation (The "Explosion" In)
    // Characters fly up from below with skew
    tl.to(".char-span", {
      yPercent: 0,
      skewY: 0,
      opacity: 1,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.02,
    });

    // 2. Scroll Interaction (The "Portal" Open)
    // We want the text to part ways as we scroll
    // The container needs to be tall enough to scroll through
    // Actually, for a "Hero Pin", we usually pin the section.

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=150%", // Scroll distance to complete animation
        scrub: 1,
        pin: true,
        // markers: true, // Debug
      }
    });

    // Top text moves UP and fades slightly
    scrollTl.to(textTopRef.current, {
      yPercent: -150,
      opacity: 0.2, // Fade out slightly to focus on reveal
      scale: 0.9,
      ease: "power2.inOut",
    }, 0);

    // Bottom text moves DOWN
    scrollTl.to(textBottomRef.current, {
      yPercent: 150,
      opacity: 0.2,
      scale: 0.9,
      ease: "power2.inOut",
    }, 0);

    // Center content REVEALS (scales up)
    scrollTl.to(centerContentRef.current, {
      scaleY: 1,
      opacity: 1,
      ease: "power2.inOut",
    }, 0);

  }, { scope: containerRef });

  // Helper to split text into chars for animation
  const SplitText = ({ children, className }: { children: string, className?: string }) => {
    return (
      <span className={`inline-block whitespace-nowrap ${className}`}>
        {children.split("").map((char, i) => (
          <span key={i} className="char-span inline-block origin-bottom-left will-change-transform">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    );
  };

  return (
    // The Trigger Container (Pins this)
    <section ref={triggerRef} className="relative w-full h-screen bg-bg text-text overflow-hidden">
      <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center z-10">

        {/* Top Text Group */}
        <div className="relative z-20 text-center mix-blend-difference text-text">
          <h1 ref={textTopRef} className="text-[10vw] leading-[0.8] font-black uppercase tracking-tighter will-change-transform">
            <SplitText>Investissez</SplitText>
          </h1>
        </div>

        {/* Hidden Center Reveal Area (The Portal) */}
        <div
          ref={centerContentRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] bg-brand flex items-center justify-center overflow-hidden rounded-lg origin-center z-10"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Inner Content of the Portal */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand to-purple-800 opacity-90" />
          <video
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            muted autoPlay loop playsInline
          >
            {/* Placeholder video or abstract movement */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blue-lines-997-large.mp4" type="video/mp4" />
          </video>
          <div className="relative z-30 text-white text-center p-8">
            <h3 className="text-4xl font-bold mb-4">Le Futur</h3>
            <p className="text-xl opacity-90">Commence maintenant.</p>
          </div>
        </div>

        {/* Bottom Text Group */}
        <div className="relative z-20 text-center mix-blend-difference text-text">
          <h1 ref={textBottomRef} className="text-[10vw] leading-[0.8] font-black uppercase tracking-tighter will-change-transform">
            <SplitText>Dans Votre</SplitText>
            <br />
            <SplitText className="text-brand">Croissance</SplitText>
          </h1>
        </div>

      </div>

      {/* Subtle Grain/Noise Overlay for Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-100" />
    </section>
  );
}
