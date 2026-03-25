// components/ui/Divider.tsx
// ─────────────────────────────────────────────────────────
// DIVIDER / SEPARATOR COMPONENT
// Horizontal or vertical dividers with optional labels
// ─────────────────────────────────────────────────────────

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: string;
  gradient?: boolean;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = "horizontal", label, gradient = false, ...props }, ref) => {
    if (orientation === "vertical") {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn("w-px self-stretch bg-surface-border", className)}
          {...props}
        />
      );
    }

    // Horizontal with optional label
    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn("flex items-center gap-3", className)}
          {...props}
        >
          <div className="flex-1 h-px bg-surface-border" />
          <span className="text-xs text-[var(--color-text-muted)] font-medium shrink-0">
            {label}
          </span>
          <div className="flex-1 h-px bg-surface-border" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        className={cn(
          "h-px w-full",
          gradient
            ? "bg-gradient-to-r from-transparent via-surface-border to-transparent"
            : "bg-surface-border",
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = "Divider";
