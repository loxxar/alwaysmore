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
        // Palette Xal'atath - Ténèbres du Vide
        background: {
          DEFAULT: "#0a050f",
          secondary: "#1a0a1f",
          card: "#2d0a3a",
        },
        primary: {
          DEFAULT: "#8b5cf6",
          foreground: "#f5f3ff",
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },
        void: {
          DEFAULT: "#1a0a1f",
          light: "#2d0a3a",
          dark: "#0a050f",
          glow: "#8b5cf6",
          eye: "#7dd3fc",
          corruption: "#d97706",
          energy: "#10b981",
          blood: "#ef4444",
          shadow: "#581c87",
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
          gold: "#d97706",
          silver: "#cbd5e1",
          bronze: "#92400e",
          eye: "#7dd3fc",
          corruption: "#d97706",
          energy: "#10b981",
        },
        border: {
          DEFAULT: "hsl(var(--border))",
          void: "#8b5cf6",
        },
        input: {
          DEFAULT: "hsl(var(--input))",
          void: "#1a0a1f",
        },
        ring: {
          DEFAULT: "hsl(var(--ring))",
          void: "#8b5cf6",
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
          "radial-gradient(circle at 50% 50%, #1a0a1f 0%, #0a050f 70%)",
        "void-linear":
          "linear-gradient(135deg, #1a0a1f 0%, #2d0a3a 50%, #0f172a 100%)",
        "gold-gradient": "linear-gradient(135deg, #d97706 0%, #92400e 100%)",
        "silver-gradient": "linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)",
        "xalath-gradient":
          "linear-gradient(135deg, #8b5cf6 0%, #d97706 50%, #7dd3fc 100%)",
        "corruption-gradient":
          "linear-gradient(135deg, #1a0a1f 0%, #2d0a3a 50%, #581c87 100%)",
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
        "corruption-pulse": "corruption-pulse 3s ease-in-out infinite",
        "eye-glow": "eye-glow 4s ease-in-out infinite",
      },
      keyframes: {
        "void-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(139, 92, 246, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "corruption-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 15px rgba(217, 119, 6, 0.4)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(217, 119, 6, 0.7)",
            transform: "scale(1.05)",
          },
        },
        "eye-glow": {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(125, 211, 252, 0.3)",
            opacity: "0.7",
          },
          "50%": {
            boxShadow: "0 0 25px rgba(125, 211, 252, 0.8)",
            opacity: "1",
          },
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
        void: "0 10px 40px rgba(139, 92, 246, 0.3)",
        "void-lg": "0 20px 60px rgba(139, 92, 246, 0.4)",
        "void-xl": "0 25px 80px rgba(139, 92, 246, 0.5)",
        gold: "0 10px 40px rgba(217, 119, 6, 0.3)",
        corruption: "0 10px 40px rgba(217, 119, 6, 0.4)",
        "corruption-lg": "0 20px 60px rgba(217, 119, 6, 0.5)",
        eye: "0 10px 40px rgba(125, 211, 252, 0.3)",
        "eye-lg": "0 20px 60px rgba(125, 211, 252, 0.4)",
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
