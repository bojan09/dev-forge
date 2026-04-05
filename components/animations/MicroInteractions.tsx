"use client";

// components/animations/MicroInteractions.tsx
// Fixed: removed motion.div `as` prop — not supported in framer-motion v11
// HoverCard now always renders motion.div (Tag prop removed)

import { motion }    from "framer-motion";
import { cn }        from "@/lib/utils";
import { cardHover, cardHoverSubtle, iconHover, iconTap } from "./motion";

// ── HoverCard — lift + glow on hover ─────────────────────
export interface HoverCardProps {
  children:    React.ReactNode;
  className?:  string;
  subtle?:     boolean;
  glow?:       boolean;
}

export function HoverCard({
  children,
  className,
  subtle = false,
  glow   = false,
}: HoverCardProps) {
  return (
    <motion.div
      whileHover={subtle ? cardHoverSubtle : cardHover}
      className={cn(
        "transition-shadow duration-300",
        glow && "hover:shadow-glow-sm",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// ── PressTap — scale down on press ───────────────────────
export function PressTap({
  children,
  className,
  scale = 0.97,
}: {
  children:   React.ReactNode;
  className?: string;
  scale?:     number;
}) {
  return (
    <motion.div
      whileTap={{ scale, transition: { duration: 0.1 } }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// ── AnimatedIcon — icon with bounce hover ─────────────────
export function AnimatedIcon({
  children,
  className,
}: {
  children:   React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={iconHover}
      whileTap={iconTap}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}

// ── PulseRing — live / online indicator ──────────────────
export function PulseRing({
  color     = "#7B61FF",
  size      = 8,
  className,
}: {
  color?:     string;
  size?:      number;
  className?: string;
}) {
  return (
    <span
      className={cn("relative inline-flex", className)}
      style={{ width: size, height: size }}
    >
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
      />
      <span
        className="relative rounded-full"
        style={{ width: size, height: size, backgroundColor: color }}
      />
    </span>
  );
}

// ── FloatBadge — gentle floating animation ────────────────
export function FloatBadge({
  children,
  amplitude = 6,
  period    = 3,
  className,
}: {
  children:   React.ReactNode;
  amplitude?: number;
  period?:    number;
  className?: string;
}) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration: period, repeat: Infinity, ease: "easeInOut" }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}

// ── Shimmer — animated highlight overlay ─────────────────
export function Shimmer({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["200% center", "-200% center"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

// ── GlowText — gradient text with shimmer ────────────────
export function GlowText({
  children,
  className,
}: {
  children:   React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      className={cn("gradient-text inline-block", className)}
      animate={{ backgroundPosition: ["0% center", "200% center", "0% center"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      style={{ backgroundSize: "200% auto" }}
    >
      {children}
    </motion.span>
  );
}
