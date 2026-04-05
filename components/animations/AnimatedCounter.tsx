"use client";

// components/animations/AnimatedCounter.tsx
// Fixed: removed duplicate "use client" directive (was causing webpack crash)
// Fixed: useInView ref typed correctly for framer-motion v11

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

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function AnimatedCounter({
  value,
  prefix    = "",
  suffix    = "",
  decimals  = 0,
  duration  = 1200,
  delay     = 0,
  className,
  once      = true,
}: AnimatedCounterProps) {
  const [displayed, setDisplayed] = useState<number>(0);
  const ref        = useRef<HTMLSpanElement>(null);
  // framer-motion v11: useInView accepts RefObject<Element>
  const inView     = useInView(ref as React.RefObject<Element>, { once });
  const startRef   = useRef<number | null>(null);
  const rafRef     = useRef<number>(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView) return;
    if (once && hasAnimated.current) return;

    const timeout = setTimeout(() => {
      hasAnimated.current = true;
      startRef.current    = null;

      const tick = (timestamp: number) => {
        if (startRef.current === null) startRef.current = timestamp;

        const elapsed  = timestamp - startRef.current;
        const progress = Math.min(elapsed / duration, 1);
        setDisplayed(easeOut(progress) * value);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayed(value);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [inView, value, duration, delay, once]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)} suppressHydrationWarning>
      {prefix}{displayed.toFixed(decimals)}{suffix}
    </span>
  );
}

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
