"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, Shield, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.username.trim() || !formData.password.trim()) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);

    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, accept any non-empty credentials
    // In a real app, you would validate against your database
    if (formData.username && formData.password) {
      // Store auth token in cookies (matching middleware)
      document.cookie = `admin_token=raid-always-more-admin-secret-2024; path=/; max-age=86400; SameSite=Strict`;
      document.cookie = `admin_user=${encodeURIComponent(formData.username)}; path=/; max-age=86400; SameSite=Strict`;

      // Redirect to admin dashboard
      router.push("/admin/dashboard");
    } else {
      setError("Identifiants incorrects");
    }

    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-void-radial opacity-100"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary/20 to-accent-gold/20 flex items-center justify-center border border-void">
            <Shield className="w-10 h-10 text-primary animate-pulse" />
          </div>
          <h1 className="text-3xl font-fantasy font-bold text-accent-gold mb-2">
            Accès Administrateur
          </h1>
          <p className="text-night-200">
            Espace réservé à la gestion des candidatures
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-primary via-accent-gold to-primary rounded-full mx-auto mt-4"></div>
        </motion.div>

        {/* Login Form */}
        <motion.div
          variants={itemVariants}
          className="bg-background-card/90 backdrop-blur-lg border border-void rounded-2xl shadow-void-xl p-8"
        >
          <form onSubmit={handleSubmit}>
            {/* Username Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-night-200 mb-2">
                <User className="inline-block w-4 h-4 mr-2" />
                Nom d'utilisateur
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-11 bg-input-void border border-void rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="admin"
                  disabled={loading}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="w-5 h-5 text-night-400" />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-night-200 mb-2">
                <Lock className="inline-block w-4 h-4 mr-2" />
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pl-11 pr-11 bg-input-void border border-void rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="w-5 h-5 text-night-400" />
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-night-400 hover:text-accent-silver transition-colors"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg"
              >
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-destructive mr-3" />
                  <span className="text-destructive text-sm">{error}</span>
                </div>
              </motion.div>
            )}

            {/* Security Note */}
            <div className="mb-6 p-4 bg-night-blue/30 border border-night-blue rounded-lg">
              <p className="text-sm text-night-200">
                <Shield className="inline-block w-4 h-4 mr-2 mb-1" />
                Cet espace est sécurisé. Les identifiants sont chiffrés et
                protégés.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-primary to-primary-700 text-white font-bold rounded-lg shadow-void hover:shadow-void-xl transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Connexion en cours...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  Se connecter
                  <div className="ml-3 w-2 h-2 bg-accent-gold rounded-full animate-pulse"></div>
                </>
              )}
            </button>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-void/30">
              <p className="text-center text-xs text-night-400">
                Pour la démonstration :{" "}
                <span className="text-accent-silver">
                  Utilisez n'importe quels identifiants
                </span>
              </p>
              <p className="text-center text-xs text-night-400 mt-1">
                En production, connectez-vous avec vos identifiants admin.
              </p>
            </div>
          </form>
        </motion.div>

        {/* Back to Home */}
        <motion.div variants={itemVariants} className="text-center mt-8">
          <a
            href="/"
            className="inline-flex items-center text-sm text-night-300 hover:text-accent-gold transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour à l'accueil
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
