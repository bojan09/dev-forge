// components/ui/Progress.tsx
// ─────────────────────────────────────────────────────────
// PROGRESS COMPONENT
// Animated progress bar for learning progress tracking
// ─────────────────────────────────────────────────────────

"use client";

import { forwardRef, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;           // 0–100
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "accent" | "glow" | "success" | "rainbow";
  animated?: boolean;
}

const sizeMap = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

const variantMap = {
  default: "from-accent to-accent",
  accent:  "from-accent to-glow",
  glow:    "from-glow to-accent",
  success: "from-emerald-400 to-teal-400",
  rainbow: "from-accent via-glow to-emerald-400",
};

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

    // Animate on mount — slides in from 0 to target
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
        {/* Label row */}
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

        {/* Track */}
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(
            "w-full rounded-full bg-surface-raised overflow-hidden",
            sizeMap[size]
          )}
        >
          {/* Fill */}
          <div
            ref={fillRef}
            style={{ width: animated ? "0%" : `${percentage}%` }}
            className={cn(
              "h-full rounded-full bg-gradient-to-r",
              variantMap[variant]
            )}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";

// ── CircularProgress — for dashboard stats ───────────────
export function CircularProgress({
  value,
  size = 64,
  strokeWidth = 5,
  className,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className={cn("rotate-[-90deg]", className)}
      aria-label={`${value}% complete`}
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-surface-raised"
      />
      {/* Fill */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-accent transition-all duration-700 ease-out"
        stroke="url(#progress-gradient)"
      />
      <defs>
        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7B61FF" />
          <stop offset="100%" stopColor="#00C2FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
