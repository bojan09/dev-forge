// components/ui/Card.tsx
// ─────────────────────────────────────────────────────────
// CARD COMPONENT
// Variants: default, glass, elevated, outlined, gradient
// Composable sub-components: CardHeader, CardBody, CardFooter
// ─────────────────────────────────────────────────────────

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ── Variant definitions ──────────────────────────────────
const cardVariants = cva(
  // Base: rounded, overflow hidden for clean internal structure
  "rounded-2xl overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        // Default — subtle surface elevation
        default: [
          "bg-surface-card border border-surface-border",
          "shadow-card",
        ],
        // Glassmorphism — hero/featured content
        glass: [
          "bg-surface-card/80 backdrop-blur-md",
          "border border-surface-border/50",
          "shadow-glass",
        ],
        // Elevated — hover-interactive cards
        elevated: [
          "bg-surface-card border border-surface-border",
          "shadow-card hover:shadow-card-hover hover:-translate-y-0.5",
          "cursor-pointer",
        ],
        // Thin border only — minimal
        outlined: [
          "bg-transparent border border-surface-border",
          "hover:border-accent/30",
        ],
        // Gradient border — special/featured
        gradient: [
          "bg-surface-card",
          "border border-transparent",
          "relative before:absolute before:inset-0 before:rounded-2xl before:p-px",
          "before:bg-gradient-to-br before:from-accent/40 before:to-glow/20 before:z-0",
          "after:absolute after:inset-px after:rounded-[calc(1rem-1px)] after:bg-surface-card after:z-0",
        ],
        // Solid accent background — highlighted/active
        accent: [
          "bg-accent/10 border border-accent/20",
          "hover:bg-accent/15",
        ],
      },
      padding: {
        none: "",
        sm:   "p-4",
        md:   "p-6",
        lg:   "p-8",
        xl:   "p-10",
      },
      hover: {
        none:  "",
        lift:  "hover:-translate-y-1 hover:shadow-card-hover cursor-pointer",
        glow:  "hover:shadow-glow-sm cursor-pointer",
        scale: "hover:scale-[1.01] cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      hover:   "none",
    },
  }
);

// ── Root Card ────────────────────────────────────────────
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: "div" | "article" | "section" | "li";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, as: Tag = "div", ...props }, ref) => (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(cardVariants({ variant, padding, hover }), className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

// ── CardHeader — top section with optional border ────────
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, bordered = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-1.5",
        bordered && "border-b border-surface-border pb-4 mb-4",
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

// ── CardTitle ────────────────────────────────────────────
export const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-display font-semibold text-lg leading-tight text-[var(--color-text)]",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// ── CardDescription ──────────────────────────────────────
export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--color-text-muted)] leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// ── CardBody — main content area ─────────────────────────
export const CardBody = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1", className)} {...props} />
));
CardBody.displayName = "CardBody";

// ── CardFooter — bottom action area ─────────────────────
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, bordered = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-3",
        bordered && "border-t border-surface-border pt-4 mt-4",
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

// ── CardBadge — top-right floating label ─────────────────
export const CardBadge = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & { color?: "accent" | "glow" | "success" | "warning" }
>(({ className, color = "accent", ...props }, ref) => {
  const colorMap = {
    accent:  "bg-accent/15 text-accent border-accent/20",
    glow:    "bg-glow/15 text-glow border-glow/20",
    success: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    warning: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full",
        "text-[10px] font-semibold uppercase tracking-wider border",
        colorMap[color],
        className
      )}
      {...props}
    />
  );
});
CardBadge.displayName = "CardBadge";
