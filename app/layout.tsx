import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

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
  title: "Guild Always More - Guilde WoW Midnight",
  description:
    "Guilde World of Warcraft spécialisée dans le raid Midnight. Recrutement actif pour progression NM/HM.",
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1a0b2e" />
      </head>
      <body
        className={`${inter.variable} ${cinzel.variable} font-sans antialiased bg-background text-foreground min-h-screen overflow-x-hidden`}
      >
        {/* Fond Midnight avec effets de particules */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-midnight-deep via-midnight-void to-midnight-purple opacity-100"></div>
          {/* Effets de particules Midnight */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] opacity-10"></div>
          {/* Lueurs Midnight */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-midnight-purple/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-midnight-blue/30 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
          {/* Étoiles filantes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 left-0 w-1 h-1 bg-midnight-gold rounded-full animate-shooting-star"></div>
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-midnight-gold rounded-full animate-shooting-star delay-2000"></div>
          </div>
        </div>

        {/* Élément décoratif - Épée de guilde */}
        <div className="fixed top-4 right-4 z-20 hidden md:block">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-midnight-gold to-midnight-bronze rounded-lg rotate-45 animate-glow-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center rotate-[-45deg]">
              <svg
                className="w-6 h-6 text-midnight-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Header avec logo et navigation */}
        <header className="relative z-10 pt-4 pb-4 px-4">
          <div className="container mx-auto">
            {/* Navigation */}
            <nav className="flex justify-between items-center mb-6 pb-4 border-b border-void/30">
              <div className="text-lg font-fantasy font-bold text-accent-gold">
                <a href="/" className="hover:text-primary transition-colors">
                  Guild Always More
                </a>
              </div>
              <div className="flex space-x-6">
                <a
                  href="https://discord.gg/CDBrgjd4cH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-night-200 hover:text-accent-gold transition-colors flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515a.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0a12.64 12.64 0 00-.617-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057a19.9 19.9 0 005.993 3.03a.078.078 0 00.084-.028a14.09 14.09 0 001.226-1.994a.076.076 0 00-.041-.106a13.107 13.107 0 01-1.872-.892a.077.077 0 01-.008-.128a10.2 10.2 0 00.372-.292a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127a12.3 12.3 0 01-1.873.892a.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028a19.839 19.839 0 006.002-3.03a.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  Discord
                </a>
                <a
                  href="/roster"
                  className="text-night-200 hover:text-accent-gold transition-colors flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Compo Raid
                </a>
                <a
                  href="/admin/login"
                  className="text-night-200 hover:text-accent-gold transition-colors flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Espace Officier
                </a>
              </div>
            </nav>

            <div className="flex flex-col items-center space-y-2">
              <h1 className="text-4xl md:text-5xl font-fantasy font-bold text-center bg-gradient-to-r from-primary-400 to-accent-gold bg-clip-text text-transparent">
                Guild Always More
              </h1>
              <p className="text-night-200 text-center text-lg font-serif">
                Guilde World of Warcraft - Recrutement
              </p>
              <div className="w-48 h-1 bg-gradient-to-r from-primary-600 via-accent-gold to-primary-600 rounded-full mt-2"></div>
            </div>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="relative z-10 min-h-[calc(100vh-200px)]">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-6 px-4 border-t border-void/30 mt-12">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-night-200">
                © {new Date().getFullYear()} Raid Always More - Tous droits
                réservés
              </div>
              <div className="flex space-x-4">
                <a
                  href="/"
                  className="text-sm text-night-300 hover:text-accent-gold transition-colors"
                >
                  Accueil
                </a>
                <a
                  href="/roster"
                  className="text-sm text-night-300 hover:text-accent-gold transition-colors"
                >
                  Composition Raid
                </a>
              </div>
            </div>
            <div className="mt-4 text-center text-xs text-night-400">
              World of Warcraft et Blizzard Entertainment sont des marques
              déposées de Blizzard Entertainment, Inc.
            </div>
            <div className="mt-2 text-center text-xs text-night-300">
              © 2026 Raid Always More - Tous droits réservés
            </div>
          </div>
        </footer>

        {/* Scripts pour animations */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialiser les animations
              if (typeof window !== 'undefined') {
                window.addEventListener('load', function() {
                  // Ajouter une classe pour déclencher les animations
                  document.body.classList.add('loaded');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
