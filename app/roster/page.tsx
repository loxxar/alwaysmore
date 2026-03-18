"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Sword,
  Shield,
  Heart,
  Target,
  BarChart3,
  Home,
  Crown,
  Shield as ShieldIcon,
  Heart as HeartIcon,
  Swords as SwordsIcon,
  User,
  AlertCircle,
  Clock,
  Zap,
} from "lucide-react";
import Link from "next/link";

// Types pour les membres de raid
interface RaidMember {
  id: number;
  pseudo: string;
  wowClass: string;
  wowSpec: string;
  ilvl?: number;
  raidObjective?: "normal" | "heroic" | "mythic";
}

// Fonction pour déterminer le rôle basé sur la spécialisation
const getRoleFromSpec = (
  spec: string,
  wowClass: string,
): "Tank" | "Heal" | "DPS" => {
  const tankSpecs = [
    "Sang",
    "Vengeance",
    "Gardien",
    "Protection",
    "Maître brasseur",
  ];
  const healSpecs = [
    "Restauration",
    "Sacré",
    "Préservation",
    "Discipline",
    "Tisse-brume",
  ];

  if (tankSpecs.includes(spec)) return "Tank";
  if (healSpecs.includes(spec)) return "Heal";
  return "DPS";
};

// État initial vide - les données seront chargées depuis l'API
let RAID_MEMBERS: RaidMember[] = [];

// Cette fonction sera appelée après le chargement des données
const calculateStats = (members: RaidMember[]) => {
  // Grouper les membres par rôle
  const membersByRole = members.reduce(
    (acc, member) => {
      const role = getRoleFromSpec(member.wowSpec, member.wowClass);
      if (!acc[role]) acc[role] = [];
      acc[role].push(member);
      return acc;
    },
    {} as Record<string, RaidMember[]>,
  );

  // Calculer les statistiques
  const totalMembers = members.length;
  const tanksCount = membersByRole["Tank"]?.length || 0;
  const healsCount = membersByRole["Heal"]?.length || 0;
  const dpsCount = membersByRole["DPS"]?.length || 0;

  // Calculer l'ilvl moyen seulement si disponible
  const membersWithIlvl = members.filter((m) => m.ilvl);
  const avgIlvl =
    membersWithIlvl.length > 0
      ? Math.round(
          membersWithIlvl.reduce((sum, member) => sum + (member.ilvl || 0), 0) /
            membersWithIlvl.length,
        )
      : 0;

  return {
    membersByRole,
    totalMembers,
    tanksCount,
    healsCount,
    dpsCount,
    avgIlvl,
  };
};

// Obtenir la couleur de rôle
const getRoleColor = (role: string) => {
  switch (role) {
    case "Tank":
      return "text-blue-400";
    case "Heal":
      return "text-green-400";
    case "DPS":
      return "text-red-400";
    default:
      return "text-night-200";
  }
};

// Obtenir l'icône de rôle
const getRoleIcon = (role: string) => {
  switch (role) {
    case "Tank":
      return <ShieldIcon className="w-4 h-4" />;
    case "Heal":
      return <HeartIcon className="w-4 h-4" />;
    case "DPS":
      return <SwordsIcon className="w-4 h-4" />;
    default:
      return <User className="w-4 h-4" />;
  }
};

// Obtenir la couleur de l'objectif raid
const getObjectiveColor = (objective: string) => {
  switch (objective) {
    case "mythic":
      return "text-purple-400";
    case "heroic":
      return "text-accent-gold";
    case "normal":
      return "text-blue-400";
    default:
      return "text-night-200";
  }
};

export default function RosterPage() {
  const [raidMembers, setRaidMembers] = useState<RaidMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [membersByRole, setMembersByRole] = useState<
    Record<string, RaidMember[]>
  >({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Charger les données depuis l'API
  useEffect(() => {
    const loadRoster = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/roster?simple=true");

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setRaidMembers(data.acceptedMembers);

          // Calculer les statistiques
          const calculatedStats = calculateStats(data.acceptedMembers);
          setStats(calculatedStats);
          setMembersByRole(calculatedStats.membersByRole);
        } else {
          // Utiliser les données de démonstration si l'API échoue
          setRaidMembers(data.acceptedMembers || []);
          const calculatedStats = calculateStats(data.acceptedMembers || []);
          setStats(calculatedStats);
          setMembersByRole(calculatedStats.membersByRole);
        }
      } catch (err) {
        console.error("Erreur lors du chargement du roster:", err);
        setError(
          "Impossible de charger la composition du raid. Veuillez réessayer plus tard.",
        );
        // Utiliser des données de démonstration en cas d'erreur
        const demoMembers = [
          {
            id: 1,
            pseudo: "Arthas",
            wowClass: "Chevalier de la mort",
            wowSpec: "Sang",
          },
          {
            id: 2,
            pseudo: "Illidan",
            wowClass: "Chasseur de démons",
            wowSpec: "Vengeance",
          },
          { id: 3, pseudo: "Tyrande", wowClass: "Prêtre", wowSpec: "Sacré" },
          { id: 4, pseudo: "Jaina", wowClass: "Mage", wowSpec: "Arcane" },
          {
            id: 5,
            pseudo: "Thrall",
            wowClass: "Chaman",
            wowSpec: "Amélioration",
          },
        ];
        setRaidMembers(demoMembers);
        const calculatedStats = calculateStats(demoMembers);
        setStats(calculatedStats);
        setMembersByRole(calculatedStats.membersByRole);
      } finally {
        setLoading(false);
      }
    };

    loadRoster();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects Midnight */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-midnight-deep via-midnight-void to-midnight-purple opacity-100"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-midnight-purple/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-midnight-blue/30 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        {/* Étoiles filantes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 left-0 w-1 h-1 bg-midnight-gold rounded-full animate-shooting-star"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-midnight-gold rounded-full animate-shooting-star delay-2000"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full midnight-portal mb-3">
            <Crown className="w-8 h-8 text-midnight-gold animate-crystal-glow" />
          </div>
          <h1 className="text-3xl md:text-4xl font-fantasy font-bold midnight-rune mb-2">
            Composition du Raid Midnight
          </h1>
          <p className="text-lg text-midnight-silver max-w-2xl mx-auto">
            Découvrez les membres de la guilde{" "}
            <span className="text-midnight-crystal font-semibold">
              Guild Always More
            </span>{" "}
            qui combattent dans les profondeurs de Midnight
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-midnight-purple via-midnight-gold to-midnight-crystal rounded-full mx-auto mt-3"></div>
        </motion.div>

        {/* Chargement/Erreur */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6"
          >
            <div className="inline-block w-12 h-12 border-4 border-midnight-crystal border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-midnight-silver">
              Chargement de la composition du raid Midnight...
            </p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-midnight-void/50 border border-midnight-purple/50 rounded-2xl p-6 mb-6 text-center midnight-shadow"
          >
            <AlertCircle className="w-10 h-10 text-midnight-crystal mx-auto mb-4" />
            <p className="text-midnight-crystal mb-2">{error}</p>
            <p className="text-midnight-silver text-sm">
              Affichage des données de démonstration
            </p>
          </motion.div>
        )}

        {/* Statistiques - seulement si les données sont chargées */}
        {!loading && stats && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-background-card/90 backdrop-blur-lg border border-midnight-purple/30 rounded-2xl p-6 shadow-void midnight-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full midnight-crystal flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-midnight-deep" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-midnight-gold">
                    {stats.totalMembers}
                  </div>
                  <div className="text-sm text-midnight-silver">
                    Membres totaux
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-background-card/90 backdrop-blur-lg border border-midnight-blue/30 rounded-2xl p-6 shadow-void midnight-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full midnight-crystal flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-midnight-deep" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-midnight-crystal">
                    {stats.tanksCount}
                  </div>
                  <div className="text-sm text-midnight-silver">Tanks</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-background-card/90 backdrop-blur-lg border border-midnight-purple/30 rounded-2xl p-6 shadow-void midnight-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full midnight-crystal flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-midnight-deep" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-midnight-crystal">
                    {stats.healsCount}
                  </div>
                  <div className="text-sm text-midnight-silver">Heals</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-background-card/90 backdrop-blur-lg border border-midnight-gold/30 rounded-2xl p-6 shadow-void midnight-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full midnight-crystal flex items-center justify-center mr-4">
                  <Sword className="w-6 h-6 text-midnight-deep" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-midnight-gold">
                    {stats.dpsCount}
                  </div>
                  <div className="text-sm text-midnight-silver">DPS</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Informations supplémentaires - seulement si les données sont chargées */}
        {!loading && stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-background-card/90 backdrop-blur-lg border border-midnight-purple/30 rounded-2xl p-6 mb-8 shadow-void midnight-shadow"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full midnight-crystal flex items-center justify-center mr-4">
                  <BarChart3 className="w-5 h-5 text-midnight-deep" />
                </div>
                <div>
                  <div className="text-lg font-bold text-midnight-silver">
                    iLvl Moyen
                  </div>
                  <div className="text-2xl font-bold text-midnight-crystal">
                    {stats.avgIlvl > 0 ? stats.avgIlvl : "N/A"}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full midnight-crystal flex items-center justify-center mr-4">
                  <Target className="w-5 h-5 text-midnight-deep" />
                </div>
                <div>
                  <div className="text-lg font-bold text-midnight-silver">
                    Objectif Raid
                  </div>
                  <div className="text-2xl font-bold text-midnight-gold">
                    NM/HM
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full midnight-crystal flex items-center justify-center mr-4">
                  <Zap className="w-5 h-5 text-midnight-deep" />
                </div>
                <div>
                  <div className="text-lg font-bold text-midnight-silver">
                    Progression
                  </div>
                  <div className="text-2xl font-bold text-midnight-crystal">
                    Actif
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Membres par rôle - seulement si les données sont chargées */}
        {!loading && Object.keys(membersByRole).length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {Object.entries(membersByRole).map(([role, members]) => (
              <motion.div key={role} variants={itemVariants}>
                <div className="flex items-center mb-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getRoleColor(role).replace("text-", "bg-")}/20`}
                  >
                    {getRoleIcon(role)}
                  </div>
                  <h2 className="text-xl font-fantasy font-bold midnight-rune">
                    {role}s{" "}
                    <span className="text-midnight-silver text-base">
                      ({members.length})
                    </span>
                  </h2>
                  <div className="ml-4 flex-1 h-px bg-gradient-to-r from-void via-primary/30 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {members.map((member) => (
                    <motion.div
                      key={member.id}
                      whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      className="bg-background-card/90 backdrop-blur-lg border border-midnight-purple/30 rounded-2xl p-4 shadow-void hover:shadow-void-xl transition-all duration-300 midnight-shadow"
                    >
                      <div className="mb-2">
                        <h3 className="text-lg font-bold text-midnight-gold mb-1">
                          {member.pseudo}
                        </h3>
                        <div className="text-sm text-midnight-silver mb-1">
                          {member.wowClass}
                        </div>
                        <div className="flex items-center mt-1">
                          <div
                            className={`text-sm font-semibold ${getRoleColor(role)} flex items-center`}
                          >
                            {getRoleIcon(role)}
                            <span className="ml-1">{member.wowSpec}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Message si pas de membres */}
        {!loading && raidMembers.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6"
          >
            <Users className="w-12 h-12 text-midnight-silver mx-auto mb-3" />
            <h3 className="text-xl font-bold text-midnight-gold mb-1">
              Aucun membre accepté
            </h3>
            <p className="text-midnight-silver">
              Aucun membre n'a encore été accepté dans la guilde.
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <div className="bg-background-card/90 backdrop-blur-lg border border-midnight-purple/30 rounded-2xl p-6 shadow-void midnight-shadow">
            <h3 className="text-xl font-fantasy font-bold midnight-rune mb-3">
              Rejoignez notre équipe
            </h3>
            <p className="text-midnight-silver mb-4 max-w-2xl mx-auto">
              Vous souhaitez combattre à nos côtés dans les raids de Midnight ?
              Postulez pour rejoindre la guilde.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-midnight-purple to-midnight-blue text-white font-bold rounded-lg shadow-void hover:shadow-void-xl transition-all duration-300"
              >
                <Home className="w-5 h-5 mr-2" />
                Retour à l'accueil
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-midnight-gold to-midnight-bronze text-midnight-deep font-bold rounded-lg shadow-void hover:shadow-void-xl transition-all duration-300"
              >
                <Target className="w-5 h-5 mr-2" />
                Postuler maintenant
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Informations de raid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 pt-6 border-t border-void/30"
        >
          <div className="text-center text-sm text-midnight-silver">
            <p className="mb-1">
              <Clock className="inline-block w-4 h-4 mr-2 text-midnight-crystal" />
              Raids : Mercredi & Vendredi • 20h30 - 23h30
            </p>
            <p>
              <Zap className="inline-block w-4 h-4 mr-2 text-midnight-gold" />
              Progression actuelle : Démarrage Midnight
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
