"use client";

// components/providers/QueryProvider.tsx
// Fix: ReactQueryDevtools imported statically was crashing SSR with
// "options.factory undefined" because the package accesses browser globals
// (window, document) at module initialization time — before any component renders.
// Solution: lazy-load it with next/dynamic + ssr:false so it NEVER enters
// the server bundle. The conditional process.env check is NOT enough —
// webpack still bundles the static import regardless of runtime conditions.

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import dynamic from "next/dynamic";

// next/dynamic with ssr:false = excluded from server bundle entirely
// This is the only way to prevent a browser-only module from crashing SSR
const ReactQueryDevtools = dynamic(
  () =>
    import("@tanstack/react-query-devtools").then(
      (mod) => mod.ReactQueryDevtools
    ),
  { ssr: false }
);

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime:            60 * 1000,
            gcTime:               5 * 60 * 1000,
            retry:                2,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
