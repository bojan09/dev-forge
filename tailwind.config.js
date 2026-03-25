/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable dark mode via class strategy
  darkMode: ["class"],

  // Scan all source files for class names
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      // ─────────────────────────────────────────────
      // DESIGN TOKENS — Brand Colors
      // ─────────────────────────────────────────────
      colors: {
        // Primary brand palette
        brand: {
          DEFAULT: "#0A2540",
          50:  "#e8f0f9",
          100: "#c5d8f0",
          200: "#9fbde6",
          300: "#79a2dc",
          400: "#5e8fd4",
          500: "#437ccc",
          600: "#3068b8",
          700: "#1e52a0",
          800: "#123d87",
          900: "#0A2540",
          950: "#061628",
        },
        // Accent — electric purple
        accent: {
          DEFAULT: "#7B61FF",
          50:  "#f0edff",
          100: "#d9d1ff",
          200: "#bfb2ff",
          300: "#a593ff",
          400: "#9178ff",
          500: "#7B61FF",
          600: "#6347f5",
          700: "#4e33e0",
          800: "#3b22c4",
          900: "#2a15a8",
        },
        // Cyan accent
        glow: {
          DEFAULT: "#00C2FF",
          50:  "#e0f9ff",
          100: "#b3f0ff",
          200: "#80e7ff",
          300: "#4dddff",
          400: "#26d5ff",
          500: "#00C2FF",
          600: "#00a8dc",
          700: "#008db8",
          800: "#007394",
          900: "#005970",
        },
        // Semantic surface colors (dark theme first)
        surface: {
          DEFAULT: "#0d1117",
          card:    "#161b22",
          raised:  "#21262d",
          border:  "#30363d",
          muted:   "#8b949e",
        },
      },

      // ─────────────────────────────────────────────
      // TYPOGRAPHY — Distinctive font pairing
      // ─────────────────────────────────────────────
      fontFamily: {
        // Display: Syne — geometric, architectural
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        // Body: DM Sans — clean, modern, readable
        sans:    ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        // Code: JetBrains Mono — developer staple
        mono:    ["var(--font-jetbrains)", "Consolas", "monospace"],
      },

      // ─────────────────────────────────────────────
      // SPACING — Extended scale
      // ─────────────────────────────────────────────
      spacing: {
        "4.5": "1.125rem",
        "18":  "4.5rem",
        "22":  "5.5rem",
        "26":  "6.5rem",
        "30":  "7.5rem",
        "88":  "22rem",
        "92":  "23rem",
        "96":  "24rem",
      },

      // ─────────────────────────────────────────────
      // ANIMATIONS
      // ─────────────────────────────────────────────
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-scale": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)" },
          to:   { transform: "translateX(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(123, 97, 255, 0.3)" },
          "50%":      { boxShadow: "0 0 40px rgba(123, 97, 255, 0.6)" },
        },
        "shimmer": {
          from: { backgroundPosition: "-200% center" },
          to:   { backgroundPosition: "200% center" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-in":       "fade-in 0.4s ease-out forwards",
        "fade-in-scale": "fade-in-scale 0.3s ease-out forwards",
        "slide-in-left": "slide-in-left 0.3s ease-out forwards",
        "glow-pulse":    "glow-pulse 2s ease-in-out infinite",
        "shimmer":       "shimmer 2s linear infinite",
        "float":         "float 3s ease-in-out infinite",
      },

      // ─────────────────────────────────────────────
      // BORDER RADIUS
      // ─────────────────────────────────────────────
      borderRadius: {
        "xl":   "0.75rem",
        "2xl":  "1rem",
        "3xl":  "1.5rem",
        "4xl":  "2rem",
      },

      // ─────────────────────────────────────────────
      // BOX SHADOWS — Glassmorphism + glow effects
      // ─────────────────────────────────────────────
      boxShadow: {
        "glass":      "0 4px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        "glow-sm":    "0 0 12px rgba(123, 97, 255, 0.25)",
        "glow-md":    "0 0 24px rgba(123, 97, 255, 0.35)",
        "glow-lg":    "0 0 48px rgba(123, 97, 255, 0.4)",
        "glow-cyan":  "0 0 24px rgba(0, 194, 255, 0.35)",
        "card":       "0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)",
        "card-hover": "0 2px 8px rgba(0,0,0,0.5), 0 16px 40px rgba(0,0,0,0.4)",
        "inner-glow": "inset 0 1px 0 rgba(255,255,255,0.08)",
      },

      // ─────────────────────────────────────────────
      // BACKDROP BLUR — Glassmorphism
      // ─────────────────────────────────────────────
      backdropBlur: {
        xs: "2px",
      },

      // ─────────────────────────────────────────────
      // BACKGROUND IMAGE — Gradients & meshes
      // ─────────────────────────────────────────────
      backgroundImage: {
        "gradient-radial":      "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":       "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-brand":           "radial-gradient(at 0% 0%, #0A2540 0, transparent 50%), radial-gradient(at 100% 0%, #7B61FF22 0, transparent 50%), radial-gradient(at 100% 100%, #00C2FF11 0, transparent 50%)",
        "shimmer-gradient":     "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
        "card-gradient":        "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
      },
    },
  },

  plugins: [
    // No external plugins required — all animations defined inline above
  ],
};
