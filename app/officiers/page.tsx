import Link from "next/link";

const CLASS_COLORS: Record<string, string> = {
  paladin: "#F48CBA",
  warrior: "#C69B3A",
  warlock: "#8788EE",
  "demon-hunter": "#A330C9",
};

const CLASS_ICONS: Record<string, string> = {
  paladin: "https://wow.zamimg.com/images/wow/icons/large/classicon_paladin.jpg",
  warrior: "https://wow.zamimg.com/images/wow/icons/large/classicon_warrior.jpg",
  warlock: "https://wow.zamimg.com/images/wow/icons/large/classicon_warlock.jpg",
  "demon-hunter": "https://wow.zamimg.com/images/wow/icons/large/classicon_demonhunter.jpg",
};

const CLASS_LABELS: Record<string, string> = {
  paladin: "Paladin",
  warrior: "Guerrier",
  warlock: "Démoniste",
  "demon-hunter": "Chasseur de démons",
};

const officers = [
  {
    name: "Geniale",
    classKey: "paladin",
    raiderIo: "https://raider.io/characters/eu/hyjal/Geniale",
  },
  {
    name: "Luminour",
    classKey: "warrior",
    raiderIo: "https://raider.io/characters/eu/hyjal/Luminour",
  },
  {
    name: "Hyroe",
    classKey: "warlock",
    raiderIo: "https://raider.io/characters/eu/hyjal/Hyroe",
  },
  {
    name: "Lou",
    classKey: "demon-hunter",
    raiderIo: null,
  },
];

export default function OfficiersPage() {
  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section
        className="relative py-20 text-center overflow-hidden"
        style={{
          borderBottom: "1px solid rgba(200,145,42,0.15)",
        }}
      >
        {/* Reflet doré derrière le titre */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(200,145,42,0.07) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        <div className="relative container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to right, transparent, rgba(200,145,42,0.5))" }} />
            <span style={{ color: "rgba(200,145,42,0.5)", fontSize: "0.65rem", letterSpacing: "0.3em", fontFamily: "Cinzel, serif" }}>ALWAYS MORE</span>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(to left, transparent, rgba(200,145,42,0.5))" }} />
          </div>

          <h1
            className="font-fantasy font-bold mb-4"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              background: "linear-gradient(135deg, #e8b84b 0%, #c8912a 50%, #e8b84b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Nos Officiers
          </h1>

          <p className="text-base max-w-xl mx-auto" style={{ color: "#8a7a50" }}>
            Les piliers d&apos;Always More. Sans eux, rien ne serait possible.
          </p>
        </div>
      </section>

      {/* ── OFFICIERS ── */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {officers.map((officer) => {
            const color = CLASS_COLORS[officer.classKey];
            const icon = CLASS_ICONS[officer.classKey];
            const label = CLASS_LABELS[officer.classKey];

            return (
              <div
                key={officer.name}
                className="card-zan rounded-xl p-6 flex flex-col items-center text-center gap-4 group transition-all duration-300"
                style={{
                  borderColor: `${color}30`,
                  boxShadow: `0 4px 30px rgba(0,0,0,0.4), 0 0 0 0 ${color}00`,
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
              >
                {/* Icône de classe */}
                <div
                  className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0"
                  style={{
                    boxShadow: `0 0 20px ${color}40, 0 0 0 2px ${color}50`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={icon}
                    alt={label}
                    className="w-full h-full object-cover"
                  />
                  {/* Reflet doré dans le coin */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
                    }}
                  />
                </div>

                {/* Nom */}
                <div>
                  <h2
                    className="font-fantasy font-bold text-xl mb-1"
                    style={{ color }}
                  >
                    {officer.name}
                  </h2>
                  <p className="text-xs font-fantasy" style={{ color: "rgba(200,145,42,0.6)" }}>
                    {label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#4a3a20" }}>
                    Hyjal — EU
                  </p>
                </div>

                {/* Badge Officier */}
                <div
                  className="px-3 py-1 rounded-full text-xs font-fantasy"
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}40`,
                    color,
                    letterSpacing: "0.1em",
                  }}
                >
                  ✦ Officier
                </div>

                {/* Bouton Raider.io */}
                {officer.raiderIo ? (
                  <a
                    href={officer.raiderIo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full py-2 px-4 rounded-lg text-sm font-fantasy flex items-center justify-center gap-2 transition-all duration-200"
                    style={{
                      background: "rgba(200,145,42,0.08)",
                      border: "1px solid rgba(200,145,42,0.25)",
                      color: "#c8912a",
                    }}
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    Raider.io
                  </a>
                ) : (
                  <div
                    className="mt-auto w-full py-2 px-4 rounded-lg text-sm font-fantasy text-center"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(200,145,42,0.08)",
                      color: "#3a3020",
                    }}
                  >
                    Profil privé
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SÉPARATEUR ── */}
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="zan-divider text-xs font-fantasy" style={{ color: "rgba(200,145,42,0.25)" }}>
          ◆
        </div>
      </div>

      {/* ── GUILD MASTER (discret) ── */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-3 max-w-xs mx-auto text-center opacity-60">
          <p className="text-xs font-fantasy" style={{ color: "rgba(200,145,42,0.4)", letterSpacing: "0.2em" }}>
            GUILD MASTER
          </p>

          {/* Icône mystère */}
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #1c1710, #151210)",
              border: "1px solid rgba(200,145,42,0.15)",
              fontSize: "1.8rem",
            }}
          >
            ◈
          </div>

          <p
            className="font-fantasy font-bold text-lg"
            style={{ color: "#8a7a50" }}
          >
            Loxxar
          </p>

          <p className="text-xs" style={{ color: "#3a3020" }}>
            Fondateur d&apos;Always More
          </p>
        </div>
      </section>

      {/* ── CTA Discord ── */}
      <section className="container mx-auto px-4 pb-16 text-center">
        <Link
          href="https://discord.gg/CDBrgjd4cH"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-zan inline-flex items-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          Rejoindre le Discord
        </Link>
      </section>

    </div>
  );
}
