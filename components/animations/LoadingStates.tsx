"use client";

// components/animations/LoadingStates.tsx
// ─────────────────────────────────────────────────────────
// ANIMATED LOADING STATES
// Spinner, progress bar, pulsing skeleton, and full-screen
// loading overlay — all using Framer Motion.
// ─────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { cn }     from "@/lib/utils";

// ── Spinner — rotating ring ───────────────────────────────
export function Spinner({
  size      = 20,
  color     = "#7B61FF",
  thickness = 2,
  className,
}: {
  size?:      number;
  color?:     string;
  thickness?: number;
  className?: string;
}) {
  const r    = (size - thickness * 2) / 2;
  const circ = 2 * Math.PI * r;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={cn("shrink-0", className)}
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={thickness}
      />
      {/* Arc */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
        style={{ transformOrigin: "center" }}
      />
    </motion.svg>
  );
}

// ── DotsLoader — three bouncing dots ─────────────────────
export function DotsLoader({
  color     = "#7B61FF",
  className,
}: {
  color?:     string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            delay:    i * 0.12,
            repeat:   Infinity,
            ease:     "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ── AnimatedProgressBar — smooth fill with label ──────────
export function AnimatedProgressBar({
  value,
  label,
  color   = "linear-gradient(90deg, #7B61FF, #00C2FF)",
  height  = 6,
  className,
}: {
  value:      number;   // 0–100
  label?:     string;
  color?:     string;
  height?:    number;
  className?: string;
}) {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex items-center justify-between mb-1.5 text-xs">
          <span className="text-[var(--color-text-muted)]">{label}</span>
          <span className="font-semibold text-[var(--color-text)]">{Math.round(value)}%</span>
        </div>
      )}
      <div
        className="w-full rounded-full bg-surface-raised overflow-hidden"
        style={{ height }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: "0%" }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: [0, 0, 0.2, 1], delay: 0.2 }}
        />
      </div>
    </div>
  );
}

// ── PulseBox — pulsing placeholder block ─────────────────
export function PulseBox({
  width     = "100%",
  height    = 16,
  rounded   = "rounded-lg",
  className,
}: {
  width?:     string | number;
  height?:    string | number;
  rounded?:   string;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("bg-surface-raised", rounded, className)}
      style={{ width, height }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

// ── PageLoader — full-screen loading overlay ──────────────
export function PageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-surface/90 backdrop-blur-md flex flex-col items-center justify-center gap-4"
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-glow flex items-center justify-center shadow-glow-md">
        <span className="text-2xl">⚡</span>
      </div>
      <Spinner size={28} />
      <p className="text-sm text-[var(--color-text-muted)]">{message}</p>
    </motion.div>
  );
}
