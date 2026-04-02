"use client";

// hooks/useAnimation.ts
// ─────────────────────────────────────────────────────────
// ANIMATION HOOKS
// Custom hooks that power the animation system.
// All hooks respect prefers-reduced-motion automatically.
// ─────────────────────────────────────────────────────────

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
  useTransform,
  animate,
} from "framer-motion";

// ── useReducedMotion — system preference check ───────────
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

// ── useScrollProgress — 0–1 scroll position ──────────────
// Returns the scroll progress of the page (0 = top, 1 = bottom)
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

// ── useElementProgress — scroll progress for a specific el
export function useElementProgress(
  ref: React.RefObject<HTMLElement>
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const scrolled = window.innerHeight - rect.top;
      setProgress(Math.min(Math.max(scrolled / total, 0), 1));
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [ref]);

  return progress;
}

// ── useCountUp — animated number from 0 → target ─────────
export function useCountUp(
  target:   number,
  duration: number = 1200,
  delay:    number = 0
): number {
  const [count, setCount] = useState(0);
  const ref               = useRef<HTMLElement>(null);
  const inView            = useInView(ref as React.RefObject<Element>, { once: true });

  useEffect(() => {
    if (!inView) return;

    const timeout = setTimeout(() => {
      const controls = animate(0, target, {
        duration: duration / 1000,
        ease:     [0.0, 0.0, 0.2, 1.0],
        onUpdate: (latest) => setCount(Math.round(latest)),
      });
      return controls.stop;
    }, delay);

    return () => clearTimeout(timeout);
  }, [inView, target, duration, delay]);

  return count;
}

// ── useSpringValue — physics-based smooth value ───────────
export function useSpringValue(target: number, stiffness = 200, damping = 30) {
  const mv    = useMotionValue(0);
  const spring = useSpring(mv, { stiffness, damping });

  useEffect(() => {
    mv.set(target);
  }, [target, mv]);

  return spring;
}

// ── useHoverState — clean hover tracking ─────────────────
export function useHoverState(): [boolean, { onMouseEnter: () => void; onMouseLeave: () => void }] {
  const [hovered, setHovered] = useState(false);

  const handlers = {
    onMouseEnter: useCallback(() => setHovered(true),  []),
    onMouseLeave: useCallback(() => setHovered(false), []),
  };

  return [hovered, handlers];
}

// ── useStaggerDelay — compute delay for staggered items ──
export function useStaggerDelay(index: number, baseDelay = 0.08): number {
  return index * baseDelay;
}

// ── useAnimateOnMount — trigger animation after mount ─────
export function useAnimateOnMount(delay = 0): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  return mounted;
}
