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
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Palette WoW Midnight - Void Theme
        background: {
          DEFAULT: "#0a0614",
          secondary: "#1a0b2e",
          card: "#1e0f35",
        },
        primary: {
          DEFAULT: "#7c3aed",
          foreground: "#f3e8ff",
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        void: {
          DEFAULT: "#1a0b2e",
          light: "#2a1b4e",
          dark: "#0a0614",
          glow: "#8b5cf6",
        },
        night: {
          DEFAULT: "#0f172a",
          blue: "#1e293b",
          purple: "#2e1065",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        accent: {
          gold: "#fbbf24",
          silver: "#e2e8f0",
          bronze: "#b45309",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          void: "#4c1d95",
        },
        input: {
          DEFAULT: "hsl(var(--input))",
          void: "#2e1065",
        },
        ring: {
          DEFAULT: "hsl(var(--ring))",
          void: "#7c3aed",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: {
          DEFAULT: "#10b981",
          foreground: "#ecfdf5",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        fantasy: ["Cinzel", "serif"],
      },
      backgroundImage: {
        "void-radial":
          "radial-gradient(circle at 50% 50%, #1a0b2e 0%, #0a0614 70%)",
        "void-linear":
          "linear-gradient(135deg, #1a0b2e 0%, #2e1065 50%, #0f172a 100%)",
        "gold-gradient": "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
        "silver-gradient": "linear-gradient(135deg, #e2e8f0 0%, #94a3b8 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "void-pulse": "void-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        "void-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(124, 58, 237, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
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
        void: "0 10px 40px rgba(124, 58, 237, 0.3)",
        "void-lg": "0 20px 60px rgba(124, 58, 237, 0.4)",
        "void-xl": "0 25px 80px rgba(124, 58, 237, 0.5)",
        gold: "0 10px 40px rgba(251, 191, 36, 0.3)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    // require("tailwindcss-animate"),  // Temporairement désactivé pour le build
  ],
};

export default config;
