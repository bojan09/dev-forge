"use client";

// components/code/InlineCode.tsx
// ─────────────────────────────────────────────────────────
// INLINE CODE + CODE SNIPPET
// InlineCode: <code> tag replacement — styled for lessons
// CodeSnippet: compact single-line with copy button
//             used for terminal commands, import paths, etc.
// ─────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn }              from "@/lib/utils";
import { copyToClipboard } from "@/lib/utils";

// ── InlineCode — styled <code> replacement ───────────────
export function InlineCode({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <code
      className={cn(
        "font-mono text-[0.875em] px-1.5 py-0.5 rounded-md",
        "bg-surface-raised border border-surface-border",
        "text-accent",
        className
      )}
    >
      {children}
    </code>
  );
}

// ── CodeSnippet — compact one-liner with copy ───────────
export interface CodeSnippetProps {
  code: string;
  label?: string;
  language?: string;
  isCommand?: boolean;  // shows $ prefix
  className?: string;
}

export function CodeSnippet({
  code,
  label,
  language = "bash",
  isCommand = false,
  className,
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(code);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);

  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-xl",
      "bg-surface border border-surface-border",
      "group",
      className
    )}>
      {/* Icon */}
      <Terminal className="w-3.5 h-3.5 text-[var(--color-text-muted)] shrink-0" />

      {/* Label */}
      {label && (
        <>
          <span className="text-xs text-[var(--color-text-muted)] shrink-0">{label}</span>
          <div className="w-px h-4 bg-surface-border shrink-0" />
        </>
      )}

      {/* Code */}
      <code className="flex-1 font-mono text-sm text-[var(--color-text)] min-w-0 truncate">
        {isCommand && (
          <span className="text-emerald-400 select-none mr-1.5">$</span>
        )}
        {code}
      </code>

      {/* Copy */}
      <button
        onClick={handleCopy}
        className="shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Copy"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span key="check" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <Copy className="w-3.5 h-3.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
