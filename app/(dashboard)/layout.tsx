// app/(dashboard)/layout.tsx
// ─────────────────────────────────────────────────────────
// DASHBOARD ROUTE GROUP LAYOUT
// Wraps all /dashboard, /learn, /roadmap etc. pages
// with Sidebar + Navbar shell (Phase 3)
// ─────────────────────────────────────────────────────────

import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
