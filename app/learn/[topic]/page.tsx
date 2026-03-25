// app/learn/[topic]/page.tsx
// Dynamic route placeholder — full implementation in Phase 5

export default function TopicPage({
  params,
}: {
  params: { topic: string };
}) {
  return (
    <div className="min-h-dvh bg-mesh flex items-center justify-center">
      <div className="glass-card p-8 text-center">
        <h1 className="font-display text-2xl font-bold mb-2">
          Learning: <span className="gradient-text">{params.topic}</span>
        </h1>
        <p className="text-[var(--color-text-muted)]">Full lesson system coming in Phase 5</p>
      </div>
    </div>
  );
}

// Generate metadata dynamically per topic
export async function generateMetadata({
  params,
}: {
  params: { topic: string };
}) {
  return {
    title: `Learn ${params.topic}`,
    description: `Master ${params.topic} with DevForge's interactive learning system.`,
  };
}
