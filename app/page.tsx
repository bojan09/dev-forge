"use client";

// app/page.tsx — Phase 8: scroll reveals + animated counters
import Link         from "next/link";
import { motion }   from "framer-motion";
import { Zap, BookOpen, BarChart2, Code2, ArrowRight, CheckCircle2 } from "lucide-react";
import { ScrollReveal }     from "@/components/animations/ScrollReveal";
import { StaggerList, StaggerItem } from "@/components/animations/StaggerList";
import { AnimatedCounter }  from "@/components/animations/AnimatedCounter";
import { PulseRing }        from "@/components/animations/MicroInteractions";
import { staggerContainer, fadeInUp } from "@/components/animations/motion";

const FEATURES = [
  { icon: BookOpen,  title: "Structured learning paths", desc: "Every topic is broken into bite-sized lessons with real-world context." },
  { icon: BarChart2, title: "Visual infographic engine",  desc: "Complex concepts explained through animated interactive diagrams."    },
  { icon: Code2,     title: "Real code, real projects",   desc: "Syntax-highlighted examples with copy button, diffs, and multi-file tabs." },
  { icon: Zap,       title: "Track your progress",        desc: "XP, streaks, achievements, and a personalised daily learning path."  },
];

const TOPICS = [
  { icon: "⚡", label: "JavaScript", slug: "javascript" },
  { icon: "⚛️", label: "React",       slug: "react"       },
  { icon: "▲",  label: "Next.js",    slug: "nextjs"      },
  { icon: "🔷", label: "TypeScript", slug: "typescript"  },
  { icon: "🟢", label: "Node.js",    slug: "nodejs"      },
  { icon: "🗄️", label: "Databases",  slug: "databases"   },
  { icon: "🔐", label: "Auth",        slug: "auth"        },
  { icon: "🏗️", label: "System Design", slug: "system-design" },
];

const STATS = [
  { value: 10,    suffix: "+",   label: "Topics"          },
  { value: 120,   suffix: "+",   label: "Lessons"         },
  { value: 4,     prefix: "★",   label: "Avg Rating", decimals: 0 },
  { value: 100,   suffix: "%",   label: "Free to start"   },
];

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-mesh flex flex-col">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-glow flex items-center justify-center shadow-glow-sm">
            <Zap className="w-4 h-4 text-white" fill="white" />
          </div>
          <span className="font-display font-bold text-xl gradient-text">DevForge</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors px-3 py-1.5">
            Sign in
          </Link>
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-hover transition-colors shadow-glow-sm">
            Get started free
          </Link>
        </div>
      </motion.nav>

      <main className="flex-1 flex flex-col items-center">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-glow/5 rounded-full blur-3xl" />
        </div>

        {/* Hero */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-16 pb-20 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium"
          >
            <PulseRing color="#00C2FF" size={8} />
            The visual way to learn full-stack development
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold leading-tight text-balance"
          >
            Master{" "}
            <span className="gradient-text">Full-Stack Dev</span>
            <br />with Interactive Visuals
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed"
          >
            Infographic-driven lessons, real code examples, and a structured path from
            beginner to senior engineer — all in one platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-accent to-glow text-white font-semibold text-base hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-200 shadow-glow-md">
              Start learning free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/learn" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-surface-card border border-surface-border text-[var(--color-text)] font-semibold text-base hover:border-accent/30 transition-all duration-200">
              Browse topics
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-[var(--color-text-muted)]"
          >
            No credit card required · 10 topics · Completely free to start
          </motion.p>
        </div>

        {/* Stats row — animated counters */}
        <ScrollReveal className="relative z-10 w-full max-w-3xl mx-auto px-4 mb-16">
          <div className="glass-card p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map(({ value, suffix, prefix, label, decimals }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="font-display font-bold text-3xl gradient-text tabular-nums">
                  {prefix ?? ""}
                  <AnimatedCounter value={value} suffix={suffix} decimals={decimals ?? 0} duration={1400} />
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Topic pills */}
        <ScrollReveal variant="fadeInUp" className="relative z-10 px-4 mb-20 w-full max-w-2xl mx-auto">
          <p className="text-xs text-center font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)] mb-4">
            Topics covered
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {TOPICS.map(({ icon, label, slug }) => (
              <Link key={label} href={`/learn/${slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-surface-border text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-200">
                <span>{icon}</span>{label}
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* Feature grid — staggered reveal */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 mb-24">
          <ScrollReveal variant="fadeInUp" className="text-center mb-8">
            <h2 className="font-display font-bold text-3xl text-[var(--color-text)]">
              Everything you need to go from 0 to hired
            </h2>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                className="glass-card p-6 flex flex-col gap-3 hover:-translate-y-1 hover:border-accent/25 hover:shadow-glow-sm transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-base text-[var(--color-text)] leading-snug">{title}</h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <ScrollReveal variant="scaleIn" className="relative z-10 w-full max-w-2xl mx-auto px-4 mb-16">
          <div className="glass-card p-8 text-center space-y-4">
            <h2 className="font-display font-bold text-2xl text-[var(--color-text)]">Ready to level up?</h2>
            <p className="text-[var(--color-text-muted)] text-sm">Join thousands of developers building real skills.</p>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-[var(--color-text-muted)]">
              {["Structured paths", "Real projects", "Progress tracking", "100% free to start"].map((f) => (
                <span key={f} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />{f}
                </span>
              ))}
            </div>
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent-hover transition-colors shadow-glow-sm">
              Go to dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </main>

      <footer className="py-6 text-center text-xs text-[var(--color-text-muted)] border-t border-surface-border relative z-10">
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span> DevForge · Built with Next.js &amp; ☕
      </footer>
    </div>
  );
}
