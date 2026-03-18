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
        {/* Fond WoW/Xal'atath - Ténèbres du Vide */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a050f] via-[#1a0a1f] to-[#2d0a3a] opacity-100"></div>
          {/* Texture organique du Vide */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.1)_0%,transparent_50%),radial-gradient(circle_at_70%_70%,rgba(217,119,6,0.05)_0%,transparent_50%)]"></div>
          {/* Veines du Vide - Effets Xal'atath */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#d97706] to-transparent animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-32 h-1 bg-gradient-to-r from-[#8b5cf6] to-transparent rotate-45 animate-pulse delay-500"></div>
            <div className="absolute bottom-1/4 right-1/3 w-24 h-1 bg-gradient-to-l from-[#d97706] to-transparent -rotate-45 animate-pulse delay-1500"></div>
          </div>
          {/* Œil du Vide - Élément central Xal'atath */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(139,92,246,0.2)_0%,transparent_70%)] rounded-full animate-pulse-slow"></div>
            <div className="absolute inset-4 bg-[radial-gradient(circle,rgba(217,119,6,0.15)_0%,transparent_60%)] rounded-full animate-pulse-slow delay-1000"></div>
            <div className="absolute inset-8 bg-[radial-gradient(circle,rgba(139,92,246,0.1)_0%,transparent_50%)] rounded-full animate-pulse-slow delay-2000"></div>
          </div>
        </div>

        {/* Élément décoratif - Dague Xal'atath */}
        <div className="fixed top-4 right-4 z-20 hidden md:block">
          <div className="relative group">
            <div className="w-16 h-16 relative">
              {/* Lame de Xal'atath */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-gradient-to-r from-[#2d0a3a] via-[#8b5cf6] to-[#2d0a3a] rotate-45 animate-pulse"></div>
              {/* Garde de la dague */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-[#d97706] to-[#92400e] rounded-full border border-[#8b5cf6]"></div>
              {/* Œil de Xal'atath */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#8b5cf6] rounded-full animate-pulse"></div>
              {/* Effet de lueur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[radial-gradient(circle,rgba(139,92,246,0.3)_0%,transparent_70%)] rounded-full group-hover:scale-150 transition-transform duration-300"></div>
            </div>
            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-[#1a0a1f] border border-[#8b5cf6] rounded-lg px-3 py-2 text-xs text-[#cbd5e1] whitespace-nowrap">
                Xal'atath - L'Épouvante du Vide
              </div>
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
                  className="text-[#cbd5e1] hover:text-[#d97706] transition-colors flex items-center group"
                >
                  <div className="relative mr-2">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515a.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0a12.64 12.64 0 00-.617-1.25a.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057a19.9 19.9 0 005.993 3.03a.078.078 0 00.084-.028a14.09 14.09 0 001.226-1.994a.076.076 0 00-.041-.106a13.107 13.107 0 01-1.872-.892a.077.077 0 01-.008-.128a10.2 10.2 0 00.372-.292a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127a12.3 12.3 0 01-1.873.892a.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028a19.839 19.839 0 006.002-3.03a.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <div className="absolute inset-0 bg-[#8b5cf6] opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300 rounded-full"></div>
                  </div>
                  Discord
                </a>
                <a
                  href="/roster"
                  className="text-[#cbd5e1] hover:text-[#d97706] transition-colors flex items-center group"
                >
                  <div className="relative mr-2">
                    <svg
                      className="w-5 h-5"
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
                    <div className="absolute inset-0 bg-[#d97706] opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300 rounded-full"></div>
                  </div>
                  Compo Raid
                </a>
                <a
                  href="/admin/login"
                  className="text-[#cbd5e1] hover:text-[#d97706] transition-colors flex items-center group"
                >
                  <div className="relative mr-2">
                    <svg
                      className="w-5 h-5"
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
                    <div className="absolute inset-0 bg-[#8b5cf6] opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300 rounded-full"></div>
                  </div>
                  Espace Officier
                </a>
              </div>
            </nav>

            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <h1 className="text-4xl md:text-5xl font-fantasy font-bold text-center bg-gradient-to-r from-[#8b5cf6] via-[#d97706] to-[#8b5cf6] bg-clip-text text-transparent">
                  Guild Always More
                </h1>
                {/* Effet de texte corrompu */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] via-[#d97706] to-[#8b5cf6] bg-clip-text text-transparent opacity-20 blur-sm animate-pulse">
                  Guild Always More
                </div>
              </div>
              <p className="text-[#cbd5e1] text-center text-lg font-serif">
                Guilde World of Warcraft - Recrutement
              </p>
              <div className="relative w-64 h-1 mt-2">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2d0a3a] via-[#8b5cf6] to-[#2d0a3a] rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d97706] to-transparent rounded-full animate-pulse"></div>
              </div>
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
              <div className="text-sm text-[#cbd5e1]">
                © {new Date().getFullYear()} Guild Always More - Tous droits
                réservés
              </div>
              <div className="flex space-x-4">
                <a
                  href="/"
                  className="text-sm text-[#94a3b8] hover:text-[#d97706] transition-colors group"
                >
                  <span className="relative">
                    Accueil
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#d97706] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
                <a
                  href="/roster"
                  className="text-sm text-[#94a3b8] hover:text-[#d97706] transition-colors group"
                >
                  <span className="relative">
                    Composition Raid
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8b5cf6] group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </div>
            </div>
            <div className="mt-4 text-center text-xs text-[#64748b]">
              World of Warcraft et Blizzard Entertainment sont des marques
              déposées de Blizzard Entertainment, Inc.
            </div>
            <div className="mt-2 text-center text-xs text-[#94a3b8]">
              "Le Vide observe... et attend." - Xal'atath
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

                  // Effet de corruption Xal'atath sur le texte
                  const title = document.querySelector('h1');
                  if (title) {
                    const originalText = title.textContent;
                    const corruptText = originalText?.split('').map(char =>
                      Math.random() > 0.9 ? '�' : char
                    ).join('');

                    setInterval(() => {
                      if (Math.random() > 0.7) {
                        title.textContent = corruptText;
                        setTimeout(() => {
                          title.textContent = originalText;
                        }, 100);
                      }
                    }, 3000);
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
