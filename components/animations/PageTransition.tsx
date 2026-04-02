"use client";

// components/animations/PageTransition.tsx
// ─────────────────────────────────────────────────────────
// PAGE TRANSITION
// Wraps route content in a smooth enter animation.
// Used in the DashboardLayout around {children}.
//
// Also exports:
//   <AnimatedPresence> — convenience re-export with config
//   <FadeTransition>   — simpler fade-only variant
// ─────────────────────────────────────────────────────────

import { motion, AnimatePresence } from "framer-motion";
import { cn }                      from "@/lib/utils";
import { pageTransition }          from "./motion";

export interface PageTransitionProps {
  children:    React.ReactNode;
  routeKey?:   string;           // pass pathname for exit animation
  className?:  string;
}

export function PageTransition({
  children,
  routeKey,
  className,
}: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className={cn("h-full", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ── FadeTransition — simpler fade for nested content ─────
export function FadeTransition({
  children,
  id,
  className,
}: {
  children:   React.ReactNode;
  id?:        string;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.25 } }}
        exit={{    opacity: 0, transition: { duration: 0.15 } }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ── SlideTransition — content that slides left on change ─
export function SlideTransition({
  children,
  id,
  className,
}: {
  children:   React.ReactNode;
  id?:        string;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0,  transition: { duration: 0.3, ease: [0, 0, 0.2, 1] } }}
        exit={{    opacity: 0, x: -16, transition: { duration: 0.2 } }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
