"use client";

// components/learn/CodeBlock.tsx
// ─────────────────────────────────────────────────────────
// Syntax-highlighted code block with copy button
// Uses react-syntax-highlighter for highlighting
// Full styling system built in Phase 7
// ─────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, FileCode } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { copyToClipboard } from "@/lib/utils";
import { cn } from "@/lib/utils";

// Custom dark theme matching DevForge design system
const devforgeTheme: Record<string, React.CSSProperties> = {
  'code[class*="language-"]': {
    color:           "#e6edf3",
    fontFamily:      "var(--font-jetbrains), 'JetBrains Mono', Consolas, monospace",
    fontSize:        "13px",
    lineHeight:      "1.7",
    direction:       "ltr",
    textAlign:       "left",
    whiteSpace:      "pre",
    wordSpacing:     "normal",
    wordBreak:       "normal",
    tabSize:         2,
    hyphens:         "none",
    background:      "transparent",
  },
  'pre[class*="language-"]': {
    color:           "#e6edf3",
    fontFamily:      "var(--font-jetbrains), 'JetBrains Mono', Consolas, monospace",
    fontSize:        "13px",
    lineHeight:      "1.7",
    direction:       "ltr",
    textAlign:       "left",
    whiteSpace:      "pre",
    wordSpacing:     "normal",
    wordBreak:       "normal",
    tabSize:         2,
    hyphens:         "none",
    background:      "transparent",
    padding:         "0",
    margin:          "0",
    overflow:        "auto",
  },
  comment:  { color: "#8b949e", fontStyle: "italic" },
  prolog:   { color: "#8b949e" },
  doctype:  { color: "#8b949e" },
  cdata:    { color: "#8b949e" },
  punctuation: { color: "#8b949e" },
  property: { color: "#79c0ff" },
  keyword:  { color: "#ff7b72" },
  tag:      { color: "#7ee787" },
  "class-name": { color: "#ffa657" },
  boolean:  { color: "#79c0ff" },
  constant: { color: "#79c0ff" },
  symbol:   { color: "#79c0ff" },
  deleted:  { color: "#ffa198" },
  number:   { color: "#79c0ff" },
  selector: { color: "#7ee787" },
  "attr-name":  { color: "#7ee787" },
  string:       { color: "#a5d6ff" },
  char:         { color: "#a5d6ff" },
  builtin:      { color: "#ffa657" },
  inserted:     { color: "#7ee787" },
  variable:     { color: "#ffa657" },
  operator:     { color: "#8b949e" },
  entity:       { color: "#a5d6ff", cursor: "help" },
  url:          { color: "#a5d6ff" },
  function:     { color: "#d2a8ff" },
  "attr-value": { color: "#a5d6ff" },
  atrule:       { color: "#d2a8ff" },
  regex:        { color: "#7ee787" },
  important:    { color: "#ff7b72", fontWeight: "bold" },
  bold:         { fontWeight: "bold" },
  italic:       { fontStyle: "italic" },
};

const LANGUAGE_LABELS: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  tsx:        "TSX",
  jsx:        "JSX",
  python:     "Python",
  css:        "CSS",
  html:       "HTML",
  bash:       "Bash",
  json:       "JSON",
  sql:        "SQL",
} as const;

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  notes?: string;
  className?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "javascript",
  title,
  notes,
  className,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  const langLabel = LANGUAGE_LABELS[language] ?? language.toUpperCase();

  return (
    <div className={cn("rounded-xl overflow-hidden border border-surface-border", className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-raised border-b border-surface-border">
        <div className="flex items-center gap-2.5">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
          </div>
          {/* Title or language */}
          <div className="flex items-center gap-2">
            <FileCode className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              {title ?? langLabel}
            </span>
          </div>
        </div>

        {/* Language badge + copy */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-surface-card border border-surface-border text-accent font-mono font-medium">
            {langLabel}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-surface-card transition-all duration-200"
            aria-label="Copy code"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-medium">Copied!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium hidden sm:inline">Copy</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Code area */}
      <div className="bg-surface overflow-x-auto">
        <div className="p-4">
          <SyntaxHighlighter
            language={language === "tsx" ? "typescript" : language}
            style={devforgeTheme}
            showLineNumbers={showLineNumbers}
            lineNumberStyle={{
              minWidth: "2.5em",
              paddingRight: "1em",
              color: "#30363d",
              userSelect: "none",
              textAlign: "right",
            }}
            customStyle={{
              background:  "transparent",
              margin:      0,
              padding:     0,
              fontSize:    "13px",
              lineHeight:  "1.7",
            }}
            wrapLongLines={false}
          >
            {code.trim()}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* Notes */}
      {notes && (
        <div className="px-4 py-3 bg-yellow-400/5 border-t border-yellow-400/20 flex items-start gap-2">
          <span className="text-yellow-400 text-xs shrink-0 font-semibold mt-0.5">Note:</span>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{notes}</p>
        </div>
      )}
    </div>
  );
}
