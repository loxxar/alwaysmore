"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

const ThemeContext = React.createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
}>({
  theme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = false,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(defaultTheme);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    // Appliquer la classe au document element si attribute est "class"
    if (attribute === "class") {
      const root = document.documentElement;

      // Retirer les anciennes classes de thème
      root.classList.remove("light", "dark");

      // Ajouter la classe du thème actuel
      if (theme === "system" && enableSystem) {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }

      // Désactiver les transitions si demandé
      if (disableTransitionOnChange) {
        const css = document.createElement("style");
        css.innerHTML = `
          * {
            transition: none !important;
          }
        `;
        document.head.appendChild(css);

        const forceReflow = () => document.body.offsetHeight;
        forceReflow();

        setTimeout(() => {
          document.head.removeChild(css);
        }, 1);
      }
    }
  }, [theme, attribute, enableSystem, disableTransitionOnChange]);

  // Éviter le rendu côté serveur pour éviter la mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
