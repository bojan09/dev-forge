"use client";

// components/animations/StaggerList.tsx
// Fixed: removed motion.div `as` prop (removed in framer-motion v11)
// Both StaggerList and StaggerItem now use motion.div only

import { motion }        from "framer-motion";
import { cn }            from "@/lib/utils";
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn } from "./motion";
import type { Variants } from "framer-motion";

const CHILD_VARIANTS: Record<string, Variants> = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
} as const;

export interface StaggerListProps {
  children:    React.ReactNode;
  stagger?:    number;
  delayStart?: number;
  variant?:    keyof typeof CHILD_VARIANTS;
  once?:       boolean;
  className?:  string;
}

export function StaggerList({
  children,
  stagger    = 0.08,
  delayStart = 0.05,
  variant    = "fadeInUp",
  once       = true,
  className,
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

  // framer-motion v11: motion.div only — no `as` prop
  return (
    <motion.div
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

export interface StaggerItemProps {
  children:   React.ReactNode;
  variant?:   keyof typeof CHILD_VARIANTS;
  className?: string;
}

export function StaggerItem({
  children,
  variant   = "fadeInUp",
  className,
}: StaggerItemProps) {
  const variants = CHILD_VARIANTS[variant] ?? fadeInUp;

  // framer-motion v11: motion.div only — no `as` prop
  return (
    <motion.div variants={variants} className={cn(className)}>
      {children}
    </motion.div>
  );
}
