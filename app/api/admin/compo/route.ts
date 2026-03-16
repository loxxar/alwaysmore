import { NextResponse } from "next/server";
import { isAdminRequestAuthenticated } from "../../../../lib/api-admin-auth";
import { getCompo, saveCompo } from "../../../../lib/compo-repository";

export async function GET() {
  try {
    const isAuthenticated = await isAdminRequestAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const compo = await getCompo();
    return NextResponse.json({ compo });
  } catch (error) {
    console.error("GET /api/admin/compo error", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAuthenticated = await isAdminRequestAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    if (!body?.groups || typeof body.groups !== "object") {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    await saveCompo(body.groups);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("POST /api/admin/compo error", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
