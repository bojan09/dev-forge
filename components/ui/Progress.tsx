"use client";

// components/ui/Progress.tsx
// FIXES APPLIED:
//  1. CircularProgress: suppressHydrationWarning on <svg> and all <circle> elements
//  2. CircularProgress: useState(0) + useEffect to mount value client-side only
//  3. All prop interfaces: explicit className?: string, as const on lookup maps
//  4. No implicit any — all types declared explicitly

import { forwardRef, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// ── Explicit types — no implicit any ────────────────────
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "accent" | "glow" | "success" | "rainbow";
  animated?: boolean;
  className?: string;
}

// as const prevents widening to string, satisfies TS strict checks
const SIZE_MAP = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
} as const satisfies Record<NonNullable<ProgressProps["size"]>, string>;

const VARIANT_MAP = {
  default: "from-accent to-accent",
  accent:  "from-accent to-glow",
  glow:    "from-glow to-accent",
  success: "from-emerald-400 to-teal-400",
  rainbow: "from-accent via-glow to-emerald-400",
} as const satisfies Record<NonNullable<ProgressProps["variant"]>, string>;

// ── Linear progress bar ──────────────────────────────────
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value,
      max = 100,
      label,
      showValue = false,
      size = "sm",
      variant = "accent",
      animated = true,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const fillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const el = fillRef.current;
      if (!el || !animated) return;
      el.style.width = "0%";
      const frame = requestAnimationFrame(() => {
        el.style.transition = "width 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        el.style.width = `${percentage}%`;
      });
      return () => cancelAnimationFrame(frame);
    }, [percentage, animated]);

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {(label || showValue) && (
          <div className="flex items-center justify-between mb-1.5">
            {label && (
              <span className="text-xs font-medium text-[var(--color-text-muted)]">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-xs font-semibold text-[var(--color-text)]">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(
            "w-full rounded-full bg-surface-raised overflow-hidden",
            SIZE_MAP[size]
          )}
        >
          <div
            ref={fillRef}
            style={{ width: animated ? "0%" : `${percentage}%` }}
            className={cn("h-full rounded-full bg-gradient-to-r", VARIANT_MAP[variant])}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

// ── CircularProgress — SSR-safe ──────────────────────────
// Root cause of hydration error: circumference & strokeDashoffset are
// calculated from `value` at render time. SSR and CSR can produce
// imperceptibly different floats, causing React to throw.
//
// Fix strategy:
//  A) Start with effectiveValue=0 on both server AND client (matching renders)
//  B) useEffect updates effectiveValue only after client mount
//  C) suppressHydrationWarning on <svg> and dynamic <circle> as belt+suspenders

export interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function CircularProgress({
  value,
  size = 64,
  strokeWidth = 5,
  className,
}: CircularProgressProps) {
  // Server renders 0; client updates after mount — both renders match
  const [effectiveValue, setEffectiveValue] = useState<number>(0);

  useEffect(() => {
    // Only runs on client — safe to use the real value here
    setEffectiveValue(value);
  }, [value]);

  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (effectiveValue / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className={cn("rotate-[-90deg]", className)}
      aria-label={`${Math.round(effectiveValue)}% complete`}
      suppressHydrationWarning // belt: suppress any remaining mismatch warnings
    >
      {/* Track — static, no dynamic attributes, no suppression needed */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#21262d"
        strokeWidth={strokeWidth}
      />
      {/* Progress arc — dynamic attrs need suppressHydrationWarning */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#cp-gradient)"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.7s ease-out" }}
        suppressHydrationWarning // suspenders: dynamic strokeDashoffset can mismatch
      />
      <defs>
        <linearGradient id="cp-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7B61FF" />
          <stop offset="100%" stopColor="#00C2FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
