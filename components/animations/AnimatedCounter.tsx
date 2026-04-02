"use client";

// components/animations/AnimatedCounter.tsx
// ─────────────────────────────────────────────────────────
// ANIMATED COUNTER
// Counts up from 0 to a target number when it enters the viewport.
// Used in stats strips, hero sections, achievement counters.
//
// Usage:
//   <AnimatedCounter value={2450} suffix=" XP" />
//   <AnimatedCounter value={78} suffix="%" decimals={0} />
//   <AnimatedCounter value={4.9} prefix="★ " decimals={1} />
// ─────────────────────────────────────────────────────────

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView }                   from "framer-motion";
import { cn }                          from "@/lib/utils";

export interface AnimatedCounterProps {
  value:      number;
  prefix?:    string;
  suffix?:    string;
  decimals?:  number;
  duration?:  number;   // ms
  delay?:     number;   // ms
  className?: string;
  once?:      boolean;
}

// Easing function — easeOutCubic
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function AnimatedCounter({
  value,
  prefix     = "",
  suffix     = "",
  decimals   = 0,
  duration   = 1200,
  delay      = 0,
  className,
  once       = true,
}: AnimatedCounterProps) {
  const [displayed, setDisplayed] = useState<number>(0);
  const ref                       = useRef<HTMLSpanElement>(null);
  const inView                    = useInView(ref, { once });
  const startRef                  = useRef<number | null>(null);
  const rafRef                    = useRef<number>(0);
  const hasAnimated               = useRef(false);

  useEffect(() => {
    if (!inView) return;
    if (once && hasAnimated.current) return;

    const timeout = setTimeout(() => {
      hasAnimated.current = true;

      const animate = (timestamp: number) => {
        if (startRef.current === null) startRef.current = timestamp;

        const elapsed  = timestamp - startRef.current;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = easeOut(progress);

        setDisplayed(eased * value);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayed(value); // snap to exact value
        }
      };

      startRef.current = null;
      rafRef.current   = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [inView, value, duration, delay, once]);

  const formatted = displayed.toFixed(decimals);

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
      suppressHydrationWarning
    >
      {prefix}{formatted}{suffix}
    </span>
  );
}

// ── Convenience: animated stat card ──────────────────────
export function StatCounter({
  value,
  label,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps & { label: string }) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="font-display font-bold text-3xl gradient-text tabular-nums">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </span>
      <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
    </div>
  );
}
