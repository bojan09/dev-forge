"use client";

// app/learn/[topic]/page.tsx
// ─────────────────────────────────────────────────────────
// PHASE 5 — DYNAMIC LEARNING PAGE
// Route: /learn/[topic]
// Renders: TopicHero → two-column layout → LessonList + LessonContent
// State: active lesson, completed lessons (localStorage in Phase 10)
// ─────────────────────────────────────────────────────────

import { useState, useCallback }  from "react";
import { Container }              from "@/components/ui/Container";
import { TopicHero }              from "@/components/learn/TopicHero";
import { LessonList }             from "@/components/learn/LessonList";
import { LessonContent }          from "@/components/learn/LessonContent";
import { TopicNotFound }          from "@/components/learn/TopicNotFound";
import { getTopicContent }        from "@/lib/topicContent";
import type { Lesson }            from "@/lib/topicContent";

export default function TopicPage({ params }: { params: { topic: string } }) {
  const topic = getTopicContent(params.topic);

  // ── State ──────────────────────────────────────────────
  // Active lesson — default to first lesson
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(
    topic?.lessons[0] ?? null
  );
  // Completed lessons (Phase 10 will persist to Supabase)
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  // ── Handlers ───────────────────────────────────────────
  const handleComplete = useCallback((lessonId: string) => {
    setCompletedIds((prev) =>
      prev.includes(lessonId) ? prev : [...prev, lessonId]
    );
  }, []);

  const handleSelectLesson = useCallback((lesson: Lesson) => {
    setActiveLesson(lesson);
    // Scroll lesson content into view on mobile
    if (window.innerWidth < 1024) {
      document.getElementById("lesson-content")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Navigate to next / previous lesson
  const navigate = useCallback((direction: "next" | "prev") => {
    if (!topic || !activeLesson) return;
    const currentIndex = topic.lessons.findIndex((l) => l.id === activeLesson.id);
    const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < topic.lessons.length) {
      setActiveLesson(topic.lessons[nextIndex]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [topic, activeLesson]);

  // ── Not found ─────────────────────────────────────────
  if (!topic) {
    return (
      <Container className="py-8">
        <TopicNotFound slug={params.topic} />
      </Container>
    );
  }

  // ── Calculate progress ─────────────────────────────────
  const progress = Math.round((completedIds.length / topic.lessons.length) * 100);
  const activeIndex = topic.lessons.findIndex((l) => l.id === activeLesson?.id);

  return (
    <Container className="py-6 space-y-6">
      {/* 1 — Hero section */}
      <TopicHero
        topic={topic}
        progress={progress}
        completedLessons={completedIds.length}
      />

      {/* 2 — Two-column layout: lesson list + content */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Lesson list sidebar — sticky on desktop */}
        <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24">
          <LessonList
            lessons={topic.lessons}
            activeLessonId={activeLesson?.id}
            completedIds={completedIds}
            onSelect={handleSelectLesson}
            topicColor={topic.color}
          />
        </div>

        {/* Lesson content — scrollable main area */}
        <div id="lesson-content" className="flex-1 min-w-0">
          {activeLesson ? (
            <LessonContent
              key={activeLesson.id}
              lesson={activeLesson}
              topicColor={topic.color}
              onComplete={handleComplete}
              onNext={activeIndex < topic.lessons.length - 1 ? () => navigate("next") : undefined}
              onPrev={activeIndex > 0 ? () => navigate("prev") : undefined}
              isCompleted={completedIds.includes(activeLesson.id)}
            />
          ) : (
            <div className="glass-card p-10 text-center">
              <p className="text-[var(--color-text-muted)]">
                Select a lesson from the list to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
