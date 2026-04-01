"use client";

// components/infographics/ArchDiagram.tsx
// ─────────────────────────────────────────────────────────
// ARCHITECTURE DIAGRAM
// Stacked horizontal layers — ideal for showing system
// architecture (client → server → DB), React component tree,
// network stack (OSI model), etc.
// Each layer is individually animated and clickable.
// ─────────────────────────────────────────────────────────

import { useState }               from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn }                     from "@/lib/utils";
import {
  INFOGRAPHIC_COLORS,
  NODE_COLOR_SEQUENCE,
  type ArchDiagramData,
  type InfographicColorKey,
} from "./types";

interface ArchDiagramProps {
  data: ArchDiagramData;
  className?: string;
}

export function ArchDiagram({ data, className }: ArchDiagramProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className={cn("w-full space-y-2", className)}>
      {/* Title */}
      {data.title && (
        <h4 className="font-display font-semibold text-base text-[var(--color-text)] mb-4">
          {data.title}
        </h4>
      )}

      {/* Layers — stacked top to bottom */}
      {data.layers.map((layer, i) => {
        const colorKey  = NODE_COLOR_SEQUENCE[i % NODE_COLOR_SEQUENCE.length] as InfographicColorKey;
        const palette   = INFOGRAPHIC_COLORS[colorKey];
        const isExpanded = expandedId === layer.id;

        return (
          <motion.div
            key={layer.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.09, duration: 0.35, ease: "easeOut" }}
          >
            {/* Layer header */}
            <motion.button
              onClick={() => toggle(layer.id)}
              whileHover={{ x: 4 }}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-3.5 rounded-xl border transition-all duration-200 text-left cursor-pointer"
              )}
              style={
                isExpanded
                  ? { background: palette.bg, borderColor: palette.border }
                  : { background: "rgba(22,27,34,0.7)", borderColor: "#30363d" }
              }
            >
              {/* Layer color bar */}
              <div
                className="w-1.5 h-10 rounded-full shrink-0"
                style={{ background: palette.text }}
              />

              {/* Icon */}
              {layer.icon && (
                <span className="text-xl shrink-0">{layer.icon}</span>
              )}

              {/* Labels */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold leading-none transition-colors"
                  style={{ color: isExpanded ? palette.text : "var(--color-text)" }}
                >
                  {layer.label}
                </p>
                {layer.sublabel && (
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {layer.sublabel}
                  </p>
                )}
              </div>

              {/* Item pills (collapsed preview) */}
              {!isExpanded && layer.items.length > 0 && (
                <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                  {layer.items.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="text-[10px] px-2 py-0.5 rounded-md border font-mono"
                      style={{ background: palette.bg, borderColor: palette.border, color: palette.text }}
                    >
                      {item}
                    </span>
                  ))}
                  {layer.items.length > 3 && (
                    <span className="text-[10px] text-[var(--color-text-muted)]">
                      +{layer.items.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Expand indicator */}
              <div style={{ color: palette.text }} className="shrink-0">
                {isExpanded
                  ? <ChevronDown className="w-4 h-4" />
                  : <ChevronRight className="w-4 h-4 opacity-60" />
                }
              </div>
            </motion.button>

            {/* Expanded items */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div
                    className="mx-2 mt-1 rounded-xl border p-4"
                    style={{ background: `${palette.bg}80`, borderColor: palette.border }}
                  >
                    <div className="flex flex-wrap gap-2">
                      {layer.items.map((item, j) => (
                        <motion.span
                          key={item}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: j * 0.04 }}
                          className="text-xs px-3 py-1.5 rounded-lg border font-mono font-medium"
                          style={{ background: "rgba(0,0,0,0.2)", borderColor: palette.border, color: palette.text }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Connector between layers */}
            {i < data.layers.length - 1 && (
              <div className="flex justify-center py-0.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <line x1="8" y1="0" x2="8" y2="10" stroke="#30363d" strokeWidth="1.5" />
                  <path d="M3 7 L8 13 L13 7" stroke="#30363d" strokeWidth="1.5" fill="none"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
