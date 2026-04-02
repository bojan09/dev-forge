// components/animations/index.ts
// ─────────────────────────────────────────────────────────
// ANIMATION SYSTEM — barrel export
// Import everything from "@/components/animations"
// ─────────────────────────────────────────────────────────

// Variant config & spring presets (use in motion.* directly)
export * from "./motion";

// Scroll-triggered reveal
export { ScrollReveal }    from "./ScrollReveal";
export type { ScrollRevealProps, RevealVariant } from "./ScrollReveal";

// Staggered list animations
export { StaggerList, StaggerItem } from "./StaggerList";
export type { StaggerListProps, StaggerItemProps } from "./StaggerList";

// Page / route transitions
export { PageTransition, FadeTransition, SlideTransition } from "./PageTransition";
export type { PageTransitionProps } from "./PageTransition";

// Animated counter
export { AnimatedCounter, StatCounter } from "./AnimatedCounter";
export type { AnimatedCounterProps }    from "./AnimatedCounter";

// Micro-interactions
export {
  HoverCard,
  PressTap,
  AnimatedIcon,
  PulseRing,
  FloatBadge,
  Shimmer,
  GlowText,
} from "./MicroInteractions";

// Loading states
export {
  Spinner,
  DotsLoader,
  AnimatedProgressBar,
  PulseBox,
  PageLoader,
} from "./LoadingStates";
