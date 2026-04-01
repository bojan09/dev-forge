"use client";
// components/dashboard/ActivityFeed.tsx — Recent learning activity timeline

import { motion }             from "framer-motion";
import { CheckCircle2, Star, Sword, Play, type LucideIcon } from "lucide-react";
import { MOCK_ACTIVITY }      from "@/lib/mockData";
import { cn }                 from "@/lib/utils";

interface ActionConfig { icon: LucideIcon; color: string; bg: string; }

const ACTION_CONFIG: Record<string, ActionConfig> = {
  Completed: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  Achieved:  { icon: Star,         color: "text-yellow-400",  bg: "bg-yellow-400/10"  },
  Solved:    { icon: Sword,        color: "text-accent",      bg: "bg-accent/10"      },
  Started:   { icon: Play,         color: "text-glow",        bg: "bg-glow/10"        },
} as const;

const FALLBACK_CONFIG: ActionConfig = { icon: Play, color: "text-glow", bg: "bg-glow/10" };

export function ActivityFeed() {
  return (
    <div className="glass-card p-5">
      <h3 className="font-display font-semibold text-base text-[var(--color-text)] mb-4">Recent Activity</h3>
      <div className="space-y-1">
        {MOCK_ACTIVITY.map((item, i) => {
          const cfg  = ACTION_CONFIG[item.action] ?? FALLBACK_CONFIG;
          const Icon = cfg.icon;
          return (
            <motion.div key={item.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 py-2.5 border-b border-surface-border last:border-0"
            >
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5", cfg.bg)}>
                <Icon className={cn("w-3.5 h-3.5", cfg.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--color-text)] leading-snug">
                  <span className="font-medium">{item.action}</span>{" "}
                  <span className="text-[var(--color-text-muted)]">{item.item}</span>
                </p>
                {item.topic && (
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">{item.topic}</p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-[11px] text-[var(--color-text-muted)]">{item.time}</p>
                {item.xp > 0 && (
                  <p className="text-[10px] font-semibold text-yellow-400 mt-0.5">+{item.xp} XP</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
