// app/layout.tsx
// ─────────────────────────────────────────────────────────
// ROOT LAYOUT — Application shell
// Sets up: fonts, theme, metadata, query client, toasts
// ─────────────────────────────────────────────────────────

import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "@/styles/globals.css";

// ── Font Configuration ──────────────────────────────────
// Syne: Display font — geometric, architectural, futuristic
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// DM Sans: Body font — clean, humanist, highly readable
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// JetBrains Mono: Code font — developer's choice
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// ── Metadata ────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://devforge.dev"),

  title: {
    template: "%s | DevForge",
    default: "DevForge — Master Full-Stack Development",
  },
  description:
    "The most visual, interactive platform for learning full-stack development. From beginner to senior engineer — infographic-driven, project-based, production-ready.",

  keywords: [
    "full stack development",
    "learn programming",
    "web development course",
    "React tutorial",
    "Next.js learning",
    "JavaScript",
    "TypeScript",
    "online coding",
  ],

  authors: [{ name: "DevForge Team" }],
  creator: "DevForge",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devforge.dev",
    siteName: "DevForge",
    title: "DevForge — Master Full-Stack Development",
    description: "Visual, interactive learning platform for developers.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevForge Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DevForge — Master Full-Stack Development",
    description: "Visual, interactive learning platform for developers.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

// ── Viewport ────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0A2540" },
    { media: "(prefers-color-scheme: dark)",  color: "#0d1117" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ── Root Layout Component ────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-dvh bg-mesh font-sans antialiased">
        {/* Theme Provider: dark mode by default, system-aware */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* React Query Provider */}
          <QueryProvider>
            {/* Main app content */}
            {children}

            {/* Toast notifications */}
            <Toaster
              position="bottom-right"
              theme="dark"
              toastOptions={{
                style: {
                  background: "#161b22",
                  border: "1px solid #30363d",
                  color: "#e6edf3",
                  fontFamily: "var(--font-dm-sans)",
                },
              }}
            />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
