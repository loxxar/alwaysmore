import bcrypt from "bcryptjs";
import { db, type DbRow } from "./db";

interface AdminUserRow extends DbRow {
  id: number;
  username: string;
  password_hash: string;
  is_active: number;
}

export async function verifyAdminCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  const [rows] = await db.query<AdminUserRow[]>(
    `SELECT id, username, password_hash, is_active
     FROM admin_users
     WHERE username = ?
     LIMIT 1`,
    [username],
  );

  if (!rows.length || !rows[0].is_active) {
    return false;
  }

  return bcrypt.compare(password, rows[0].password_hash);
}
