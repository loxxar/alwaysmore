"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Crown, LogOut, Home, ArrowLeft, RotateCcw } from "lucide-react";

interface GuildApplication {
  id: number;
  pseudo: string;
  wowClass: string;
  wowSpec: string;
  ilvl: number;
  status: string;
}

const CLASS_ICONS: Record<string, string> = {
  "Chasseur de démons": "https://wow.zamimg.com/images/wow/icons/medium/classicon_demonhunter.jpg",
  "Chevalier de la mort": "https://wow.zamimg.com/images/wow/icons/medium/classicon_deathknight.jpg",
  "Chaman": "https://wow.zamimg.com/images/wow/icons/medium/classicon_shaman.jpg",
  "Chasseur": "https://wow.zamimg.com/images/wow/icons/medium/classicon_hunter.jpg",
  "Démoniste": "https://wow.zamimg.com/images/wow/icons/medium/classicon_warlock.jpg",
  "Druide": "https://wow.zamimg.com/images/wow/icons/medium/classicon_druid.jpg",
  "Évocateur": "https://wow.zamimg.com/images/wow/icons/medium/classicon_evoker.jpg",
  "Guerrier": "https://wow.zamimg.com/images/wow/icons/medium/classicon_warrior.jpg",
  "Mage": "https://wow.zamimg.com/images/wow/icons/medium/classicon_mage.jpg",
  "Moine": "https://wow.zamimg.com/images/wow/icons/medium/classicon_monk.jpg",
  "Paladin": "https://wow.zamimg.com/images/wow/icons/medium/classicon_paladin.jpg",
  "Prêtre": "https://wow.zamimg.com/images/wow/icons/medium/classicon_priest.jpg",
  "Voleur": "https://wow.zamimg.com/images/wow/icons/medium/classicon_rogue.jpg",
};

const CLASS_COLORS: Record<string, string> = {
  "Chasseur de démons": "#A330C9",
  "Chevalier de la mort": "#C41E3A",
  "Chaman": "#0070DD",
  "Chasseur": "#AAD372",
  "Démoniste": "#8788EE",
  "Druide": "#FF7C0A",
  "Évocateur": "#33937F",
  "Guerrier": "#C69B3A",
  "Mage": "#3FC7EB",
  "Moine": "#00FF98",
  "Paladin": "#F48CBA",
  "Prêtre": "#FFFFFF",
  "Voleur": "#FFF468",
};

const SLOTS_PER_GROUP = 5;
const NUM_GROUPS = 8;

type Groups = Record<number, (GuildApplication | null)[]>;

export default function CompoPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<GuildApplication[]>([]);
  const [groups, setGroups] = useState<Groups>(() => {
    const initial: Groups = {};
    for (let i = 1; i <= NUM_GROUPS; i++) {
      initial[i] = Array(SLOTS_PER_GROUP).fill(null);
    }
    return initial;
  });
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragSource, setDragSource] = useState<{ group: number; slot: number } | "pool" | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/applications")
      .then((r) => r.json())
      .then((data) => setApplications(data.applications || []));

    fetch("/api/admin/compo")
      .then((r) => r.json())
      .then((data) => {
        if (data.compo) setGroups(data.compo);
      })
      .catch(() => {});
  }, []);

  const saveGroups = async (updated: Groups) => {
    setGroups(updated);
    setSaving(true);
    try {
      await fetch("/api/admin/compo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groups: updated }),
      });
    } finally {
      setSaving(false);
    }
  };

  const assignedIds = new Set(
    Object.values(groups)
      .flat()
      .filter(Boolean)
      .map((a) => a!.id),
  );

  const poolApps = applications.filter(
    (a) => a.status !== "rejected" && !assignedIds.has(a.id),
  );

  const handleDragStart = (appId: number, source: typeof dragSource) => {
    setDraggedId(appId);
    setDragSource(source);
  };

  const handleDropOnSlot = (group: number, slot: number) => {
    if (draggedId === null || dragSource === null) return;

    const app = applications.find((a) => a.id === draggedId);
    if (!app) return;

    const updated: Groups = JSON.parse(JSON.stringify(groups));

    // Remove from source
    if (dragSource !== "pool") {
      updated[dragSource.group][dragSource.slot] = null;
    }

    // Place in target (swap if occupied)
    const existing = updated[group][slot];
    updated[group][slot] = app;

    // Put displaced app back to source slot (swap)
    if (existing && dragSource !== "pool") {
      updated[dragSource.group][dragSource.slot] = existing;
    }

    saveGroups(updated);
    setDraggedId(null);
    setDragSource(null);
  };

  const handleDropOnPool = () => {
    if (draggedId === null || dragSource === null || dragSource === "pool") return;

    const updated: Groups = JSON.parse(JSON.stringify(groups));
    updated[dragSource.group][dragSource.slot] = null;
    saveGroups(updated);
    setDraggedId(null);
    setDragSource(null);
  };

  const handleReset = async () => {
    const empty: Groups = {};
    for (let i = 1; i <= NUM_GROUPS; i++) {
      empty[i] = Array(SLOTS_PER_GROUP).fill(null);
    }
    await saveGroups(empty);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background-card/80 backdrop-blur-lg border-b border-void py-4 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0 space-x-4">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="flex items-center text-sm text-night-300 hover:text-accent-gold transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Dashboard
            </button>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-primary-700 flex items-center justify-center mr-3">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-accent-silver">Composition du Raid</h1>
                <p className="text-sm text-night-300">Glisser-déposer les candidats dans les groupes</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {saving && (
              <span className="text-xs text-night-400 italic">Sauvegarde...</span>
            )}
            <button
              onClick={handleReset}
              className="flex items-center text-sm text-night-300 hover:text-accent-gold transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Réinitialiser
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex items-center text-sm text-night-300 hover:text-accent-gold transition-colors"
            >
              <Home className="w-4 h-4 mr-2" />
              Accueil
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center text-sm text-night-300 hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        {/* Pool de candidats */}
        <div
          className="bg-background-card/80 backdrop-blur-lg border border-void rounded-xl p-4 mb-8"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropOnPool}
        >
          <p className="text-sm font-medium text-night-300 mb-3">
            Candidats disponibles ({poolApps.length})
          </p>
          <div className="flex flex-wrap gap-2 min-h-[56px]">
            {poolApps.length === 0 && (
              <p className="text-sm text-night-400 italic">Tous les candidats sont placés dans des groupes</p>
            )}
            {poolApps.map((app) => (
              <PlayerToken
                key={app.id}
                app={app}
                onDragStart={() => handleDragStart(app.id, "pool")}
                isDragging={draggedId === app.id}
              />
            ))}
          </div>
        </div>

        {/* Grille des groupes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: NUM_GROUPS }, (_, i) => i + 1).map((groupNum) => (
            <div
              key={groupNum}
              className="bg-background-card/80 backdrop-blur-lg border border-void rounded-xl overflow-hidden"
            >
              <div className="bg-void/50 px-4 py-2 text-center">
                <span className="text-sm font-medium text-night-200">Groupe N° {groupNum}</span>
              </div>
              <div className="p-2 space-y-1">
                {groups[groupNum].map((app, slotIdx) => (
                  <div
                    key={slotIdx}
                    className={`h-10 rounded-lg border flex items-center px-2 transition-colors ${
                      app ? "border-void/50 bg-void/20" : "border-dashed border-void/40 bg-void/10"
                    } ${draggedId !== null && !app ? "border-primary/50 bg-primary/5" : ""}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDropOnSlot(groupNum, slotIdx)}
                  >
                    {app ? (
                      <PlayerToken
                        app={app}
                        compact
                        onDragStart={() => handleDragStart(app.id, { group: groupNum, slot: slotIdx })}
                        isDragging={draggedId === app.id}
                      />
                    ) : (
                      <span className="text-xs text-night-500 italic">Vide</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function PlayerToken({
  app,
  onDragStart,
  isDragging,
  compact = false,
}: {
  app: GuildApplication;
  onDragStart: () => void;
  isDragging: boolean;
  compact?: boolean;
}) {
  const iconUrl = CLASS_ICONS[app.wowClass] ?? CLASS_ICONS["Guerrier"];
  const color = CLASS_COLORS[app.wowClass] ?? "#FFFFFF";

  if (compact) {
    return (
      <div
        draggable
        onDragStart={onDragStart}
        title={`${app.pseudo} — ${app.wowClass} ${app.wowSpec} (${app.ilvl} iLvl)`}
        className={`flex items-center space-x-2 cursor-grab w-full ${isDragging ? "opacity-40" : ""}`}
      >
        <img
          src={iconUrl}
          alt={app.wowClass}
          className="w-6 h-6 rounded border border-void/50 flex-shrink-0"
        />
        <span className="text-xs font-medium truncate" style={{ color }}>
          {app.pseudo}
        </span>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={onDragStart}
      title={`${app.pseudo} — ${app.wowClass} ${app.wowSpec} (${app.ilvl} iLvl)`}
      className={`flex flex-col items-center cursor-grab select-none ${isDragging ? "opacity-40" : ""}`}
    >
      <div className="relative">
        <img
          src={iconUrl}
          alt={app.wowClass}
          className="w-10 h-10 rounded-lg border-2"
          style={{ borderColor: color }}
        />
      </div>
      <span className="text-xs mt-1 font-medium max-w-[48px] truncate text-center" style={{ color }}>
        {app.pseudo}
      </span>
    </div>
  );
}
