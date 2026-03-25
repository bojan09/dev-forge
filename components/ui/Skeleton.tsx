// components/ui/Skeleton.tsx
// ─────────────────────────────────────────────────────────
// SKELETON LOADING COMPONENT
// Shimmer placeholders for async content
// ─────────────────────────────────────────────────────────

import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number;
  rounded?: "sm" | "md" | "lg" | "full";
  height?: string;
}

function SkeletonBase({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "bg-surface-raised rounded-lg",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent",
        "before:bg-[length:200%_100%]",
        "before:animate-shimmer",
        className
      )}
      {...props}
    />
  );
}

export function Skeleton({ className, lines, height, rounded = "md", ...props }: SkeletonProps) {
  const roundedMap = {
    sm:   "rounded",
    md:   "rounded-lg",
    lg:   "rounded-xl",
    full: "rounded-full",
  };

  if (lines && lines > 1) {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBase
            key={i}
            style={{ width: i === lines - 1 ? "65%" : "100%" }}
            className={cn("h-4", roundedMap[rounded])}
          />
        ))}
      </div>
    );
  }

  return (
    <SkeletonBase
      className={cn(height ?? "h-4", roundedMap[rounded], className)}
      {...props}
    />
  );
}

// ── Compound skeletons for common UI patterns ─────────────

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton lines={3} />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  );
}

// Lesson row skeleton
export function LessonSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3 px-4 rounded-xl border border-surface-border">
      <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-6 w-12 rounded-full shrink-0" />
    </div>
  );
}
