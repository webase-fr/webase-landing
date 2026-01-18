"use client";

import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function TechStack() {
  return (
    <div className="w-full bg-bg border-b border-border py-8 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent z-10" />

      <div className="flex w-max animate-infinite-scroll">
        {[...copy.techStack, ...copy.techStack, ...copy.techStack].map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center mx-8 md:mx-12 cursor-default select-none"
          >
            <span className="text-xl md:text-2xl font-bold text-text-muted/40 hover:text-text-muted transition-colors whitespace-nowrap">
              {tech}
            </span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        .animate-infinite-scroll:hover {
            animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
