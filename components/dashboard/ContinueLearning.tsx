"use client";
// components/dashboard/ContinueLearning.tsx — In-progress topic resume cards

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Progress }            from "@/components/ui/Progress";
import { Badge }               from "@/components/ui/Badge";
import { MOCK_TOPIC_PROGRESS } from "@/lib/mockData";
import { cn }                  from "@/lib/utils";

export function ContinueLearning() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display font-semibold text-lg text-[var(--color-text)]">Continue Learning</h2>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Pick up where you left off</p>
        </div>
        <Link href="/learn" className="flex items-center gap-1 text-xs font-medium text-accent hover:text-accent-hover transition-colors">
          All topics <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {MOCK_TOPIC_PROGRESS.map((topic, i) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
          >
            <Link href={`/learn/${topic.slug}`} className="block h-full">
              <div className={cn(
                "h-full glass-card p-5 flex flex-col gap-3",
                "hover:-translate-y-0.5 hover:shadow-glow-sm hover:border-accent/25",
                "transition-all duration-300 cursor-pointer group"
              )}>
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${topic.color}18`, border: `1px solid ${topic.color}30` }}>
                    {topic.icon}
                  </div>
                  <Badge variant={topic.difficulty} dot>
                    {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                  </Badge>
                </div>

                <div className="flex-1">
                  <h3 className="font-display font-semibold text-base text-[var(--color-text)] group-hover:text-accent transition-colors">
                    {topic.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-[var(--color-text-muted)]" />
                    <span className="text-[11px] text-[var(--color-text-muted)]">{topic.lastAccessed}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[var(--color-text-muted)]">{topic.lessonsDone}/{topic.lessonsTotal} lessons</span>
                    <span className="font-semibold text-accent">{topic.progress}%</span>
                  </div>
                  <Progress value={topic.progress} size="xs" variant="accent" animated />
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-surface-border">
                  <span className="text-xs font-medium text-accent">Continue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
