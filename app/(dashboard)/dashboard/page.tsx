"use client";
// app/(dashboard)/dashboard/page.tsx — Phase 4

import { DashboardHero }    from "@/components/dashboard/DashboardHero";
import { StatsStrip }       from "@/components/dashboard/StatsStrip";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { AllTopicsGrid }    from "@/components/dashboard/AllTopicsGrid";
import { DailyPath }        from "@/components/dashboard/DailyPath";
import { ActivityFeed }     from "@/components/dashboard/ActivityFeed";
import { Achievements }     from "@/components/dashboard/Achievements";
import { Container }        from "@/components/ui/Container";

export default function DashboardPage() {
  return (
    <Container className="py-6 space-y-8">
      <DashboardHero />
      <StatsStrip />
      <ContinueLearning />
      <AllTopicsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DailyPath />
          <ActivityFeed />
        </div>
        <div><Achievements /></div>
      </div>
    </Container>
  );
}
