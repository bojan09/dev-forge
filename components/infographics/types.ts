// components/infographics/types.ts
// ─────────────────────────────────────────────────────────
// SHARED TYPES for the infographic engine
// All infographic components consume these interfaces
// ─────────────────────────────────────────────────────────

// ── Node — a single step/entity in any infographic ──────
export interface InfographicNode {
  id: string;
  label: string;
  sublabel?: string;        // secondary text below label
  description?: string;     // expanded content on click
  icon?: string;            // emoji or text icon
  color?: string;           // hex color for accent
  colorClass?: string;      // tailwind class override
  badge?: string;           // small tag on the node
  code?: string;            // code snippet shown when expanded
  codeLanguage?: string;
}

// ── Edge — a directed connection between nodes ──────────
export interface InfographicEdge {
  from: string;
  to: string;
  label?: string;           // text on the connector arrow
  dashed?: boolean;         // dashed line style
  color?: string;           // custom arrow color
}

// ── Flow diagram data ────────────────────────────────────
export interface FlowDiagramData {
  id: string;
  title?: string;
  description?: string;
  nodes: InfographicNode[];
  edges: InfographicEdge[];
  direction?: "horizontal" | "vertical";
}

// ── Comparison data ──────────────────────────────────────
export interface ComparisonItem {
  id: string;
  label: string;
  icon?: string;
  color?: string;
  points: string[];
  badge?: string;
}

export interface ComparisonData {
  id: string;
  title?: string;
  items: ComparisonItem[];
}

// ── Architecture data ─────────────────────────────────── 
export interface ArchLayer {
  id: string;
  label: string;
  sublabel?: string;
  icon?: string;
  color?: string;
  items: string[];
}

export interface ArchDiagramData {
  id: string;
  title?: string;
  layers: ArchLayer[];
}

// ── Cycle data ───────────────────────────────────────────
export interface CycleStep {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface CycleDiagramData {
  id: string;
  title?: string;
  steps: CycleStep[];
}

// ── Preset color palettes ────────────────────────────────
export const INFOGRAPHIC_COLORS = {
  accent:  { bg: "rgba(123,97,255,0.12)", border: "rgba(123,97,255,0.3)", text: "#7B61FF" },
  glow:    { bg: "rgba(0,194,255,0.12)",  border: "rgba(0,194,255,0.3)",  text: "#00C2FF" },
  emerald: { bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)", text: "#34d399" },
  orange:  { bg: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.3)", text: "#fb923c" },
  pink:    { bg: "rgba(244,114,182,0.12)",border: "rgba(244,114,182,0.3)",text: "#f472b6" },
  yellow:  { bg: "rgba(250,204,21,0.12)", border: "rgba(250,204,21,0.3)", text: "#facc15" },
  red:     { bg: "rgba(248,113,113,0.12)",border: "rgba(248,113,113,0.3)",text: "#f87171" },
  slate:   { bg: "rgba(100,116,139,0.12)",border: "rgba(100,116,139,0.3)",text: "#94a3b8" },
} as const;

export type InfographicColorKey = keyof typeof INFOGRAPHIC_COLORS;

// ── Node color sequence for auto-assignment ───────────────
export const NODE_COLOR_SEQUENCE: InfographicColorKey[] = [
  "accent", "glow", "emerald", "orange", "pink", "yellow",
];
