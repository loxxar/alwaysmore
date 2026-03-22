"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sword, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

const WOW_CLASSES = [
  { name: "Chasseur de démons", specializations: ["Dévastation", "Vengeance"] },
  { name: "Chevalier de la mort", specializations: ["Sang", "Givre", "Impie"] },
  { name: "Chaman", specializations: ["Élémentaire", "Amélioration", "Restauration"] },
  { name: "Chasseur", specializations: ["Maîtrise des bêtes", "Précision", "Survie"] },
  { name: "Démoniste", specializations: ["Affliction", "Démonologie", "Destruction"] },
  { name: "Druide", specializations: ["Équilibre", "Farouche", "Gardien", "Restauration"] },
  { name: "Évocateur", specializations: ["Dévastation", "Préservation", "Augmentation"] },
  { name: "Guerrier", specializations: ["Armes", "Fureur", "Protection"] },
  { name: "Mage", specializations: ["Arcane", "Feu", "Givre"] },
  { name: "Moine", specializations: ["Maître brasseur", "Tisse-brume", "Marche-vent"] },
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
  { id: "wednesday", label: "Mercredi 20h30–23h30" },
  { id: "thursday", label: "Jeudi 20h30–23h30" },
  { id: "friday", label: "Vendredi 20h30–23h30" },
  { id: "saturday", label: "Samedi 20h30–23h30" },
];

export default function RecrutementPage() {
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
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availableSpecs, setAvailableSpecs] = useState<string[]>([]);

  useEffect(() => {
    if (formData.wowClass) {
      const selectedClass = WOW_CLASSES.find(c => c.name === formData.wowClass);
      setAvailableSpecs(selectedClass?.specializations || []);
      if (selectedClass && !selectedClass.specializations.includes(formData.wowSpec)) {
        setFormData(prev => ({ ...prev, wowSpec: "" }));
      }
    } else {
      setAvailableSpecs([]);
      setFormData(prev => ({ ...prev, wowSpec: "" }));
    }
  }, [formData.wowClass, formData.wowSpec]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleAvailabilityChange = (id: string) => {
    setFormData(prev => ({
      ...prev,
      availabilities: prev.availabilities.includes(id)
        ? prev.availabilities.filter(a => a !== id)
        : [...prev.availabilities, id],
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.pseudo.trim()) newErrors.pseudo = "Le pseudo est requis";
    if (!formData.wowClass) newErrors.wowClass = "La classe est requise";
    if (!formData.wowSpec) newErrors.wowSpec = "La spécialisation est requise";
    if (!formData.expClass.trim()) newErrors.expClass = "L'expérience de classe est requise";
    if (!formData.expRaid.trim()) newErrors.expRaid = "L'expérience raid est requise";
    if (!formData.expTww.trim()) newErrors.expTww = "L'expérience TWW est requise";
    if (!formData.ilvl || parseInt(formData.ilvl) < 1) newErrors.ilvl = "Le niveau d'objet est requis";
    if (formData.availabilities.length < 2) newErrors.availabilities = "Au moins 2 soirs de disponibilité requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validateForm()) return;
    try {
      setSubmitting(true);
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("submit_failed");
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ pseudo: "", wowClass: "", wowSpec: "", expClass: "", expRaid: "", expTww: "", ilvl: "", raidObjective: "normal", availabilities: [] });
        setAvailableSpecs([]);
      }, 4000);
    } catch {
      setSubmitError("Impossible d'envoyer la candidature. Réessaie plus tard.");
    } finally {
      setSubmitting(false);
    }
  };

  // Style helpers
  const inputStyle = {
    width: "100%",
    background: "#192112",
    border: "1px solid rgba(200,145,42,0.25)",
    borderRadius: "0.375rem",
    padding: "0.75rem 1rem",
    color: "#e8d5a0",
    fontSize: "0.9rem",
    outline: "none",
    transition: "all 0.2s",
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-xs font-fantasy uppercase tracking-widest"
            style={{ border: "1px solid rgba(200,145,42,0.3)", color: "#c8912a", background: "rgba(200,145,42,0.05)" }}>
            <Sword className="w-3 h-3" />
            Recrutement
            <Sword className="w-3 h-3" />
          </div>

          <h1 className="text-3xl md:text-5xl font-fantasy font-bold mb-4 section-title">
            Rejoindre Always More
          </h1>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,145,42,0.4))" }} />
            <span style={{ color: "rgba(200,145,42,0.5)", fontSize: "0.6rem" }}>◆ ◆ ◆</span>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, rgba(200,145,42,0.4), transparent)" }} />
          </div>

          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: "#8a7a50" }}>
            Les places sont limitées et une sélection sera faite. Merci de répondre sérieusement
            à toutes les questions — les candidatures incomplètes ne seront pas étudiées.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-lg overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1e2915 0%, #192112 100%)",
            border: "1px solid rgba(200,145,42,0.25)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 0 40px rgba(200,145,42,0.03)",
          }}
        >
          {/* Top border accent */}
          <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #c8912a 30%, #e8b84b 50%, #c8912a 70%, transparent)" }} />

          {/* Corner diamonds */}
          <div className="absolute top-3 left-3 text-xs" style={{ color: "rgba(200,145,42,0.5)" }}>◆</div>
          <div className="absolute top-3 right-3 text-xs" style={{ color: "rgba(200,145,42,0.5)" }}>◆</div>

          {submitted ? (
            <div className="p-12 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <CheckCircle className="w-16 h-16 mx-auto mb-6 animate-gold-pulse" style={{ color: "#3d6b2f" }} />
                <h2 className="text-2xl font-fantasy font-bold mb-3" style={{ color: "#e8d5a0" }}>
                  Candidature envoyée !
                </h2>
                <p className="mb-2" style={{ color: "#c9b580" }}>
                  Ta candidature a été transmise aux officiers d&apos;Always More.
                </p>
                <p className="text-sm" style={{ color: "#8a7a50" }}>
                  Un retour te sera donné sur Discord dans les meilleurs délais.
                </p>
              </motion.div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
              {submitError && (
                <div className="flex items-center gap-3 p-4 rounded-md"
                  style={{ background: "rgba(139,31,31,0.15)", border: "1px solid rgba(139,31,31,0.3)", color: "#e05555" }}>
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{submitError}</span>
                </div>
              )}

              {/* Section: Personnage */}
              <div>
                <h3 className="font-fantasy font-bold text-base mb-4 pb-2"
                  style={{ color: "#c8912a", borderBottom: "1px solid rgba(200,145,42,0.2)" }}>
                  ◆ Votre Personnage
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Pseudo */}
                  <div className="md:col-span-3">
                    <label className="form-label">Pseudo en jeu *</label>
                    <input
                      type="text"
                      name="pseudo"
                      value={formData.pseudo}
                      onChange={handleInputChange}
                      placeholder="Nom de votre personnage"
                      style={inputStyle}
                    />
                    {errors.pseudo && <p className="form-error">{errors.pseudo}</p>}
                  </div>

                  {/* Classe */}
                  <div className="md:col-span-2">
                    <label className="form-label">Classe *</label>
                    <select name="wowClass" value={formData.wowClass} onChange={handleInputChange} style={inputStyle}>
                      <option value="">Choisissez une classe</option>
                      {WOW_CLASSES.map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                    {errors.wowClass && <p className="form-error">{errors.wowClass}</p>}
                  </div>

                  {/* Spec */}
                  <div>
                    <label className="form-label">Spécialisation *</label>
                    <select name="wowSpec" value={formData.wowSpec} onChange={handleInputChange}
                      disabled={!formData.wowClass}
                      style={{ ...inputStyle, opacity: !formData.wowClass ? 0.5 : 1, cursor: !formData.wowClass ? "not-allowed" : "auto" }}>
                      <option value="">Choisissez</option>
                      {availableSpecs.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.wowSpec && <p className="form-error">{errors.wowSpec}</p>}
                  </div>

                  {/* iLvl */}
                  <div>
                    <label className="form-label">Niveau d&apos;objet (iLvl) *</label>
                    <input
                      type="number"
                      name="ilvl"
                      value={formData.ilvl}
                      onChange={handleInputChange}
                      placeholder="Ex: 630"
                      min="1"
                      max="999"
                      style={inputStyle}
                    />
                    {errors.ilvl && <p className="form-error">{errors.ilvl}</p>}
                  </div>

                  {/* Objectif */}
                  <div className="md:col-span-2">
                    <label className="form-label">Objectif de raid</label>
                    <div className="flex gap-3">
                      {RAID_OBJECTIVES.map(obj => (
                        <label key={obj.value} className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-md cursor-pointer transition-all"
                          style={{
                            border: formData.raidObjective === obj.value ? "1px solid rgba(200,145,42,0.6)" : "1px solid rgba(200,145,42,0.15)",
                            background: formData.raidObjective === obj.value ? "rgba(200,145,42,0.12)" : "transparent",
                            color: formData.raidObjective === obj.value ? "#e8b84b" : "#8a7a50",
                            fontSize: "0.85rem",
                          }}>
                          <input type="radio" name="raidObjective" value={obj.value}
                            checked={formData.raidObjective === obj.value}
                            onChange={handleInputChange} className="sr-only" />
                          <span className="font-fantasy">{obj.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Expérience */}
              <div>
                <h3 className="font-fantasy font-bold text-base mb-4 pb-2"
                  style={{ color: "#c8912a", borderBottom: "1px solid rgba(200,145,42,0.2)" }}>
                  ◆ Votre Expérience
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Expérience de votre classe *</label>
                    <textarea name="expClass" value={formData.expClass} onChange={handleInputChange}
                      placeholder="Décrivez votre expérience avec cette classe/spé : depuis combien de temps vous la jouez, votre niveau de maîtrise..."
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical" }} />
                    {errors.expClass && <p className="form-error">{errors.expClass}</p>}
                  </div>
                  <div>
                    <label className="form-label">Expérience en raid *</label>
                    <textarea name="expRaid" value={formData.expRaid} onChange={handleInputChange}
                      placeholder="Listez vos expériences de raid : tiers, difficultés, guildes précédentes..."
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical" }} />
                    {errors.expRaid && <p className="form-error">{errors.expRaid}</p>}
                  </div>
                  <div>
                    <label className="form-label">Expérience dans The War Within *</label>
                    <textarea name="expTww" value={formData.expTww} onChange={handleInputChange}
                      placeholder="Votre progression dans l'extension actuelle (TWW) : bosses tués, difficulty, patch..."
                      rows={3}
                      style={{ ...inputStyle, resize: "vertical" }} />
                    {errors.expTww && <p className="form-error">{errors.expTww}</p>}
                  </div>
                </div>
              </div>

              {/* Section: Disponibilités */}
              <div>
                <h3 className="font-fantasy font-bold text-base mb-4 pb-2"
                  style={{ color: "#c8912a", borderBottom: "1px solid rgba(200,145,42,0.2)" }}>
                  ◆ Disponibilités <span className="text-xs font-sans" style={{ color: "#5a4a30" }}>(2 soirs minimum requis)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {AVAILABILITIES.map(a => (
                    <label key={a.id} className="flex flex-col items-center gap-2 p-3 rounded-md cursor-pointer transition-all text-center"
                      style={{
                        border: formData.availabilities.includes(a.id) ? "1px solid rgba(200,145,42,0.6)" : "1px solid rgba(200,145,42,0.15)",
                        background: formData.availabilities.includes(a.id) ? "rgba(200,145,42,0.1)" : "rgba(25,33,18,0.5)",
                        color: formData.availabilities.includes(a.id) ? "#e8b84b" : "#8a7a50",
                      }}>
                      <input type="checkbox" checked={formData.availabilities.includes(a.id)}
                        onChange={() => handleAvailabilityChange(a.id)} className="sr-only" />
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-fantasy">{a.label}</span>
                    </label>
                  ))}
                </div>
                {errors.availabilities && <p className="form-error mt-2">{errors.availabilities}</p>}
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button type="submit" disabled={submitting}
                  className="w-full btn-zan flex items-center justify-center gap-3 py-4 text-base">
                  {submitting ? (
                    <>
                      <div className="loading-spinner w-5 h-5" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Sword className="w-5 h-5" />
                      Envoyer ma candidature
                    </>
                  )}
                </button>
                <p className="text-center text-xs mt-3" style={{ color: "#3a3020" }}>
                  Tu seras contacté sur Discord après examen de ta candidature.
                </p>
              </div>
            </form>
          )}

          {/* Bottom border */}
          <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #7a5c18 30%, #c8912a 50%, #7a5c18 70%, transparent)" }} />
        </motion.div>

        {/* Back link */}
        <div className="text-center mt-8">
          <Link href="/" className="text-sm transition-colors"
            style={{ color: "#5a4a30" }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#c8912a"}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#5a4a30"}>
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
