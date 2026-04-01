"use client";
// app/(dashboard)/infographics/page.tsx
// Phase 6 showcase — all infographic components on one page

import { Container }       from "@/components/ui/Container";
import { InfographicWrapper, FlowDiagram, StepDiagram, ArchDiagram, CompareDiagram } from "@/components/infographics";
import {
  JS_EXECUTION_FLOW,
  REACT_RENDER_CYCLE,
  AUTH_FLOW,
  API_REQUEST_FLOW,
  REACT_STACK_ARCH,
  VAR_LET_CONST_COMPARE,
  PROMISES_VS_ASYNC,
} from "@/lib/infographicData";
import type { InfographicNode } from "@/components/infographics/types";

const HOW_HOOKS_WORK: InfographicNode[] = [
  { id:"1", label:"Component renders",   sublabel:"Function called",   icon:"⚛️",  description:"React calls your component function. All hook calls execute in order." },
  { id:"2", label:"useState called",     sublabel:"[value, setter]",   icon:"📦",  description:"React retrieves the stored state value for this position. On first render, uses the initial value.",  code:"const [count, setCount] = useState(0);" },
  { id:"3", label:"useEffect called",    sublabel:"Register effect",   icon:"⏰",  description:"React registers the effect function. It doesn't run yet — it runs after the component paints to the screen." },
  { id:"4", label:"JSX returned",        sublabel:"Virtual DOM node",  icon:"🌳",  description:"React builds the Virtual DOM from the returned JSX. React will reconcile this with the previous render." },
  { id:"5", label:"Effect runs",         sublabel:"After paint",       icon:"✨",  description:"useEffect fires after the browser has painted. This is where you do data fetching, subscriptions, DOM measurements." },
];

export default function InfographicsPage() {
  return (
    <Container className="py-6 space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-3">
          Phase 6 Complete ✓
        </div>
        <h1 className="font-display font-bold text-3xl text-[var(--color-text)] mb-2">
          Infographic Engine
        </h1>
        <p className="text-[var(--color-text-muted)]">
          All four diagram types — click nodes to expand details.
        </p>
      </div>

      {/* Flow diagrams */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <InfographicWrapper title="JavaScript Execution" description="How JS parses, compiles and runs your code" badge="Flow">
          <FlowDiagram data={JS_EXECUTION_FLOW} />
        </InfographicWrapper>

        <InfographicWrapper title="React Render Cycle" description="What happens when state changes" badge="Flow">
          <FlowDiagram data={REACT_RENDER_CYCLE} />
        </InfographicWrapper>
      </div>

      <InfographicWrapper title="API Request Lifecycle" description="From click to JSON response" badge="Flow">
        <FlowDiagram data={API_REQUEST_FLOW} />
      </InfographicWrapper>

      <InfographicWrapper title="JWT Authentication Flow" description="How secure login tokens work" badge="Flow">
        <FlowDiagram data={AUTH_FLOW} />
      </InfographicWrapper>

      {/* Step diagram */}
      <InfographicWrapper title="How React Hooks Work" description="Step by step — click each step to expand" badge="Steps">
        <StepDiagram steps={HOW_HOOKS_WORK} />
      </InfographicWrapper>

      {/* Architecture */}
      <InfographicWrapper title="Modern React Stack" description="Click any layer to see its technologies" badge="Architecture">
        <ArchDiagram data={REACT_STACK_ARCH} />
      </InfographicWrapper>

      {/* Comparisons */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <InfographicWrapper title="var vs let vs const" badge="Comparison">
          <CompareDiagram data={VAR_LET_CONST_COMPARE} />
        </InfographicWrapper>

        <InfographicWrapper title="Promises vs Async/Await" badge="Comparison">
          <CompareDiagram data={PROMISES_VS_ASYNC} />
        </InfographicWrapper>
      </div>
    </Container>
  );
}
