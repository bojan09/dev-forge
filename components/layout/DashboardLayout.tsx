"use client";

// components/layout/DashboardLayout.tsx — Phase 8 update
// Added PageTransition wrapper around {children} for smooth route changes

import { usePathname } from "next/navigation";
import { Sidebar }        from "./Sidebar";
import { Navbar }         from "./Navbar";
import { SidebarProvider, useSidebar } from "./SidebarContext";
import { PageTransition } from "@/components/animations/PageTransition";
import { cn }             from "@/lib/utils";
import { motion }         from "framer-motion";

function DashboardInner({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  const pathname        = usePathname();

  return (
    <div className="min-h-dvh bg-mesh flex">
      <Sidebar />

      <motion.div
        animate={{ marginLeft: isCollapsed ? 68 : 256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn("flex-1 flex flex-col min-w-0", "ml-0 lg:ml-0")}
        style={{ marginLeft: undefined }}
      >
        <Navbar />

        <main className="flex-1 pt-16 min-h-0" id="main-content">
          {/* Route-keyed transition — fades + slides on navigation */}
          <PageTransition routeKey={pathname} className="h-full">
            {children}
          </PageTransition>
        </main>
      </motion.div>
    </div>
  );
}

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardInner>{children}</DashboardInner>
    </SidebarProvider>
  );
}
