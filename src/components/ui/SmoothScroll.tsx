"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname, useSearchParams } from "next/navigation";

export function SmoothScroll() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle scroll reset and anchor scrolling on route/hash change
  useEffect(() => {
    if (lenisRef.current) {
      // Small timeout to ensure DOM is ready for anchors, 
      // otherwise just standard scroll to top
      const hash = window.location.hash;

      if (hash) {
        // If there is a hash, Lenis usually handles it if we use standard 'a' tags,
        // but Next.js router might interfere. 
        // Let's manually scroll to anchor if present.
        const target = document.querySelector(hash) as HTMLElement;
        if (target) {
          lenisRef.current.scrollTo(target, { immediate: true, offset: -100 }); // offset for header
        }
      } else {
        // No hash, standard page navigation -> scroll to top
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname, searchParams]);

  return null;
}
