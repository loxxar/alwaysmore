import { NextResponse } from "next/server";
import {
  createApplication,
  listApplications,
} from "../../../lib/applications-repository";
import { isAdminRequestAuthenticated } from "../../../lib/api-admin-auth";

export async function GET() {
  try {
    const isAuthenticated = await isAdminRequestAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const applications = await listApplications();
    return NextResponse.json({ applications });
  } catch (error) {
    console.error("GET /api/applications error", error);
    return NextResponse.json(
      { error: "Impossible de charger les candidatures" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body?.pseudo ||
      !body?.wowClass ||
      !body?.wowSpec ||
      !body?.expClass ||
      !body?.expRaid ||
      !body?.expTww ||
      !body?.ilvl
    ) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    await createApplication({
      pseudo: body.pseudo,
      wowClass: body.wowClass,
      wowSpec: body.wowSpec,
      expClass: body.expClass,
      expRaid: body.expRaid,
      expTww: body.expTww,
      ilvl: Number(body.ilvl),
      raidObjective: body.raidObjective || "normal",
      availabilities: Array.isArray(body.availabilities) ? body.availabilities : [],
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("POST /api/applications error", error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer la candidature" },
      { status: 500 },
    );
  }
}
