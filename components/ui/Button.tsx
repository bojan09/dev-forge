// components/ui/Button.tsx
// ─────────────────────────────────────────────────────────
// BUTTON COMPONENT
// Variants: primary, secondary, ghost, outline, danger, glow
// Sizes: sm, md, lg, xl
// States: loading, disabled, icon-only
// ─────────────────────────────────────────────────────────

"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Variant definitions using CVA ────────────────────────
const buttonVariants = cva(
  // Base styles — applied to every button
  [
    "inline-flex items-center justify-center gap-2",
    "font-sans font-medium leading-none",
    "rounded-xl transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:pointer-events-none disabled:opacity-50",
    "select-none",
  ],
  {
    variants: {
      variant: {
        // Solid accent fill — primary CTA
        primary: [
          "bg-accent text-white",
          "hover:bg-accent-hover hover:shadow-glow-sm",
          "active:scale-[0.98]",
        ],
        // Subtle background — secondary action
        secondary: [
          "bg-surface-raised text-[var(--color-text)]",
          "border border-surface-border",
          "hover:bg-surface-border hover:border-surface-muted",
          "active:scale-[0.98]",
        ],
        // Transparent — tertiary / navigation
        ghost: [
          "text-[var(--color-text-muted)]",
          "hover:text-[var(--color-text)] hover:bg-surface-raised",
          "active:scale-[0.98]",
        ],
        // Border only
        outline: [
          "border border-accent text-accent",
          "hover:bg-accent hover:text-white hover:shadow-glow-sm",
          "active:scale-[0.98]",
        ],
        // Cyan accent variant
        cyan: [
          "bg-glow text-brand font-semibold",
          "hover:bg-glow/90 hover:shadow-glow-cyan",
          "active:scale-[0.98]",
        ],
        // Destructive action
        danger: [
          "bg-red-500/10 text-red-400 border border-red-500/20",
          "hover:bg-red-500/20 hover:border-red-500/40",
          "active:scale-[0.98]",
        ],
        // Glowing CTA — hero sections
        glow: [
          "relative overflow-hidden",
          "bg-gradient-to-r from-accent to-glow text-white font-semibold",
          "shadow-glow-md hover:shadow-glow-lg",
          "hover:scale-[1.02] active:scale-[0.98]",
          "before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        ],
        // Link-style
        link: [
          "text-accent underline-offset-4",
          "hover:underline",
          "!h-auto !px-0 !py-0",
        ],
      },
      size: {
        xs: "h-7 px-2.5 text-xs rounded-lg gap-1",
        sm: "h-8 px-3 text-sm rounded-lg",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
        xl: "h-12 px-6 text-base",
        icon: "h-9 w-9 rounded-xl",
        "icon-sm": "h-7 w-7 rounded-lg",
        "icon-lg": "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// ── Component Types ──────────────────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

// ── Button Component ─────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {/* Loading spinner replaces left icon */}
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon && (
            <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{leftIcon}</span>
          )
        )}

        {/* Button label */}
        {children && (
          <span className={loading ? "opacity-70" : ""}>{children}</span>
        )}

        {/* Right icon */}
        {rightIcon && !loading && (
          <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// ── Convenience re-export of variants for external use ───
export { buttonVariants };
