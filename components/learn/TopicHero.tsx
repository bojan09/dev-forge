"use client";

// components/learn/TopicHero.tsx
// ─────────────────────────────────────────────────────────
// Hero section for a topic/learning page
// Shows: icon, title, tagline, meta stats, progress, tags
// ─────────────────────────────────────────────────────────

import { motion }       from "framer-motion";
import { Clock, BookOpen, BarChart2, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link             from "next/link";
import { Badge }        from "@/components/ui/Badge";
import { Progress }     from "@/components/ui/Progress";
import type { TopicMeta } from "@/lib/topicContent";

interface TopicHeroProps {
  topic: TopicMeta;
  progress?: number; // 0–100
  completedLessons?: number;
}

export function TopicHero({ topic, progress = 0, completedLessons = 0 }: TopicHeroProps) {
  const totalLessons = topic.lessons.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface-card"
    >
      {/* Ambient glow from topic colour */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: topic.color }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-surface/50 pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-10">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          {/* Left column */}
          <div className="flex-1 space-y-5">
            {/* Icon + badge row */}
            <div className="flex items-center gap-3">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-glow-sm"
                style={{
                  background: `${topic.color}20`,
                  border: `1px solid ${topic.color}35`,
                }}
              >
                {topic.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <Badge variant={topic.difficulty} dot>
                  {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                </Badge>
                <span className="text-xs text-[var(--color-text-muted)] font-medium">
                  {topic.category}
                </span>
              </div>
            </div>

            {/* Title & tagline */}
            <div>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--color-text)] leading-tight mb-2">
                {topic.title}
              </h1>
              <p
                className="text-xl font-display font-medium"
                style={{ color: topic.color }}
              >
                {topic.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
              {topic.description}
            </p>

            {/* Meta stats */}
            <div className="flex flex-wrap items-center gap-4">
              {[
                { icon: Clock,     label: topic.duration,               sub: "total time"     },
                { icon: BookOpen,  label: `${totalLessons} lessons`,     sub: "structured path" },
                { icon: BarChart2, label: `${completedLessons} done`,    sub: "completed"       },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={sub} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-surface-raised border border-surface-border flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text)] leading-none">{label}</p>
                    <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar (if started) */}
            {progress > 0 && (
              <div className="max-w-sm space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--color-text-muted)]">Your progress</span>
                  <span className="font-bold text-accent">{progress}%</span>
                </div>
                <Progress value={progress} size="sm" variant="accent" animated />
              </div>
            )}
          </div>

          {/* Right column — what you'll learn */}
          <div className="lg:w-72 shrink-0">
            <div className="rounded-xl border border-surface-border bg-surface-raised/50 p-5 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                What you&apos;ll learn
              </p>
              <ul className="space-y-2.5">
                {topic.whatYouLearn.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-[var(--color-text)] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Prerequisites */}
              {topic.prerequisites.length > 0 && (
                <div className="pt-3 border-t border-surface-border">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)] mb-2">
                    Prerequisites
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.prerequisites.map((p) => (
                      <span
                        key={p}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-surface-card border border-surface-border text-[var(--color-text-muted)]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
