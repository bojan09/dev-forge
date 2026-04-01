// app/page.tsx
// ─────────────────────────────────────────────────────────
// PUBLIC LANDING PAGE — DevForge marketing homepage
// Replaces the Phase 1 dev scaffold entirely.
// Clean, production-style hero with CTA to sign up / dashboard.
// ─────────────────────────────────────────────────────────

import Link from "next/link";
import { Zap, BookOpen, BarChart2, Code2, ArrowRight, CheckCircle2 } from "lucide-react";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Structured learning paths",
    desc: "Every topic is broken into bite-sized lessons with real-world context.",
  },
  {
    icon: BarChart2,
    title: "Visual infographic engine",
    desc: "Complex concepts explained through animated interactive diagrams.",
  },
  {
    icon: Code2,
    title: "Real code, real projects",
    desc: "Syntax-highlighted examples with copy button, diffs, and multi-file tabs.",
  },
  {
    icon: Zap,
    title: "Track your progress",
    desc: "XP, streaks, achievements, and a personalised daily learning path.",
  },
];

const TOPICS = [
  { icon: "⚡", label: "JavaScript" },
  { icon: "⚛️", label: "React"       },
  { icon: "▲",  label: "Next.js"    },
  { icon: "🔷", label: "TypeScript" },
  { icon: "🟢", label: "Node.js"    },
  { icon: "🗄️", label: "Databases"  },
  { icon: "🔐", label: "Auth"        },
  { icon: "🏗️", label: "System Design"},
];

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-mesh flex flex-col">
      {/* ── Minimal nav ──────────────────────────────── */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-glow flex items-center justify-center shadow-glow-sm">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="font-display font-bold text-xl gradient-text">DevForge</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors px-3 py-1.5"
          >
            Sign in
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors shadow-glow-sm"
          >
            Get started free
          </Link>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-glow/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-glow animate-pulse" />
            The visual way to learn full-stack development
          </div>

          {/* Headline */}
          <h1 className="font-display font-bold leading-tight text-balance">
            Master{" "}
            <span className="gradient-text">Full-Stack Dev</span>
            <br />
            with Interactive Visuals
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
            Infographic-driven lessons, real code examples, and a structured path from
            beginner to senior engineer — all in one platform.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent to-glow text-white font-semibold text-base hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-200 shadow-glow-md"
            >
              Start learning free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-surface-card border border-surface-border text-[var(--color-text)] font-semibold text-base hover:border-accent/30 transition-all duration-200"
            >
              Browse topics
            </Link>
          </div>

          {/* Social proof */}
          <p className="text-xs text-[var(--color-text-muted)]">
            No credit card required · 10 topics · Completely free to start
          </p>
        </div>

        {/* ── Topic pills ───────────────────────────── */}
        <div className="relative z-10 mt-16 flex flex-wrap justify-center gap-2.5 max-w-2xl mx-auto">
          {TOPICS.map(({ icon, label }) => (
            <Link
              key={label}
              href={`/learn/${label.toLowerCase().replace(".js", "js").replace(" ", "-")}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-surface-border text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <span>{icon}</span>
              {label}
            </Link>
          ))}
        </div>

        {/* ── Feature grid ─────────────────────────── */}
        <div className="relative z-10 mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto w-full px-4">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glass-card p-6 text-left flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-base text-[var(--color-text)] leading-snug">
                {title}
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA strip ─────────────────────── */}
        <div className="relative z-10 mt-24 glass-card p-8 max-w-2xl mx-auto w-full text-center space-y-4">
          <h2 className="font-display font-bold text-2xl text-[var(--color-text)]">
            Ready to level up?
          </h2>
          <p className="text-[var(--color-text-muted)] text-sm">
            Join thousands of developers building real skills.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-[var(--color-text-muted)]">
            {["Structured paths", "Real projects", "Progress tracking", "100% free to start"].map((f) => (
              <span key={f} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {f}
              </span>
            ))}
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-hover transition-colors shadow-glow-sm"
          >
            Go to dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="py-6 text-center text-xs text-[var(--color-text-muted)] border-t border-surface-border">
        © {new Date().getFullYear()} DevForge · Built with Next.js &amp; ☕
      </footer>
    </div>
  );
}
