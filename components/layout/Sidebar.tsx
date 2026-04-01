"use client";

// components/layout/Sidebar.tsx
// ─────────────────────────────────────────────────────────
// SIDEBAR COMPONENT
// Features:
//  - Desktop: full-width ↔ icon-only rail (collapsible)
//  - Mobile: off-canvas drawer with backdrop
//  - Navigation groups with icons
//  - Active route highlighting
//  - Overall progress display
//  - User profile section at bottom
//  - Smooth Framer Motion transitions
// ─────────────────────────────────────────────────────────

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BarChart2,
  BookOpen,
  Map,
  Code2,
  FolderKanban,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Trophy,
  Flame,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";
import { Progress } from "@/components/ui/Progress";

// ── Navigation structure ─────────────────────────────────
const NAV_GROUPS = [
  {
    label: "Learn",
    items: [
      { label: "Dashboard",  href: "/dashboard",  icon: LayoutDashboard },
      { label: "Learn",      href: "/learn",       icon: BookOpen         },
      { label: "Roadmap",    href: "/roadmap",     icon: Map              },
      { label: "Challenges", href: "/challenges",  icon: Code2            },
      { label: "Projects",   href: "/projects",    icon: FolderKanban     },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Infographics",href: "/infographics",icon: BarChart2 },
      { label: "Code System",  href: "/code-system",  icon: Code2     },
      { label: "Community",  href: "/community",  icon: Users    },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Settings",   href: "/settings",   icon: Settings },
    ],
  },
];

// ── Sidebar width tokens ─────────────────────────────────
const SIDEBAR_EXPANDED  = 256; // px
const SIDEBAR_COLLAPSED = 68;  // px

export function Sidebar() {
  const { isCollapsed, toggleCollapsed, isMobileOpen, closeMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      {/* ── Mobile backdrop ──────────────────────────── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={closeMobile}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar panel ────────────────────────────── */}
      {/* Desktop: always visible, width animates */}
      {/* Mobile: off-canvas, translateX animates      */}
      <motion.aside
        animate={{
          width: isCollapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED,
          x: 0,
        }}
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          // Positioning
          "fixed top-0 left-0 z-50 h-dvh flex flex-col",
          // Visual
          "bg-surface border-r border-surface-border",
          "overflow-hidden select-none",
          // Mobile: off-canvas until open
          "-translate-x-full lg:translate-x-0",
          isMobileOpen && "translate-x-0"
        )}
        style={{
          // On mobile, always show full width when open
          width: isMobileOpen ? SIDEBAR_EXPANDED : undefined,
        }}
      >
        {/* ── Logo / Wordmark ───────────────────────── */}
        <div
          className={cn(
            "flex items-center h-16 px-4 border-b border-surface-border shrink-0",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 min-w-0"
            onClick={closeMobile}
          >
            {/* Logo mark — always visible */}
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-glow flex items-center justify-center shrink-0 shadow-glow-sm">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>

            {/* Wordmark — hidden when collapsed */}
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  key="wordmark"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-display font-bold text-lg gradient-text whitespace-nowrap overflow-hidden"
                >
                  DevForge
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Mobile close button */}
          <button
            onClick={closeMobile}
            className="lg:hidden p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-surface-raised transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Navigation ───────────────────────────── */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 no-scrollbar">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-6">
              {/* Group label */}
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.p
                    key={`label-${group.label}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="px-4 mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]"
                  >
                    {group.label}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Nav items */}
              <ul className="space-y-0.5 px-2">
                {group.items.map(({ label, href, icon: Icon }) => {
                  const isActive =
                    href === "/dashboard"
                      ? pathname === href
                      : pathname.startsWith(href);

                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={closeMobile}
                        className={cn(
                          "flex items-center gap-3 px-2.5 py-2 rounded-xl",
                          "text-sm font-medium transition-all duration-200",
                          "relative group",
                          isActive
                            ? "text-accent bg-accent/10 border border-accent/20"
                            : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-surface-raised",
                          isCollapsed && "justify-center px-2"
                        )}
                        title={isCollapsed ? label : undefined}
                      >
                        {/* Active indicator bar */}
                        {isActive && (
                          <motion.span
                            layoutId="active-nav"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-accent"
                          />
                        )}

                        {/* Icon */}
                        <Icon
                          className={cn(
                            "w-4 h-4 shrink-0 transition-colors",
                            isActive ? "text-accent" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]"
                          )}
                        />

                        {/* Label */}
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span
                              key={`nav-${label}`}
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: "auto" }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.15 }}
                              className="whitespace-nowrap overflow-hidden"
                            >
                              {label}
                            </motion.span>
                          )}
                        </AnimatePresence>

                        {/* Tooltip on collapsed */}
                        {isCollapsed && (
                          <span className="absolute left-full ml-2 px-2 py-1 rounded-lg bg-surface-raised border border-surface-border text-xs font-medium text-[var(--color-text)] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                            {label}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* ── Overall Progress ─────────────────────── */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              key="progress-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mx-3 mb-3 p-3 rounded-xl bg-accent/10 border border-accent/20 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[var(--color-text)]">
                  Overall Progress
                </span>
                <span className="text-xs font-bold text-accent">0%</span>
              </div>
              <Progress value={0} size="xs" variant="accent" animated={false} />
              <p className="mt-2 text-[10px] text-[var(--color-text-muted)]">
                0 of 20 modules complete
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── User profile strip ───────────────────── */}
        <div className={cn(
          "flex items-center gap-3 p-3 border-t border-surface-border shrink-0",
          isCollapsed && "justify-center"
        )}>
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-glow flex items-center justify-center shrink-0 text-white text-xs font-bold">
            JD
          </div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                key="user-info"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="flex-1 min-w-0 overflow-hidden"
              >
                <p className="text-sm font-semibold text-[var(--color-text)] truncate">
                  John Dev
                </p>
                <div className="flex items-center gap-2">
                  <Flame className="w-3 h-3 text-orange-400" />
                  <span className="text-[10px] text-[var(--color-text-muted)]">
                    0 day streak
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* XP badge */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                key="xp"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-400/10 border border-yellow-400/20"
              >
                <Trophy className="w-3 h-3 text-yellow-400" />
                <span className="text-[10px] font-bold text-yellow-400">0</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Collapse toggle ── Desktop only ─────── */}
        <button
          onClick={toggleCollapsed}
          className={cn(
            "hidden lg:flex items-center justify-center",
            "absolute -right-3 top-20",
            "w-6 h-6 rounded-full",
            "bg-surface-card border border-surface-border",
            "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
            "hover:bg-surface-raised transition-all duration-200",
            "shadow-card z-10"
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed
            ? <ChevronRight className="w-3 h-3" />
            : <ChevronLeft className="w-3 h-3" />
          }
        </button>
      </motion.aside>
    </>
  );
}
