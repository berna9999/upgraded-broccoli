import type { Config } from "tailwindcss";

// Ogni colore legge una variabile CSS (triplet "R G B") generata dal file di configurazione,
// così le utility tipo bg-primary/80 continuano a supportare l'opacità.
const token = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        background: token("background"),
        surface: token("surface"),
        foreground: token("foreground"),
        muted: token("muted"),
        primary: {
          DEFAULT: token("primary"),
          foreground: token("primary-foreground"),
        },
        secondary: token("secondary"),
        accent: token("accent"),
        border: token("border"),
        overlay: token("overlay"),
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        theme: "var(--radius)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translate3d(0, 24px, 0)" },
          to: { opacity: "1", transform: "none" },
        },
        "slow-zoom": {
          from: { transform: "scale(1.08)" },
          to: { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 1s cubic-bezier(0.2, 0.7, 0.2, 1) both",
        "slow-zoom": "slow-zoom 12s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
