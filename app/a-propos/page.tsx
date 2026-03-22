"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Users, Target, Shield, Heart, Sword, ChevronRight } from "lucide-react";

const VALUES = [
  {
    icon: Target,
    title: "Progression",
    description: "Nous venons en raid préparés. Boss étudiés, logiciels de logs consultés, talents et équipements optimisés.",
  },
  {
    icon: Heart,
    title: "Bonne ambiance",
    description: "Le jeu reste du jeu. On aime progresser mais sans se prendre la tête. La bienveillance prime sur la performance brute.",
  },
  {
    icon: Shield,
    title: "Régularité",
    description: "La présence régulière est la clé. On ne demande pas la lune, mais être là quand on dit qu'on y est.",
  },
  {
    icon: Users,
    title: "Collectif",
    description: "Ici, pas d'ego surdimensionné. La progression se fait ensemble, et tout le monde compte dans l'équipe.",
  },
];

const EXPECTATIONS = [
  "Être présent aux raids sur lesquels tu t'es engagé(e)",
  "Connaître son personnage et sa spécialisation",
  "Étudier les stratégies de boss avant le raid",
  "Avoir son équipement entretenu (gemmes, enchantements)",
  "Communiquer en cas d'absence",
  "Garder une attitude positive, même sur les soirs difficiles",
];

const RULES = [
  "Aucune discrimination ni harcèlement d'aucune sorte",
  "Les loot sont distribués équitablement selon l'attendance et la performance",
  "Tout litige se règle en message privé avec un officier",
  "Les décisions des officiers sont finales",
  "Le respect des autres membres est non négociable",
];

export default function AProposPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-xs font-fantasy uppercase tracking-widest"
            style={{ border: "1px solid rgba(200,145,42,0.3)", color: "#c8912a", background: "rgba(200,145,42,0.05)" }}>
            <span>◆</span>
            La Guilde
            <span>◆</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-fantasy font-bold mb-4 section-title">
            À propos d&apos;Always More
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,145,42,0.4))" }} />
            <span style={{ color: "rgba(200,145,42,0.5)", fontSize: "0.6rem" }}>◆ ◆ ◆</span>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, rgba(200,145,42,0.4), transparent)" }} />
          </div>
        </motion.div>

        {/* Histoire */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="zan-divider mb-8">
            <h2 className="text-xl md:text-2xl section-title whitespace-nowrap px-4">Notre histoire</h2>
          </div>
          <div className="card-zan rounded-lg p-6 md:p-8 space-y-4">
            <p className="leading-relaxed" style={{ color: "#c9b580" }}>
              Always More est une guilde Horde née de la volonté commune d&apos;un groupe de joueurs de progresser
              sérieusement en raid, sans pour autant se prendre trop au sérieux. Le nom dit tout :
              on veut toujours plus — plus de progression, plus de fun, plus de cohésion d&apos;équipe.
            </p>
            <p className="leading-relaxed" style={{ color: "#8a7a50" }}>
              On n&apos;est pas une guilde semi-hardcore qui impose des heures de farm insensées. On est une guilde
              qui sait ce qu&apos;elle veut : avancer à son rythme, dans une bonne ambiance, avec des gens fiables
              et motivés. Si tu partages cette vision, tu es probablement au bon endroit.
            </p>
          </div>
        </motion.section>

        {/* Valeurs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="zan-divider mb-8">
            <h2 className="text-xl md:text-2xl section-title whitespace-nowrap px-4">Nos valeurs</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-zan rounded-lg p-6 flex gap-4"
              >
                <div className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(200,145,42,0.1)", border: "1px solid rgba(200,145,42,0.2)" }}>
                  <v.icon className="w-5 h-5" style={{ color: "#c8912a" }} />
                </div>
                <div>
                  <h3 className="font-fantasy font-bold mb-1" style={{ color: "#e8d5a0" }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#8a7a50" }}>{v.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Planning */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="zan-divider mb-8">
            <h2 className="text-xl md:text-2xl section-title whitespace-nowrap px-4">Calendrier des raids</h2>
          </div>
          <div className="card-zan rounded-lg overflow-hidden">
            <div className="grid sm:grid-cols-2">
              {[
                { day: "Mercredi", hours: "20h30 – 23h30", note: "Progression principale" },
                { day: "Vendredi", hours: "20h30 – 23h30", note: "Progression principale" },
              ].map((day, i) => (
                <div key={i} className="p-6 flex items-center gap-4"
                  style={{ borderRight: i === 0 ? "1px solid rgba(200,145,42,0.1)" : "none" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(200,145,42,0.1)", border: "1px solid rgba(200,145,42,0.25)" }}>
                    <Calendar className="w-5 h-5" style={{ color: "#c8912a" }} />
                  </div>
                  <div>
                    <div className="font-fantasy font-bold" style={{ color: "#e8d5a0" }}>{day.day}</div>
                    <div className="text-sm font-fantasy" style={{ color: "#e8b84b" }}>{day.hours}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#5a4a30" }}>{day.note}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3" style={{ background: "rgba(200,145,42,0.03)", borderTop: "1px solid rgba(200,145,42,0.1)" }}>
              <p className="text-xs text-center" style={{ color: "#5a4a30" }}>
                Objectif : Normal & Héroïque — Les invitations sont lancées 15 min avant le pull.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Ce qu'on attend */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="zan-divider mb-8">
            <h2 className="text-xl md:text-2xl section-title whitespace-nowrap px-4">Ce qu&apos;on attend</h2>
          </div>
          <div className="card-zan rounded-lg p-6 md:p-8">
            <p className="text-sm mb-5" style={{ color: "#8a7a50" }}>
              On ne demande pas l&apos;impossible, mais certaines choses sont non négociables :
            </p>
            <ul className="space-y-3">
              {EXPECTATIONS.map((exp, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#c9b580" }}>
                  <span style={{ color: "#c8912a", flexShrink: 0, marginTop: "0.1rem" }}>◆</span>
                  {exp}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Règlement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="zan-divider mb-8">
            <h2 className="text-xl md:text-2xl section-title whitespace-nowrap px-4">Règlement</h2>
          </div>
          <div className="card-zan rounded-lg p-6 md:p-8">
            <ul className="space-y-3">
              {RULES.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#c9b580" }}>
                  <span style={{ color: "#8b1f1f", flexShrink: 0, marginTop: "0.1rem" }}>◆</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center rounded-lg p-8 md:p-12"
          style={{
            background: "linear-gradient(135deg, #1e2915 0%, #192112 100%)",
            border: "1px solid rgba(200,145,42,0.25)",
          }}
        >
          <div className="text-xs mb-2" style={{ color: "rgba(200,145,42,0.4)" }}>◆ ◆ ◆</div>
          <h2 className="text-xl md:text-2xl font-fantasy font-bold mb-3 section-title">
            Convaincu(e) ?
          </h2>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "#8a7a50" }}>
            Si tu te reconnais dans nos valeurs, on t&apos;invite à soumettre ta candidature.
            On se fera un plaisir de te rencontrer sur Discord.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recrutement" className="btn-zan inline-flex items-center justify-center gap-2">
              <Sword className="w-4 h-4" />
              Postuler maintenant
            </Link>
            <a href="https://discord.gg/CDBrgjd4cH" target="_blank" rel="noopener noreferrer"
              className="btn-zan-secondary inline-flex items-center justify-center gap-2">
              Rejoindre le Discord
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
