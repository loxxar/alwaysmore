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
  title: "Raid Always More - Recrutement Guilde WoW",
  description:
    "Formulaire de recrutement pour la guilde World of Warcraft Raid Always More",
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
        {/* Fond Void avec effets de particules */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-void-radial opacity-100"></div>
          {/* Effets de particules */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] opacity-5"></div>
          {/* Lueurs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"></div>
        </div>

        {/* Élément décoratif - Épée de guilde */}
        <div className="fixed top-4 right-4 z-20 hidden md:block">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-gold to-accent-bronze rounded-lg rotate-45 animate-glow-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center rotate-[-45deg]">
              <svg
                className="w-6 h-6 text-void-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Header avec logo */}
        <header className="relative z-10 pt-8 pb-4 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <h1 className="text-4xl md:text-5xl font-fantasy font-bold text-center bg-gradient-to-r from-primary-400 to-accent-gold bg-clip-text text-transparent">
                Raid Always More
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
            <div className="mt-2 text-center text-xs text-night-300">
              Projet personnel - diffusion publique sans contact direct
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
