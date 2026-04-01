// components/layout/Footer.tsx
// ─────────────────────────────────────────────────────────
// FOOTER COMPONENT
// Used on public/marketing pages (not inside dashboard)
// Sections: brand, product links, resources, legal
// ─────────────────────────────────────────────────────────

import Link from "next/link";
import { Zap, Github, Twitter, Youtube } from "lucide-react";
import { Divider } from "@/components/ui/Divider";

const FOOTER_LINKS = {
  Product: [
    { label: "Dashboard",   href: "/dashboard"  },
    { label: "Learn",       href: "/learn"       },
    { label: "Roadmap",     href: "/roadmap"     },
    { label: "Challenges",  href: "/challenges"  },
    { label: "Projects",    href: "/projects"    },
  ],
  Resources: [
    { label: "Documentation", href: "/docs"        },
    { label: "Blog",          href: "/blog"        },
    { label: "Changelog",     href: "/changelog"   },
    { label: "Community",     href: "/community"   },
  ],
  Company: [
    { label: "About",       href: "/about"       },
    { label: "Careers",     href: "/careers"     },
    { label: "Privacy",     href: "/privacy"     },
    { label: "Terms",       href: "/terms"       },
  ],
};

const SOCIAL_LINKS = [
  { label: "GitHub",   href: "https://github.com",  icon: Github  },
  { label: "Twitter",  href: "https://twitter.com", icon: Twitter },
  { label: "YouTube",  href: "https://youtube.com", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-surface-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Main footer content ───────────────────── */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">

          {/* Brand column — spans 2 cols on md */}
          <div className="col-span-2">
            {/* Wordmark */}
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-glow flex items-center justify-center shadow-glow-sm">
                <Zap className="w-4 h-4 text-white" fill="white" />
              </div>
              <span className="font-display font-bold text-xl gradient-text">
                DevForge
              </span>
            </Link>

            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs mb-6">
              The most visual, interactive platform for mastering full-stack
              development. From beginner to senior engineer.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center bg-surface-raised border border-surface-border text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-accent/30 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)] mb-4">
                {section}
              </p>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] animated-underline transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Divider gradient />

        {/* ── Bottom bar ───────────────────────────── */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} DevForge. Built with Next.js &amp; ☕
          </p>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
              Terms
            </Link>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-medium text-emerald-400">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
