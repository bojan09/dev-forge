// app/page.tsx
// ─────────────────────────────────────────────────────────
// ROOT PAGE — Landing / Marketing Page
// This is the entry point. Phase 4 will add a full hero page.
// For now it shows a polished "coming soon" state.
// ─────────────────────────────────────────────────────────

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-mesh flex items-center justify-center relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-glow animate-pulse" />
          Platform Loading — Phase 1 Complete
        </div>

        {/* Wordmark */}
        <h1 className="font-display font-bold mb-6">
          <span className="gradient-text">DevForge</span>
        </h1>

        <p className="text-xl text-[var(--color-text-muted)] mb-12 max-w-2xl mx-auto leading-relaxed">
          The most visual, interactive platform for mastering full-stack development.
          Built phase by phase, production-grade from day one.
        </p>

        {/* Phase progress indicator */}
        <div className="glass-card p-8 max-w-lg mx-auto mb-10">
          <p className="text-sm text-[var(--color-text-muted)] mb-4 font-medium uppercase tracking-wider">
            Build Progress
          </p>
          <div className="space-y-3">
            {[
              { phase: "Phase 1", label: "Project Foundation",    done: true  },
              { phase: "Phase 2", label: "Design System & UI",    done: false },
              { phase: "Phase 3", label: "Layout System",         done: false },
              { phase: "Phase 4", label: "Dashboard",             done: false },
              { phase: "Phase 5", label: "Learning Pages",        done: false },
            ].map(({ phase, label, done }) => (
              <div key={phase} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  done
                    ? "bg-accent text-white"
                    : "border border-surface-border text-[var(--color-text-muted)]"
                }`}>
                  {done ? "✓" : "○"}
                </div>
                <span className={`text-sm ${done ? "text-accent font-medium" : "text-[var(--color-text-muted)]"}`}>
                  {phase} — {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-hover transition-colors duration-200"
        >
          Enter Dashboard →
        </Link>
      </div>
    </main>
  );
}
