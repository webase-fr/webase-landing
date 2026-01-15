"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface WordRotateProps {
  words: string[];
  className?: string;
}

export function WordRotate({ words, className }: WordRotateProps) {
  const [index, setIndex] = useState(0);

  // Find the longest word to determine the container width
  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), "");

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className={`overflow-hidden inline-flex relative ${className}`}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute left-0 top-0 w-full whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      {/* Invisible spacer using the longest word to reserve sufficient width */}
      <span className="opacity-0 pointer-events-none">{longestWord}</span>
    </div>
  );
}
