// components/ui/Section.tsx
// ─────────────────────────────────────────────────────────
// SECTION COMPONENT
// Consistent section headings and wrappers
// ─────────────────────────────────────────────────────────

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// ── Section Wrapper ──────────────────────────────────────
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  spacing?: "sm" | "md" | "lg" | "xl";
}

const spacingMap = {
  sm: "py-8",
  md: "py-12",
  lg: "py-16 md:py-20",
  xl: "py-20 md:py-28",
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, as: Tag = "section", spacing = "lg", ...props }, ref) => (
    <Tag
      ref={ref as any}
      className={cn(spacingMap[spacing], className)}
      {...props}
    />
  )
);
Section.displayName = "Section";

// ── Section Header ───────────────────────────────────────
export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  const alignMap = {
    left:   "items-start text-left",
    center: "items-center text-center",
    right:  "items-end text-right",
  };

  return (
    <div className={cn("flex flex-col gap-3 mb-10", alignMap[align], className)}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance">{title}</h2>
      {description && (
        <p className="text-[var(--color-text-muted)] text-lg max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

// ── Stats Row ────────────────────────────────────────────
export function StatItem({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span className="font-display font-bold text-3xl gradient-text">
        {value}
      </span>
      <span className="text-sm text-[var(--color-text-muted)]">{label}</span>
    </div>
  );
}
