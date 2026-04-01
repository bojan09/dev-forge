"use client";
// components/dashboard/DailyPath.tsx — Checkable daily learning steps

import { useState }        from "react";
import { motion }          from "framer-motion";
import { CheckCircle2, Circle, BookOpen, Code2, HelpCircle, Zap, type LucideIcon } from "lucide-react";
import { MOCK_DAILY_PATH, type DailyPathItem } from "@/lib/mockData";
import { Progress }        from "@/components/ui/Progress";
import { cn }              from "@/lib/utils";

interface TypeConfig { icon: LucideIcon; label: string; color: string; bg: string; pillClass: string; }

const TYPE_CONFIG: Record<DailyPathItem["type"], TypeConfig> = {
  lesson:    { icon: BookOpen,   label:"Lesson",    color:"text-accent",      bg:"bg-accent/10",      pillClass:"bg-accent/10 text-accent border-accent/20"           },
  challenge: { icon: Code2,      label:"Challenge", color:"text-emerald-400", bg:"bg-emerald-400/10", pillClass:"bg-emerald-400/10 text-emerald-400 border-emerald-400/20" },
  quiz:      { icon: HelpCircle, label:"Quiz",      color:"text-yellow-400",  bg:"bg-yellow-400/10",  pillClass:"bg-yellow-400/10 text-yellow-400 border-yellow-400/20"   },
} as const;

export function DailyPath() {
  const [items, setItems] = useState<DailyPathItem[]>([...MOCK_DAILY_PATH]);

  const toggle = (id: number) =>
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, done: !item.done } : item));

  const done      = items.filter((i) => i.done).length;
  const total     = items.length;
  const progress  = Math.round((done / total) * 100);
  const totalMins = items.reduce((acc, i) => acc + i.duration, 0);

  return (
    <div className="glass-card p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-accent" />
            <h3 className="font-display font-semibold text-base text-[var(--color-text)]">Today&apos;s Path</h3>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">{done}/{total} complete · ~{totalMins} min</p>
        </div>
        <span className="text-2xl font-display font-bold gradient-text">{progress}%</span>
      </div>

      <Progress value={progress} size="xs" variant="accent" className="mb-5" animated={false} />

      <div className="space-y-2">
        {items.map((item, i) => {
          const cfg  = TYPE_CONFIG[item.type];
          const Icon = cfg.icon;
          return (
            <motion.div key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggle(item.id)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all duration-200 group",
                item.done
                  ? "bg-emerald-400/5 border-emerald-400/15 opacity-70"
                  : "bg-surface-raised border-surface-border hover:border-accent/30 hover:bg-accent/5"
              )}
            >
              {item.done
                ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                : <Circle className="w-5 h-5 text-[var(--color-text-muted)] shrink-0 group-hover:text-accent transition-colors" />
              }
              <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0", cfg.bg)}>
                <Icon className={cn("w-3.5 h-3.5", cfg.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium truncate transition-colors",
                  item.done ? "line-through text-[var(--color-text-muted)]" : "text-[var(--color-text)]"
                )}>
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-[var(--color-text-muted)]">{item.topic}</span>
                  {item.topic && <span className="text-[10px] text-[var(--color-text-muted)]">·</span>}
                  <span className="text-[10px] text-[var(--color-text-muted)]">{item.duration} min</span>
                </div>
              </div>
              <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0", cfg.pillClass)}>
                {cfg.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {done === total && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-center">
          <p className="text-sm font-semibold text-emerald-400">🎉 Daily path complete! +100 XP</p>
        </motion.div>
      )}
    </div>
  );
}
