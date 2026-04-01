"use client";

// components/infographics/InfographicWrapper.tsx
// ─────────────────────────────────────────────────────────
// WRAPPER CARD
// Consistent glass-card container for all infographic types
// Adds: header with title + description, optional tabs for
// switching between multiple related diagrams
// ─────────────────────────────────────────────────────────

import { useState }  from "react";
import { motion }    from "framer-motion";
import { BarChart2 } from "lucide-react";
import { cn }        from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface InfographicWrapperProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  tabs?: Tab[];
  className?: string;
  badge?: string;
}

export function InfographicWrapper({
  title,
  description,
  children,
  tabs,
  className,
  badge,
}: InfographicWrapperProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs?.[0]?.id ?? "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn("glass-card overflow-hidden", className)}
    >
      {/* Header */}
      {(title || description) && (
        <div className="px-6 pt-6 pb-4 border-b border-surface-border">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <BarChart2 className="w-4 h-4 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {title && (
                  <h3 className="font-display font-semibold text-base text-[var(--color-text)]">
                    {title}
                  </h3>
                )}
                {badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 uppercase tracking-wider">
                    {badge}
                  </span>
                )}
              </div>
              {description && (
                <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Tabs */}
          {tabs && tabs.length > 1 && (
            <div className="flex items-center gap-1.5 mt-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                    activeTab === tab.id
                      ? "bg-accent text-white shadow-glow-sm"
                      : "bg-surface-raised border border-surface-border text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {tabs && tabs.length > 0
          ? tabs.find((t) => t.id === activeTab)?.content
          : children
        }
      </div>
    </motion.div>
  );
}
