"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Users, Calendar, Sword, Shield, Heart, ChevronRight, Star } from "lucide-react";

const GUILD_FEATURES = [
  {
    icon: Star,
    title: "Top 0,1 %",
    description: "Plusieurs joueurs de la guilde figurent parmi les meilleurs 0,1 % de leur spécialisation en Mythique+.",
    color: "#c8912a",
  },
  {
    icon: Sword,
    title: "Mythique+ au quotidien",
    description: "Keys poussées chaque soir, en guilde ou entre membres. De la +10 à la +30, tout le monde trouve son niveau.",
    color: "#c8912a",
  },
  {
    icon: Users,
    title: "Ambiance Soudée",
    description: "375 membres actifs, une communauté soudée. Aucune place pour la toxicité, toujours une clé à rejoindre.",
    color: "#3d6b2f",
  },
  {
    icon: Calendar,
    title: "Raids Réguliers",
    description: "Mercredi & Vendredi, 21h – 23h. Pour ceux qui veulent aussi tâter du contenu raid en bonne compagnie.",
    color: "#3d6b2f",
  },
  {
    icon: Shield,
    title: "Recrutement Sélectif",
    description: "On privilégie la qualité à la quantité. Chaque recrue est choisie pour son attitude autant que ses performances.",
    color: "#8b1f1f",
  },
];

const RAID_DAYS = [
  { day: "Mercredi", hours: "20h30 – 23h30", active: true },
  { day: "Vendredi", hours: "20h30 – 23h30", active: true },
];

const NEWS = [
  {
    date: "Mars 2026",
    title: "Recrutement ouvert pour Midnight",
    content: "Always More prépare activement sa composition pour le prochain raid tier. Plusieurs postes sont ouverts — consultez la page Recrutement.",
    type: "recruitment",
  },
  {
    date: "Février 2026",
    title: "Bienvenue sur le nouveau site",
    content: "Le site de la guilde Always More est désormais en ligne. Retrouvez toutes les informations sur la guilde, notre roster et le formulaire de candidature.",
    type: "news",
  },
];

export default function HomePage() {
  const [rosterCount, setRosterCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/roster?simple=true")
      .then(r => r.json())
      .then(data => {
        if (data.success && data.acceptedMembers) {
          setRosterCount(data.acceptedMembers.length);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ minHeight: "85vh", display: "flex", alignItems: "center" }}>
        {/* Background hero */}
        <div className="absolute inset-0 -z-10">
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 30%, rgba(200,145,42,0.12) 0%, transparent 60%)"
          }} />

          {/* Zul'jin — gauche */}
          <div style={{
            position: "absolute", left: 0, bottom: 0, top: 0,
            width: "38%", overflow: "hidden", pointerEvents: "none",
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 30%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 30%, transparent 100%)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://warcraft.wiki.gg/images/Zul%27jin_HotS_Art_2.jpg"
              alt="Zul'jin"
              style={{
                position: "absolute", right: 0, bottom: 0, height: "95%",
                objectFit: "contain", objectPosition: "bottom right",
                filter: "sepia(40%) hue-rotate(10deg) brightness(0.55) contrast(1.1)",
                opacity: 0.7,
              }}
            />
          </div>

          {/* Bwonsamdi — droite */}
          <div style={{
            position: "absolute", right: 0, bottom: 0, top: 0,
            width: "32%", overflow: "hidden", pointerEvents: "none",
            maskImage: "linear-gradient(to left, transparent 0%, rgba(0,0,0,0.15) 30%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, transparent 0%, rgba(0,0,0,0.15) 30%, transparent 100%)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://warcraft.wiki.gg/images/Bwonsamdi_BfA.jpg"
              alt="Bwonsamdi"
              style={{
                position: "absolute", left: 0, bottom: 0, height: "90%",
                objectFit: "contain", objectPosition: "bottom left",
                filter: "sepia(50%) hue-rotate(5deg) brightness(0.45) contrast(1.2)",
                opacity: 0.65,
              }}
            />
          </div>

          {/* Lignes décoratives */}
          <div style={{
            position: "absolute", top: "20%", left: "5%", width: "200px", height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(200,145,42,0.3), transparent)",
            transform: "rotate(-15deg)"
          }} />
          <div style={{
            position: "absolute", top: "20%", right: "5%", width: "200px", height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(200,145,42,0.3), transparent)",
            transform: "rotate(15deg)"
          }} />
          <div style={{
            position: "absolute", bottom: "15%", left: "10%", width: "150px", height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(61,107,47,0.3), transparent)",
          }} />
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          {/* Faction badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-fantasy uppercase tracking-widest"
            style={{ border: "1px solid rgba(139,31,31,0.5)", color: "#b03030", background: "rgba(139,31,31,0.1)" }}
          >
            <span>⚔</span>
            <span>Guilde Horde</span>
            <span>⚔</span>
          </motion.div>

          {/* Guild name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="font-fantasy font-bold mb-4" style={{
              fontSize: "clamp(3rem, 10vw, 6rem)",
              lineHeight: 1.05,
              background: "linear-gradient(135deg, #e8b84b 0%, #c8912a 40%, #e8d5a0 60%, #c8912a 80%, #e8b84b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              filter: "drop-shadow(0 0 30px rgba(200,145,42,0.3))",
            }}>
              Always More
            </h1>
          </motion.div>

          {/* Separateur */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div style={{ width: "80px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,145,42,0.5))" }} />
            <span style={{ color: "rgba(200,145,42,0.7)", fontSize: "0.7rem" }}>◆◆◆</span>
            <div style={{ width: "80px", height: "1px", background: "linear-gradient(90deg, rgba(200,145,42,0.5), transparent)" }} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-fantasy mb-10"
            style={{ color: "#c9b580", maxWidth: "600px", margin: "0 auto 2.5rem" }}
          >
            Guilde Mythique+ — Horde — Hyjal
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/recrutement" className="btn-zan inline-flex items-center justify-center gap-2 text-sm">
              <Sword className="w-4 h-4" />
              Postuler dans la guilde
            </Link>
            <Link href="/a-propos" className="btn-zan-secondary inline-flex items-center justify-center gap-2 text-sm">
              En savoir plus
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-12 inline-flex items-center gap-4 flex-wrap justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ background: "rgba(200,145,42,0.08)", border: "1px solid rgba(200,145,42,0.2)", color: "#c9b580" }}>
              <Users className="w-4 h-4" style={{ color: "#c8912a" }} />
              <span>375 membres dans la guilde</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ background: "rgba(200,145,42,0.08)", border: "1px solid rgba(200,145,42,0.2)", color: "#c9b580" }}>
              <Star className="w-4 h-4" style={{ color: "#c8912a" }} />
              <span>Plusieurs top 0,1 % M+</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ACTUALITÉS ────────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="zan-divider mb-10">
            <h2 className="text-2xl md:text-3xl section-title whitespace-nowrap px-4">
              Actualités
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {NEWS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-zan p-6 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-0.5 rounded-full font-fantasy"
                    style={{
                      background: item.type === "recruitment" ? "rgba(139,31,31,0.2)" : "rgba(200,145,42,0.15)",
                      color: item.type === "recruitment" ? "#b03030" : "#c8912a",
                      border: `1px solid ${item.type === "recruitment" ? "rgba(139,31,31,0.3)" : "rgba(200,145,42,0.3)"}`,
                    }}>
                    {item.type === "recruitment" ? "Recrutement" : "Nouvelle"}
                  </span>
                  <span className="text-xs" style={{ color: "#5a4a30" }}>{item.date}</span>
                </div>
                <h3 className="font-fantasy font-bold text-lg mb-2" style={{ color: "#e8d5a0" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8a7a50" }}>{item.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── POURQUOI NOUS REJOINDRE ────────────────────────── */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="zan-divider mb-10">
            <h2 className="text-2xl md:text-3xl section-title whitespace-nowrap px-4">
              Pourquoi nous rejoindre ?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUILD_FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-zan p-6 rounded-lg text-center group hover:scale-[1.02] transition-transform duration-200"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{
                    background: `rgba(${feature.color === "#c8912a" ? "200,145,42" : feature.color === "#3d6b2f" ? "61,107,47" : "139,31,31"},0.15)`,
                    border: `1px solid rgba(${feature.color === "#c8912a" ? "200,145,42" : feature.color === "#3d6b2f" ? "61,107,47" : "139,31,31"},0.3)`
                  }}>
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="font-fantasy font-bold mb-2 text-base" style={{ color: "#e8d5a0" }}>
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8a7a50" }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PLANNING DE RAID ────────────────────────────────── */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="zan-divider mb-10">
            <h2 className="text-2xl md:text-3xl section-title whitespace-nowrap px-4">
              Planning des Raids
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="card-zan rounded-lg overflow-hidden">
              <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(200,145,42,0.15)" }}>
                <p className="text-sm" style={{ color: "#8a7a50" }}>
                  En dehors du Mythique+, des raids sont organisés chaque semaine pour ceux qui le souhaitent.
                </p>
              </div>
              {RAID_DAYS.map((day, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4"
                  style={{ borderBottom: i < RAID_DAYS.length - 1 ? "1px solid rgba(200,145,42,0.1)" : "none" }}>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" style={{ color: "#c8912a" }} />
                    <span className="font-fantasy font-bold" style={{ color: "#e8d5a0" }}>{day.day}</span>
                  </div>
                  <span className="font-fantasy text-sm px-3 py-1 rounded-full"
                    style={{ color: "#e8b84b", background: "rgba(200,145,42,0.1)", border: "1px solid rgba(200,145,42,0.2)" }}>
                    {day.hours}
                  </span>
                </div>
              ))}
              <div className="px-6 py-3" style={{ background: "rgba(200,145,42,0.04)", borderTop: "1px solid rgba(200,145,42,0.1)" }}>
                <p className="text-xs text-center font-fantasy" style={{ color: "#5a4a30" }}>
                  Les invitations sont lancées 15 min avant le pull
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CTA RECRUTEMENT ─────────────────────────────────── */}
      <section className="container mx-auto px-4 py-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-lg overflow-hidden text-center p-10 md:p-16"
          style={{
            background: "linear-gradient(135deg, #1e2915 0%, #192112 100%)",
            border: "1px solid rgba(200,145,42,0.3)",
            boxShadow: "0 0 60px rgba(200,145,42,0.08), inset 0 0 60px rgba(200,145,42,0.03)",
          }}
        >
          {/* Corner decorations */}
          <div className="absolute top-3 left-3 text-xs" style={{ color: "rgba(200,145,42,0.4)" }}>◆</div>
          <div className="absolute top-3 right-3 text-xs" style={{ color: "rgba(200,145,42,0.4)" }}>◆</div>
          <div className="absolute bottom-3 left-3 text-xs" style={{ color: "rgba(200,145,42,0.4)" }}>◆</div>
          <div className="absolute bottom-3 right-3 text-xs" style={{ color: "rgba(200,145,42,0.4)" }}>◆</div>

          <Star className="w-10 h-10 mx-auto mb-4 animate-torch-flicker" style={{ color: "#c8912a" }} />
          <h2 className="text-2xl md:text-4xl section-title mb-4">
            Prêt à rejoindre la guilde ?
          </h2>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "#8a7a50" }}>
            Always More recrute des joueurs motivés et sérieux. Si tu partages notre vision du jeu en équipe,
            n&apos;hésite pas à soumettre ta candidature.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recrutement" className="btn-zan inline-flex items-center justify-center gap-2">
              <Sword className="w-4 h-4" />
              Postuler maintenant
            </Link>
            <Link href="/roster" className="btn-zan-secondary inline-flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              Voir le roster
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
