"use client";

// components/animations/StaggerList.tsx
// ─────────────────────────────────────────────────────────
// STAGGER LIST
// Parent + child component pair that sequences child animations.
// Children animate in one after another using staggerChildren.
//
// Usage — wrap any list container:
//   <StaggerList>
//     {items.map(item => (
//       <StaggerItem key={item.id}>
//         <Card>{item.name}</Card>
//       </StaggerItem>
//     ))}
//   </StaggerList>
//
// Or inline — auto-wraps children:
//   <StaggerList stagger={0.07} variant="fadeInLeft">
//     <Card>A</Card>
//     <Card>B</Card>
//   </StaggerList>
// ─────────────────────────────────────────────────────────

import { motion }            from "framer-motion";
import { cn }                from "@/lib/utils";
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn } from "./motion";
import type { Variants }     from "framer-motion";

const CHILD_VARIANTS: Record<string, Variants> = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
} as const;

// ── StaggerList — the parent container ───────────────────
export interface StaggerListProps {
  children:    React.ReactNode;
  stagger?:    number;           // delay between each child (seconds)
  delayStart?: number;           // initial delay before first child
  variant?:    keyof typeof CHILD_VARIANTS;
  once?:       boolean;
  className?:  string;
  as?:         "div" | "ul" | "ol" | "section";
}

export function StaggerList({
  children,
  stagger    = 0.08,
  delayStart = 0.05,
  variant    = "fadeInUp",
  once       = true,
  className,
  as:        Tag = "div",
}: StaggerListProps) {
  const containerVariants: Variants = {
    hidden:  {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren:   delayStart,
      },
    },
  };

  return (
    <motion.div
      // @ts-expect-error polymorphic
      as={Tag}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.05 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// ── StaggerItem — wrap each child in this ────────────────
export interface StaggerItemProps {
  children:   React.ReactNode;
  variant?:   keyof typeof CHILD_VARIANTS;
  className?: string;
  as?:        "div" | "li" | "article";
}

export function StaggerItem({
  children,
  variant   = "fadeInUp",
  className,
  as: Tag   = "div",
}: StaggerItemProps) {
  const variants = CHILD_VARIANTS[variant] ?? fadeInUp;

  return (
    <motion.div
      // @ts-expect-error polymorphic
      as={Tag}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
