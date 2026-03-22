import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "#0d1208",
          secondary: "#111a09",
          card: "#192112",
        },
        zan: {
          darkest: "#060a04",
          dark: "#0d1208",
          base: "#111a09",
          stone: "#192112",
          moss: "#1e2915",
          hover: "#2a3a1a",
          gold: "#c8912a",
          "gold-bright": "#e8b84b",
          "gold-dark": "#7a5c18",
          green: "#3d6b2f",
          "green-light": "#4f8a3d",
          blood: "#8b1f1f",
          "blood-bright": "#b03030",
          parchment: "#e8d5a0",
          bone: "#c9b580",
          muted: "#8a7a50",
        },
        primary: {
          DEFAULT: "#c8912a",
          foreground: "#060a04",
          50: "#fdf6e3",
          100: "#f9e8b8",
          200: "#f3d07a",
          300: "#e8b84b",
          400: "#d9a030",
          500: "#c8912a",
          600: "#a87520",
          700: "#7a5c18",
          800: "#5c4412",
          900: "#3d2d0c",
        },
        border: {
          DEFAULT: "rgba(200,145,42,0.25)",
          zan: "#c8912a",
          muted: "rgba(200,145,42,0.15)",
        },
        input: { DEFAULT: "#192112", zan: "#1e2915" },
        ring: { DEFAULT: "#c8912a" },
        foreground: { DEFAULT: "#e8d5a0" },
        muted: {
          DEFAULT: "#1e2915",
          foreground: "#8a7a50",
        },
        destructive: {
          DEFAULT: "#8b1f1f",
          foreground: "#e8d5a0",
        },
        card: { DEFAULT: "#192112", foreground: "#e8d5a0" },
        popover: { DEFAULT: "#192112", foreground: "#e8d5a0" },
        secondary: { DEFAULT: "#1e2915", foreground: "#c9b580" },
        success: { DEFAULT: "#3d6b2f", foreground: "#e8d5a0" },
        zandalari: {
          deep: "#060a04",
          jungle: "#0d1208",
          stone: "#192112",
          gold: "#c8912a",
          "gold-bright": "#e8b84b",
          green: "#3d6b2f",
          blood: "#8b1f1f",
          parchment: "#e8d5a0",
          bone: "#c9b580",
          muted: "#8a7a50",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        fantasy: ["Cinzel", "serif"],
      },
      backgroundImage: {
        "zan-stone": "linear-gradient(135deg, #060a04 0%, #192112 50%, #0d1208 100%)",
        "zan-gold": "linear-gradient(135deg, #e8b84b 0%, #c8912a 50%, #7a5c18 100%)",
        "zan-card": "linear-gradient(135deg, #1e2915 0%, #192112 100%)",
        "zan-radial": "radial-gradient(ellipse at 50% 0%, #2a3a1a 0%, #0d1208 60%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "torch-flicker": "torch-flicker 3s ease-in-out infinite",
        "gold-pulse": "gold-pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "loa-breathe": "loa-breathe 4s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "torch-flicker": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "25%": { opacity: "0.85", transform: "scale(0.97)" },
          "50%": { opacity: "0.92", transform: "scale(1.02)" },
          "75%": { opacity: "0.88", transform: "scale(0.98)" },
        },
        "gold-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(200,145,42,0.3), 0 0 30px rgba(200,145,42,0.1)" },
          "50%": { boxShadow: "0 0 30px rgba(200,145,42,0.6), 0 0 60px rgba(200,145,42,0.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "loa-breathe": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.08)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      boxShadow: {
        "zan-gold": "0 8px 32px rgba(200,145,42,0.25)",
        "zan-gold-lg": "0 16px 48px rgba(200,145,42,0.35)",
        "zan-inset": "inset 0 0 40px rgba(200,145,42,0.08)",
        "zan-card": "0 4px 20px rgba(0,0,0,0.6)",
        "zan-glow": "0 0 20px rgba(200,145,42,0.4), 0 0 40px rgba(200,145,42,0.15)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};

export default config;
