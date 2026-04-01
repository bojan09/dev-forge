"use client";
// components/dashboard/AllTopicsGrid.tsx — Topic catalog with category filters

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge }                  from "@/components/ui/Badge";
import { MOCK_ALL_TOPICS, type Category } from "@/lib/mockData";
import { cn }                     from "@/lib/utils";

type FilterCategory = "all" | Category;

const CATEGORIES: { id: FilterCategory; label: string }[] = [
  { id:"all",          label:"All"          },
  { id:"frontend",     label:"Frontend"     },
  { id:"fullstack",    label:"Full Stack"   },
  { id:"backend",      label:"Backend"      },
  { id:"language",     label:"Languages"    },
  { id:"security",     label:"Security"     },
  { id:"architecture", label:"Architecture" },
  { id:"devops",       label:"DevOps"       },
];

export function AllTopicsGrid() {
  const [active, setActive] = useState<FilterCategory>("all");

  const filtered = active === "all"
    ? MOCK_ALL_TOPICS
    : MOCK_ALL_TOPICS.filter((t) => t.category === active);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display font-semibold text-lg text-[var(--color-text)]">All Topics</h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{MOCK_ALL_TOPICS.length} topics — start any time</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1.5 mb-5 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map(({ id, label }) => (
          <button key={id} onClick={() => setActive(id)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200",
              active === id
                ? "bg-accent text-white shadow-glow-sm"
                : "bg-surface-raised border border-surface-border text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-accent/30"
            )}>
            {label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((topic, i) => {
            const isStarted   = topic.progress > 0 && topic.progress < 100;
            const isCompleted = topic.progress === 100;
            const isLocked    = topic.difficulty === "advanced" && topic.progress === 0;

            return (
              <motion.div
                key={topic.id} layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
              >
                <Link href={`/learn/${topic.slug}`} className={cn("block", isLocked && "pointer-events-none")}>
                  <div className={cn(
                    "glass-card p-4 flex flex-col gap-3 h-full transition-all duration-300 group",
                    isLocked ? "opacity-50" : "hover:-translate-y-0.5 hover:border-accent/25 cursor-pointer"
                  )}>
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg relative"
                        style={{ background: `${topic.color}18`, border: `1px solid ${topic.color}25` }}>
                        {topic.icon}
                        {isLocked && (
                          <div className="absolute inset-0 rounded-xl bg-surface-card/70 flex items-center justify-center">
                            <Lock className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                          </div>
                        )}
                      </div>
                      {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </div>

                    <div className="flex-1">
                      <p className={cn("font-semibold text-sm leading-tight transition-colors",
                        isLocked ? "text-[var(--color-text-muted)]" : "text-[var(--color-text)] group-hover:text-accent"
                      )}>
                        {topic.title}
                      </p>
                      <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                        {topic.modules} modules · {topic.duration}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant={topic.difficulty} size="xs">
                        {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                      </Badge>
                      {isStarted && <span className="text-[10px] font-semibold text-accent">{topic.progress}%</span>}
                      {!isLocked && !isStarted && !isCompleted && (
                        <ArrowRight className="w-3 h-3 text-[var(--color-text-muted)] group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                      )}
                    </div>

                    {isStarted && (
                      <div className="h-0.5 rounded-full bg-surface-raised overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-accent to-glow" style={{ width: `${topic.progress}%` }} />
                      </div>
                    )}
                    {isCompleted && <div className="h-0.5 rounded-full bg-emerald-400/40" />}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
