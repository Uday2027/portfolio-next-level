
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
  text: string;
  className?: string;
}

export default function TypewriterText({ text, className }: TypewriterTextProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const wordVariant = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
    }
  };

  const letterVariant = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", gap: "1rem" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn("justify-center", className)}
    >
      {words.map((word, index) => (
        <motion.div 
          key={index} 
          variants={wordVariant}
          style={{ display: "flex", whiteSpace: "nowrap" }}
        >
          {Array.from(word).map((letter, i) => (
            <motion.span variants={letterVariant} key={i}>
              {letter}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
}
