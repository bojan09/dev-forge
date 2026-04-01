"use client";

// components/code/TabbedCodeBlock.tsx
// ─────────────────────────────────────────────────────────
// TABBED CODE BLOCK
// Shows multiple files in a tab interface — perfect for:
//  - Component + its CSS
//  - Client + Server code side by side
//  - Before / After examples
//  - Full mini-project file sets
// ─────────────────────────────────────────────────────────

import { useState }    from "react";
import { motion }      from "framer-motion";
import { cn }          from "@/lib/utils";
import { CodeBlock }   from "./CodeBlock";
import { LANGUAGE_META, normaliseLang } from "./theme";

export interface CodeTab {
  id: string;
  filename: string;
  language: string;
  code: string;
  highlightLines?: number[];
  notes?: string;
}

export interface TabbedCodeBlockProps {
  tabs: CodeTab[];
  title?: string;
  description?: string;
  defaultTab?: string;
  className?: string;
}

export function TabbedCodeBlock({
  tabs,
  title,
  description,
  defaultTab,
  className,
}: TabbedCodeBlockProps) {
  const [activeId, setActiveId] = useState<string>(defaultTab ?? tabs[0]?.id ?? "");

  const activeTab = tabs.find((t) => t.id === activeId) ?? tabs[0];

  if (!activeTab) return null;

  return (
    <div className={cn("rounded-xl overflow-hidden border border-surface-border", className)}>

      {/* Optional header above tabs */}
      {(title || description) && (
        <div className="px-4 py-3 bg-surface-raised border-b border-surface-border">
          {title && (
            <p className="text-sm font-semibold text-[var(--color-text)]">{title}</p>
          )}
          {description && (
            <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{description}</p>
          )}
        </div>
      )}

      {/* Tab bar */}
      <div className="flex items-center gap-0 bg-surface-raised border-b border-surface-border overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const lang  = normaliseLang(tab.language);
          const meta  = LANGUAGE_META[lang] ?? { label: lang.toUpperCase(), color: "#8B949E" };
          const isActive = tab.id === activeId;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              className={cn(
                "relative flex items-center gap-1.5 px-4 py-2.5 text-xs font-mono whitespace-nowrap",
                "border-r border-surface-border transition-all duration-150",
                isActive
                  ? "text-[var(--color-text)] bg-surface"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-surface/50"
              )}
            >
              {/* Language colour dot */}
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: meta.color }}
              />
              {tab.filename}

              {/* Active tab underline indicator */}
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Code content — no outer border since wrapper provides it */}
      <div className="bg-surface">
        <div className="p-4 overflow-x-auto">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {/* Re-use CodeBlock but strip its outer border/header since we have our own */}
            <CodeBlock
              code={activeTab.code}
              language={activeTab.language}
              filename={activeTab.filename}
              highlightLines={activeTab.highlightLines}
              notes={activeTab.notes}
              showLineNumbers
              className="border-0 rounded-none"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
