// app/(dashboard)/layout.tsx
// Dashboard layout shell — Navbar + Sidebar added in Phase 3

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex min-h-dvh">{children}</div>;
}
