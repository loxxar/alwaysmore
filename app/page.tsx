"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sword,
  Shield,
  Skull,
  Users,
  Calendar,
  Target,
  Zap,
} from "lucide-react";

// Données des classes et spécialisations WoW
const WOW_CLASSES = [
  { name: "Chasseur de démons", specializations: ["Dévastation", "Vengeance"] },
  { name: "Chevalier de la mort", specializations: ["Sang", "Givre", "Impie"] },
  {
    name: "Chaman",
    specializations: ["Élémentaire", "Amélioration", "Restauration"],
  },
  {
    name: "Chasseur",
    specializations: ["Maîtrise des bêtes", "Précision", "Survie"],
  },
  {
    name: "Démoniste",
    specializations: ["Affliction", "Démonologie", "Destruction"],
  },
  {
    name: "Druide",
    specializations: ["Équilibre", "Farouche", "Gardien", "Restauration"],
  },
  {
    name: "Évocateur",
    specializations: ["Dévastation", "Préservation", "Augmentation"],
  },
  { name: "Guerrier", specializations: ["Armes", "Fureur", "Protection"] },
  { name: "Mage", specializations: ["Arcane", "Feu", "Givre"] },
  {
    name: "Moine",
    specializations: ["Maître brasseur", "Tisse-brume", "Marche-vent"],
  },
  { name: "Paladin", specializations: ["Sacré", "Protection", "Vindicte"] },
  { name: "Prêtre", specializations: ["Discipline", "Sacré", "Ombre"] },
  { name: "Voleur", specializations: ["Assassinat", "Hors-la-loi", "Finesse"] },
];

const RAID_OBJECTIVES = [
  { value: "normal", label: "Normal" },
  { value: "heroic", label: "Héroïque" },
  { value: "mythic", label: "Mythique" },
];

const AVAILABILITIES = [
  { id: "wednesday", label: "Mercredi 21h-23h" },
  { id: "friday", label: "Vendredi 21h-23h" },
  { id: "saturday", label: "Samedi 21h-23h" },
];

export default function HomePage() {
  // État du formulaire
  const [formData, setFormData] = useState({
    pseudo: "",
    wowClass: "",
    wowSpec: "",
    expClass: "",
    expRaid: "",
    expTww: "",
    ilvl: "",
    raidObjective: "normal",
    availabilities: [] as string[],
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availableSpecs, setAvailableSpecs] = useState<string[]>([]);

  // Mettre à jour les spécialisations quand la classe change
  useEffect(() => {
    if (formData.wowClass) {
      const selectedClass = WOW_CLASSES.find(
        (c) => c.name === formData.wowClass,
      );
      setAvailableSpecs(selectedClass?.specializations || []);
      // Réinitialiser la spécialisation si elle n'est plus disponible
      if (
        selectedClass &&
        !selectedClass.specializations.includes(formData.wowSpec)
      ) {
        setFormData((prev) => ({ ...prev, wowSpec: "" }));
      }
    } else {
      setAvailableSpecs([]);
      setFormData((prev) => ({ ...prev, wowSpec: "" }));
    }
  }, [formData.wowClass, formData.wowSpec]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAvailabilityChange = (availabilityId: string) => {
    setFormData((prev) => {
      const newAvailabilities = prev.availabilities.includes(availabilityId)
        ? prev.availabilities.filter((id) => id !== availabilityId)
        : [...prev.availabilities, availabilityId];
      return { ...prev, availabilities: newAvailabilities };
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.pseudo.trim()) newErrors.pseudo = "Le pseudo est requis";
    if (!formData.wowClass) newErrors.wowClass = "La classe est requise";
    if (!formData.wowSpec) newErrors.wowSpec = "La spécialisation est requise";
    if (!formData.expClass.trim())
      newErrors.expClass = "L'expérience de classe est requise";
    if (!formData.expRaid.trim())
      newErrors.expRaid = "L'expérience raid est requise";
    if (!formData.expTww.trim())
      newErrors.expTww = "L'expérience TWW est requise";
    if (!formData.ilvl || parseInt(formData.ilvl) < 1)
      newErrors.ilvl = "Le niveau d'objet est requis";
    if (formData.availabilities.length < 2) {
      newErrors.availabilities =
        "Au moins 2 soirs de disponibilité sont requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Ici, on enverrait les données à l'API
      console.log("Formulaire soumis:", formData);

      // Simulation d'envoi réussi
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          pseudo: "",
          wowClass: "",
          wowSpec: "",
          expClass: "",
          expRaid: "",
          expTww: "",
          ilvl: "",
          raidObjective: "normal",
          availabilities: [],
        });
        setAvailableSpecs([]);
      }, 3000);
    }
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
    <div className="min-h-screen py-8 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto max-w-4xl"
      >
        {/* Titre et description */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-fantasy font-bold text-accent-gold mb-4">
            <Sword className="inline-block w-8 h-8 mr-3 mb-1" />
            Rejoignez l'Élite
          </h2>
          <p className="text-night-200 text-lg max-w-2xl mx-auto">
            Postulez pour rejoindre Raid Always More, une guilde dédiée au
            contenu endgame dans l'univers du Vide. Nous recherchons des joueurs
            motivés pour conquérir les donjons mythiques+ et les raids de The
            War Within.
          </p>
        </motion.div>

        {/* Formulaire */}
        <motion.div
          variants={itemVariants}
          className="bg-background-card/80 backdrop-blur-lg border border-void rounded-2xl shadow-void-xl p-6 md:p-8"
        >
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-success/20 to-primary/20 flex items-center justify-center">
                <Zap className="w-10 h-10 text-success animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-success mb-3">
                Candidature Envoyée !
              </h3>
              <p className="text-night-200">
                Merci {formData.pseudo} ! Votre candidature a été reçue.
                <br />
                Nous reviendrons vers vous rapidement.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Section Informations Personnelles */}
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <h3 className="text-xl font-bold text-accent-silver mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Informations Personnelles
                  </h3>
                </motion.div>

                {/* Pseudo */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-night-200 mb-2">
                    Pseudo en jeu *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="pseudo"
                      value={formData.pseudo}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-input-void border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
                        errors.pseudo ? "border-destructive" : "border-void"
                      }`}
                      placeholder="Votre pseudo WoW"
                    />
                    {errors.pseudo && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.pseudo}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Classe */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-night-200 mb-2">
                    Classe *
                  </label>
                  <div className="relative">
                    <select
                      name="wowClass"
                      value={formData.wowClass}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-input-void border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none ${
                        errors.wowClass ? "border-destructive" : "border-void"
                      }`}
                    >
                      <option value="">Sélectionnez une classe</option>
                      {WOW_CLASSES.map((cls) => (
                        <option key={cls.name} value={cls.name}>
                          {cls.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Shield className="w-5 h-5 text-night-400" />
                    </div>
                    {errors.wowClass && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.wowClass}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Spécialisation */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-night-200 mb-2">
                    Spécialisation *
                  </label>
                  <div className="relative">
                    <select
                      name="wowSpec"
                      value={formData.wowSpec}
                      onChange={handleInputChange}
                      disabled={!formData.wowClass}
                      className={`w-full px-4 py-3 bg-input-void border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none ${
                        errors.wowSpec ? "border-destructive" : "border-void"
                      } ${!formData.wowClass ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <option value="">
                        {formData.wowClass
                          ? "Sélectionnez une spécialisation"
                          : "Choisissez d'abord une classe"}
                      </option>
                      {availableSpecs.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Skull className="w-5 h-5 text-night-400" />
                    </div>
                    {errors.wowSpec && (
                      <p className="mt-1 text-sm text-destructive">
                        {errors.wowSpec}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* iLvl */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-night-200 mb-2">
                    Niveau d'objet (iLvl) *
                  </label>
                  <input
                    type="number"
                    name="ilvl"
                    value={formData.ilvl}
                    onChange={handleInputChange}
                    min="1"
                    max="1000"
                    className={`w-full px-4 py-3 bg-input-void border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
                      errors.ilvl ? "border-destructive" : "border-void"
                    }`}
                    placeholder="Ex: 480"
                  />
                  {errors.ilvl && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.ilvl}
                    </p>
                  )}
                </motion.div>

                {/* Section Expérience */}
                <motion.div
                  variants={itemVariants}
                  className="md:col-span-2 mt-4"
                >
                  <h3 className="text-xl font-bold text-accent-silver mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Expérience de Jeu
                  </h3>
                </motion.div>

                {/* Expérience Classe */}
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <label className="block text-sm font-medium text-night-200 mb-2">
                    Expérience avec votre classe et spécialisation *
                    <span className="text-xs text-night-400 ml-2">
                      (Décrivez votre maîtrise, vos rotations, etc.)
                    </span>
                  </label>
                  <textarea
                    name="expClass"
                    value={formData.expClass}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-3 bg-input-void border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
                      errors.expClass ? "border-destructive" : "border-void"
                    }`}
                    placeholder="Parlez-nous de votre expérience avec cette classe..."
                  />
                  {errors.expClass && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.expClass}
                    </p>
                  )}
                </motion.div>

                {/* Expérience Raid Générale */}
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <label className="block text-sm font-medium text-night-200 mb-2">
                    Expérience Raid (Général) *
                    <span className="text-xs text-night-400 ml-2">
                      (Anciennes extensions, réalisations, etc.)
                    </span>
                  </label>
                  <textarea
                    name="expRaid"
                    value={formData.expRaid}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-3 bg-input-void border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
                      errors.expRaid ? "border-destructive" : "border-void"
                    }`}
                    placeholder="Décrivez votre expérience raid globale..."
                  />
                  {errors.expRaid && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.expRaid}
                    </p>
                  )}
                </motion.div>

                {/* Expérience TWW */}
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <label className="block text-sm font-medium text-night-200 mb-2">
                    Expérience The War Within *
                    <span className="text-xs text-night-400 ml-2">
                      (Raids, donjons, contenu de l'extension actuelle)
                    </span>
                  </label>
                  <textarea
                    name="expTww"
                    value={formData.expTww}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-3 bg-input-void border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${
                      errors.expTww ? "border-destructive" : "border-void"
                    }`}
                    placeholder="Partagez votre expérience avec le contenu TWW..."
                  />
                  {errors.expTww && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.expTww}
                    </p>
                  )}
                </motion.div>

                {/* Section Objectifs */}
                <motion.div
                  variants={itemVariants}
                  className="md:col-span-2 mt-4"
                >
                  <h3 className="text-xl font-bold text-accent-silver mb-4">
                    Objectifs & Disponibilités
                  </h3>
                </motion.div>

                {/* Objectif de Raid */}
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <label className="block text-sm font-medium text-night-200 mb-2">
                    Objectif de Raid *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {RAID_OBJECTIVES.map((obj) => (
                      <label
                        key={obj.value}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.raidObjective === obj.value
                            ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                            : "border-void hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="raidObjective"
                          value={obj.value}
                          checked={formData.raidObjective === obj.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                            formData.raidObjective === obj.value
                              ? "border-primary"
                              : "border-night-400"
                          }`}
                        >
                          {formData.raidObjective === obj.value && (
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <span className="font-medium">{obj.label}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>

                {/* Disponibilités */}
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <label className="block text-sm font-medium text-night-200 mb-2">
                    Disponibilités *
                    <span className="text-xs text-night-400 ml-2">
                      (Minimum 2 soirs requis)
                    </span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {AVAILABILITIES.map((avail) => (
                      <label
                        key={avail.id}
                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.availabilities.includes(avail.id)
                            ? "border-success bg-success/10"
                            : "border-void hover:border-success/50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.availabilities.includes(avail.id)}
                          onChange={() => handleAvailabilityChange(avail.id)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 border rounded mr-3 flex items-center justify-center ${
                            formData.availabilities.includes(avail.id)
                              ? "bg-success border-success"
                              : "border-night-400"
                          }`}
                        >
                          {formData.availabilities.includes(avail.id) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-night-300" />
                          <span>{avail.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.availabilities && (
                    <p className="mt-2 text-sm text-destructive">
                      {errors.availabilities}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-night-300">
                    Sélectionnés: {formData.availabilities.length}/3 (
                    {formData.availabilities.length >= 2
                      ? "✓ Validé"
                      : "Besoin de " +
                        (2 - formData.availabilities.length) +
                        " de plus"}
                    )
                  </p>
                </motion.div>

                {/* Bouton de soumission */}
                <motion.div
                  variants={itemVariants}
                  className="md:col-span-2 mt-8"
                >
                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary to-primary-700 text-white font-bold rounded-lg shadow-gold hover:shadow-void-xl transition-all duration-300 flex items-center justify-center group"
                  >
                    <Sword className="w-5 h-5 mr-3 transform group-hover:rotate-12 transition-transform" />
                    Soumettre ma Candidature
                    <div className="ml-3 w-2 h-2 bg-accent-gold rounded-full animate-pulse"></div>
                  </button>
                  <p className="text-center text-sm text-night-300 mt-3">
                    * Tous les champs marqués d'un astérisque sont obligatoires
                  </p>
                </motion.div>
              </div>
            </form>
          )}

          {/* Informations complémentaires */}
          {!submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-6 border-t border-void/30"
            >
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-night-300">
                <div className="mb-4 md:mb-0">
                  <p className="flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-accent-gold" />
                    Temps de réponse: 2-5 jours
                  </p>
                </div>
                <div className="mb-4 md:mb-0">
                  <p className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    Contact: Discord @recrutement
                  </p>
                </div>
                <div>
                  <p className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-success" />
                    Données sécurisées & confidentielles
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Section Informations Guilde */}
        <motion.div
          variants={itemVariants}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-background-card/50 backdrop-blur-sm border border-void rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h4 className="text-lg font-bold text-accent-silver mb-2">
              Objectifs
            </h4>
            <p className="text-night-200">
              Progression mythique, ambiance sérieuse mais détendue, entraide
              entre membres.
            </p>
          </div>

          <div className="bg-background-card/50 backdrop-blur-sm border border-void rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-success" />
            </div>
            <h4 className="text-lg font-bold text-accent-silver mb-2">
              Planning
            </h4>
            <p className="text-night-200">
              3 soirs par semaine, sessions de 2h, focus sur l'efficacité et la
              progression.
            </p>
          </div>

          <div className="bg-background-card/50 backdrop-blur-sm border border-void rounded-xl p-6">
            <div className="w-12 h-12 rounded-lg bg-accent-gold/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-accent-gold" />
            </div>
            <h4 className="text-lg font-bold text-accent-silver mb-2">
              Requis
            </h4>
            <p className="text-night-200">
              iLvl 475+, expérience raid, attitude positive, engagement sur la
              durée.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
