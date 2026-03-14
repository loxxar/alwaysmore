# Raid Always More - Application de Recrutement Guilde WoW

Une application web moderne pour le recrutement de guilde World of Warcraft, construite avec Next.js, React, Tailwind CSS et Framer Motion. Le thème visuel s'inspire du Void (Vide) avec une palette de couleurs sombre et mystérieuse.

## 🎯 Fonctionnalités

### Formulaire de Recrutement
- **Champs complets** : Pseudo, classe, spécialisation, expérience, niveau d'objet, objectifs
- **Sélection dynamique** : Les spécialisations se mettent à jour selon la classe choisie
- **Validation** : Contrôle des disponibilités (minimum 2 soirs obligatoires)
- **Animations** : Effets visuels avec Framer Motion
- **Responsive** : Design adapté à tous les appareils

### Administration
- **Tableau de bord** : Visualisation des candidatures avec filtres et recherche
- **Gestion des statuts** : Acceptation, rejet, marquage comme consulté
- **Détails complets** : Consultation de toutes les informations des candidats
- **Sécurité** : Authentification avec hachage de mot de passe

### Design
- **Thème WoW Midnight** : Palette violet profond, bleu nuit, accents dorés
- **Effets visuels** : Lueurs, bordures ciselées, animations fluides
- **Typographie** : Polices élégantes et fantasy
- **Icons** : Épées, boucliers, symboles WoW

## 🛠 Technologies

- **Next.js 15** - Framework React avec rendu côté serveur
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations
- **Radix UI** - Composants accessibles
- **Lucide React** - Icons
- **bcrypt/argon2** - Hachage de mots de passe
- **ESLint** - Linting
- **PostCSS** - Traitement CSS

## 📋 Prérequis

- Node.js 18.0.0 ou supérieur
- npm ou yarn
- Navigateur moderne

## 🚀 Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd Raid_Always_More
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configurer l'environnement**
   ```bash
   cp .env.local.example .env.local
   # Éditer .env.local avec vos configurations
   ```

4. **Démarrer en mode développement**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Sécurité
ADMIN_SECRET=votre-secret-long-et-complexe
BCRYPT_SALT_ROUNDS=12

# Application
NEXT_PUBLIC_APP_NAME="Raid Always More"
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_ENABLED=true

# Base de données (optionnel)
DATABASE_URL=postgresql://user:password@localhost:5432/raid_always_more
```

### Configuration de la base de données

Option 1 : **JSON local** (par défaut pour le prototype)
- Les données sont stockées dans `/data/wow-data.json`
- Pas de configuration supplémentaire nécessaire

Option 2 : **Supabase**
- Créer un projet sur [supabase.com](https://supabase.com)
- Récupérer l'URL et les clés
- Configurer les variables d'environnement

Option 3 : **PostgreSQL local**
- Installer PostgreSQL
- Créer la base de données :
  ```sql
  CREATE DATABASE raid_always_more;
  ```
- Exécuter les scripts SQL fournis dans `/database/schema.sql`

## 📁 Structure du projet

```
Raid_Always_More/
├── app/                    # Pages Next.js (App Router)
│   ├── admin/             # Pages d'administration
│   │   ├── login/         # Page de connexion
│   │   └── dashboard/     # Tableau de bord
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil (formulaire)
├── components/            # Composants React
│   └── theme-provider.tsx # Gestion du thème
├── data/                  # Données statiques
│   └── wow-data.json     # Classes et spécialisations WoW
├── middleware/           # Middleware Next.js
│   └── middleware.ts     # Protection des routes admin
├── public/              # Fichiers statiques
├── .env.local          # Variables d'environnement
├── tailwind.config.ts  # Configuration Tailwind
├── next.config.js      # Configuration Next.js
├── package.json        # Dépendances et scripts
└── README.md           # Ce fichier
```

## 🔒 Sécurité

### Authentification Admin
- **Hachage des mots de passe** : Utilisation de bcrypt ou argon2
- **Sessions sécurisées** : Tokens avec expiration
- **Protection CSRF** : Middleware intégré
- **En-têtes de sécurité** : Headers HTTP sécurisés

### Protection des données
- **Validation côté serveur** : Toutes les soumissions sont validées
- **Sanitisation** : Nettoyage des entrées utilisateur
- **HTTPS obligatoire** : En production uniquement

### Recommandations de production
1. Changer tous les secrets par défaut
2. Utiliser HTTPS
3. Configurer un WAF (Web Application Firewall)
4. Mettre en place un rate limiting
5. Journaliser les accès admin

## 🗄️ Base de données

### Schéma SQL
```sql
CREATE TABLE guild_applications (
    id SERIAL PRIMARY KEY,
    pseudo VARCHAR(50) NOT NULL,
    wow_class VARCHAR(30) NOT NULL,
    wow_spec VARCHAR(30) NOT NULL,
    exp_class TEXT NOT NULL,
    exp_raid TEXT NOT NULL,
    exp_tww TEXT NOT NULL,
    ilvl INTEGER NOT NULL,
    raid_objective VARCHAR(20) NOT NULL,
    avail_wednesday BOOLEAN DEFAULT FALSE,
    avail_friday BOOLEAN DEFAULT FALSE,
    avail_saturday BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending'
);

CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Migration des données
Un script de migration est fourni pour importer les données JSON existantes vers une base de données relationnelle.

## 📱 Utilisation

### Pour les candidats
1. Accéder à `http://localhost:3000`
2. Remplir le formulaire de candidature
3. Vérifier que les disponibilités sont suffisantes (2 soirs minimum)
4. Soumettre et attendre la confirmation

### Pour les administrateurs
1. Accéder à `http://localhost:3000/admin/login`
2. Se connecter avec les identifiants admin
3. Naviguer dans le tableau de bord
4. Consulter, filtrer et gérer les candidatures

## 🚢 Déploiement

### Vercel (recommandé)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manuel
```bash
npm run build
npm start
```

## 📝 API (Endpoints)

### Soumission de candidature
```
POST /api/applications
Content-Type: application/json

{
  "pseudo": "Arthas",
  "wowClass": "Chevalier de la mort",
  "wowSpec": "Givre",
  "expClass": "...",
  "expRaid": "...",
  "expTww": "...",
  "ilvl": 485,
  "raidObjective": "mythique",
  "availabilities": ["wednesday", "friday"]
}
```

### Authentification admin
```
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "secret"
}
```

## 📊 Scripts disponibles

```bash
# Développement
npm run dev          # Démarrer le serveur de développement
npm run build        # Construire pour la production
npm run start        # Démarrer le serveur de production
npm run lint         # Vérifier le code avec ESLint

# Production
npm run analyze      # Analyser le bundle
npm run test         # Exécuter les tests (à configurer)
```

## 🔧 Dépannage

### Problèmes courants

1. **Erreur de port**
   ```
   Error: listen EADDRINUSE: address already in use :::3000
   ```
   Solution : Changer le port dans `package.json` ou tuer le processus sur le port 3000.

2. **Erreur de dépendances**
   ```
   Module not found: Can't resolve 'framer-motion'
   ```
   Solution : Exécuter `npm install` ou `npm ci`.

3. **Erreur TypeScript**
   ```
   Type error: Property 'xyz' does not exist on type...
   ```
   Solution : Vérifier les types ou exécuter `npm run build -- --force`.

4. **Admin inaccessible**
   ```
   Redirect loop on /admin
   ```
   Solution : Vérifier les cookies et le middleware d'authentification.

### Logs
Les logs de développement sont accessibles dans la console du navigateur et du serveur.

## 🤝 Contribuer

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

### Guide de style
- TypeScript strict
- ESLint configuré
- Prettier pour le formatage
- Convention de commits semantic

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- Blizzard Entertainment pour World of Warcraft
- La communauté WoW pour l'inspiration
- Les contributeurs open source

## 📞 Support

Pour le support, ouvrez une issue sur GitHub ou contactez l'équipe de développement.

---

**Note** : Ce projet est un prototype. Pour une utilisation en production, une configuration supplémentaire de sécurité et de base de données est nécessaire.

**Disclaimer** : World of Warcraft et Blizzard Entertainment sont des marques déposées de Blizzard Entertainment, Inc. Ce projet est un outil communautaire et n'est pas affilié à Blizzard Entertainment.