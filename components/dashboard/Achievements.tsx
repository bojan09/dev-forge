"use client";

// components/dashboard/Achievements.tsx
// Fixed: XP values now driven from MOCK_USER

import { motion }             from "framer-motion";
import { Lock }               from "lucide-react";
import { MOCK_ACHIEVEMENTS }  from "@/lib/mockData";
import { MOCK_USER }          from "@/lib/mockData";
import { cn }                 from "@/lib/utils";

export function Achievements() {
  const earnedCount = MOCK_ACHIEVEMENTS.filter((a) => a.earned).length;
  const xpToNext    = MOCK_USER.xpToNext - MOCK_USER.xp;

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-base text-[var(--color-text)]">Achievements</h3>
        <span className="text-xs text-[var(--color-text-muted)]">{earnedCount}/{MOCK_ACHIEVEMENTS.length}</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {MOCK_ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.06 }}
            className={cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all duration-200",
              a.earned
                ? "bg-accent/10 border-accent/20 hover:shadow-glow-sm"
                : "bg-surface-raised border-surface-border opacity-50"
            )}
          >
            <div className="relative">
              <span className={cn("text-2xl leading-none", !a.earned && "grayscale opacity-50")}>
                {a.icon}
              </span>
              {!a.earned && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-3 h-3 text-[var(--color-text-muted)]" />
                </div>
              )}
            </div>
            <div>
              <p className={cn(
                "text-[10px] font-semibold leading-tight",
                a.earned ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"
              )}>
                {a.label}
              </p>
              <p className="text-[9px] text-[var(--color-text-muted)] leading-tight mt-0.5">{a.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* XP summary — from MOCK_USER */}
      <div className="mt-4 pt-4 border-t border-surface-border space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--color-text-muted)]">Total XP earned</span>
          <span className="font-bold text-yellow-400">{MOCK_USER.xp} XP</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--color-text-muted)]">Next milestone</span>
          <span className="font-medium text-[var(--color-text)]">
            {xpToNext > 0 ? `${xpToNext} XP away` : "Max level!"}
          </span>
        </div>
      </div>
    </div>
  );
}
