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
  Moon,
  Star,
  Sparkles,
  Gem,
  Eye,
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

// Éléments décoratifs Midnight
const XALATATH_ELEMENTS = [
  { icon: Skull, color: "text-[#8b5cf6]", label: "Crâne du Vide" },
  { icon: Eye, color: "text-[#7dd3fc]", label: "Œil de Xal'atath" },
  { icon: Sword, color: "text-[#d97706]", label: "Lame Corrompue" },
  {
    icon: Zap,
    color: "text-[#10b981]",
    label: "Énergie du Néant",
  },
];

const RAID_OBJECTIVES = [
  { value: "normal", label: "Normal" },
  { value: "heroic", label: "Héroïque" },
  { value: "mythic", label: "Mythique" },
];

// Citations Xal'atath
const XALATATH_QUOTES = [
  "Le Vide observe... et attend.",
  "Votre âme sera un ajout précieux à ma collection.",
  "Dans les ténèbres, je vois tout. Dans le silence, j'entends tout.",
  "La corruption est un cadeau, pas une malédiction.",
  "Les faibles périssent, les forts servent le Vide.",
  "Chaque battement de cœur est une promesse de pouvoir.",
  "L'ancienne magie coule dans vos veines, je le sens.",
  "Le Néant n'oublie pas, et il n'absout jamais.",
];

const AVAILABILITIES = [
  { id: "wednesday", label: "Mercredi 21h-23h" },
  { id: "thursday", label: "Jeudi 21h-23h" },
  { id: "friday", label: "Vendredi 21h-23h" },
  { id: "saturday", label: "Samedi 21h-23h" },
];

export default function HomePage() {
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
  const [midnightQuote, setMidnightQuote] = useState("");
  const [crystalRotation, setCrystalRotation] = useState(0);

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (validateForm()) {
      try {
        setSubmitting(true);
        const response = await fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("submit_failed");
        }

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
      } catch {
        setSubmitError("Impossible d'envoyer la candidature");
      } finally {
        setSubmitting(false);
      }
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Éléments décoratifs Xal'atath */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Yeux du Vide */}
        <div className="absolute top-1/4 left-10 w-6 h-6">
          <div className="w-full h-full bg-[radial-gradient(circle,rgba(139,92,246,0.3)_0%,transparent_70%)] rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#8b5cf6] rounded-full"></div>
        </div>
        <div className="absolute top-1/3 right-20 w-8 h-8">
          <div className="w-full h-full bg-[radial-gradient(circle,rgba(217,119,6,0.3)_0%,transparent_70%)] rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#d97706] rounded-full"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-10 h-10">
          <div className="w-full h-full bg-[radial-gradient(circle,rgba(139,92,246,0.4)_0%,transparent_70%)] rounded-full animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#7dd3fc] rounded-full"></div>
        </div>
        {/* Veines de corruption */}
        <div className="absolute top-0 left-1/3 w-1 h-20 bg-gradient-to-b from-transparent via-[#8b5cf6] to-transparent animate-pulse delay-500"></div>
        <div className="absolute bottom-0 right-1/4 w-1 h-24 bg-gradient-to-t from-transparent via-[#d97706] to-transparent animate-pulse delay-1500"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container mx-auto max-w-4xl"
      >
        {/* Titre et description */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#1a0a1f] to-[#2d0a3a] border border-[#8b5cf6]/30 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(139,92,246,0.3),rgba(217,119,6,0.2),transparent)] animate-[spin_10s_linear_infinite]"></div>
            <Skull className="w-10 h-10 text-[#cbd5e1] relative z-10" />
          </div>
          <h2 className="text-3xl md:text-4xl font-fantasy font-bold mb-4">
            <div className="inline-flex items-center">
              <Sword className="inline-block w-8 h-8 mr-3 mb-1 text-[#d97706]" />
              <span className="bg-gradient-to-r from-[#8b5cf6] via-[#d97706] to-[#8b5cf6] bg-clip-text text-transparent">
                Rejoignez les Serviteurs du Vide
              </span>
            </div>
          </h2>
          <div className="max-w-2xl mx-auto mb-6">
            <p className="text-night-200 text-lg mb-4">
              Postulez pour rejoindre le raid Midnight. Les places seront
              limitées et une sélection sera faite à l'entrée, car nous ne
              pourrons malheureusement pas accueillir tout le monde. Merci de
              prendre le temps de répondre sérieusement à toutes les questions
              du formulaire : les candidatures incomplètes ne pourront pas être
              étudiées.
            </p>
            <div className="bg-gradient-to-r from-[#1a0a1f]/50 to-[#2d0a3a]/50 border border-[#8b5cf6]/30 rounded-xl p-4 mt-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#8b5cf6] to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-transparent via-[#d97706] to-transparent"></div>
              <div className="flex items-center justify-center mb-2 relative z-10">
                <Eye className="w-4 h-4 text-[#7dd3fc] mr-2 animate-pulse" />
                <p className="text-[#cbd5e1] italic text-center">
                  "
                  {
                    XALATATH_QUOTES[
                      Math.floor(Math.random() * XALATATH_QUOTES.length)
                    ]
                  }
                  "
                </p>
              </div>
            </div>
          </div>

          {/* Éléments Xal'atath */}
          <div className="flex justify-center space-x-6 mt-6">
            {XALATATH_ELEMENTS.map((element, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#1a0a1f] to-[#2d0a3a] border border-[#8b5cf6]/30 flex items-center justify-center mb-2 relative overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-transparent via-${element.color.replace("text-[", "").replace("]", "")}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>
                  <element.icon
                    className={`w-6 h-6 relative z-10 ${element.color}`}
                  />
                </div>
                <span className="text-xs text-[#cbd5e1] group-hover:text-[#d97706] transition-colors">
                  {element.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Formulaire */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-[#1a0a1f]/80 to-[#2d0a3a]/80 backdrop-blur-lg border border-[#8b5cf6]/30 rounded-2xl shadow-2xl shadow-[#8b5cf6]/20 p-6 md:p-8 relative overflow-hidden"
        >
          {/* Effets de bordure Xal'atath */}
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-transparent via-[#8b5cf6] to-transparent"></div>
          <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-transparent via-[#d97706] to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#d97706] to-transparent"></div>
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#10b981]/20 to-[#8b5cf6]/20 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(16,185,129,0.3),rgba(139,92,246,0.2),transparent)] animate-[spin_5s_linear_infinite]"></div>
                <Zap className="w-10 h-10 text-[#10b981] animate-pulse relative z-10" />
              </div>
              <h3 className="text-2xl font-bold text-[#10b981] mb-3">
                Candidature Acceptée par le Vide
              </h3>
              <p className="text-[#cbd5e1]">
                Merci {formData.pseudo} ! Votre âme a été enregistrée.
                <br />
                Xal'atath observe votre progression...
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Section Informations Personnelles */}
                <motion.div variants={itemVariants} className="md:col-span-2">
                  <h3 className="text-xl font-bold text-[#cbd5e1] mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-[#8b5cf6]" />
                    Informations du Serviteur
                  </h3>
                </motion.div>

                {/* Pseudo */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                    Nom du Serviteur *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="pseudo"
                      value={formData.pseudo}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-[#1a0a1f] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/50 focus:border-[#8b5cf6] transition-all ${
                        errors.pseudo
                          ? "border-[#ef4444]"
                          : "border-[#8b5cf6]/30"
                      }`}
                      placeholder="Le nom que porte votre âme"
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
                  <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                    Voie de Puissance *
                  </label>
                  <div className="relative">
                    <select
                      name="wowClass"
                      value={formData.wowClass}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-[#1a0a1f] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/50 focus:border-[#8b5cf6] transition-all appearance-none ${
                        errors.wowClass
                          ? "border-[#ef4444]"
                          : "border-[#8b5cf6]/30"
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
                      <Shield className="w-5 h-5 text-[#8b5cf6]" />
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
                  <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                    Art de la Corruption *
                  </label>
                  <div className="relative">
                    <select
                      name="wowSpec"
                      value={formData.wowSpec}
                      onChange={handleInputChange}
                      disabled={!formData.wowClass}
                      className={`w-full px-4 py-3 bg-[#1a0a1f] border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/50 focus:border-[#8b5cf6] transition-all appearance-none ${
                        errors.wowSpec
                          ? "border-[#ef4444]"
                          : "border-[#8b5cf6]/30"
                      } ${!formData.wowClass ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      <option value="">
                        {formData.wowClass
                          ? "Choisissez votre art de la corruption"
                          : "Choisissez d'abord une voie de puissance"}
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
                  <label className="block text-sm font-medium text-[#cbd5e1] mb-2">
                    Puissance de l'Âme (iLvl) *
                  </label>
                  <input
                    type="number"
                    name="ilvl"
                    value={formData.ilvl}
                    onChange={handleInputChange}
                    min="1"
                    max="1000"
                    className={`w-full px-4 py-3 bg-[#1a0a1f] border border-[#8b5cf6]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/50 focus:border-[#8b5cf6] transition-all ${
                      errors.ilvl ? "border-[#ef4444]" : "border-[#8b5cf6]/30"
                    }`}
                    placeholder="Ex: 520 (la puissance de votre âme)"
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
                    Sélectionnés: {formData.availabilities.length}/4 (
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
                  {submitError && (
                    <p className="mb-3 text-sm text-destructive text-center">
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary to-primary-700 text-white font-bold rounded-lg shadow-gold hover:shadow-void-xl transition-all duration-300 flex items-center justify-center group"
                  >
                    <Sword className="w-5 h-5 mr-3 transform group-hover:rotate-12 transition-transform" />
                    {submitting
                      ? "Envoi en cours..."
                      : "Soumettre ma Candidature"}
                    <div className="ml-3 w-2 h-2 bg-accent-gold rounded-full animate-pulse"></div>
                  </button>
                  <p className="text-center text-sm text-night-300 mt-3">
                    * Tous les champs marqués d'un astérisque sont obligatoires
                  </p>
                </motion.div>
              </div>
            </form>
          )}
        </motion.div>

        {/* Section Informations Guilde */}
        <motion.div
          variants={itemVariants}
          className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-background-card/50 backdrop-blur-sm border border-midnight-purple/30 rounded-xl p-6 midnight-shadow">
            <div className="w-12 h-12 rounded-lg bg-midnight-purple/20 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-midnight-crystal" />
            </div>
            <h4 className="text-lg font-bold text-midnight-silver mb-2">
              Objectifs
            </h4>
            <p className="text-[#cbd5e1]">
              Ambiance sérieuse mais détendue et entraide entre membres.
            </p>
          </div>

          <div className="bg-background-card/50 backdrop-blur-sm border border-midnight-blue/30 rounded-xl p-6 midnight-shadow">
            <div className="w-12 h-12 rounded-lg bg-midnight-blue/20 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-midnight-crystal" />
            </div>
            <h4 className="text-lg font-bold text-midnight-silver mb-2">
              Planning
            </h4>
            <p className="text-night-200">
              2 soirs par semaine, sessions de 2h, focus sur l'efficacité et la
              progression.
            </p>
          </div>

          <div className="bg-background-card/50 backdrop-blur-sm border border-midnight-gold/30 rounded-xl p-6 midnight-shadow">
            <div className="w-12 h-12 rounded-lg bg-midnight-gold/20 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-midnight-gold" />
            </div>
            <h4 className="text-lg font-bold text-midnight-silver mb-2">
              Requis
            </h4>
            <p className="text-night-200">
              iLvl 240+, expérience raid, attitude positive, engagement sur la
              durée.
            </p>
          </div>

          <a
            href="/roster"
            className="bg-background-card/50 backdrop-blur-sm border border-midnight-purple/30 rounded-xl p-6 hover:border-midnight-crystal/50 hover:shadow-void transition-all duration-300 group cursor-pointer midnight-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-midnight-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-midnight-crystal" />
            </div>
            <h4 className="text-lg font-bold text-midnight-silver mb-2">
              Composition Raid
            </h4>
            <p className="text-night-200">
              Découvrez notre équipe de raid complète et nos membres actuels.
            </p>
            <div className="mt-4 text-xs text-midnight-crystal flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
              Voir la composition →
            </div>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
