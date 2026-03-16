import { NextResponse } from "next/server";
import { ADMIN_CONFIG } from "../../../../lib/admin-config";

export async function POST() {
  const response = NextResponse.json({ ok: true }, { status: 200 });

  response.cookies.set({
    name: ADMIN_CONFIG.COOKIE_NAMES.TOKEN,
    value: "",
    path: ADMIN_CONFIG.COOKIE_SETTINGS.PATH,
    maxAge: 0,
    sameSite: "strict",
    secure: ADMIN_CONFIG.COOKIE_SETTINGS.SECURE,
    httpOnly: ADMIN_CONFIG.COOKIE_SETTINGS.HTTP_ONLY,
  });

  response.cookies.set({
    name: ADMIN_CONFIG.COOKIE_NAMES.USER,
    value: "",
    path: ADMIN_CONFIG.COOKIE_SETTINGS.PATH,
    maxAge: 0,
    sameSite: "strict",
    secure: ADMIN_CONFIG.COOKIE_SETTINGS.SECURE,
    httpOnly: ADMIN_CONFIG.COOKIE_SETTINGS.HTTP_ONLY,
  });

  return response;
}
