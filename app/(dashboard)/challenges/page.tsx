import { Container } from "@/components/ui/Container";
export default function Page({ params }: { params?: Record<string,string> }) {
  return (
    <Container className="py-8">
      <div className="glass-card p-10 text-center">
        <p className="text-[var(--color-text-muted)]">Coming in a future phase.</p>
      </div>
    </Container>
  );
}
