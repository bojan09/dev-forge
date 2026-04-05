"use client";

// components/animations/ScrollReveal.tsx
// Fixed: removed motion.div `as` prop (removed in framer-motion v11)
// Solution: render a plain wrapper div and apply motion only to the inner element

import { motion }    from "framer-motion";
import { cn }        from "@/lib/utils";
import {
  fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight,
  scaleIn, scalePop,
} from "./motion";
import type { Variants } from "framer-motion";

const VARIANT_MAP: Record<string, Variants> = {
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scalePop,
} as const;

export type RevealVariant = keyof typeof VARIANT_MAP;

export interface ScrollRevealProps {
  children:   React.ReactNode;
  variant?:   RevealVariant;
  delay?:     number;
  duration?:  number;
  once?:      boolean;
  threshold?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  variant   = "fadeInUp",
  delay     = 0,
  duration,
  once      = true,
  threshold = 0.1,
  className,
}: ScrollRevealProps) {
  const baseVariants = VARIANT_MAP[variant] ?? fadeInUp;

  const variants: Variants = duration
    ? {
        hidden:  baseVariants.hidden,
        visible: {
          ...(baseVariants.visible as Record<string, unknown>),
          transition: { duration, ease: [0.0, 0.0, 0.2, 1.0] },
        },
      }
    : baseVariants;

  // framer-motion v11: use motion.div only — no `as` prop
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
