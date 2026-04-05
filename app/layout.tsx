// app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "@/styles/globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devforge.dev"),
  title: {
    template: "%s | DevForge",
    default: "DevForge — Master Full-Stack Development",
  },
  description:
    "The most visual, interactive platform for learning full-stack development. From beginner to senior engineer — infographic-driven, project-based, production-ready.",
  // Icons removed — files don't exist in /public, causing 404 console errors
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0A2540" },
    { media: "(prefers-color-scheme: dark)",  color: "#0d1117" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <QueryProvider>
            {children}
            <Toaster
              position="bottom-right"
              theme="dark"
              toastOptions={{
                style: {
                  background:  "#161b22",
                  border:      "1px solid #30363d",
                  color:       "#e6edf3",
                  fontFamily:  "var(--font-dm-sans)",
                },
              }}
            />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
