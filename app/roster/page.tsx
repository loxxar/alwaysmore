"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Sword, Shield, Heart, Target, BarChart3, Clock, AlertCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

interface RaidMember {
  id: number;
  pseudo: string;
  wowClass: string;
  wowSpec: string;
  ilvl?: number;
  raidObjective?: "normal" | "heroic" | "mythic";
}

const getRoleFromSpec = (spec: string): "Tank" | "Heal" | "DPS" => {
  if (["Sang", "Vengeance", "Gardien", "Protection", "Maître brasseur"].includes(spec)) return "Tank";
  if (["Restauration", "Sacré", "Préservation", "Discipline", "Tisse-brume"].includes(spec)) return "Heal";
  return "DPS";
};

const calculateStats = (members: RaidMember[]) => {
  const membersByRole = members.reduce((acc, member) => {
    const role = getRoleFromSpec(member.wowSpec);
    if (!acc[role]) acc[role] = [];
    acc[role].push(member);
    return acc;
  }, {} as Record<string, RaidMember[]>);

  const totalMembers = members.length;
  const tanksCount = membersByRole["Tank"]?.length || 0;
  const healsCount = membersByRole["Heal"]?.length || 0;
  const dpsCount = membersByRole["DPS"]?.length || 0;
  const membersWithIlvl = members.filter(m => m.ilvl);
  const avgIlvl = membersWithIlvl.length > 0
    ? Math.round(membersWithIlvl.reduce((sum, m) => sum + (m.ilvl || 0), 0) / membersWithIlvl.length)
    : 0;

  return { membersByRole, totalMembers, tanksCount, healsCount, dpsCount, avgIlvl };
};

const ROLE_CONFIG = {
  Tank: { color: "#4a90d9", bg: "rgba(74,144,217,0.1)", border: "rgba(74,144,217,0.3)", icon: Shield },
  Heal: { color: "#4a9d5f", bg: "rgba(74,157,95,0.1)", border: "rgba(74,157,95,0.3)", icon: Heart },
  DPS: { color: "#c84a4a", bg: "rgba(200,74,74,0.1)", border: "rgba(200,74,74,0.3)", icon: Sword },
};

export default function RosterPage() {
  const [raidMembers, setRaidMembers] = useState<RaidMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ReturnType<typeof calculateStats> | null>(null);
  const [membersByRole, setMembersByRole] = useState<Record<string, RaidMember[]>>({});

  useEffect(() => {
    const loadRoster = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/roster?simple=true");
        if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
        const data = await response.json();
        const members = data.acceptedMembers || [];
        setRaidMembers(members);
        const s = calculateStats(members);
        setStats(s);
        setMembersByRole(s.membersByRole);
      } catch {
        setError("Impossible de charger la composition du raid.");
        const demo = [
          { id: 1, pseudo: "Rokhan", wowClass: "Chaman", wowSpec: "Restauration" },
          { id: 2, pseudo: "Rezan", wowClass: "Paladin", wowSpec: "Protection" },
          { id: 3, pseudo: "Talanji", wowClass: "Prêtre", wowSpec: "Sacré" },
          { id: 4, pseudo: "Zul", wowClass: "Mage", wowSpec: "Feu" },
          { id: 5, pseudo: "Rastakhan", wowClass: "Guerrier", wowSpec: "Fureur" },
        ];
        setRaidMembers(demo);
        const s = calculateStats(demo);
        setStats(s);
        setMembersByRole(s.membersByRole);
      } finally {
        setLoading(false);
      }
    };
    loadRoster();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-xs font-fantasy uppercase tracking-widest"
            style={{ border: "1px solid rgba(200,145,42,0.3)", color: "#c8912a", background: "rgba(200,145,42,0.05)" }}>
            <Users className="w-3 h-3" />
            Composition
            <Users className="w-3 h-3" />
          </div>
          <h1 className="text-3xl md:text-5xl font-fantasy font-bold mb-4 section-title">
            Roster de Raid
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,145,42,0.4))" }} />
            <span style={{ color: "rgba(200,145,42,0.5)", fontSize: "0.6rem" }}>◆ ◆ ◆</span>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, rgba(200,145,42,0.4), transparent)" }} />
          </div>
          <p className="text-base" style={{ color: "#8a7a50" }}>
            Les membres actifs d&apos;Always More pour la saison en cours
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="loading-spinner mx-auto mb-4" />
            <p style={{ color: "#8a7a50" }}>Chargement du roster...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="card-zan rounded-lg p-6 mb-8 flex items-center gap-4"
            style={{ borderColor: "rgba(139,31,31,0.3)" }}>
            <AlertCircle className="w-8 h-8 flex-shrink-0" style={{ color: "#b03030" }} />
            <div>
              <p style={{ color: "#e8d5a0" }}>{error}</p>
              <p className="text-sm mt-1" style={{ color: "#5a4a30" }}>
                Affichage des données de démonstration.
              </p>
            </div>
          </div>
        )}

        {/* Stats cards */}
        {!loading && stats && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {[
              { label: "Membres", value: stats.totalMembers, color: "#c8912a", icon: Users },
              { label: "Tanks", value: stats.tanksCount, color: "#4a90d9", icon: Shield },
              { label: "Soigneurs", value: stats.healsCount, color: "#4a9d5f", icon: Heart },
              { label: "DPS", value: stats.dpsCount, color: "#c84a4a", icon: Sword },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="card-zan rounded-lg p-5 flex items-center gap-4"
                style={{
                  borderColor: `rgba(${
                    s.color === "#c8912a" ? "200,145,42" :
                    s.color === "#4a90d9" ? "74,144,217" :
                    s.color === "#4a9d5f" ? "74,157,95" : "200,74,74"
                  },0.25)`
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `rgba(${
                      s.color === "#c8912a" ? "200,145,42" :
                      s.color === "#4a90d9" ? "74,144,217" :
                      s.color === "#4a9d5f" ? "74,157,95" : "200,74,74"
                    },0.12)`
                  }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div>
                  <div className="text-2xl font-bold font-fantasy" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs" style={{ color: "#8a7a50" }}>{s.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Info bar */}
        {!loading && stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="card-zan rounded-lg p-4 mb-10 flex flex-wrap gap-6 justify-around"
          >
            {[
              { icon: BarChart3, label: "iLvl Moyen", value: stats.avgIlvl > 0 ? String(stats.avgIlvl) : "N/A" },
              { icon: Target, label: "Objectif", value: "NM / HM" },
              { icon: Clock, label: "Raids", value: "Mer & Ven 20h30" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <item.icon className="w-5 h-5" style={{ color: "#c8912a" }} />
                <div>
                  <div className="text-xs" style={{ color: "#5a4a30" }}>{item.label}</div>
                  <div className="font-fantasy font-bold text-sm" style={{ color: "#e8d5a0" }}>{item.value}</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Members by role */}
        {!loading && Object.keys(membersByRole).length > 0 && (
          <div className="space-y-10">
            {(["Tank", "Heal", "DPS"] as const).filter(role => membersByRole[role]?.length > 0).map(role => {
              const config = ROLE_CONFIG[role];
              const RoleIcon = config.icon;
              const members = membersByRole[role];
              return (
                <motion.div
                  key={role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {/* Role header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: config.bg, border: `1px solid ${config.border}` }}>
                      <RoleIcon className="w-4 h-4" style={{ color: config.color }} />
                    </div>
                    <h2 className="font-fantasy font-bold text-lg" style={{ color: config.color }}>
                      {role === "Tank" ? "Tanks" : role === "Heal" ? "Soigneurs" : "DPS"}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded-full"
                      style={{ color: config.color, background: config.bg, border: `1px solid ${config.border}` }}>
                      {members.length}
                    </span>
                    <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${config.border}, transparent)` }} />
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {members.map(member => (
                      <motion.div
                        key={member.id}
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.15 }}
                        className="card-zan rounded-lg p-4"
                        style={{ borderColor: config.border }}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-fantasy font-bold mb-0.5" style={{ color: "#e8d5a0" }}>
                              {member.pseudo}
                            </h3>
                            <p className="text-xs mb-1" style={{ color: "#8a7a50" }}>{member.wowClass}</p>
                            <span className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full"
                              style={{ background: config.bg, color: config.color, border: `1px solid ${config.border}` }}>
                              <RoleIcon className="w-3 h-3" />
                              {member.wowSpec}
                            </span>
                          </div>
                          {member.ilvl && (
                            <div className="text-right flex-shrink-0">
                              <div className="text-xs" style={{ color: "#5a4a30" }}>iLvl</div>
                              <div className="font-fantasy font-bold text-sm" style={{ color: "#e8b84b" }}>{member.ilvl}</div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {!loading && raidMembers.length === 0 && !error && (
          <div className="text-center py-16">
            <Users className="w-12 h-12 mx-auto mb-4" style={{ color: "#3a3020" }} />
            <h3 className="font-fantasy font-bold text-xl mb-2" style={{ color: "#e8d5a0" }}>
              Aucun membre accepté
            </h3>
            <p style={{ color: "#5a4a30" }}>La composition sera affichée ici une fois les candidatures validées.</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 rounded-lg p-8 text-center"
          style={{
            background: "linear-gradient(135deg, #1e2915 0%, #192112 100%)",
            border: "1px solid rgba(200,145,42,0.25)",
          }}
        >
          <div className="text-xs mb-3" style={{ color: "rgba(200,145,42,0.4)" }}>◆ ◆ ◆</div>
          <h3 className="font-fantasy font-bold text-xl mb-2 section-title">
            Rejoindre l&apos;équipe
          </h3>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "#8a7a50" }}>
            Tu veux combattre à nos côtés ? Always More recrute des joueurs motivés pour la progression.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recrutement" className="btn-zan inline-flex items-center justify-center gap-2">
              <Sword className="w-4 h-4" />
              Postuler maintenant
            </Link>
            <Link href="/a-propos" className="btn-zan-secondary inline-flex items-center justify-center gap-2">
              En savoir plus
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
