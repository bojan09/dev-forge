"use client";

// components/infographics/StepDiagram.tsx
// ─────────────────────────────────────────────────────────
// STEP DIAGRAM
// Numbered steps with animated stagger reveal
// Each step is clickable — expands an inline detail panel
// Used for: how-to guides, processes, onboarding flows
// ─────────────────────────────────────────────────────────

import { useState }               from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn }                     from "@/lib/utils";
import {
  INFOGRAPHIC_COLORS,
  NODE_COLOR_SEQUENCE,
  type InfographicNode,
  type InfographicColorKey,
} from "./types";

interface StepDiagramProps {
  title?: string;
  description?: string;
  steps: InfographicNode[];
  layout?: "vertical" | "horizontal";
  className?: string;
}

export function StepDiagram({
  title,
  description,
  steps,
  layout = "vertical",
  className,
}: StepDiagramProps) {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const toggle = (id: string) =>
    setActiveStep((prev) => (prev === id ? null : id));

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h4 className="font-display font-semibold text-base text-[var(--color-text)] mb-1">
              {title}
            </h4>
          )}
          {description && (
            <p className="text-xs text-[var(--color-text-muted)]">{description}</p>
          )}
        </div>
      )}

      {/* Steps */}
      <div
        className={cn(
          layout === "horizontal"
            ? "flex flex-row gap-3 flex-wrap"
            : "flex flex-col gap-3"
        )}
      >
        {steps.map((step, i) => {
          const colorKey = NODE_COLOR_SEQUENCE[i % NODE_COLOR_SEQUENCE.length] as InfographicColorKey;
          const palette  = INFOGRAPHIC_COLORS[colorKey];
          const isActive = activeStep === step.id;
          const hasDetail = !!(step.description || step.code);

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: layout === "horizontal" ? 0 : -16, y: layout === "horizontal" ? 16 : 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35, ease: "easeOut" }}
              className={cn(layout === "horizontal" && "flex-1 min-w-[140px]")}
            >
              {/* Step row */}
              <motion.div
                onClick={hasDetail ? () => toggle(step.id) : undefined}
                whileHover={hasDetail ? { x: 3 } : {}}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-xl border transition-all duration-200",
                  hasDetail && "cursor-pointer",
                  isActive
                    ? "border-opacity-60"
                    : "border-surface-border hover:border-opacity-40 bg-surface-raised"
                )}
                style={
                  isActive
                    ? { background: palette.bg, borderColor: palette.border }
                    : {}
                }
              >
                {/* Step number */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-200"
                  style={
                    isActive
                      ? { background: palette.text, color: "#0d1117" }
                      : { background: palette.bg, color: palette.text, border: `1px solid ${palette.border}` }
                  }
                >
                  {step.icon ?? (i + 1)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p
                        className="text-sm font-semibold leading-snug transition-colors"
                        style={{ color: isActive ? palette.text : "var(--color-text)" }}
                      >
                        {step.label}
                      </p>
                      {step.sublabel && (
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                          {step.sublabel}
                        </p>
                      )}
                    </div>
                    {hasDetail && (
                      <div style={{ color: palette.text }} className="shrink-0 mt-0.5">
                        {isActive
                          ? <ChevronUp className="w-4 h-4" />
                          : <ChevronDown className="w-4 h-4 opacity-50" />
                        }
                      </div>
                    )}
                  </div>

                  {/* Expanded detail */}
                  <AnimatePresence>
                    {isActive && hasDetail && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t" style={{ borderColor: palette.border }}>
                          {step.description && (
                            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-2">
                              {step.description}
                            </p>
                          )}
                          {step.code && (
                            <pre
                              className="p-2.5 rounded-lg text-[11px] font-mono overflow-x-auto"
                              style={{ background: "rgba(0,0,0,0.3)", color: palette.text }}
                            >
                              {step.code}
                            </pre>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Vertical connector between steps */}
              {layout === "vertical" && i < steps.length - 1 && (
                <div className="flex justify-start pl-8 py-0.5">
                  <div
                    className="w-0.5 h-4 rounded-full"
                    style={{ background: palette.border }}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
