import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import NavHeader from "../components/NavHeader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Always More – Guilde WoW Horde",
  description:
    "Guilde World of Warcraft Horde – Always More. Raid progression, recrutement actif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0d1208" />
      </head>
      <body
        className={`${inter.variable} ${cinzel.variable} font-sans antialiased min-h-screen overflow-x-hidden`}
        style={{ background: "#0e0c09", color: "#e8d5a0" }}
      >
        {/* Fond Zandalari — jungle sombre avec lueurs dorées */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Fond noir chaud — base neutre, zéro vert */}
          <div
            className="absolute inset-0"
            style={{
              background: "#0e0c09",
            }}
          />
          {/* Reflet doré subtil en haut */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(200,145,42,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          {/* Ligne dorée de séparation nav */}
          <div
            className="absolute top-0 left-0 w-full h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(200,145,42,0.5), transparent)",
            }}
          />
        </div>

        {/* Header (Client Component — gère les interactions) */}
        <NavHeader />

        {/* Contenu principal */}
        <main className="relative z-10 min-h-[calc(100vh-64px)]">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </main>

        {/* Footer */}
        <footer
          className="relative z-10 mt-16"
          style={{
            borderTop: "1px solid rgba(200,145,42,0.2)",
            background: "rgba(10,8,5,0.95)",
          }}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <div
                  className="font-fantasy font-bold text-lg mb-1"
                  style={{
                    background: "linear-gradient(135deg, #e8b84b, #c8912a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Always More
                </div>
                <div className="text-xs" style={{ color: "#5a4a30" }}>
                  Guilde Horde – World of Warcraft
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center">
                {[
                  { href: "/", label: "Accueil" },
                  { href: "/a-propos", label: "À Propos" },
                  { href: "/roster", label: "Roster" },
                  { href: "/recrutement", label: "Recrutement" },
                  { href: "/officiers", label: "Officiers" },
                  {
                    href: "https://discord.gg/CDBrgjd4cH",
                    label: "Discord",
                    external: true,
                  },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="footer-link text-sm transition-colors"
                    style={{ color: "#5a4a30" }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div
              className="mt-6 pt-4 flex flex-col items-center gap-1"
              style={{ borderTop: "1px solid rgba(200,145,42,0.1)" }}
            >
              <div className="text-xs" style={{ color: "#3a3020" }}>
                © {new Date().getFullYear()} Always More – Tous droits réservés
              </div>
              <div className="text-xs" style={{ color: "#3a3020" }}>
                World of Warcraft est une marque déposée de Blizzard
                Entertainment, Inc.
              </div>
              <div
                className="text-xs mt-1 font-fantasy"
                style={{ color: "#5a4a30" }}
              >
                ◆ &ldquo;Zandalar forever !&rdquo; ◆
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
