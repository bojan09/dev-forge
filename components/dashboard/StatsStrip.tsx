"use client";
// components/dashboard/StatsStrip.tsx — 4 key metric cards with stagger animation

import { motion } from "framer-motion";
import { BookOpen, Flame, Clock, Code2, type LucideIcon } from "lucide-react";
import { MOCK_STATS } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface StatConfig {
  icon: LucideIcon;
  iconClass: string;
}

const STAT_CONFIG: StatConfig[] = [
  { icon: BookOpen, iconClass: "bg-accent/10 text-accent" },
  { icon: Flame, iconClass: "bg-orange-400/10 text-orange-400" },
  { icon: Clock, iconClass: "bg-glow/10 text-glow" },
  { icon: Code2, iconClass: "bg-emerald-400/10 text-emerald-400" },
];

export function StatsStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {MOCK_STATS.map((stat, i) => {
        const { icon: Icon, iconClass } = STAT_CONFIG[i];
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07, ease: "easeOut" }}
            className="glass-card p-5 flex items-start gap-4 hover:border-accent/20 transition-colors duration-300"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                iconClass,
              )}
            >
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-2xl font-display font-bold text-[var(--color-text)] leading-none">
                {stat.value}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">
                {stat.label}
              </p>
              <p
                className={cn(
                  "text-[10px] font-medium mt-1",
                  stat.trend === "up"
                    ? "text-emerald-400"
                    : stat.trend === "down"
                      ? "text-red-400"
                      : "text-[var(--color-text-muted)]",
                )}
              >
                {stat.trend === "up" && "↑ "}
                {stat.trend === "down" && "↓ "}
                {stat.sub}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
