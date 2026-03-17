"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Sword,
  Shield,
  Calendar,
  Target,
  Search,
  Filter,
  Eye,
  LogOut,
  Home,
  Swords,
  User,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  Clock,
  BarChart3,
  Mail,
  Phone,
  ExternalLink,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  Crown,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Types pour les candidatures
interface GuildApplication {
  id: number;
  pseudo: string;
  wowClass: string;
  wowSpec: string;
  expClass: string;
  expRaid: string;
  expTww: string;
  ilvl: number;
  raidObjective: "normal" | "heroic" | "mythic";
  availWednesday: boolean;
  availThursday: boolean;
  availFriday: boolean;
  availSaturday: boolean;
  createdAt: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
}

// Données simulées pour la démonstration
const MOCK_APPLICATIONS: GuildApplication[] = [
  {
    id: 1,
    pseudo: "Arthas",
    wowClass: "Chevalier de la mort",
    wowSpec: "Givre",
    expClass: "Expérience solide en PvE et PvP, maitrise des rotations gel.",
    expRaid:
      "Ancien raid leader, expérience mythique sur toutes les extensions.",
    expTww: "Déjà complété le raid normal en PUG.",
    ilvl: 485,
    raidObjective: "mythic",
    availWednesday: true,
    availThursday: false,
    availFriday: true,
    availSaturday: true,
    createdAt: "2024-01-15T14:30:00Z",
    status: "reviewed",
  },
  {
    id: 2,
    pseudo: "Jaina",
    wowClass: "Mage",
    wowSpec: "Arcane",
    expClass: "Spécialiste des dégâts de zone et contrôle de foule.",
    expRaid: "Expérience héroïque sur Shadowlands et Dragonflight.",
    expTww: "En progression sur le raid héroïque.",
    ilvl: 478,
    raidObjective: "heroic",
    availWednesday: true,
    availThursday: true,
    availFriday: false,
    availSaturday: true,
    createdAt: "2024-01-16T10:15:00Z",
    status: "pending",
  },
  {
    id: 3,
    pseudo: "Thrall",
    wowClass: "Chaman",
    wowSpec: "Amélioration",
    expClass: "Joueur depuis Vanilla, excellente connaissance de classe.",
    expRaid: "Tous les raids complétés en mythique jusqu'à Dragonflight.",
    expTww: "Première semaine de raid complétée.",
    ilvl: 492,
    raidObjective: "mythic",
    availWednesday: true,
    availThursday: false,
    availFriday: true,
    availSaturday: false,
    createdAt: "2024-01-17T16:45:00Z",
    status: "accepted",
  },
  {
    id: 4,
    pseudo: "Sylvanas",
    wowClass: "Chasseur",
    wowSpec: "Survie",
    expClass: "Spécialiste des donjons mythiques+.",
    expRaid: "Expérience limitée en raid, focus sur M+.",
    expTww: "Pas encore essayé le raid.",
    ilvl: 475,
    raidObjective: "normal",
    availWednesday: false,
    availThursday: false,
    availFriday: true,
    availSaturday: true,
    createdAt: "2024-01-18T09:20:00Z",
    status: "rejected",
  },
  {
    id: 5,
    pseudo: "Illidan",
    wowClass: "Chasseur de démons",
    wowSpec: "Vengeance",
    expClass: "Tank principal avec expérience sur tous les boss.",
    expRaid: "Ancien membre de guilde top 100.",
    expTww: "Déjà vu tous les mécaniques en test.",
    ilvl: 490,
    raidObjective: "mythic",
    availWednesday: true,
    availThursday: true,
    availFriday: true,
    availSaturday: true,
    createdAt: "2024-01-19T13:10:00Z",
    status: "pending",
  },
  {
    id: 6,
    pseudo: "Tyrande",
    wowClass: "Prêtre",
    wowSpec: "Sacré",
    expClass: "Healer principal avec excellente gestion des cooldowns.",
    expRaid: "Expérience en healing sur raids mythiques.",
    expTww: "Déjà healé le raid normal avec succès.",
    ilvl: 482,
    raidObjective: "heroic",
    availWednesday: true,
    availThursday: false,
    availFriday: false,
    availSaturday: true,
    createdAt: "2024-01-20T11:30:00Z",
    status: "reviewed",
  },
];

const ITEMS_PER_PAGE = 25;

export default function AdminDashboardPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<GuildApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<GuildApplication | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [classFilter, setClassFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const loadApplications = async () => {
    try {
      const response = await fetch("/api/applications", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("load_failed");
      }
      const data = await response.json();
      setApplications(data.applications || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadApplications();
  }, []);

  // Filtrer les applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.pseudo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.wowClass.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    const matchesClass = classFilter === "all" || app.wowClass === classFilter;

    return matchesSearch && matchesStatus && matchesClass;
  });

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // Statistiques
  const stats = {
    total: applications.length,
    pending: applications.filter((app) => app.status === "pending").length,
    reviewed: applications.filter((app) => app.status === "reviewed").length,
    accepted: applications.filter((app) => app.status === "accepted").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleViewDetails = (app: GuildApplication) => {
    setSelectedApp(app);
    setShowDetailsModal(true);
  };

  const handleUpdateStatus = (
    id: number,
    newStatus: GuildApplication["status"],
  ) => {
    void (async () => {
      const response = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        return;
      }

      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app)),
      );
      if (selectedApp?.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    })();
  };

  const handleDelete = (id: number) => {
    if (!confirm("Supprimer définitivement cette candidature ?")) return;
    void (async () => {
      const response = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (!response.ok) return;
      setApplications((prev) => prev.filter((app) => app.id !== id));
      setShowDetailsModal(false);
      setSelectedApp(null);
    })();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "reviewed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "accepted":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "reviewed":
        return <Eye className="w-4 h-4" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getRaidObjectiveLabel = (objective: string) => {
    switch (objective) {
      case "normal":
        return "Normal";
      case "heroic":
        return "Héroïque";
      case "mythic":
        return "Mythique";
      default:
        return objective;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-night-200">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background-card/80 backdrop-blur-lg border-b border-void py-4 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-primary-700 flex items-center justify-center mr-3">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-accent-silver">
                Tableau de bord Admin
              </h1>
              <p className="text-sm text-night-300">Gestion des candidatures</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push("/admin/compo")}
              className="flex items-center text-sm text-night-300 hover:text-accent-gold transition-colors"
            >
              <Swords className="w-4 h-4 mr-2" />
              Compo Raid
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

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-background-card/50 backdrop-blur-sm border border-void rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-night-300 mb-1">Total</p>
                <p className="text-3xl font-bold text-accent-silver">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-background-card/50 backdrop-blur-sm border border-void rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-night-300 mb-1">En attente</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {stats.pending}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-background-card/50 backdrop-blur-sm border border-void rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-night-300 mb-1">Acceptées</p>
                <p className="text-3xl font-bold text-green-400">
                  {stats.accepted}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-background-card/50 backdrop-blur-sm border border-void rounded-xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-night-300 mb-1">Rejetées</p>
                <p className="text-3xl font-bold text-red-400">
                  {stats.rejected}
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                <UserX className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-background-card/80 backdrop-blur-lg border border-void rounded-xl p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-night-200 mb-2">
                <Search className="inline-block w-4 h-4 mr-2" />
                Recherche
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-input-void border border-void rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Pseudo ou classe..."
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-night-400" />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-night-200 mb-2">
                <Filter className="inline-block w-4 h-4 mr-2" />
                Statut
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-input-void border border-void rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="reviewed">Consulté</option>
                <option value="accepted">Accepté</option>
                <option value="rejected">Rejeté</option>
              </select>
            </div>

            {/* Class Filter */}
            <div>
              <label className="block text-sm font-medium text-night-200 mb-2">
                <Sword className="inline-block w-4 h-4 mr-2" />
                Classe
              </label>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-full px-4 py-2 bg-input-void border border-void rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="all">Toutes les classes</option>
                {Array.from(
                  new Set(applications.map((app) => app.wowClass)),
                ).map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Applications Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-background-card/80 backdrop-blur-lg border border-void rounded-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-void/50">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-medium text-night-200">
                    Pseudo
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-night-200">
                    Classe & Spé
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-night-200">
                    iLvl
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-night-200">
                    Objectif
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-night-200">
                    Statut
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-night-200">
                    Date
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium text-night-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-void/30">
                {paginatedApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-void/20 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-medium text-accent-silver">
                        {app.pseudo}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        <div className="font-medium text-night-100">
                          {app.wowClass}
                        </div>
                        <div className="text-night-300">{app.wowSpec}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-2 text-accent-gold" />
                        <span className="font-bold text-accent-gold">
                          {app.ilvl}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          app.raidObjective === "mythic"
                            ? "bg-purple-500/20 text-purple-400"
                            : app.raidObjective === "heroic"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {getRaidObjectiveLabel(app.raidObjective)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}
                      >
                        {getStatusIcon(app.status)}
                        <span className="ml-2">
                          {app.status === "pending"
                            ? "En attente"
                            : app.status === "reviewed"
                              ? "Consulté"
                              : app.status === "accepted"
                                ? "Accepté"
                                : "Rejeté"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-night-300">
                      {formatDate(app.createdAt)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(app)}
                          className="p-2 text-night-300 hover:text-primary transition-colors"
                          title="Voir les détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginatedApplications.length === 0 && (
              <div className="py-12 text-center">
                <Users className="w-12 h-12 text-night-400 mx-auto mb-4 opacity-50" />
                <p className="text-night-300">Aucune candidature trouvée</p>
                <p className="text-sm text-night-400 mt-2">
                  Essayez de modifier vos filtres
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredApplications.length > 0 && (
            <div className="border-t border-void/30 px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-night-300">
                Affichage {startIndex + 1}-
                {Math.min(
                  startIndex + ITEMS_PER_PAGE,
                  filteredApplications.length,
                )}{" "}
                sur {filteredApplications.length}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 text-night-300 hover:text-accent-silver disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                          currentPage === page
                            ? "bg-primary text-white"
                            : "text-night-300 hover:bg-void/30"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 text-night-300 hover:text-accent-silver disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* Details Modal */}
      {showDetailsModal && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background-card border border-void rounded-2xl shadow-void-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-void">
                <div>
                  <h2 className="text-2xl font-bold text-accent-silver flex items-center">
                    <UserCheck className="w-6 h-6 mr-3 text-primary" />
                    Candidature de {selectedApp.pseudo}
                  </h2>
                  <p className="text-night-300 mt-1">
                    Postulée le {formatDate(selectedApp.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="p-2 text-night-300 hover:text-accent-silver transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informations de base */}
                <div>
                  <h3 className="text-lg font-bold text-accent-silver mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Informations du Joueur
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-night-300 mb-1">
                        Pseudo
                      </label>
                      <div className="px-4 py-2 bg-input-void border border-void rounded-lg">
                        {selectedApp.pseudo}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-night-300 mb-1">
                          Classe
                        </label>
                        <div className="px-4 py-2 bg-input-void border border-void rounded-lg">
                          {selectedApp.wowClass}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-night-300 mb-1">
                          Spécialisation
                        </label>
                        <div className="px-4 py-2 bg-input-void border border-void rounded-lg">
                          {selectedApp.wowSpec}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-night-300 mb-1">
                        Niveau d'objet (iLvl)
                      </label>
                      <div className="px-4 py-2 bg-input-void border border-void rounded-lg font-bold text-accent-gold">
                        {selectedApp.ilvl}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Objectifs et disponibilités */}
                <div>
                  <h3 className="text-lg font-bold text-accent-silver mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Objectifs & Disponibilités
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-night-300 mb-1">
                        Objectif de Raid
                      </label>
                      <div
                        className={`px-4 py-2 rounded-lg font-medium ${
                          selectedApp.raidObjective === "mythic"
                            ? "bg-purple-500/20 text-purple-400"
                            : selectedApp.raidObjective === "heroic"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {getRaidObjectiveLabel(selectedApp.raidObjective)}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-night-300 mb-1">
                        Disponibilités
                      </label>
                      <div className="space-y-2">
                        {[
                          {
                            day: "Mercredi",
                            available: selectedApp.availWednesday,
                          },
                          {
                            day: "Jeudi",
                            available: selectedApp.availThursday,
                          },
                          {
                            day: "Vendredi",
                            available: selectedApp.availFriday,
                          },
                          {
                            day: "Samedi",
                            available: selectedApp.availSaturday,
                          },
                        ].map((day) => (
                          <div
                            key={day.day}
                            className="flex items-center justify-between px-4 py-2 bg-input-void border border-void rounded-lg"
                          >
                            <span className="text-night-100">
                              {day.day} 21h-23h
                            </span>
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                day.available
                                  ? "bg-success/20 text-success"
                                  : "bg-destructive/20 text-destructive"
                              }`}
                            >
                              {day.available ? "Disponible" : "Non disponible"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expériences */}
                <div className="md:col-span-2">
                  <h3 className="text-lg font-bold text-accent-silver mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Expérience de Jeu
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-night-300 mb-2">
                        Expérience Classe
                      </label>
                      <div className="px-4 py-3 bg-input-void border border-void rounded-lg whitespace-pre-wrap">
                        {selectedApp.expClass}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-night-300 mb-2">
                        Expérience Raid Générale
                      </label>
                      <div className="px-4 py-3 bg-input-void border border-void rounded-lg whitespace-pre-wrap">
                        {selectedApp.expRaid}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-night-300 mb-2">
                        Expérience The War Within
                      </label>
                      <div className="px-4 py-3 bg-input-void border border-void rounded-lg whitespace-pre-wrap">
                        {selectedApp.expTww}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-void flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-night-300">Statut actuel:</span>
                  <div
                    className={`inline-flex items-center px-4 py-2 rounded-lg font-medium ${getStatusColor(selectedApp.status)}`}
                  >
                    {getStatusIcon(selectedApp.status)}
                    <span className="ml-2">
                      {selectedApp.status === "pending"
                        ? "En attente"
                        : selectedApp.status === "reviewed"
                          ? "Consulté"
                          : selectedApp.status === "accepted"
                            ? "Accepté"
                            : "Rejeté"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleDelete(selectedApp.id)}
                    title="Supprimer la candidature"
                    className="p-2 text-night-400 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateStatus(selectedApp.id, "rejected")
                    }
                    className="px-4 py-2 bg-destructive/20 text-destructive font-medium rounded-lg hover:bg-destructive/30 transition-colors"
                  >
                    Rejeter
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateStatus(selectedApp.id, "reviewed")
                    }
                    className="px-4 py-2 bg-blue-500/20 text-blue-400 font-medium rounded-lg hover:bg-blue-500/30 transition-colors"
                  >
                    Marquer comme consulté
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateStatus(selectedApp.id, "accepted")
                    }
                    className="px-4 py-2 bg-success/20 text-success font-medium rounded-lg hover:bg-success/30 transition-colors"
                  >
                    Accepter
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
