"use client";

// components/infographics/CompareDiagram.tsx
// ─────────────────────────────────────────────────────────
// COMPARISON DIAGRAM
// Side-by-side cards comparing 2-4 concepts
// Used for: var vs let vs const, REST vs GraphQL,
//           SQL vs NoSQL, class vs functional components
// ─────────────────────────────────────────────────────────

import { motion }   from "framer-motion";
import { Check }    from "lucide-react";
import { cn }       from "@/lib/utils";
import {
  INFOGRAPHIC_COLORS,
  NODE_COLOR_SEQUENCE,
  type ComparisonData,
  type InfographicColorKey,
} from "./types";

interface CompareDiagramProps {
  data: ComparisonData;
  className?: string;
}

export function CompareDiagram({ data, className }: CompareDiagramProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Title */}
      {data.title && (
        <h4 className="font-display font-semibold text-base text-[var(--color-text)] mb-5">
          {data.title}
        </h4>
      )}

      {/* Cards */}
      <div className={cn(
        "grid gap-4",
        data.items.length === 2 && "grid-cols-1 sm:grid-cols-2",
        data.items.length === 3 && "grid-cols-1 sm:grid-cols-3",
        data.items.length >= 4 && "grid-cols-2 sm:grid-cols-4",
      )}>
        {data.items.map((item, i) => {
          const colorKey = NODE_COLOR_SEQUENCE[i % NODE_COLOR_SEQUENCE.length] as InfographicColorKey;
          const palette  = INFOGRAPHIC_COLORS[colorKey];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.35, ease: "easeOut" }}
              className="flex flex-col rounded-2xl border overflow-hidden"
              style={{ borderColor: palette.border }}
            >
              {/* Card header */}
              <div
                className="px-5 py-4 flex items-center gap-3"
                style={{ background: palette.bg }}
              >
                {item.icon && (
                  <span className="text-2xl leading-none">{item.icon}</span>
                )}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-display font-bold text-base leading-tight"
                    style={{ color: palette.text }}
                  >
                    {item.label}
                  </p>
                  {item.badge && (
                    <span
                      className="inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        background: "rgba(0,0,0,0.2)",
                        color: palette.text,
                        border: `1px solid ${palette.border}`,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Points list */}
              <div className="flex-1 px-5 py-4 bg-surface-raised space-y-2.5">
                {item.points.map((point, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + j * 0.05 }}
                    className="flex items-start gap-2.5"
                  >
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: palette.bg, border: `1px solid ${palette.border}` }}
                    >
                      <Check className="w-2.5 h-2.5" style={{ color: palette.text }} />
                    </div>
                    <span className="text-xs text-[var(--color-text-muted)] leading-snug">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
