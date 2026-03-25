// components/ui/Input.tsx
// ─────────────────────────────────────────────────────────
// INPUT COMPONENT
// Variants: default, ghost, search
// Supports: left/right adornments, error state, labels
// ─────────────────────────────────────────────────────────

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// ── Base Input ───────────────────────────────────────────
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  variant?: "default" | "ghost" | "search";
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      hint,
      leftAdornment,
      rightAdornment,
      variant = "default",
      fullWidth = true,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? `input-${Math.random().toString(36).slice(2, 7)}`;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-text)]"
          >
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left adornment */}
          {leftAdornment && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] [&>svg]:h-4 [&>svg]:w-4">
              {leftAdornment}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              // Base
              "w-full rounded-xl font-sans text-sm",
              "text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-accent/50",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              // Variant
              variant === "default" && [
                "h-10 px-3",
                "bg-surface-raised border border-surface-border",
                "hover:border-surface-muted",
                "focus:border-accent focus:ring-2",
              ],
              variant === "ghost" && [
                "h-10 px-3",
                "bg-transparent border-none",
                "focus:ring-0",
              ],
              variant === "search" && [
                "h-10 pl-9 pr-3",
                "bg-surface-raised border border-surface-border",
                "hover:border-surface-muted",
                "focus:border-accent",
              ],
              // Adornments
              leftAdornment && variant !== "search" && "pl-9",
              rightAdornment && "pr-9",
              // Error state
              error && "border-red-400/50 focus:ring-red-400/30",
              className
            )}
            {...props}
          />

          {/* Right adornment */}
          {rightAdornment && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] [&>svg]:h-4 [&>svg]:w-4">
              {rightAdornment}
            </div>
          )}
        </div>

        {/* Error or hint text */}
        {error && (
          <p className="text-xs text-red-400 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ── Textarea ─────────────────────────────────────────────
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, fullWidth = true, id, ...props }, ref) => {
    const textareaId = id ?? `textarea-${Math.random().toString(36).slice(2, 7)}`;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-[var(--color-text)]"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full rounded-xl font-sans text-sm px-3 py-2.5 min-h-[100px]",
            "text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]",
            "bg-surface-raised border border-surface-border",
            "hover:border-surface-muted",
            "focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30",
            "transition-all duration-200 resize-y",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-400/50 focus:ring-red-400/30",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">⚠ {error}</p>}
        {hint && !error && (
          <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
