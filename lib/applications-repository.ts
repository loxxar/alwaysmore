import { db, type DbRow } from "./db";

export type ApplicationStatus = "pending" | "reviewed" | "accepted" | "rejected";
export type RaidObjective = "normal" | "heroic" | "mythic";

export interface GuildApplication {
  id: number;
  pseudo: string;
  wowClass: string;
  wowSpec: string;
  expClass: string;
  expRaid: string;
  expTww: string;
  ilvl: number;
  raidObjective: RaidObjective;
  availWednesday: boolean;
  availThursday: boolean;
  availFriday: boolean;
  availSaturday: boolean;
  createdAt: string;
  status: ApplicationStatus;
}

interface ApplicationRow extends DbRow {
  id: number;
  pseudo: string;
  wow_class: string;
  wow_spec: string;
  exp_class: string;
  exp_raid: string;
  exp_tww: string;
  ilvl: number;
  raid_objective: RaidObjective;
  avail_wednesday: number;
  avail_thursday: number;
  avail_friday: number;
  avail_saturday: number;
  created_at: Date;
  status: ApplicationStatus;
}

export interface CreateApplicationInput {
  pseudo: string;
  wowClass: string;
  wowSpec: string;
  expClass: string;
  expRaid: string;
  expTww: string;
  ilvl: number;
  raidObjective: RaidObjective;
  availabilities: string[];
}

function mapRow(row: ApplicationRow): GuildApplication {
  return {
    id: row.id,
    pseudo: row.pseudo,
    wowClass: row.wow_class,
    wowSpec: row.wow_spec,
    expClass: row.exp_class,
    expRaid: row.exp_raid,
    expTww: row.exp_tww,
    ilvl: row.ilvl,
    raidObjective: row.raid_objective,
    availWednesday: Boolean(row.avail_wednesday),
    availThursday: Boolean(row.avail_thursday),
    availFriday: Boolean(row.avail_friday),
    availSaturday: Boolean(row.avail_saturday),
    createdAt: row.created_at.toISOString(),
    status: row.status,
  };
}

export async function listApplications(): Promise<GuildApplication[]> {
  const [rows] = await db.query<ApplicationRow[]>(
    `SELECT id, pseudo, wow_class, wow_spec, exp_class, exp_raid, exp_tww, ilvl, raid_objective, avail_wednesday, avail_thursday, avail_friday, avail_saturday, created_at, status
     FROM inscrits
     ORDER BY created_at DESC`,
  );

  return rows.map(mapRow);
}

export async function createApplication(input: CreateApplicationInput): Promise<void> {
  await db.execute(
    `INSERT INTO inscrits (
      pseudo, wow_class, wow_spec, exp_class, exp_raid, exp_tww, ilvl, raid_objective,
      avail_wednesday, avail_thursday, avail_friday, avail_saturday
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.pseudo,
      input.wowClass,
      input.wowSpec,
      input.expClass,
      input.expRaid,
      input.expTww,
      input.ilvl,
      input.raidObjective,
      input.availabilities.includes("wednesday") ? 1 : 0,
      input.availabilities.includes("thursday") ? 1 : 0,
      input.availabilities.includes("friday") ? 1 : 0,
      input.availabilities.includes("saturday") ? 1 : 0,
    ],
  );
}

export async function updateApplicationStatus(
  id: number,
  status: ApplicationStatus,
): Promise<void> {
  await db.execute(`UPDATE inscrits SET status = ? WHERE id = ?`, [status, id]);
}

export async function deleteApplication(id: number): Promise<void> {
  await db.execute(`DELETE FROM inscrits WHERE id = ?`, [id]);
}
