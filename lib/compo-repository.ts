import { db } from "./db";

export type CompoGroups = Record<number, ({ id: number; pseudo: string; wowClass: string; wowSpec: string; ilvl: number; status: string } | null)[]>;

export async function getCompo(): Promise<CompoGroups | null> {
  const [rows] = await db.query<any[]>(
    `SELECT compo_data FROM raid_compo WHERE id = 1 LIMIT 1`,
  );
  if (rows.length === 0) return null;
  const data = rows[0].compo_data;
  return typeof data === "string" ? JSON.parse(data) : data;
}

export async function saveCompo(groups: CompoGroups): Promise<void> {
  await db.execute(
    `INSERT INTO raid_compo (id, compo_data) VALUES (1, ?)
     ON DUPLICATE KEY UPDATE compo_data = VALUES(compo_data)`,
    [JSON.stringify(groups)],
  );
}
