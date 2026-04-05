"use client";

// components/dashboard/DashboardHero.tsx
// Fixed: suppressHydrationWarning on SVG, useState(0)+useEffect for
// effectiveValue — prevents SSR/CSR mismatch on dynamic SVG attributes.
// Also updated copy to reflect a fresh new user.

import { useState, useEffect } from "react";
import { motion }        from "framer-motion";
import { Flame, Trophy, Clock, Zap } from "lucide-react";
import { Progress }      from "@/components/ui/Progress";
import { MOCK_USER }     from "@/lib/mockData";

export function DashboardHero() {
  const xpPercent = MOCK_USER.xpToNext > 0
    ? Math.round((MOCK_USER.xp / MOCK_USER.xpToNext) * 100)
    : 0;

  // SSR-safe: start at 0, update after client mount
  const [ringValue, setRingValue] = useState(0);
  useEffect(() => { setRingValue(xpPercent); }, [xpPercent]);

  const r    = 38;
  const circ = 2 * Math.PI * r;
  const offset = circ - (ringValue / 100) * circ;

  const isNewUser = MOCK_USER.xp === 0 && MOCK_USER.streak === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface-card"
    >
      {/* Ambient glows */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-glow/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        {/* Left */}
        <div className="space-y-3">
          {/* Status badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {isNewUser ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
                <Zap className="w-3.5 h-3.5 text-accent" />
                <span className="text-xs font-semibold text-accent">Welcome to DevForge!</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-400/10 border border-orange-400/20">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-xs font-semibold text-orange-400">{MOCK_USER.streak} day streak</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-raised border border-surface-border">
                  <Clock className="w-3 h-3 text-[var(--color-text-muted)]" />
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {Math.round(MOCK_USER.totalTime / 60)}h total
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Heading */}
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-[var(--color-text)] leading-tight">
              {isNewUser
                ? <>Let&apos;s get started, <span className="gradient-text">{MOCK_USER.name.split(" ")[0]}</span> 🚀</>
                : <>Welcome back, <span className="gradient-text">{MOCK_USER.name.split(" ")[0]}</span> 👋</>
              }
            </h1>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {isNewUser
                ? "Pick a topic below and complete your first lesson to earn XP."
                : "You're on a roll — keep the momentum going today."
              }
            </p>
          </div>

          {/* XP bar */}
          <div className="max-w-sm space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="font-medium text-[var(--color-text)]">Level {MOCK_USER.level}</span>
                <span className="text-[var(--color-text-muted)]">— {MOCK_USER.xp} XP</span>
              </div>
              <span className="text-[var(--color-text-muted)]">{MOCK_USER.xpToNext} XP to next</span>
            </div>
            <Progress value={ringValue} size="sm" variant="rainbow" animated={false} />
            <p className="text-[10px] text-[var(--color-text-muted)]">
              {MOCK_USER.xpToNext - MOCK_USER.xp} XP to Level {MOCK_USER.level + 1}
            </p>
          </div>
        </div>

        {/* Right — level ring */}
        <div className="flex items-center gap-6">
          <div className="relative flex items-center justify-center">
            <svg width="90" height="90" className="-rotate-90" suppressHydrationWarning>
              <circle cx="45" cy="45" r={r} fill="none" stroke="#21262d" strokeWidth="5" />
              <circle
                cx="45" cy="45" r={r} fill="none"
                stroke="url(#hero-xp-grad)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${circ} ${circ}`}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 1s ease-out" }}
                suppressHydrationWarning
              />
              <defs>
                <linearGradient id="hero-xp-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7B61FF" />
                  <stop offset="100%" stopColor="#00C2FF" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-400 mb-0.5" />
              <span className="font-display font-bold text-xl text-[var(--color-text)] leading-none">
                {MOCK_USER.level}
              </span>
              <span className="text-[9px] text-[var(--color-text-muted)] font-medium uppercase tracking-wider">
                Level
              </span>
            </div>
          </div>

          <div className="hidden sm:flex flex-col gap-3">
            <div className="text-right">
              <p className="text-xs text-[var(--color-text-muted)]">Day joined</p>
              <p className="text-sm font-bold text-[var(--color-text)]">Day {MOCK_USER.joinedDays}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[var(--color-text-muted)]">Total XP</p>
              <p className="text-sm font-bold text-[var(--color-text)]">{MOCK_USER.xp}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
