import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_CONFIG, AdminAuth } from "./lib/admin-config";

// Configuration
const ADMIN_SECRET = ADMIN_CONFIG.SECRET;
const ADMIN_TOKEN_COOKIE = ADMIN_CONFIG.COOKIE_NAMES.TOKEN;
const ADMIN_USER_COOKIE = ADMIN_CONFIG.COOKIE_NAMES.USER;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si l'utilisateur est authentifié
  const adminToken = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;
  const adminUser = request.cookies.get(ADMIN_USER_COOKIE)?.value;
  const isAuthenticated = AdminAuth.isAuthenticated(adminToken, adminUser);

  // Routes d'administration
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isDashboard = pathname === "/admin/dashboard";

  // Redirection si l'utilisateur est déjà connecté et essaie d'accéder à la page de login
  if (isLoginPage && isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  // Protection des routes admin (sauf login)
  if (isAdminRoute && !isLoginPage && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Ajouter des en-têtes de sécurité pour les pages admin
  if (isAdminRoute && isAuthenticated) {
    const response = NextResponse.next();

    // En-têtes de sécurité
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-XSS-Protection", "1; mode=block");

    // Pour le dashboard, ajouter un en-tête de cache control
    if (isDashboard) {
      response.headers.set("Cache-Control", "no-store, max-age=0");
    }

    return response;
  }

  return NextResponse.next();
}

// Configuration du middleware
export const config = {
  matcher: [
    /*
     * Match toutes les routes d'administration
     * - /admin : toutes les pages sous /admin
     * - /admin/:path* : toutes les sous-routes
     */
    "/admin",
    "/admin/:path*",
  ],
};
