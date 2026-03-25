// components/providers/QueryProvider.tsx
// ─────────────────────────────────────────────────────────
// TANSTACK QUERY PROVIDER
// Wraps the app to enable server-state management
// Configured with sensible defaults for a learning platform
// ─────────────────────────────────────────────────────────

"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create a stable QueryClient instance per component lifecycle
  // Using useState ensures the client is created once per mount
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Data is considered fresh for 60 seconds
            staleTime: 60 * 1000,
            // Cache data for 5 minutes after unmount
            gcTime: 5 * 60 * 1000,
            // Retry failed requests twice
            retry: 2,
            // Don't refetch when window gains focus (learning content is stable)
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Retry mutations once on failure
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Dev tools only visible in development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
