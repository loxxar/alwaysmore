# Guide de Déploiement sur Hostinger - Raid Always More

## 📋 Table des Matières
1. [Prérequis](#prérequis)
2. [Préparation du Projet](#préparation-du-projet)
3. [Configuration Hostinger](#configuration-hostinger)
4. [Variables d'Environnement](#variables-denvironnement)
5. [Build et Déploiement](#build-et-déploiement)
6. [Sécurisation Production](#sécurisation-production)
7. [Résolution de Problèmes](#résolution-de-problèmes)
8. [Maintenance](#maintenance)

---

## 🎯 Prérequis

### Compte Hostinger
- Un compte Hostinger actif
- Un forfait d'hébergement avec support Node.js (VPS ou hébergement mutualisé avec Node.js)

### Projet GitHub
- Dépôt GitHub public ou privé : `https://github.com/loxxar/alwaysmore`
- Accès en écriture pour les déploiements automatiques

### Configuration Technique Requise
- **Node.js** : Version 18.0.0 ou supérieure (recommandé : 18.x LTS)
- **RAM** : Minimum 1 GB (recommandé : 2+ GB)
- **Espace disque** : 500 MB minimum
- **Ports** : 3000 (application), 80/443 (HTTP/HTTPS)

---

## 🔧 Préparation du Projet

### 1. Vérification du Code
Assurez-vous que votre code est prêt pour la production :

```bash
# Dans votre répertoire local
cd Raid_Always_More

# Vérifier les dépendances
npm ci --only=production

# Tester le build localement
npm run build

# Tester le démarrage
npm start
```

### 2. Fichiers Essentiels
Vérifiez que les fichiers suivants existent :
- `package.json` (avec scripts `build` et `start`)
- `next.config.js`
- `tailwind.config.ts`
- `.env.example` (template des variables d'environnement)

### 3. Préparation pour GitHub
```bash
# Assurez-vous que tout est commité
git add .
git commit -m "Préparation pour déploiement Hostinger"
git push origin main
```

---

## 🚀 Configuration Hostinger

### Étape 1 : Créer une Nouvelle Application
1. Connectez-vous à votre **panneau d'administration Hostinger**
2. Accédez à la section **"Applications"** ou **"Node.js"**
3. Cliquez sur **"Créer une application"**

### Étape 2 : Configuration de Base
- **Nom de l'application** : `raid-always-more`
- **Version Node.js** : Sélectionnez **18.x LTS** (minimum requis)
- **Répertoire racine** : `/home/raid-always-more`
- **Port** : `3000` (port par défaut de Next.js)
- **Préréglage** : Sélectionnez **"Next.js"** si disponible

### Étape 3 : Connexion GitHub
1. **Cliquez sur "Connecter GitHub"**
2. Autorisez Hostinger à accéder à votre compte GitHub
3. Sélectionnez le dépôt : `loxxar/alwaysmore`
4. Choisissez la branche : `main`
5. Activez **"Déploiement automatique"** pour les pushes

### Étape 4 : Configuration Avancée
- **Répertoire de build** : Laisser vide (racine du projet)
- **Commande de build** : `npm run build`
- **Commande de démarrage** : `npm start`
- **Variables d'environnement** : À configurer dans la section suivante

---

## 🔐 Variables d'Environnement

### Configuration Obligatoire
Dans le panneau Hostinger > Variables d'environnement, ajoutez :

```env
# ====================
# APPLICATION
# ====================
NODE_ENV=production
NEXT_PUBLIC_APP_NAME="Raid Always More"
NEXT_PUBLIC_APP_DESCRIPTION="Formulaire de recrutement pour la guilde WoW Raid Always More"
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
NEXT_PUBLIC_ADMIN_ENABLED=true

# ====================
# SÉCURITÉ
# ====================
ADMIN_SECRET=changez-ce-secret-par-une-chaine-longue-et-complexe
BCRYPT_SALT_ROUNDS=12

# ====================
# SESSIONS & COOKIES
# ====================
SESSION_SECRET=une-autre-chaine-secrete-longue-et-complexe
COOKIE_SECURE=true
COOKIE_SAMESITE=lax
COOKIE_MAX_AGE=86400
```

### Configuration Optionnelle (Base de Données)
Pour une base de données PostgreSQL (recommandé en production) :

```env
# PostgreSQL (créer d'abord la base via phpMyAdmin ou terminal)
DATABASE_URL=postgresql://utilisateur:motdepasse@localhost:5432/raid_always_more
```

### Configuration Optionnelle (Email/SMTP)
```env
# Pour les notifications futures
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-app
NOTIFICATION_EMAIL=admin@votre-domaine.com
```

---

## 🛠 Build et Déploiement

### Déploiement Manuel
1. **Accédez à votre application** dans le panneau Hostinger
2. **Cliquez sur "Déployer"**
3. **Surveillez les logs** pendant le build
4. **Vérifiez le statut** : Doit passer à "En ligne"

### Logs de Build Importants
Surveillez ces messages dans les logs :
```
✓ Compiled successfully
✓ Checking validity of types  
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization
```

### Vérification après Déploiement
1. **Accédez à votre URL** : `https://votre-domaine.com`
2. **Testez le formulaire** : Soumettez une candidature test
3. **Testez l'admin** : `https://votre-domaine.com/admin/login`
   - Identifiants de démo : N'importe quels identifiants non vides
4. **Vérifiez le dashboard** : `https://votre-domaine.com/admin/dashboard`

---

## 🔒 Sécurisation pour la Production

### 1. Changer les Secrets Par Défaut
**CRITIQUE** : Modifiez ces valeurs immédiatement :
- `ADMIN_SECRET` : Générer avec `openssl rand -base64 32`
- `SESSION_SECRET` : Générer avec `openssl rand -base64 32`

### 2. Configuration HTTPS
1. **Activer SSL** dans le panneau Hostinger
2. **Rediriger HTTP vers HTTPS** automatiquement
3. **Renouveler automatiquement** les certificats Let's Encrypt

### 3. Sécurité Avancée
- **Limite de débit** : Configurer dans Hostinger > Sécurité
- **Firewall** : Activer le firewall d'application
- **Backups** : Configurer des sauvegardes automatiques
- **Monitoring** : Activer les alertes de ressources

### 4. Base de Données (Recommandé)
Pour une utilisation réelle :
1. **Créer une base PostgreSQL** via phpMyAdmin ou terminal
2. **Exécuter le schéma SQL** (disponible dans `database/schema.sql`)
3. **Mettre à jour** `DATABASE_URL` dans les variables d'environnement

---

## 🐛 Résolution de Problèmes

### Problème 1 : Build Échoue
**Symptômes** : Erreurs pendant `npm run build`

**Solutions** :
```bash
# Vérifier les dépendances
npm ci --only=production

# Nettoyer le cache Next.js
rm -rf .next
rm -rf node_modules/.cache

# Vérifier la version Node.js
node --version  # Doit être >= 18.0.0
```

### Problème 2 : Application Ne Démarre Pas
**Symptômes** : Port 3000 non accessible

**Solutions** :
1. **Vérifier les logs** : Hostinger > Logs d'application
2. **Tester localement** : `npm start` fonctionne-t-il ?
3. **Vérifier le port** : Next.js doit utiliser le port 3000
4. **Vérifier les permissions** : Les fichiers doivent être accessibles

### Problème 3 : Erreurs 500 ou Pages Blanches
**Symptômes** : Pages qui ne se chargent pas

**Solutions** :
1. **Vérifier les variables d'environnement**
2. **Vérifier les logs du serveur**
3. **Tester en mode développement** temporairement
4. **Vérifier les chemins des fichiers statiques**

### Problème 4 : Problèmes de Base de Données
**Symptômes** : Erreurs de connexion à la base de données

**Solutions** :
1. **Vérifier `DATABASE_URL`**
2. **Tester la connexion** avec un client PostgreSQL
3. **Vérifier les permissions** de l'utilisateur de la base
4. **Vérifier que la base existe**

### Problème 5 : Problèmes d'Authentification Admin
**Symptômes** : Impossible de se connecter à `/admin/login`

**Solutions** :
1. **Vérifier `ADMIN_SECRET`** dans les variables d'environnement
2. **Vérifier les cookies** dans les outils de développement
3. **Tester avec différentes valeurs** pour `ADMIN_SECRET`
4. **Vérifier le middleware** dans `middleware.ts`

---

## 🔄 Maintenance

### Mises à Jour Régulières
1. **Mises à jour de sécurité** : Surveiller les alertes npm
2. **Backups** : Sauvegarder la base de données et les fichiers
3. **Logs** : Surveiller les logs d'erreurs régulièrement
4. **Performances** : Monitorer l'utilisation des ressources

### Mise à Jour du Code
```bash
# Localement
git pull origin main
npm ci
npm run build
npm start

# Puis pousser sur GitHub
git push origin main
# Hostinger déploiera automatiquement
```

### Surveillance
- **Uptime** : Utiliser un service de monitoring (UptimeRobot)
- **Performance** : Surveiller le temps de réponse
- **Sécurité** : Scanner régulièrement les vulnérabilités
- **Sauvegardes** : Tester régulièrement la restauration

---

## 📞 Support

### Hostinger Support
- **Ticket support** : Via le panneau d'administration
- **Documentation** : https://www.hostinger.fr/help
- **Chat en direct** : Disponible 24/7

### Support Technique de l'Application
- **GitHub Issues** : https://github.com/loxxar/alwaysmore/issues
- **Documentation** : Consulter le fichier `README.md`
- **Contact développeur** : Via le dépôt GitHub

---

## ✅ Checklist de Déploiement

- [ ] Compte Hostinger configuré
- [ ] Application Node.js créée dans Hostinger
- [ ] Dépôt GitHub connecté
- [ ] Variables d'environnement configurées
- [ ] Build réussi sans erreurs
- [ ] Application accessible via HTTPS
- [ ] Formulaire de recrutement fonctionnel
- [ ] Administration accessible
- [ ] Secrets par défaut modifiés
- [ ] SSL/HTTPS activé
- [ ] Backups configurés
- [ ] Monitoring activé

---

## 🎉 Félicitations !
Votre application "Raid Always More" est maintenant déployée sur Hostinger. Les joueurs peuvent soumettre leurs candidatures et vous pouvez les gérer via le tableau de bord d'administration.

**URL d'accès** : `https://votre-domaine.com`  
**Admin** : `https://votre-domaine.com/admin/login`

Pour toute question ou problème, consultez la section [Résolution de Problèmes](#résolution-de-problèmes) ou contactez le support.

---

*Dernière mise à jour : $(date +%Y-%m-%d)*  
*Version du guide : 1.0*