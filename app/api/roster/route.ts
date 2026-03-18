import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const simple = searchParams.get("simple") === "true";

    // Récupérer les membres acceptés
    let query = `
      SELECT id, pseudo, wow_class as wowClass, wow_spec as wowSpec, ilvl, raid_objective as raidObjective
      FROM inscrits
      WHERE status = 'accepted'
      ORDER BY pseudo ASC
    `;

    const [rows] = await db.query<any[]>(query);

    // Si mode simple, ne retourner que les informations essentielles
    const acceptedMembers = rows.map((row) => {
      if (simple) {
        return {
          id: row.id,
          pseudo: row.pseudo,
          wowClass: row.wowClass,
          wowSpec: row.wowSpec,
        };
      }
      return {
        id: row.id,
        pseudo: row.pseudo,
        wowClass: row.wowClass,
        wowSpec: row.wowSpec,
        ilvl: row.ilvl,
        raidObjective: row.raidObjective,
      };
    });

    return NextResponse.json({
      success: true,
      acceptedMembers,
      count: acceptedMembers.length,
    });
  } catch (error) {
    console.error("GET /api/roster error:", error);

    // En cas d'erreur de base de données, retourner des données de démonstration
    const demoMembers = [
      {
        id: 1,
        pseudo: "Arthas",
        wowClass: "Chevalier de la mort",
        wowSpec: "Sang",
        ilvl: 492,
        raidObjective: "mythic",
      },
      {
        id: 2,
        pseudo: "Illidan",
        wowClass: "Chasseur de démons",
        wowSpec: "Vengeance",
        ilvl: 488,
        raidObjective: "mythic",
      },
      {
        id: 3,
        pseudo: "Tyrande",
        wowClass: "Prêtre",
        wowSpec: "Sacré",
        ilvl: 485,
        raidObjective: "mythic",
      },
      {
        id: 4,
        pseudo: "Jaina",
        wowClass: "Mage",
        wowSpec: "Arcane",
        ilvl: 490,
        raidObjective: "mythic",
      },
      {
        id: 5,
        pseudo: "Thrall",
        wowClass: "Chaman",
        wowSpec: "Amélioration",
        ilvl: 495,
        raidObjective: "mythic",
      },
    ];

    return NextResponse.json({
      success: false,
      message: "Utilisation des données de démonstration",
      acceptedMembers: demoMembers,
      count: demoMembers.length,
      isDemo: true,
    });
  }
}
