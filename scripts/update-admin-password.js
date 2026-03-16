#!/usr/bin/env node

const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  try {
    console.log('=== Mise à jour du mot de passe admin ===\n');

    const username = await question('Username admin (défaut: admin): ') || 'admin';
    const newPassword = await question('Nouveau mot de passe: ');

    if (!newPassword || newPassword.length < 8) {
      console.error('❌ Le mot de passe doit contenir au moins 8 caractères');
      process.exit(1);
    }

    console.log('\n🔐 Génération du hash...');
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    console.log('📡 Connexion à la base de données...');
    const dbConfig = {
      host: process.env.DB_HOST || '127.0.0.1',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };

    const connection = await mysql.createConnection(dbConfig);

    console.log('✏️  Mise à jour du mot de passe...');
    const [result] = await connection.execute(
      'UPDATE admin_users SET password_hash = ? WHERE username = ?',
      [passwordHash, username]
    );

    await connection.end();

    if (result.affectedRows === 0) {
      console.error(`❌ Aucun utilisateur trouvé avec le username: ${username}`);
      process.exit(1);
    }

    console.log(`✅ Mot de passe mis à jour avec succès pour: ${username}`);
    console.log('\n⚠️  N\'oubliez pas de redémarrer l\'application si nécessaire.');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
