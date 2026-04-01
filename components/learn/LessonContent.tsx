"use client";

// components/learn/LessonContent.tsx
// ─────────────────────────────────────────────────────────
// Renders a single lesson's full content:
//  1. Hero section (title, meta, tags)
//  2. Content sections (intro, deep-dive, analogy, mistakes)
//  3. Code examples (syntax highlighted, copyable)
//  4. Navigation (prev / next lesson)
// ─────────────────────────────────────────────────────────

import { useState }      from "react";
import { motion }        from "framer-motion";
import {
  BookOpen, Zap, AlertTriangle, Lightbulb, ChevronRight,
  ChevronLeft, CheckCircle, Clock
} from "lucide-react";
import { Button }        from "@/components/ui/Button";
import { Divider }       from "@/components/ui/Divider";
import { CodeBlock }     from "@/components/code";
import { cn }            from "@/lib/utils";
import type { Lesson, SectionType } from "@/lib/topicContent";

interface LessonContentProps {
  lesson: Lesson;
  topicColor: string;
  onComplete: (lessonId: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  isCompleted?: boolean;
}

// Section type visual config
const SECTION_CONFIG: Record<SectionType, {
  icon: React.ElementType;
  label: string;
  iconClass: string;
  borderClass: string;
}> = {
  intro:      { icon: BookOpen,      label: "Introduction",   iconClass: "text-accent",      borderClass: "border-accent/30"      },
  "deep-dive":{ icon: Zap,           label: "Deep Dive",      iconClass: "text-glow",        borderClass: "border-glow/30"        },
  analogy:    { icon: Lightbulb,     label: "Real-World",     iconClass: "text-yellow-400",  borderClass: "border-yellow-400/30"  },
  "use-case": { icon: ChevronRight,  label: "Use Case",       iconClass: "text-emerald-400", borderClass: "border-emerald-400/30" },
  mistakes:   { icon: AlertTriangle, label: "Watch Out",      iconClass: "text-orange-400",  borderClass: "border-orange-400/30"  },
} as const;

export function LessonContent({
  lesson,
  topicColor,
  onComplete,
  onNext,
  onPrev,
  isCompleted = false,
}: LessonContentProps) {
  const [marked, setMarked] = useState(isCompleted);

  const handleComplete = () => {
    setMarked(true);
    onComplete(lesson.id);
  };

  // Fade-in variants for staggered sections
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden:  { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      key={lesson.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-8"
    >
      {/* ── Lesson header ───────────────────────────── */}
      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-2">
            {/* Type + duration */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
                Lesson {lesson.order}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                <Clock className="w-3 h-3" />
                {lesson.duration} min
              </div>
            </div>

            {/* Title */}
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--color-text)]">
              {lesson.title}
            </h2>

            {/* Description */}
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {lesson.description}
            </p>
          </div>

          {/* Completed badge */}
          {marked && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 shrink-0"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-semibold text-emerald-400">Done</span>
            </motion.div>
          )}
        </div>

        {/* Tags */}
        {lesson.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {lesson.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md border border-surface-border text-[var(--color-text-muted)] bg-surface-raised"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Content sections ─────────────────────────── */}
      {lesson.sections.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          {lesson.sections.map((section) => {
            const cfg  = SECTION_CONFIG[section.type];
            const Icon = cfg.icon;

            return (
              <motion.div
                key={section.id}
                variants={itemVariants}
                className={cn(
                  "glass-card p-6 border-l-4",
                  cfg.borderClass
                )}
              >
                {/* Section label */}
                <div className="flex items-center gap-2 mb-3">
                  <div className={cn("w-6 h-6 rounded-lg bg-surface-raised flex items-center justify-center")}>
                    <Icon className={cn("w-3.5 h-3.5", cfg.iconClass)} />
                  </div>
                  <span className={cn("text-xs font-semibold uppercase tracking-[0.1em]", cfg.iconClass)}>
                    {cfg.label}
                  </span>
                </div>

                {/* Section title */}
                <h3 className="font-display font-semibold text-lg text-[var(--color-text)] mb-3">
                  {section.title}
                </h3>

                {/* Content */}
                <p className="text-[var(--color-text-muted)] leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* ── Code examples ────────────────────────────── */}
      {lesson.codeExamples.length > 0 && (
        <div className="space-y-5">
          <Divider label="Code Examples" />
          {lesson.codeExamples.map((example) => (
            <div key={example.id}>
              <CodeBlock
                code={example.code}
                language={example.language}
                title={example.title}
                notes={example.notes}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Complete + Navigation ─────────────────────── */}
      <div className="glass-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Mark complete */}
        {!marked ? (
          <Button
            variant="primary"
            onClick={handleComplete}
            leftIcon={<CheckCircle className="w-4 h-4" />}
          >
            Mark as Complete
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-semibold">Lesson complete! +{lesson.duration * 3} XP</span>
          </div>
        )}

        {/* Prev / Next */}
        <div className="flex items-center gap-2">
          {onPrev && (
            <Button variant="secondary" size="sm" onClick={onPrev} leftIcon={<ChevronLeft className="w-4 h-4" />}>
              Previous
            </Button>
          )}
          {onNext && (
            <Button variant={marked ? "primary" : "secondary"} size="sm" onClick={onNext} rightIcon={<ChevronRight className="w-4 h-4" />}>
              Next Lesson
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
