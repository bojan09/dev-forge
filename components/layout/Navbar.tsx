"use client";

// components/layout/Navbar.tsx
// ─────────────────────────────────────────────────────────
// NAVBAR COMPONENT
// Top bar for dashboard layout
// Features:
//  - Mobile hamburger → opens sidebar drawer
//  - Breadcrumb / page title
//  - Search trigger (command palette — Phase 11)
//  - Theme toggle (dark/light)
//  - Notification bell
//  - User dropdown menu
// ─────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  Settings,
  User,
  BookOpen,
  Keyboard,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./SidebarContext";

// ── Route → readable title map ───────────────────────────
const ROUTE_TITLES: Record<string, string> = {
  "/dashboard":  "Dashboard",
  "/learn":      "Learn",
  "/roadmap":    "Roadmap",
  "/challenges": "Challenges",
  "/projects":   "Projects",
  "/community":  "Community",
  "/settings":   "Settings",
  "/profile":    "Profile",
};

function usePageTitle(): string {
  const pathname = usePathname();
  // Check exact match first, then prefix match
  if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname];
  const match = Object.entries(ROUTE_TITLES).find(([route]) =>
    pathname.startsWith(route) && route !== "/"
  );
  return match ? match[1] : "DevForge";
}

// ── Notification data (mock for Phase 3) ─────────────────
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "New lesson available",
    body: "React Hooks deep dive is now live",
    time: "2m ago",
    read: false,
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Streak milestone! 🔥",
    body: "You've reached a 12-day streak",
    time: "1h ago",
    read: false,
    icon: Zap,
  },
  {
    id: 3,
    title: "Challenge completed",
    body: "You solved the async/await challenge",
    time: "3h ago",
    read: true,
    icon: Zap,
  },
];

export function Navbar() {
  const { openMobile, isCollapsed } = useSidebar();
  const { theme, setTheme } = useTheme();
  const pageTitle = usePageTitle();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16",
        "flex items-center justify-between px-4 gap-3",
        "bg-surface/90 backdrop-blur-md",
        "border-b border-surface-border",
        "transition-all duration-300",
        // Offset for sidebar width on desktop
        isCollapsed ? "lg:left-[68px]" : "lg:left-[256px]",
        "left-0"
      )}
    >
      {/* ── LEFT: hamburger + breadcrumb ─────────────── */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger */}
        <button
          onClick={openMobile}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-surface-raised transition-all"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page title / breadcrumb */}
        <div className="min-w-0">
          <h1 className="font-display font-semibold text-base text-[var(--color-text)] truncate leading-none">
            {pageTitle}
          </h1>
          <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5 hidden sm:block">
            devforge.dev/{pageTitle.toLowerCase()}
          </p>
        </div>
      </div>

      {/* ── RIGHT: actions ───────────────────────────── */}
      <div className="flex items-center gap-1.5 shrink-0">

        {/* Search trigger */}
        <button
          className={cn(
            "hidden sm:flex items-center gap-2",
            "h-9 px-3 rounded-xl",
            "bg-surface-raised border border-surface-border",
            "text-sm text-[var(--color-text-muted)]",
            "hover:border-accent/30 hover:text-[var(--color-text)]",
            "transition-all duration-200"
          )}
          aria-label="Search (⌘K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="text-xs hidden md:inline">Search...</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-surface-card border border-surface-border text-[var(--color-text-muted)]">
            ⌘K
          </kbd>
        </button>

        {/* Mobile search icon only */}
        <button
          className="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-surface-raised transition-all"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-surface-raised transition-all"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Sun className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Moon className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen((p) => !p); setUserMenuOpen(false); }}
            className="relative flex items-center justify-center w-9 h-9 rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-surface-raised transition-all"
            aria-label={`Notifications (${unreadCount} unread)`}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent border-2 border-surface" />
            )}
          </button>

          {/* Notification dropdown */}
          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
                <motion.div
                  key="notif-menu"
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    "absolute right-0 top-11 z-20 w-80",
                    "bg-surface-card border border-surface-border rounded-2xl",
                    "shadow-card overflow-hidden"
                  )}
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border">
                    <span className="font-semibold text-sm text-[var(--color-text)]">
                      Notifications
                    </span>
                    <span className="text-xs text-accent cursor-pointer hover:underline">
                      Mark all read
                    </span>
                  </div>
                  <div className="divide-y divide-surface-border max-h-72 overflow-y-auto">
                    {MOCK_NOTIFICATIONS.map((n) => (
                      <div
                        key={n.id}
                        className={cn(
                          "flex gap-3 px-4 py-3 hover:bg-surface-raised transition-colors cursor-pointer",
                          !n.read && "bg-accent/5"
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-xl flex items-center justify-center shrink-0",
                          n.read ? "bg-surface-raised" : "bg-accent/10"
                        )}>
                          <n.icon className={cn("w-4 h-4", n.read ? "text-[var(--color-text-muted)]" : "text-accent")} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-xs font-semibold truncate", n.read ? "text-[var(--color-text-muted)]" : "text-[var(--color-text)]")}>
                            {n.title}
                          </p>
                          <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">{n.body}</p>
                          <p className="text-[10px] text-[var(--color-text-muted)] mt-1">{n.time}</p>
                        </div>
                        {!n.read && (
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => { setUserMenuOpen((p) => !p); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-surface-raised transition-all"
            aria-label="User menu"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-glow flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              JD
            </div>
            <ChevronDown className={cn("w-3 h-3 text-[var(--color-text-muted)] transition-transform duration-200 hidden sm:block", userMenuOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {userMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                <motion.div
                  key="user-menu"
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    "absolute right-0 top-11 z-20 w-52",
                    "bg-surface-card border border-surface-border rounded-2xl",
                    "shadow-card overflow-hidden py-1"
                  )}
                >
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-surface-border">
                    <p className="text-sm font-semibold text-[var(--color-text)]">John Dev</p>
                    <p className="text-xs text-[var(--color-text-muted)]">john@devforge.io</p>
                  </div>
                  {/* Menu items */}
                  {[
                    { label: "Profile",    href: "/profile",   icon: User     },
                    { label: "Settings",   href: "/settings",  icon: Settings },
                    { label: "Shortcuts",  href: "#",          icon: Keyboard },
                  ].map(({ label, href, icon: Icon }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-surface-raised transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </Link>
                  ))}
                  <div className="border-t border-surface-border mt-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/10 transition-colors">
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
