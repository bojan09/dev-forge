"use client";

// components/infographics/InfographicSection.tsx
// ─────────────────────────────────────────────────────────
// LESSON INFOGRAPHIC SECTION
// Drop-in component for lesson pages — auto-selects the
// correct diagram type and data for a given topic slug.
// Used directly in LessonContent or lesson page templates.
// ─────────────────────────────────────────────────────────

import { InfographicWrapper } from "./InfographicWrapper";
import { FlowDiagram }        from "./FlowDiagram";
import { StepDiagram }        from "./StepDiagram";
import { ArchDiagram }        from "./ArchDiagram";
import { CompareDiagram }     from "./CompareDiagram";
import {
  JS_EXECUTION_FLOW,
  REACT_RENDER_CYCLE,
  AUTH_FLOW,
  API_REQUEST_FLOW,
  REACT_STACK_ARCH,
  VAR_LET_CONST_COMPARE,
  PROMISES_VS_ASYNC,
} from "@/lib/infographicData";
import type { InfographicNode } from "./types";

// ── Topic-to-infographic map ─────────────────────────────
const TOPIC_INFOGRAPHICS: Record<string, React.ReactNode> = {
  "js-execution": (
    <FlowDiagram data={JS_EXECUTION_FLOW} />
  ),
  "react-render": (
    <FlowDiagram data={REACT_RENDER_CYCLE} />
  ),
  "auth-flow": (
    <FlowDiagram data={AUTH_FLOW} />
  ),
  "api-flow": (
    <FlowDiagram data={API_REQUEST_FLOW} />
  ),
  "react-stack": (
    <ArchDiagram data={REACT_STACK_ARCH} />
  ),
  "var-let-const": (
    <CompareDiagram data={VAR_LET_CONST_COMPARE} />
  ),
  "promises-vs-async": (
    <CompareDiagram data={PROMISES_VS_ASYNC} />
  ),
};

interface InfographicSectionProps {
  infographicId: string;
  title?: string;
  description?: string;
  badge?: string;
  className?: string;
}

export function InfographicSection({
  infographicId,
  title,
  description,
  badge = "Visual",
  className,
}: InfographicSectionProps) {
  const content = TOPIC_INFOGRAPHICS[infographicId];
  if (!content) return null;

  return (
    <InfographicWrapper
      title={title}
      description={description}
      badge={badge}
      className={className}
    >
      {content}
    </InfographicWrapper>
  );
}

// ── Re-export all building blocks for custom use ─────────
export { FlowDiagram, StepDiagram, ArchDiagram, CompareDiagram, InfographicWrapper };

// ── Helper: quick inline step diagram ────────────────────
export function QuickSteps({
  title,
  steps,
}: {
  title?: string;
  steps: InfographicNode[];
}) {
  return (
    <InfographicWrapper title={title} badge="How it works">
      <StepDiagram steps={steps} />
    </InfographicWrapper>
  );
}
