"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À Propos" },
  { href: "/roster", label: "Roster" },
  { href: "/recrutement", label: "Recrutement" },
];

export default function NavHeader() {
  const pathname = usePathname();

  return (
    <header
      className="relative z-20 backdrop-blur-zan sticky top-0"
      style={{
        borderBottom: "1px solid rgba(200,145,42,0.2)",
        background: "rgba(13,18,8,0.97)",
      }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="flex flex-col">
              <span
                className="font-fantasy font-bold text-xl leading-none transition-all duration-200 group-hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #e8b84b, #c8912a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Always More
              </span>
              <span
                className="text-xs font-sans"
                style={{ color: "#5a4a30", letterSpacing: "0.15em" }}
              >
                GUILDE M+ HYJAL
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-fantasy rounded transition-all duration-200"
                  style={{
                    color: isActive ? "#e8b84b" : "#8a7a50",
                    background: isActive ? "rgba(200,145,42,0.1)" : "transparent",
                    borderBottom: isActive
                      ? "1px solid rgba(200,145,42,0.4)"
                      : "1px solid transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <a
              href="https://discord.gg/CDBrgjd4cH"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-discord-btn flex items-center gap-2 px-3 py-2 rounded text-sm transition-all duration-200"
              style={{
                color: "#8a7a50",
                border: "1px solid rgba(200,145,42,0.15)",
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span className="hidden sm:inline">Discord</span>
            </a>

            <Link
              href="/admin/login"
              className="nav-officer-btn px-3 py-2 rounded text-xs transition-all duration-200"
              style={{
                color: "#3a3020",
                border: "1px solid rgba(200,145,42,0.08)",
              }}
            >
              Officier
            </Link>
          </div>
        </nav>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-2 pb-3 overflow-x-auto">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-xs font-fantasy whitespace-nowrap rounded flex-shrink-0"
                style={{
                  color: isActive ? "#e8b84b" : "#8a7a50",
                  border: isActive
                    ? "1px solid rgba(200,145,42,0.4)"
                    : "1px solid rgba(200,145,42,0.15)",
                  background: isActive ? "rgba(200,145,42,0.08)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
