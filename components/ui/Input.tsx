"use client";

// components/ui/Input.tsx
// Fixed: replaced Math.random() ID generation with React useId()
// Math.random() on server vs client produces different values = hydration crash

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  variant?: "default" | "ghost" | "search";
  fullWidth?: boolean;
  className?: string;
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
    // useId() is stable across SSR and client — safe for hydration
    const generatedId = useId();
    const inputId     = id ?? generatedId;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}

        <div className="relative">
          {leftAdornment && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] [&>svg]:h-4 [&>svg]:w-4">
              {leftAdornment}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-xl font-sans text-sm",
              "text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-accent/50",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              variant === "default" && [
                "h-10 px-3",
                "bg-surface-raised border border-surface-border",
                "hover:border-surface-muted",
                "focus:border-accent",
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
              leftAdornment && variant !== "search" && "pl-9",
              rightAdornment && "pr-9",
              error && "border-red-400/50 focus:ring-red-400/30",
              className
            )}
            {...props}
          />

          {rightAdornment && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] [&>svg]:h-4 [&>svg]:w-4">
              {rightAdornment}
            </div>
          )}
        </div>

        {error && <p className="text-xs text-red-400">⚠ {error}</p>}
        {hint && !error && <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  className?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, fullWidth = true, id, ...props }, ref) => {
    const generatedId = useId();
    const textareaId  = id ?? generatedId;

    return (
      <div className={cn("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-[var(--color-text)]">
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
        {hint && !error && <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
