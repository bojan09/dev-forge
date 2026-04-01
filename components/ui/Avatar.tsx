// components/ui/Avatar.tsx
// Fixed: explicit ref types, no implicit any, className?: string explicit on all interfaces

import { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "away" | "busy";
  className?: string;
}

const SIZE_MAP = {
  xs: { container: "h-6 w-6",   text: "text-[10px]", status: "h-1.5 w-1.5 bottom-0 right-0"    },
  sm: { container: "h-8 w-8",   text: "text-xs",      status: "h-2 w-2 bottom-0 right-0"         },
  md: { container: "h-10 w-10", text: "text-sm",      status: "h-2.5 w-2.5 bottom-0 right-0"     },
  lg: { container: "h-12 w-12", text: "text-base",    status: "h-3 w-3 bottom-0.5 right-0.5"     },
  xl: { container: "h-16 w-16", text: "text-xl",      status: "h-3.5 w-3.5 bottom-1 right-1"     },
} as const satisfies Record<NonNullable<AvatarProps["size"]>, { container: string; text: string; status: string }>;

const STATUS_COLOR_MAP = {
  online:  "bg-emerald-400",
  offline: "bg-surface-muted",
  away:    "bg-yellow-400",
  busy:    "bg-red-400",
} as const satisfies Record<NonNullable<AvatarProps["status"]>, string>;

const AVATAR_COLORS = [
  "from-accent to-glow",
  "from-purple-500 to-pink-500",
  "from-emerald-500 to-teal-500",
  "from-orange-500 to-red-500",
  "from-blue-500 to-cyan-500",
] as const;

function getInitials(name: string): string {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

function getAvatarColor(name: string): string {
  const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, size = "md", status, ...props }, ref) => {
    const sizes = SIZE_MAP[size];
    return (
      <div ref={ref} className={cn("relative inline-flex shrink-0", className)} {...props}>
        <div className={cn(
          "rounded-full overflow-hidden flex items-center justify-center ring-2 ring-surface-border",
          sizes.container
        )}>
          {src ? (
            <Image src={src} alt={alt ?? name ?? "Avatar"} fill className="object-cover" sizes={sizes.container} />
          ) : name ? (
            <div className={cn(
              "w-full h-full flex items-center justify-center bg-gradient-to-br font-semibold text-white",
              sizes.text,
              getAvatarColor(name)
            )}>
              {getInitials(name)}
            </div>
          ) : (
            <div className="w-full h-full bg-surface-raised" />
          )}
        </div>
        {status && (
          <span className={cn(
            "absolute rounded-full ring-2 ring-surface",
            STATUS_COLOR_MAP[status],
            sizes.status
          )} />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";
