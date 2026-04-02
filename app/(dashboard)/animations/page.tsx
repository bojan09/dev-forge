"use client";
// app/(dashboard)/animations/page.tsx — Phase 8 showcase

import { motion } from "framer-motion";
import { Container }          from "@/components/ui/Container";
import { ScrollReveal }       from "@/components/animations/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/animations/StaggerList";
import { AnimatedCounter }    from "@/components/animations/AnimatedCounter";
import { AnimatedProgressBar, Spinner, DotsLoader } from "@/components/animations/LoadingStates";
import { HoverCard, PulseRing, FloatBadge, GlowText } from "@/components/animations/MicroInteractions";
import { staggerContainer, fadeInUp, fadeInLeft } from "@/components/animations/motion";

const CARDS = [
  { title: "JavaScript",  color: "#F7DF1E", icon: "⚡", desc: "20 lessons · 16h" },
  { title: "React",       color: "#61DAFB", icon: "⚛️", desc: "18 lessons · 14h" },
  { title: "TypeScript",  color: "#3178C6", icon: "🔷", desc: "12 lessons · 9h"  },
  { title: "Next.js",     color: "#FFFFFF", icon: "▲",  desc: "15 lessons · 12h" },
];

export default function AnimationsPage() {
  return (
    <Container className="py-6 space-y-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-3">
          Phase 8 Complete ✓
        </div>
        <h1 className="font-display font-bold text-3xl text-[var(--color-text)] mb-2">Animation System</h1>
        <p className="text-[var(--color-text-muted)]">
          Scroll down to see each animation system in action.
        </p>
      </div>

      {/* Section 1 — Scroll reveals */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-xl text-[var(--color-text)]">Scroll Reveal variants</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {(["fadeInUp","fadeInDown","fadeInLeft","fadeInRight"] as const).map((v, i) => (
            <ScrollReveal key={v} variant={v} delay={i * 0.1}>
              <div className="glass-card p-4 text-center">
                <p className="text-xs font-mono text-accent">{v}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {(["scaleIn","scalePop"] as const).map((v, i) => (
            <ScrollReveal key={v} variant={v} delay={i * 0.15}>
              <div className="glass-card p-4 text-center">
                <p className="text-xs font-mono text-accent">{v}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Section 2 — Stagger list */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-xl text-[var(--color-text)]">Stagger list</h2>
        <StaggerList className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CARDS.map((c) => (
            <StaggerItem key={c.title}>
              <div className="glass-card p-5 flex flex-col gap-3 hover:-translate-y-0.5 transition-transform">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${c.color}18`, border: `1px solid ${c.color}30` }}>
                  {c.icon}
                </div>
                <p className="font-semibold text-sm text-[var(--color-text)]">{c.title}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{c.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </section>

      {/* Section 3 — Animated counters */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-xl text-[var(--color-text)]">Animated counters</h2>
        <ScrollReveal>
          <div className="glass-card p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: 10,  suffix: "+",  label: "Topics"    },
              { value: 120, suffix: "+",  label: "Lessons"   },
              { value: 500, suffix: " XP",label: "Per lesson"},
              { value: 4.9, prefix: "★ ", label: "Rating", decimals: 1 },
            ].map(({ value, suffix, prefix, label, decimals }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-display font-bold text-3xl gradient-text tabular-nums">
                  {prefix ?? ""}
                  <AnimatedCounter value={value} suffix={suffix} decimals={decimals ?? 0} />
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Section 4 — Progress bars */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-xl text-[var(--color-text)]">Animated progress</h2>
        <ScrollReveal>
          <div className="glass-card p-6 space-y-4">
            {[
              { label: "JavaScript", value: 78, color: "linear-gradient(90deg,#F7DF1E,#fb923c)" },
              { label: "React",      value: 45, color: "linear-gradient(90deg,#61DAFB,#7B61FF)" },
              { label: "TypeScript", value: 30, color: "linear-gradient(90deg,#3178C6,#00C2FF)" },
            ].map(({ label, value, color }) => (
              <AnimatedProgressBar key={label} label={label} value={value} color={color} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Section 5 — Micro interactions */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-xl text-[var(--color-text)]">Micro-interactions</h2>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2">
            <PulseRing color="#7B61FF" size={10} />
            <span className="text-sm text-[var(--color-text-muted)]">PulseRing (accent)</span>
          </div>
          <div className="flex items-center gap-2">
            <PulseRing color="#00C2FF" size={10} />
            <span className="text-sm text-[var(--color-text-muted)]">PulseRing (glow)</span>
          </div>
          <div className="flex items-center gap-2">
            <PulseRing color="#34d399" size={10} />
            <span className="text-sm text-[var(--color-text-muted)]">PulseRing (online)</span>
          </div>
          <FloatBadge>
            <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
              ✦ Floating badge
            </div>
          </FloatBadge>
          <GlowText className="font-display font-bold text-xl">GlowText ✨</GlowText>
        </div>
        <div className="flex gap-4 flex-wrap">
          {CARDS.slice(0, 3).map((c) => (
            <HoverCard key={c.title} glow className="glass-card p-4 w-36 text-center cursor-pointer">
              <span className="text-2xl">{c.icon}</span>
              <p className="text-sm font-medium text-[var(--color-text)] mt-2">{c.title}</p>
              <p className="text-[10px] text-[var(--color-text-muted)]">hover me</p>
            </HoverCard>
          ))}
        </div>
      </section>

      {/* Section 6 — Loaders */}
      <section className="space-y-4">
        <h2 className="font-display font-semibold text-xl text-[var(--color-text)]">Loading states</h2>
        <div className="glass-card p-6 flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Spinner size={32} />
            <span className="text-xs text-[var(--color-text-muted)]">Spinner</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <DotsLoader />
            <span className="text-xs text-[var(--color-text-muted)]">DotsLoader</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Spinner size={32} color="#00C2FF" />
            <span className="text-xs text-[var(--color-text-muted)]">Spinner (glow)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <DotsLoader color="#34d399" />
            <span className="text-xs text-[var(--color-text-muted)]">DotsLoader (green)</span>
          </div>
        </div>
      </section>
    </Container>
  );
}
