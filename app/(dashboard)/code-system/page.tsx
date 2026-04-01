"use client";
// app/(dashboard)/code-system/page.tsx — Phase 7 showcase

import { Container }        from "@/components/ui/Container";
import { CodeBlock }        from "@/components/code/CodeBlock";
import { TabbedCodeBlock }  from "@/components/code/TabbedCodeBlock";
import { DiffBlock }        from "@/components/code/DiffBlock";
import { CodeSnippet, InlineCode } from "@/components/code/InlineCode";

const JS = `async function fetchUser(id: string): Promise<UserProfile> {
  try {
    const res = await fetch(\`/api/users/\${id}\`, {
      headers: { Authorization: \`Bearer \${getToken()}\` },
    });
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return res.json();
  } catch (err) {
    console.error("Failed:", err);
    throw err;
  }
}`;

const REACT = `import { useState, useEffect } from "react";

export function UserCard({ userId }: { userId: string }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <Skeleton />;
  return <div className="card"><h2>{user?.name}</h2></div>;
}`;

const BEFORE = `function getUser(id, cb) {
  fetch('/api/users/' + id)
    .then(r => r.json())
    .then(d => cb(null, d))
    .catch(e => cb(e));
}`;

const AFTER = `async function getUser(id: string): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json();
}`;

export default function CodeSystemPage() {
  return (
    <Container className="py-6 space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-3">
          Phase 7 Complete ✓
        </div>
        <h1 className="font-display font-bold text-3xl text-[var(--color-text)] mb-2">Code Block System</h1>
        <p className="text-[var(--color-text-muted)]">
          Use <InlineCode>CodeBlock</InlineCode> for single files, <InlineCode>TabbedCodeBlock</InlineCode> for multi-file, <InlineCode>DiffBlock</InlineCode> for before/after comparisons.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-display font-semibold text-xl text-[var(--color-text)]">Terminal Snippets</h2>
        <CodeSnippet code="npm install framer-motion lucide-react" isCommand label="Install" />
        <CodeSnippet code="npx create-next-app@latest devforge --typescript --tailwind" isCommand label="Create" />
      </section>

      <section className="space-y-3">
        <h2 className="font-display font-semibold text-xl text-[var(--color-text)]">CodeBlock with line highlighting</h2>
        <CodeBlock
          code={JS}
          language="typescript"
          filename="lib/api/user.ts"
          highlightLines={[3, 4]}
          notes="Lines 3-4: always pass Authorization headers as Bearer tokens. Never hardcode them."
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-display font-semibold text-xl text-[var(--color-text)]">TabbedCodeBlock</h2>
        <TabbedCodeBlock
          title="UserCard Component"
          tabs={[
            { id:"component", filename:"UserCard.tsx", language:"tsx",        code: REACT },
            { id:"fetch",     filename:"api/user.ts",  language:"typescript", code: JS    },
          ]}
        />
      </section>

      <section className="space-y-3">
        <h2 className="font-display font-semibold text-xl text-[var(--color-text)]">DiffBlock</h2>
        <DiffBlock
          title="Modernising fetch — callbacks → async/await"
          before={{ code: BEFORE, label: "Callback style",    language: "javascript"  }}
          after={{  code: AFTER,  label: "Async/Await + TS",  language: "typescript"  }}
        />
      </section>
    </Container>
  );
}
