"use client";

// components/animations/ScrollReveal.tsx
// ─────────────────────────────────────────────────────────
// SCROLL REVEAL COMPONENT
// Wraps any content and animates it when it enters the viewport.
// Uses Framer Motion's whileInView — no IntersectionObserver boilerplate.
//
// Usage:
//   <ScrollReveal>
//     <Card>...</Card>
//   </ScrollReveal>
//
//   <ScrollReveal variant="fadeInLeft" delay={0.2}>
//     <Paragraph>...</Paragraph>
//   </ScrollReveal>
// ─────────────────────────────────────────────────────────

import { motion }    from "framer-motion";
import { cn }        from "@/lib/utils";
import {
  fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight,
  scaleIn, scalePop,
  type fadeIn as FadeInType, // just for doc
} from "./motion";
import type { Variants } from "framer-motion";

// Named variant map — makes JSX props clean ("fadeInUp" string)
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
  children:    React.ReactNode;
  variant?:    RevealVariant;
  delay?:      number;          // seconds
  duration?:   number;          // overrides variant duration
  once?:       boolean;         // animate once vs every re-entry
  threshold?:  number;          // 0–1 viewport threshold
  className?:  string;
  as?:         "div" | "section" | "article" | "li" | "span";
}

export function ScrollReveal({
  children,
  variant    = "fadeInUp",
  delay      = 0,
  duration,
  once       = true,
  threshold  = 0.1,
  className,
  as: Tag    = "div",
}: ScrollRevealProps) {
  const variants = VARIANT_MAP[variant] ?? fadeInUp;

  // Allow per-instance duration override
  const resolvedVariants: Variants = duration
    ? {
        hidden:  variants.hidden,
        visible: {
          ...(variants.visible as Record<string, unknown>),
          transition: { duration, ease: [0.0, 0.0, 0.2, 1.0] },
        },
      }
    : variants;

  return (
    <motion.div
      // @ts-expect-error — polymorphic component typing is loose here intentionally
      as={Tag}
      variants={resolvedVariants}
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
