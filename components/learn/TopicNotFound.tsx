// components/learn/TopicNotFound.tsx
// Shown when a topic slug doesn't match any known topic

import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";

export function TopicNotFound({ slug }: { slug: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 rounded-2xl bg-surface-raised border border-surface-border flex items-center justify-center mb-6">
        <BookOpen className="w-8 h-8 text-[var(--color-text-muted)]" />
      </div>
      <h2 className="font-display font-bold text-2xl text-[var(--color-text)] mb-2">
        Topic not found
      </h2>
      <p className="text-[var(--color-text-muted)] mb-6 max-w-sm">
        We couldn&apos;t find a topic for{" "}
        <code className="text-accent font-mono text-sm">&quot;{slug}&quot;</code>.
        It may be coming soon or the URL may be incorrect.
      </p>
      <Link
        href="/learn"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-hover transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Browse all topics
      </Link>
    </div>
  );
}
