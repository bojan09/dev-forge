// components/code/theme.ts
// ─────────────────────────────────────────────────────────
// DEVFORGE SYNTAX THEME
// GitHub Dark-inspired, tuned to our design tokens
// Used by all CodeBlock variants via react-syntax-highlighter
// ─────────────────────────────────────────────────────────

import type { CSSProperties } from "react";

export const devforgeTheme: Record<string, CSSProperties> = {
  // ── Base ───────────────────────────────────────────────
  'code[class*="language-"]': {
    color:      "#e6edf3",
    fontFamily: "var(--font-jetbrains), 'JetBrains Mono', Consolas, monospace",
    fontSize:   "13px",
    lineHeight: "1.75",
    direction:  "ltr",
    textAlign:  "left",
    whiteSpace: "pre",
    wordBreak:  "normal",
    tabSize:    2,
    background: "transparent",
  },
  'pre[class*="language-"]': {
    color:      "#e6edf3",
    fontFamily: "var(--font-jetbrains), 'JetBrains Mono', Consolas, monospace",
    fontSize:   "13px",
    lineHeight: "1.75",
    background: "transparent",
    padding:    "0",
    margin:     "0",
    overflow:   "auto",
  },

  // ── Comments & metadata ────────────────────────────────
  comment:     { color: "#6e7681", fontStyle: "italic" },
  prolog:      { color: "#6e7681" },
  doctype:     { color: "#6e7681" },
  cdata:       { color: "#6e7681" },

  // ── Structure ──────────────────────────────────────────
  punctuation: { color: "#8b949e" },
  namespace:   { opacity: "0.7" },

  // ── Keywords ───────────────────────────────────────────
  keyword:     { color: "#ff7b72" },               // red — import, const, return
  tag:         { color: "#7ee787" },               // green — HTML/JSX tags
  "attr-name": { color: "#79c0ff" },               // blue — attributes
  operator:    { color: "#8b949e" },               // grey — =, +, ?
  boolean:     { color: "#79c0ff" },               // blue — true, false
  deleted:     { color: "#ffa198", background: "rgba(255,85,85,0.1)" },
  inserted:    { color: "#7ee787", background: "rgba(126,231,135,0.1)" },

  // ── Identifiers & Types ────────────────────────────────
  property:       { color: "#79c0ff" },            // blue — obj props
  "class-name":   { color: "#ffa657" },            // orange — class names
  constant:       { color: "#79c0ff" },            // blue — ALL_CAPS
  symbol:         { color: "#79c0ff" },
  variable:       { color: "#ffa657" },            // orange — variables
  function:       { color: "#d2a8ff" },            // purple — function names
  builtin:        { color: "#ffa657" },            // orange — parseInt, JSON
  "attr-value":   { color: "#a5d6ff" },            // light blue — attr values

  // ── Values ─────────────────────────────────────────────
  number:      { color: "#79c0ff" },               // blue — numbers
  string:      { color: "#a5d6ff" },               // light blue — strings
  char:        { color: "#a5d6ff" },
  url:         { color: "#a5d6ff", textDecoration: "underline" },
  entity:      { color: "#a5d6ff" },
  regex:       { color: "#7ee787" },               // green — /regex/

  // ── Decorators & special ───────────────────────────────
  atrule:      { color: "#d2a8ff" },               // purple — @decorator
  selector:    { color: "#7ee787" },               // green — CSS selectors
  important:   { color: "#ff7b72", fontWeight: "bold" },
  bold:        { fontWeight: "bold" },
  italic:      { fontStyle: "italic" },

  // ── JSX specific ───────────────────────────────────────
  "maybe-class-name":    { color: "#ffa657" },
  "template-punctuation":{ color: "#a5d6ff" },
  "interpolation":       { color: "#e6edf3" },
  "interpolation-punctuation": { color: "#ff7b72" },

  // ── TypeScript ─────────────────────────────────────────
  "parameter":     { color: "#ffa657" },
  "return-type":   { color: "#7ee787" },
  "generic-function": { color: "#d2a8ff" },
} as const;

// ── Language display names ─────────────────────────────
export const LANGUAGE_META: Record<string, { label: string; color: string }> = {
  javascript: { label: "JavaScript", color: "#F7DF1E" },
  typescript: { label: "TypeScript", color: "#3178C6" },
  tsx:        { label: "TSX",        color: "#61DAFB" },
  jsx:        { label: "JSX",        color: "#61DAFB" },
  python:     { label: "Python",     color: "#3776AB" },
  css:        { label: "CSS",        color: "#264DE4" },
  html:       { label: "HTML",       color: "#E34F26" },
  bash:       { label: "Bash",       color: "#4EAA25" },
  shell:      { label: "Shell",      color: "#4EAA25" },
  json:       { label: "JSON",       color: "#8B949E" },
  sql:        { label: "SQL",        color: "#336791" },
  yaml:       { label: "YAML",       color: "#CB171E" },
  markdown:   { label: "Markdown",   color: "#083FA1" },
  rust:       { label: "Rust",       color: "#CE412B" },
  go:         { label: "Go",         color: "#00ADD8" },
} as const;

// Normalise language aliases → Prism language IDs
export function normaliseLang(lang: string): string {
  const map: Record<string, string> = {
    js:   "javascript",
    ts:   "typescript",
    sh:   "bash",
    zsh:  "bash",
    yml:  "yaml",
    md:   "markdown",
  };
  return map[lang.toLowerCase()] ?? lang.toLowerCase();
}
