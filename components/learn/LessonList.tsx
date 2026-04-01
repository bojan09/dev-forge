"use client";

// components/learn/LessonList.tsx
// ─────────────────────────────────────────────────────────
// Lesson list panel — shows all lessons for a topic
// Supports: active lesson highlight, completed checkmarks,
// lesson type icons, duration, locked state
// ─────────────────────────────────────────────────────────

import { motion }         from "framer-motion";
import { CheckCircle2, Circle, BookOpen, Code2, Zap, Video, Lock } from "lucide-react";
import { cn }             from "@/lib/utils";
import type { Lesson, LessonType } from "@/lib/topicContent";

interface LessonListProps {
  lessons: Lesson[];
  activeLessonId?: string;
  completedIds?: string[];
  onSelect: (lesson: Lesson) => void;
  topicColor: string;
}

const TYPE_ICON: Record<LessonType, React.ElementType> = {
  reading:     BookOpen,
  interactive: Zap,
  challenge:   Code2,
  video:       Video,
} as const;

const TYPE_LABEL: Record<LessonType, string> = {
  reading:     "Lesson",
  interactive: "Interactive",
  challenge:   "Challenge",
  video:       "Video",
} as const;

export function LessonList({
  lessons,
  activeLessonId,
  completedIds = [],
  onSelect,
  topicColor,
}: LessonListProps) {
  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-surface-border flex items-center justify-between">
        <h3 className="font-display font-semibold text-sm text-[var(--color-text)]">
          Lessons
        </h3>
        <span className="text-xs text-[var(--color-text-muted)]">
          {completedIds.length}/{lessons.length}
        </span>
      </div>

      {/* Lesson items */}
      <div className="divide-y divide-surface-border">
        {lessons.map((lesson, i) => {
          const isActive    = lesson.id === activeLessonId;
          const isCompleted = completedIds.includes(lesson.id);
          const isLocked    = lesson.type === "challenge" && i > 0 && !completedIds.includes(lessons[i - 1].id);
          const Icon        = TYPE_ICON[lesson.type];

          return (
            <motion.button
              key={lesson.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => !isLocked && onSelect(lesson)}
              disabled={isLocked}
              className={cn(
                "w-full flex items-start gap-3 px-4 py-3.5 text-left",
                "transition-all duration-200 group",
                isActive    && "bg-accent/8 border-l-2 border-accent",
                isCompleted && !isActive && "opacity-75",
                isLocked    && "opacity-40 cursor-not-allowed",
                !isActive && !isLocked && "hover:bg-surface-raised cursor-pointer"
              )}
            >
              {/* Status icon */}
              <div className="shrink-0 mt-0.5">
                {isLocked ? (
                  <Lock className="w-4 h-4 text-[var(--color-text-muted)]" />
                ) : isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isActive ? (
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: topicColor }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: topicColor }} />
                  </div>
                ) : (
                  <Circle className="w-4 h-4 text-[var(--color-text-muted)]" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-medium leading-snug truncate transition-colors",
                  isActive ? "text-accent" : "text-[var(--color-text)] group-hover:text-accent"
                )}>
                  {lesson.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {/* Type badge */}
                  <div className="flex items-center gap-1">
                    <Icon className="w-3 h-3 text-[var(--color-text-muted)]" />
                    <span className="text-[10px] text-[var(--color-text-muted)]">
                      {TYPE_LABEL[lesson.type]}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--color-text-muted)]">·</span>
                  <span className="text-[10px] text-[var(--color-text-muted)]">
                    {lesson.duration} min
                  </span>
                </div>
              </div>

              {/* Order number */}
              <span className={cn(
                "shrink-0 text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center",
                isActive
                  ? "bg-accent text-white"
                  : "bg-surface-raised text-[var(--color-text-muted)]"
              )}>
                {lesson.order}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
