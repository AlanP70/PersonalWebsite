"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function FadeIn({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
