// app/design-system/page.tsx
// ─────────────────────────────────────────────────────────
// DESIGN SYSTEM PREVIEW — Development only
// Visual reference for all UI components
// ─────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <main className="min-h-dvh bg-mesh p-8">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-4">
            Phase 2 Complete
          </div>
          <h1 className="font-display font-bold text-4xl mb-2">
            <span className="gradient-text">DevForge</span> Design System
          </h1>
          <p className="text-[var(--color-text-muted)] text-lg">
            All UI components — Phase 2 output
          </p>
        </div>

        {/* Color Tokens */}
        <section>
          <h2 className="font-display font-semibold text-xl mb-6 text-[var(--color-text)]">Color Tokens</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Brand",   color: "#0A2540", class: "bg-brand-900"  },
              { name: "Accent",  color: "#7B61FF", class: "bg-accent"     },
              { name: "Glow",    color: "#00C2FF", class: "bg-glow"       },
              { name: "Surface", color: "#161b22", class: "bg-surface-card"},
            ].map(({ name, color, class: cls }) => (
              <div key={name} className="glass-card p-4">
                <div className={`h-16 rounded-xl mb-3 ${cls}`} />
                <p className="text-sm font-semibold text-[var(--color-text)]">{name}</p>
                <p className="text-xs text-[var(--color-text-muted)] font-mono">{color}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="font-display font-semibold text-xl mb-6 text-[var(--color-text)]">Typography</h2>
          <div className="glass-card p-8 space-y-4">
            <p className="font-display font-bold text-5xl">Display Heading</p>
            <p className="font-display font-bold text-3xl">Section Heading</p>
            <p className="font-display font-semibold text-xl">Subheading</p>
            <p className="font-sans text-base text-[var(--color-text-muted)]">
              Body text — DM Sans renders beautifully at reading sizes. Clear, humanist, approachable.
            </p>
            <p className="font-mono text-sm text-accent bg-surface-raised px-3 py-2 rounded-lg">
              const code = "JetBrains Mono — sharp, readable at small sizes";
            </p>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="font-display font-semibold text-xl mb-6 text-[var(--color-text)]">Buttons</h2>
          <div className="glass-card p-8">
            <div className="flex flex-wrap gap-3 mb-6">
              <button className="inline-flex items-center justify-center gap-2 h-10 px-4 text-sm font-medium rounded-xl bg-accent text-white hover:bg-accent-hover transition-all duration-200">
                Primary
              </button>
              <button className="inline-flex items-center justify-center gap-2 h-10 px-4 text-sm font-medium rounded-xl bg-surface-raised border border-surface-border text-[var(--color-text)] hover:bg-surface-border transition-all duration-200">
                Secondary
              </button>
              <button className="inline-flex items-center justify-center gap-2 h-10 px-4 text-sm font-medium rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-surface-raised transition-all duration-200">
                Ghost
              </button>
              <button className="inline-flex items-center justify-center gap-2 h-10 px-4 text-sm font-medium rounded-xl border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-200">
                Outline
              </button>
              <button className="inline-flex items-center justify-center gap-2 h-10 px-5 text-sm font-semibold rounded-xl bg-gradient-to-r from-accent to-glow text-white shadow-glow-md hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-200">
                Glow CTA
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {["xs","sm","md","lg","xl"].map(s => (
                <button key={s} className={`inline-flex items-center justify-center font-medium rounded-xl bg-accent text-white transition-all ${
                  s === "xs" ? "h-7 px-2.5 text-xs rounded-lg"
                  : s === "sm" ? "h-8 px-3 text-sm rounded-lg"
                  : s === "md" ? "h-10 px-4 text-sm"
                  : s === "lg" ? "h-11 px-5 text-base"
                  : "h-12 px-6 text-base"
                }`}>
                  Size {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="font-display font-semibold text-xl mb-6 text-[var(--color-text)]">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface-card border border-surface-border rounded-2xl p-6 shadow-card">
              <p className="text-sm font-medium text-[var(--color-text-muted)] mb-1">Default Card</p>
              <p className="font-display font-semibold text-lg">Standard surface</p>
            </div>
            <div className="bg-surface-card/80 backdrop-blur-md border border-surface-border/50 rounded-2xl p-6 shadow-glass">
              <p className="text-sm font-medium text-[var(--color-text-muted)] mb-1">Glass Card</p>
              <p className="font-display font-semibold text-lg">Glassmorphism</p>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-2xl p-6">
              <p className="text-sm font-medium text-accent mb-1">Accent Card</p>
              <p className="font-display font-semibold text-lg">Highlighted state</p>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="font-display font-semibold text-xl mb-6 text-[var(--color-text)]">Badges</h2>
          <div className="glass-card p-8 flex flex-wrap gap-3">
            {[
              { label: "Beginner",     cls: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20" },
              { label: "Intermediate", cls: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20"  },
              { label: "Advanced",     cls: "bg-orange-400/10 text-orange-400 border-orange-400/20"  },
              { label: "Expert",       cls: "bg-red-400/10 text-red-400 border-red-400/20"           },
              { label: "Frontend",     cls: "bg-accent/10 text-accent border-accent/20"              },
              { label: "Backend",      cls: "bg-glow/10 text-glow border-glow/20"                   },
              { label: "New",          cls: "bg-accent text-white border-transparent"               },
            ].map(({ label, cls }) => (
              <span key={label} className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${cls}`}>
                {label}
              </span>
            ))}
          </div>
        </section>

        {/* Progress */}
        <section>
          <h2 className="font-display font-semibold text-xl mb-6 text-[var(--color-text)]">Progress</h2>
          <div className="glass-card p-8 space-y-6">
            {[
              { label: "JavaScript",  value: 78, color: "from-yellow-400 to-yellow-500" },
              { label: "React",       value: 55, color: "from-cyan-400 to-cyan-500"     },
              { label: "TypeScript",  value: 30, color: "from-blue-400 to-blue-500"     },
              { label: "System Design", value: 12, color: "from-glow to-accent"        },
            ].map(({ label, value, color }) => (
              <div key={label} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[var(--color-text)]">{label}</span>
                  <span className="text-[var(--color-text-muted)]">{value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-surface-raised overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${color} transition-all`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
