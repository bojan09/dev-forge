// components/ui/Badge.tsx
// ─────────────────────────────────────────────────────────
// BADGE COMPONENT
// Used for: difficulty labels, topic categories, status indicators
// ─────────────────────────────────────────────────────────

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "font-sans font-medium leading-none",
    "border transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        // ── Semantic variants ─────────────────────────
        default:     "bg-surface-raised text-[var(--color-text-muted)] border-surface-border",
        accent:      "bg-accent/10 text-accent border-accent/20",
        glow:        "bg-glow/10 text-glow border-glow/20",
        success:     "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
        warning:     "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
        danger:      "bg-red-400/10 text-red-400 border-red-400/20",
        info:        "bg-blue-400/10 text-blue-400 border-blue-400/20",
        // ── Difficulty variants ───────────────────────
        beginner:    "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
        intermediate:"bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
        advanced:    "bg-orange-400/10 text-orange-400 border-orange-400/20",
        expert:      "bg-red-400/10 text-red-400 border-red-400/20",
        // ── Solid variants ────────────────────────────
        solid:       "bg-accent text-white border-transparent",
        "solid-glow":"bg-glow text-brand border-transparent font-semibold",
      },
      size: {
        xs: "text-[10px] px-1.5 py-0.5 rounded-md gap-1",
        sm: "text-xs px-2 py-0.5 rounded-lg",
        md: "text-xs px-2.5 py-1 rounded-lg",
        lg: "text-sm px-3 py-1 rounded-xl",
      },
      dot: {
        true:  "before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-current before:shrink-0",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "sm",
      dot:     false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, dot }), className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

// ── DifficultyBadge — convenience wrapper ────────────────
export function DifficultyBadge({
  difficulty,
  className,
}: {
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  className?: string;
}) {
  const labels = {
    beginner:     "Beginner",
    intermediate: "Intermediate",
    advanced:     "Advanced",
    expert:       "Expert",
  };

  return (
    <Badge variant={difficulty} dot className={className}>
      {labels[difficulty]}
    </Badge>
  );
}
