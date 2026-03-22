"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Users, Target, Shield, Heart, Sword, ChevronRight } from "lucide-react";

const VALUES = [
  {
    icon: Target,
    title: "Haut niveau M+",
    description: "Plusieurs membres de la guilde figurent dans le top 0,1 % de leur spécialisation. La performance est une culture, pas une contrainte.",
  },
  {
    icon: Heart,
    title: "Bonne ambiance",
    description: "Le jeu reste du jeu. On aime pousser des keys mais sans toxicité. La bienveillance prime sur les chiffres.",
  },
  {
    icon: Shield,
    title: "Régularité",
    description: "Des runs de keys organisés chaque soir. Pas d'obligation, mais toujours quelqu'un en ligne pour monter.",
  },
  {
    icon: Users,
    title: "Collectif",
    description: "375 membres actifs, pas d'ego surdimensionné. La guilde grandit ensemble, et tout le monde peut progresser.",
  },
];

const EXPECTATIONS = [
  "Connaître son personnage et sa spécialisation sur le bout des doigts",
  "Avoir son équipement entretenu (gemmes, enchantements, crafts à jour)",
  "Être disponible et partant(e) pour pousser des keys en guilde",
  "Respecter le timer — les dépasses de clé ça se travaille, pas ça s'excuse",
  "Communiquer : signaler ses dispos, ses lacunes, ses objectifs",
  "Garder une attitude positive, même quand la key dévisse",
];

const RULES = [
  "Aucune discrimination ni harcèlement d'aucune sorte",
  "Pas de blame en cours de key — on débriefe après, calmement",
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

          {/* Bloc histoire avec Vol'jin en incrustation */}
          <div className="relative">
            {/* Vol'jin — portrait à gauche, fond */}
            <div className="hidden md:block" style={{
              position: "absolute", left: "-20px", top: 0, bottom: 0, width: "140px",
              overflow: "hidden", pointerEvents: "none", zIndex: 0,
              maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 40%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 40%, transparent 100%)",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://warcraft.wiki.gg/images/Vol%27jin_The_Judgment.jpg"
                alt="Vol'jin"
                style={{
                  width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center",
                  filter: "sepia(50%) hue-rotate(10deg) brightness(0.5) contrast(1.1)",
                  opacity: 0.75,
                }}
              />
            </div>

            <div className="card-zan rounded-lg p-6 md:p-8 space-y-4" style={{ position: "relative", zIndex: 1 }}>
              <p className="leading-relaxed" style={{ color: "#c9b580" }}>
                Always More est une guilde Horde née de la passion du Mythique+. Depuis notre création, on a rassemblé
                375 membres qui partagent une même vision : progresser, toujours aller plus loin, sans jamais sacrifier
                l&apos;ambiance. Le nom dit tout.
              </p>
              <p className="leading-relaxed" style={{ color: "#8a7a50" }}>
                Chez nous, le Mythique+ est le cœur de l&apos;activité. Des keys sont poussées tous les soirs, à tous
                les niveaux. Plusieurs membres de la guilde figurent dans le top 0,1 % de leur spécialisation —
                preuve que performance et bonne humeur ne s&apos;excluent pas.
              </p>
              <p className="leading-relaxed" style={{ color: "#8a7a50" }}>
                Des raids sont également organisés chaque semaine pour ceux qui veulent varier les plaisirs.
                Mais si tu cherches avant tout une guilde où pousser du contenu en groupe, avec des gens fiables
                et motivés, tu es au bon endroit.
              </p>
            </div>
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
            <h2 className="text-xl md:text-2xl section-title whitespace-nowrap px-4">Calendrier des activités</h2>
          </div>
          <div className="card-zan rounded-lg overflow-hidden">
            <div className="grid sm:grid-cols-3">
              {[
                { day: "Tous les soirs", hours: "À partir de 18h", note: "Keys Mythique+" },
                { day: "Mercredi", hours: "20h30 – 23h30", note: "Raid guilde" },
                { day: "Vendredi", hours: "20h30 – 23h30", note: "Raid guilde" },
              ].map((day, i) => (
                <div key={i} className="p-6 flex items-center gap-4"
                  style={{ borderRight: i < 2 ? "1px solid rgba(200,145,42,0.1)" : "none" }}>
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
                Les raids sont ouverts à tous les membres — les invitations partent 15 min avant le pull.
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
