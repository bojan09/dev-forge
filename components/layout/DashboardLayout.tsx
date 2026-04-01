"use client";

// components/layout/DashboardLayout.tsx
// ─────────────────────────────────────────────────────────
// DASHBOARD LAYOUT SHELL
// Assembles: SidebarProvider > Sidebar + Navbar + main area
// Handles the CSS offset so main content shifts with sidebar
// ─────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { SidebarProvider, useSidebar } from "./SidebarContext";
import { cn } from "@/lib/utils";

// ── Inner layout reads sidebar state ─────────────────────
function DashboardInner({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-dvh bg-mesh flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area — shifts right to clear sidebar */}
      <motion.div
        animate={{
          marginLeft: isCollapsed ? 68 : 256,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "flex-1 flex flex-col min-w-0",
          // On mobile, no margin — sidebar is off-canvas
          "ml-0 lg:ml-0"
        )}
        style={{ marginLeft: undefined }} // motion handles this
      >
        {/* Navbar */}
        <Navbar />

        {/* Page content — padded to clear fixed navbar */}
        <main
          className="flex-1 pt-16 min-h-0"
          id="main-content"
        >
          {/* Fade in on route change */}
          <motion.div
            key={typeof window !== "undefined" ? window.location.pathname : ""}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
}

// ── Public export wraps with provider ────────────────────
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardInner>{children}</DashboardInner>
    </SidebarProvider>
  );
}
