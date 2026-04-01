"use client";

// components/layout/SidebarContext.tsx
// ─────────────────────────────────────────────────────────
// SIDEBAR CONTEXT
// Global state for sidebar open/collapsed/mobile states
// Consumed by Sidebar, Navbar, and DashboardLayout
// ─────────────────────────────────────────────────────────

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

interface SidebarContextValue {
  // Desktop: sidebar is collapsed to icon-only rail
  isCollapsed: boolean;
  toggleCollapsed: () => void;
  setCollapsed: (v: boolean) => void;

  // Mobile: sidebar drawer is open
  isMobileOpen: boolean;
  toggleMobile: () => void;
  closeMobile: () => void;
  openMobile: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Restore collapsed state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored === "true") setIsCollapsed(true);
  }, []);

  // Persist collapsed preference
  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => {
      localStorage.setItem("sidebar-collapsed", String(!prev));
      return !prev;
    });
  }, []);

  const setCollapsed = useCallback((v: boolean) => {
    setIsCollapsed(v);
    localStorage.setItem("sidebar-collapsed", String(v));
  }, []);

  // Mobile handlers
  const toggleMobile = useCallback(() => setIsMobileOpen((p) => !p), []);
  const closeMobile = useCallback(() => setIsMobileOpen(false), []);
  const openMobile = useCallback(() => setIsMobileOpen(true), []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleCollapsed,
        setCollapsed,
        isMobileOpen,
        toggleMobile,
        closeMobile,
        openMobile,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
