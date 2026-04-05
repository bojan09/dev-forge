"use client";

// components/code/DiffBlock.tsx
// ─────────────────────────────────────────────────────────
// DIFF CODE BLOCK
// Shows "before" vs "after" code with highlighted changes
// Two modes:
//  - "split"  — side by side (desktop)
//  - "unified"— inline +/- markers (mobile + default)
// ─────────────────────────────────────────────────────────

import { useState }   from "react";
import { motion }     from "framer-motion";
import { cn }         from "@/lib/utils";
import { CodeBlock }  from "./CodeBlock";

export interface DiffBlockProps {
  before: { code: string; label?: string; language?: string };
  after:  { code: string; label?: string; language?: string };
  title?: string;
  className?: string;
}

type DiffMode = "split" | "unified";

export function DiffBlock({ before, after, title, className }: DiffBlockProps) {
  const [mode, setMode] = useState<DiffMode>("unified");

  const lang = before.language ?? after.language ?? "javascript";

  // Build unified diff lines for "unified" mode
  const beforeLines = before.code.trim().split("\n");
  const afterLines  = after.code.trim().split("\n");

  return (
    <div className={cn("rounded-xl overflow-hidden border border-surface-border", className)}>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-raised border-b border-surface-border">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-400/10 border border-red-400/20">
            <span className="text-red-400 text-xs font-bold font-mono">−</span>
            <span className="text-xs text-red-400 font-mono">Before</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-400/10 border border-emerald-400/20">
            <span className="text-emerald-400 text-xs font-bold font-mono">+</span>
            <span className="text-xs text-emerald-400 font-mono">After</span>
          </div>
          {title && <span className="text-xs text-[var(--color-text-muted)] ml-1">{title}</span>}
        </div>

        {/* Mode toggle */}
        <div className="flex items-center gap-0.5 bg-surface-card border border-surface-border rounded-lg p-0.5">
          {(["split", "unified"] as DiffMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={cn(
                "px-2.5 py-1 rounded-md text-[10px] font-medium transition-all duration-150 capitalize",
                mode === m
                  ? "bg-accent text-white"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-surface">
        {mode === "split" ? (
          // ── Split view ──────────────────────────────
          <div className="grid grid-cols-2 divide-x divide-surface-border">
            <div>
              <div className="px-3 py-1.5 bg-red-400/5 border-b border-red-400/20">
                <span className="text-[10px] font-semibold text-red-400">
                  {before.label ?? "Before"}
                </span>
              </div>
              <div className="p-4 overflow-x-auto">
                <CodeBlock
                  code={before.code}
                  language={lang}
                  showLineNumbers
                  className="border-0 rounded-none"
                />
              </div>
            </div>
            <div>
              <div className="px-3 py-1.5 bg-emerald-400/5 border-b border-emerald-400/20">
                <span className="text-[10px] font-semibold text-emerald-400">
                  {after.label ?? "After"}
                </span>
              </div>
              <div className="p-4 overflow-x-auto">
                <CodeBlock
                  code={after.code}
                  language={lang}
                  showLineNumbers
                  className="border-0 rounded-none"
                />
              </div>
            </div>
          </div>
        ) : (
          // ── Unified view ────────────────────────────
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 overflow-x-auto font-mono text-[13px] leading-7 space-y-0"
          >
            {/* Removed lines */}
            {beforeLines.map((line, i) => {
              const isChanged = line !== afterLines[i];
              return (
                <div
                  key={`b-${i}`}
                  className={cn(
                    "flex items-start gap-3 px-2 -mx-2 rounded",
                    isChanged
                      ? "bg-red-400/10 text-red-400"
                      : "text-[var(--color-text-muted)]"
                  )}
                >
                  <span className="w-4 shrink-0 text-center select-none text-[11px] opacity-60 mt-0.5">
                    {isChanged ? "−" : " "}
                  </span>
                  <span className="text-[var(--color-text-muted)] w-7 shrink-0 select-none text-[11px] text-right">
                    {i + 1}
                  </span>
                  <pre className="flex-1 whitespace-pre overflow-visible">{line || " "}</pre>
                </div>
              );
            })}

            {/* Separator */}
            <div className="h-px bg-surface-border my-2" />

            {/* Added lines */}
            {afterLines.map((line, i) => {
              const isChanged = line !== beforeLines[i];
              return (
                <div
                  key={`a-${i}`}
                  className={cn(
                    "flex items-start gap-3 px-2 -mx-2 rounded",
                    isChanged
                      ? "bg-emerald-400/10 text-emerald-400"
                      : "text-[var(--color-text-muted)]"
                  )}
                >
                  <span className="w-4 shrink-0 text-center select-none text-[11px] opacity-60 mt-0.5">
                    {isChanged ? "+" : " "}
                  </span>
                  <span className="text-[var(--color-text-muted)] w-7 shrink-0 select-none text-[11px] text-right">
                    {i + 1}
                  </span>
                  <pre className="flex-1 whitespace-pre overflow-visible">{line || " "}</pre>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
