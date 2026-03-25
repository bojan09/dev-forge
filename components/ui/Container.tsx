// components/ui/Container.tsx
// ─────────────────────────────────────────────────────────
// CONTAINER COMPONENT
// Consistent max-width + padding across all pages
// Sizes: sm, md, lg, xl, full
// ─────────────────────────────────────────────────────────

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva(
  "mx-auto w-full px-4 sm:px-6 lg:px-8",
  {
    variants: {
      size: {
        sm:   "max-w-2xl",
        md:   "max-w-4xl",
        lg:   "max-w-6xl",
        xl:   "max-w-7xl",
        "2xl":"max-w-screen-2xl",
        full: "max-w-none",
      },
    },
    defaultVariants: {
      size: "xl",
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: "div" | "section" | "main" | "article" | "header" | "footer";
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, as: Tag = "div", ...props }, ref) => (
    <Tag
      ref={ref as any}
      className={cn(containerVariants({ size }), className)}
      {...props}
    />
  )
);

Container.displayName = "Container";
