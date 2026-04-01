"use client";

// components/infographics/FlowDiagram.tsx
// ─────────────────────────────────────────────────────────
// FLOW DIAGRAM COMPONENT
// Renders a chain of connected nodes with animated arrows
// Supports: horizontal + vertical layout, click-to-expand,
//           edge labels, dashed connectors, color coding
// ─────────────────────────────────────────────────────────

import { useState }       from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { cn }             from "@/lib/utils";
import {
  INFOGRAPHIC_COLORS,
  NODE_COLOR_SEQUENCE,
  type FlowDiagramData,
  type InfographicNode,
  type InfographicColorKey,
} from "./types";

interface FlowDiagramProps {
  data: FlowDiagramData;
  className?: string;
}

// ── Arrow SVG component ──────────────────────────────────
function Arrow({
  direction = "right",
  label,
  dashed = false,
  color = "#30363d",
}: {
  direction?: "right" | "down";
  label?: string;
  dashed?: boolean;
  color?: string;
}) {
  if (direction === "down") {
    return (
      <div className="flex flex-col items-center gap-0 shrink-0">
        {label && (
          <span className="text-[10px] text-[var(--color-text-muted)] font-medium mb-0.5">
            {label}
          </span>
        )}
        <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
          <line
            x1="10" y1="0" x2="10" y2="24"
            stroke={color}
            strokeWidth="1.5"
            strokeDasharray={dashed ? "4 3" : undefined}
          />
          <path
            d="M4 20 L10 28 L16 20"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-0.5 shrink-0">
      {label && (
        <span className="text-[10px] text-[var(--color-text-muted)] font-medium">
          {label}
        </span>
      )}
      <svg width="36" height="20" viewBox="0 0 36 20" fill="none">
        <line
          x1="0" y1="10" x2="28" y2="10"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray={dashed ? "4 3" : undefined}
        />
        <path
          d="M22 4 L30 10 L22 16"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ── Single node ──────────────────────────────────────────
function FlowNode({
  node,
  index,
  isExpanded,
  onToggle,
}: {
  node: InfographicNode;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const colorKey = (NODE_COLOR_SEQUENCE[index % NODE_COLOR_SEQUENCE.length]) as InfographicColorKey;
  const palette  = INFOGRAPHIC_COLORS[colorKey];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.35, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      {/* Node card */}
      <motion.button
        onClick={node.description || node.code ? onToggle : undefined}
        whileHover={(node.description || node.code) ? { scale: 1.05, y: -2 } : {}}
        whileTap={(node.description || node.code) ? { scale: 0.97 } : {}}
        className={cn(
          "relative flex flex-col items-center gap-2 p-4 rounded-2xl",
          "border transition-all duration-300 min-w-[100px]",
          (node.description || node.code) && "cursor-pointer",
          isExpanded ? "shadow-glow-sm" : "hover:shadow-glow-sm",
        )}
        style={{
          background:   isExpanded ? palette.bg : "rgba(22,27,34,0.8)",
          borderColor:  isExpanded ? palette.border : "#30363d",
        }}
      >
        {/* Badge */}
        {node.badge && (
          <span
            className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider whitespace-nowrap"
            style={{ background: palette.bg, color: palette.text, border: `1px solid ${palette.border}` }}
          >
            {node.badge}
          </span>
        )}

        {/* Icon */}
        {node.icon && (
          <span className="text-2xl leading-none">{node.icon}</span>
        )}

        {/* Label */}
        <span
          className="text-sm font-semibold text-center leading-tight"
          style={{ color: isExpanded ? palette.text : "var(--color-text)" }}
        >
          {node.label}
        </span>

        {/* Sublabel */}
        {node.sublabel && (
          <span className="text-[10px] text-[var(--color-text-muted)] text-center leading-tight">
            {node.sublabel}
          </span>
        )}

        {/* Expand indicator */}
        {(node.description || node.code) && (
          <div style={{ color: palette.text }}>
            {isExpanded
              ? <ChevronUp className="w-3 h-3" />
              : <ChevronDown className="w-3 h-3 opacity-50" />
            }
          </div>
        )}
      </motion.button>

      {/* Expanded panel */}
      <AnimatePresence>
        {isExpanded && (node.description || node.code) && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden w-64 z-10"
          >
            <div
              className="mt-2 rounded-xl p-4 border text-left"
              style={{ background: palette.bg, borderColor: palette.border }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-sm font-semibold" style={{ color: palette.text }}>
                  {node.label}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); onToggle(); }}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              {node.description && (
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                  {node.description}
                </p>
              )}
              {node.code && (
                <pre
                  className="mt-2 p-2 rounded-lg text-[11px] font-mono overflow-x-auto"
                  style={{ background: "rgba(0,0,0,0.3)", color: palette.text }}
                >
                  {node.code}
                </pre>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main FlowDiagram ─────────────────────────────────────
export function FlowDiagram({ data, className }: FlowDiagramProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const isHorizontal = (data.direction ?? "horizontal") === "horizontal";

  // Build ordered node sequence from edges
  // For simple chains: nodes appear in the order they're defined
  const orderedNodes = data.nodes;

  // Find edge for a given node (edge coming OUT of it)
  const getOutEdge = (nodeId: string) =>
    data.edges.find((e) => e.from === nodeId);

  return (
    <div className={cn("w-full", className)}>
      {/* Title */}
      {data.title && (
        <div className="mb-5">
          <h4 className="font-display font-semibold text-base text-[var(--color-text)]">
            {data.title}
          </h4>
          {data.description && (
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{data.description}</p>
          )}
        </div>
      )}

      {/* Diagram */}
      <div
        className={cn(
          "flex gap-2 items-start",
          isHorizontal
            ? "flex-row flex-wrap justify-center"
            : "flex-col items-center"
        )}
      >
        {orderedNodes.map((node, i) => {
          const outEdge = getOutEdge(node.id);
          const isLast  = i === orderedNodes.length - 1;

          return (
            <div
              key={node.id}
              className={cn(
                "flex items-center gap-2",
                !isHorizontal && "flex-col"
              )}
            >
              <FlowNode
                node={node}
                index={i}
                isExpanded={expandedId === node.id}
                onToggle={() => toggle(node.id)}
              />

              {/* Connector arrow */}
              {!isLast && (
                <Arrow
                  direction={isHorizontal ? "right" : "down"}
                  label={outEdge?.label}
                  dashed={outEdge?.dashed}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Click hint */}
      {data.nodes.some((n) => n.description || n.code) && (
        <p className="mt-4 text-center text-[10px] text-[var(--color-text-muted)]">
          Click any node to expand details
        </p>
      )}
    </div>
  );
}
