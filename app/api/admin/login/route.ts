import { NextResponse } from "next/server";
import { ADMIN_CONFIG } from "../../../../lib/admin-config";
import { verifyAdminCredentials } from "../../../../lib/admin-repository";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = String(body?.username || "").trim();
    const password = String(body?.password || "");

    if (!username || !password) {
      return NextResponse.json({ error: "Champs requis" }, { status: 400 });
    }

    const isValid = await verifyAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Identifiants incorrects" },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ ok: true }, { status: 200 });
    response.cookies.set({
      name: ADMIN_CONFIG.COOKIE_NAMES.TOKEN,
      value: ADMIN_CONFIG.SECRET,
      path: ADMIN_CONFIG.COOKIE_SETTINGS.PATH,
      maxAge: ADMIN_CONFIG.COOKIE_SETTINGS.MAX_AGE,
      sameSite: "strict",
      secure: ADMIN_CONFIG.COOKIE_SETTINGS.SECURE,
      httpOnly: ADMIN_CONFIG.COOKIE_SETTINGS.HTTP_ONLY,
    });
    response.cookies.set({
      name: ADMIN_CONFIG.COOKIE_NAMES.USER,
      value: encodeURIComponent(username),
      path: ADMIN_CONFIG.COOKIE_SETTINGS.PATH,
      maxAge: ADMIN_CONFIG.COOKIE_SETTINGS.MAX_AGE,
      sameSite: "strict",
      secure: ADMIN_CONFIG.COOKIE_SETTINGS.SECURE,
      httpOnly: ADMIN_CONFIG.COOKIE_SETTINGS.HTTP_ONLY,
    });

    return response;
  } catch (error) {
    console.error("POST /api/admin/login error", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 },
    );
  }
}
