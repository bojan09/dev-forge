"use client";

// components/code/CodeBlock.tsx
// ─────────────────────────────────────────────────────────
// CORE CODE BLOCK — Phase 7
// Features:
//  ✓ Syntax highlighting (react-syntax-highlighter / Prism)
//  ✓ Copy-to-clipboard with animated feedback
//  ✓ Line numbers (togglable)
//  ✓ Line highlighting (pass highlightLines={[3,4,5]})
//  ✓ Collapsible long blocks
//  ✓ Language badge with colour dot
//  ✓ Optional filename / title
//  ✓ Optional inline notes section
//  ✓ macOS traffic-light dots header
// ─────────────────────────────────────────────────────────

import { useState, useCallback }    from "react";
import { motion, AnimatePresence }  from "framer-motion";
import { Copy, Check, FileCode, ChevronDown, ChevronUp } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { cn }                        from "@/lib/utils";
import { copyToClipboard }           from "@/lib/utils";
import { devforgeTheme, LANGUAGE_META, normaliseLang } from "./theme";

export interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  filename?: string;
  notes?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  maxCollapsedLines?: number;  // auto-collapse if code exceeds this
  className?: string;
}

export function CodeBlock({
  code,
  language = "javascript",
  title,
  filename,
  notes,
  showLineNumbers = true,
  highlightLines = [],
  maxCollapsedLines = 25,
  className,
}: CodeBlockProps) {
  const [copied,    setCopied]    = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const lang       = normaliseLang(language);
  const meta       = LANGUAGE_META[lang] ?? { label: lang.toUpperCase(), color: "#8B949E" };
  const trimmed    = code.trim();
  const lineCount  = trimmed.split("\n").length;
  const isLong     = lineCount > maxCollapsedLines;

  // Initialise collapsed state for long blocks
  // (useState initialiser only runs once)
  useState(() => {
    if (isLong) setCollapsed(true);
  });

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(trimmed);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [trimmed]);

  // Custom line wrapper for highlighted lines
  const lineProps = (lineNum: number): React.HTMLAttributes<HTMLElement> => {
    if (highlightLines.includes(lineNum)) {
      return {
        style: {
          display:         "block",
          backgroundColor: "rgba(123, 97, 255, 0.12)",
          borderLeft:      "2px solid #7B61FF",
          paddingLeft:     "12px",
          marginLeft:      "-14px",
          marginRight:     "-16px",
        },
      };
    }
    return { style: { display: "block" } };
  };

  const displayLabel = filename ?? title;

  return (
    <div className={cn("rounded-xl overflow-hidden border border-surface-border", className)}>

      {/* ── Header bar ─────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-raised border-b border-surface-border">
        <div className="flex items-center gap-3">
          {/* macOS traffic lights */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>

          {/* Filename / title */}
          <div className="flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              {displayLabel ?? meta.label}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language dot + label */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface-card border border-surface-border">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.color }} />
            <span className="text-[10px] font-mono font-medium text-[var(--color-text-muted)]">
              {meta.label}
            </span>
          </div>

          {/* Line count */}
          <span className="text-[10px] text-[var(--color-text-muted)] hidden md:block tabular-nums">
            {lineCount} lines
          </span>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-surface-card transition-all duration-200"
            aria-label="Copy code to clipboard"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-semibold">Copied!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
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

      {/* ── Code area ──────────────────────────────── */}
      <div
        className="bg-surface overflow-hidden transition-all duration-300"
        style={collapsed ? { maxHeight: `${maxCollapsedLines * 24}px` } : {}}
      >
        <div className="p-4 overflow-x-auto">
          <SyntaxHighlighter
            language={lang === "tsx" ? "typescript" : lang}
            style={devforgeTheme}
            showLineNumbers={showLineNumbers}
            wrapLines={highlightLines.length > 0}
            lineProps={highlightLines.length > 0 ? lineProps : undefined}
            lineNumberStyle={{
              minWidth:    "2.5em",
              paddingRight:"1em",
              color:       "#30363d",
              userSelect:  "none",
              textAlign:   "right",
              fontSize:    "11px",
            }}
            customStyle={{
              background: "transparent",
              margin:     0,
              padding:    0,
              fontSize:   "13px",
              lineHeight: "1.75",
            }}
            wrapLongLines={false}
          >
            {trimmed}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* ── Collapse toggle (long blocks) ──────────── */}
      {isLong && (
        <button
          onClick={() => setCollapsed((p) => !p)}
          className="w-full flex items-center justify-center gap-2 py-2 bg-surface-raised border-t border-surface-border text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-surface transition-all duration-200"
        >
          {collapsed ? (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              Show all {lineCount} lines
            </>
          ) : (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              Collapse
            </>
          )}
        </button>
      )}

      {/* ── Notes ──────────────────────────────────── */}
      {notes && (
        <div className="px-4 py-3 bg-yellow-400/5 border-t border-yellow-400/20 flex items-start gap-2">
          <span className="text-yellow-400 text-xs font-bold shrink-0 mt-0.5">💡</span>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{notes}</p>
        </div>
      )}
    </div>
  );
}
