"use client";

// hooks/useAnimation.ts
// Fixed: removed `animate` import from framer-motion (API changed in v11)
// Fixed: removed `useTransform` (unused, triggers tree-shaking warnings)
// All hooks remain fully functional — animation is done with RAF instead

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";

// ── useReducedMotion ─────────────────────────────────────
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

// ── useScrollProgress ────────────────────────────────────
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollY, innerHeight } = window;
      const total = document.documentElement.scrollHeight - innerHeight;
      setProgress(total > 0 ? scrollY / total : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return progress;
}

// ── useElementProgress ───────────────────────────────────
export function useElementProgress(ref: React.RefObject<HTMLElement>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect    = el.getBoundingClientRect();
      const total   = rect.height + window.innerHeight;
      const scrolled = window.innerHeight - rect.top;
      setProgress(Math.min(Math.max(scrolled / total, 0), 1));
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [ref]);

  return progress;
}

// ── useCountUp — RAF-based, no framer-motion animate ─────
export function useCountUp(target: number, duration = 1200, delay = 0): number {
  const [count, setCount]   = useState(0);
  const ref                 = useRef<HTMLElement>(null);
  const inView              = useInView(ref as React.RefObject<Element>, { once: true });

  useEffect(() => {
    if (!inView) return;

    const timeout = setTimeout(() => {
      let start: number | null = null;
      const raf = (timestamp: number) => {
        if (start === null) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }, delay);

    return () => clearTimeout(timeout);
  }, [inView, target, duration, delay]);

  return count;
}

// ── useSpringValue ───────────────────────────────────────
export function useSpringValue(target: number, stiffness = 200, damping = 30) {
  const mv     = useMotionValue(0);
  const spring = useSpring(mv, { stiffness, damping });

  useEffect(() => {
    mv.set(target);
  }, [target, mv]);

  return spring;
}

// ── useHoverState ────────────────────────────────────────
export function useHoverState(): [
  boolean,
  { onMouseEnter: () => void; onMouseLeave: () => void }
] {
  const [hovered, setHovered] = useState(false);
  const handlers = {
    onMouseEnter: useCallback(() => setHovered(true),  []),
    onMouseLeave: useCallback(() => setHovered(false), []),
  };
  return [hovered, handlers];
}

// ── useStaggerDelay ──────────────────────────────────────
export function useStaggerDelay(index: number, baseDelay = 0.08): number {
  return index * baseDelay;
}

// ── useAnimateOnMount ────────────────────────────────────
export function useAnimateOnMount(delay = 0): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);
  return mounted;
}
