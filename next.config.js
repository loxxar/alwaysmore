/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Configuration des images
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
    ],
  },

  // Configuration des polices Google
  experimental: {
    optimizeCss: true,
  },

  // Configuration des en-têtes de sécurité
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },

  // Variables d'environnement accessibles côté client
  env: {
    NEXT_PUBLIC_APP_NAME: "Raid Always More",
    NEXT_PUBLIC_APP_DESCRIPTION:
      "Formulaire de recrutement pour la guilde WoW Raid Always More",
    NEXT_PUBLIC_ADMIN_ENABLED:
      process.env.NODE_ENV === "production" ? "true" : "true",
  },

  // Configuration des redirections
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
    ];
  },

  // Configuration pour ignorer les erreurs TypeScript pendant le build
  typescript: {
    // !! ATTENTION !!
    // En production, il faut désactiver cette option pour garantir la qualité du code
    ignoreBuildErrors: process.env.NODE_ENV !== "production",
  },

  // Configuration ESLint
  eslint: {
    // Exécuter ESLint pendant le build
    ignoreDuringBuilds: process.env.NODE_ENV === "production",
  },

  // Optimisations de compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Configuration pour la production
  poweredByHeader: false,
  generateEtags: true,
  compress: true,

  // Configuration pour le développement
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;
