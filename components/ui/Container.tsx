// components/ui/Container.tsx
// Fixed: explicit forwardRef type, no as any

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
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
  defaultVariants: { size: "xl" },
});

// Enumerate all valid tag types — avoids the as any cast
type ContainerTag = "div" | "section" | "main" | "article" | "header" | "footer";

export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  as?: ContainerTag;
  className?: string;
}

export const Container = forwardRef<HTMLElement, ContainerProps>(
  ({ className, size, as: Tag = "div", ...props }, ref) => (
    // Using ref directly — HTMLElement is the common base for all valid tags
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(containerVariants({ size }), className)}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    />
  )
);
Container.displayName = "Container";
