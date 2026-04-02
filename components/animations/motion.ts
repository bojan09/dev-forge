// components/animations/motion.ts
// ─────────────────────────────────────────────────────────
// MOTION CONFIG — Single source of truth for all animations
// Import variants and transitions from here so every
// animation across the app stays consistent and tunable.
// ─────────────────────────────────────────────────────────

import type { Variants, Transition } from "framer-motion";

// ── Spring presets ────────────────────────────────────────
// Named springs — use these instead of raw numbers everywhere
export const springs = {
  // Sidebar collapse, panels
  snappy: { type: "spring", stiffness: 400, damping: 35 } as Transition,
  // Page entry, card reveal
  gentle: { type: "spring", stiffness: 260, damping: 28 } as Transition,
  // Tooltip, dropdown
  quick:  { type: "spring", stiffness: 500, damping: 40 } as Transition,
  // Slow dramatic entrance
  lazy:   { type: "spring", stiffness: 160, damping: 24 } as Transition,
  // Bouncy — for badges, achievements
  bounce: { type: "spring", stiffness: 600, damping: 20 } as Transition,
} as const;

// ── Easing curves ─────────────────────────────────────────
export const ease = {
  out:     [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
  in:      [0.4, 0.0, 1.0, 1.0] as [number, number, number, number],
  inOut:   [0.4, 0.0, 0.2, 1.0] as [number, number, number, number],
  smooth:  [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
} as const;

// ── Duration constants ────────────────────────────────────
export const duration = {
  instant: 0.1,
  fast:    0.2,
  normal:  0.35,
  slow:    0.5,
  xslow:   0.8,
} as const;

// ─────────────────────────────────────────────────────────
// VARIANT LIBRARIES
// Each export is a VariantMap — pass directly to motion.*
// ─────────────────────────────────────────────────────────

// ── Fade variants ─────────────────────────────────────────
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.normal, ease: ease.out } },
};

export const fadeInUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0,  transition: { duration: duration.normal, ease: ease.out } },
};

export const fadeInDown: Variants = {
  hidden:  { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0,   transition: { duration: duration.normal, ease: ease.out } },
};

export const fadeInLeft: Variants = {
  hidden:  { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0,   transition: { duration: duration.normal, ease: ease.out } },
};

export const fadeInRight: Variants = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0,  transition: { duration: duration.normal, ease: ease.out } },
};

// ── Scale variants ────────────────────────────────────────
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1,    transition: springs.gentle },
};

export const scalePop: Variants = {
  hidden:  { opacity: 0, scale: 0.7 },
  visible: { opacity: 1, scale: 1,   transition: springs.bounce },
};

// ── Stagger container ─────────────────────────────────────
// Parent: apply staggerChildren to sequence child animations
export const staggerContainer: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  0.08,
      delayChildren:    0.05,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren:   0,
    },
  },
};

// ── Slide variants ────────────────────────────────────────
export const slideInLeft: Variants = {
  hidden:  { x: "-100%", opacity: 0 },
  visible: { x: "0%",   opacity: 1,  transition: springs.snappy },
  exit:    { x: "-100%", opacity: 0, transition: { duration: duration.fast } },
};

export const slideInRight: Variants = {
  hidden:  { x: "100%", opacity: 0 },
  visible: { x: "0%",  opacity: 1,  transition: springs.snappy },
  exit:    { x: "100%", opacity: 0, transition: { duration: duration.fast } },
};

export const slideInUp: Variants = {
  hidden:  { y: "100%", opacity: 0 },
  visible: { y: "0%",  opacity: 1,  transition: springs.gentle },
  exit:    { y: "100%", opacity: 0, transition: { duration: duration.fast } },
};

// ── Page transition ───────────────────────────────────────
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0,  transition: { duration: duration.normal, ease: ease.out } },
  exit:    { opacity: 0, y: -8, transition: { duration: duration.fast,   ease: ease.in  } },
};

// ── Dropdown / Menu ───────────────────────────────────────
export const dropdownMenu: Variants = {
  hidden: {
    opacity:    0,
    scale:      0.95,
    y:         -8,
    transition: { duration: duration.fast },
  },
  visible: {
    opacity:    1,
    scale:      1,
    y:          0,
    transition: springs.quick,
  },
  exit: {
    opacity:    0,
    scale:      0.95,
    y:         -4,
    transition: { duration: duration.fast },
  },
};

// ── Modal / Dialog ────────────────────────────────────────
export const modalBackdrop: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.fast } },
  exit:    { opacity: 0, transition: { duration: duration.fast } },
};

export const modalContent: Variants = {
  hidden:  { opacity: 0, scale: 0.94, y: 20 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: springs.gentle },
  exit:    { opacity: 0, scale: 0.96, y: 10, transition: { duration: duration.fast } },
};

// ── Notification / Toast ──────────────────────────────────
export const toastVariant: Variants = {
  hidden:  { opacity: 0, x: 80, scale: 0.95 },
  visible: { opacity: 1, x: 0,  scale: 1,   transition: springs.snappy },
  exit:    { opacity: 0, x: 80,              transition: { duration: duration.fast } },
};

// ── Progress bar ──────────────────────────────────────────
export const progressBar: Variants = {
  hidden:  { scaleX: 0, transformOrigin: "left" },
  visible: {
    scaleX: 1,
    transformOrigin: "left",
    transition: { duration: duration.xslow, ease: ease.out },
  },
};

// ── Card hover ────────────────────────────────────────────
// Use with whileHover on motion.div
export const cardHover = {
  scale:     1.015,
  y:        -3,
  transition: springs.quick,
} as const;

export const cardHoverSubtle = {
  y:        -2,
  transition: springs.quick,
} as const;

// ── Icon button hover ─────────────────────────────────────
export const iconHover = {
  scale:     1.12,
  transition: springs.bounce,
} as const;

export const iconTap = {
  scale:     0.9,
  transition: { duration: 0.1 },
} as const;
