"use client";
// app/(dashboard)/learn/page.tsx — updated for Phase 6

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Container }       from "@/components/ui/Container";
import { Badge }           from "@/components/ui/Badge";
import { InfographicWrapper, FlowDiagram } from "@/components/infographics";
import { API_REQUEST_FLOW } from "@/lib/infographicData";
import { MOCK_ALL_TOPICS } from "@/lib/mockData";

export default function LearnPage() {
  return (
    <Container className="py-6 space-y-10">
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-3xl text-[var(--color-text)] mb-2">All Topics</h1>
        <p className="text-[var(--color-text-muted)]">
          Every path is structured, progressive, and project-driven.
        </p>
      </div>

      {/* Featured infographic — shows off the engine */}
      <InfographicWrapper
        title="How every web request works"
        description="Understanding this flow is foundational to full-stack development"
        badge="Phase 6"
      >
        <FlowDiagram data={API_REQUEST_FLOW} />
      </InfographicWrapper>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_ALL_TOPICS.map((topic, i) => (
          <motion.div key={topic.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={`/learn/${topic.slug}`} className="block h-full group">
              <div className="h-full glass-card p-6 flex flex-col gap-4 hover:-translate-y-0.5 hover:border-accent/25 hover:shadow-glow-sm transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: `${topic.color}18`, border: `1px solid ${topic.color}30` }}>
                    {topic.icon}
                  </div>
                  <Badge variant={topic.difficulty} dot>
                    {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                  </Badge>
                </div>
                <div className="flex-1">
                  <h2 className="font-display font-semibold text-xl text-[var(--color-text)] group-hover:text-accent transition-colors mb-1">
                    {topic.title}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{topic.modules} modules</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{topic.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-surface-border">
                  <span className="text-xs text-[var(--color-text-muted)]">{topic.category}</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-accent group-hover:gap-2 transition-all">
                    {topic.progress > 0 ? `${topic.progress}% done` : "Start"} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Container>
  );
}
