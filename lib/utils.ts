// lib/utils.ts
// ─────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// Core helpers used throughout the application
// ─────────────────────────────────────────────────────────

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ── cn: Class Name Merger ────────────────────────────────
// Combines clsx (conditional classes) + tailwind-merge
// (deduplicates conflicting Tailwind classes)
// Usage: cn("px-4", condition && "bg-blue-500", "px-8")
// → "bg-blue-500 px-8" (px-4 is overridden by px-8)
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ── formatDate: Human-readable dates ────────────────────
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

// ── formatRelativeTime: "2 hours ago" style ─────────────
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diff = now.getTime() - then.getTime();

  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (minutes < 1)  return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24)   return `${hours}h ago`;
  if (days < 7)     return `${days}d ago`;
  return formatDate(date);
}

// ── slugify: Convert string to URL-safe slug ─────────────
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── truncate: Shorten text with ellipsis ─────────────────
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

// ── clamp: Constrain a number within a range ─────────────
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ── lerp: Linear interpolation ───────────────────────────
export function lerp(start: number, end: number, t: number): number {
  return start * (1 - t) + end * t;
}

// ── wait: Promise-based delay ────────────────────────────
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── generateId: Short unique ID for client use ───────────
export function generateId(prefix = ""): string {
  const id = Math.random().toString(36).slice(2, 9);
  return prefix ? `${prefix}-${id}` : id;
}

// ── copyToClipboard: Copy text to clipboard ──────────────
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const success = document.execCommand("copy");
    document.body.removeChild(el);
    return success;
  }
}

// ── Progress calculation helpers ─────────────────────────
export function calculateProgress(
  completed: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

// ── Difficulty label mapping ──────────────────────────────
export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";

export const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; color: string; bg: string }
> = {
  beginner:     { label: "Beginner",     color: "text-emerald-400", bg: "bg-emerald-400/10" },
  intermediate: { label: "Intermediate", color: "text-yellow-400",  bg: "bg-yellow-400/10"  },
  advanced:     { label: "Advanced",     color: "text-orange-400",  bg: "bg-orange-400/10"  },
  expert:       { label: "Expert",       color: "text-red-400",     bg: "bg-red-400/10"     },
};
