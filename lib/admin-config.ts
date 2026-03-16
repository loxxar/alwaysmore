// Admin configuration and utilities
// Centralized admin authentication configuration

export const ADMIN_CONFIG = {
  // Secret key for admin authentication - MUST be changed in production
  SECRET: process.env.ADMIN_SECRET || "raid-always-more-admin-secret-2024",

  // Cookie names
  COOKIE_NAMES: {
    TOKEN: "admin_token",
    USER: "admin_user",
  },

  // Cookie settings
  COOKIE_SETTINGS: {
    PATH: "/",
    MAX_AGE: 86400, // 24 hours in seconds
    SAME_SITE: "Strict" as const,
    SECURE: process.env.NODE_ENV === "production",
    HTTP_ONLY: true,
  },

  // Admin login page path
  LOGIN_PATH: "/admin/login",

  // Admin dashboard path
  DASHBOARD_PATH: "/admin/dashboard",
} as const;

// Authentication utilities
export const AdminAuth = {
  // Check if user is authenticated
  isAuthenticated(
    token: string | undefined | null,
    user: string | undefined | null,
  ): boolean {
    if (!token || !user) return false;
    return token === ADMIN_CONFIG.SECRET;
  },

  // Set admin authentication cookies
  setAuthCookies(username: string): {
    [key: string]: string | number | boolean;
  } {
    return {
      [ADMIN_CONFIG.COOKIE_NAMES.TOKEN]: ADMIN_CONFIG.SECRET,
      [ADMIN_CONFIG.COOKIE_NAMES.USER]: encodeURIComponent(username),
      path: ADMIN_CONFIG.COOKIE_SETTINGS.PATH,
      maxAge: ADMIN_CONFIG.COOKIE_SETTINGS.MAX_AGE,
      sameSite: ADMIN_CONFIG.COOKIE_SETTINGS.SAME_SITE,
      secure: ADMIN_CONFIG.COOKIE_SETTINGS.SECURE,
      httpOnly: ADMIN_CONFIG.COOKIE_SETTINGS.HTTP_ONLY,
    };
  },

  // Clear admin authentication cookies
  clearAuthCookies(): { [key: string]: string | number | boolean } {
    return {
      [ADMIN_CONFIG.COOKIE_NAMES.TOKEN]: "",
      [ADMIN_CONFIG.COOKIE_NAMES.USER]: "",
      path: ADMIN_CONFIG.COOKIE_SETTINGS.PATH,
      maxAge: 0,
      sameSite: ADMIN_CONFIG.COOKIE_SETTINGS.SAME_SITE,
      secure: ADMIN_CONFIG.COOKIE_SETTINGS.SECURE,
      httpOnly: ADMIN_CONFIG.COOKIE_SETTINGS.HTTP_ONLY,
    };
  },

  // Build cookie string from settings
  buildCookieString(
    name: string,
    value: string,
    settings: { [key: string]: string | number | boolean },
  ): string {
    const parts = [`${name}=${value}`];

    if (settings.path) parts.push(`path=${settings.path}`);
    if (settings.maxAge !== undefined) parts.push(`max-age=${settings.maxAge}`);
    if (settings.sameSite) parts.push(`SameSite=${settings.sameSite}`);
    if (settings.secure) parts.push("Secure");
    if (settings.httpOnly) parts.push("HttpOnly");

    return parts.join("; ");
  },

};

// Environment variable validation
export function validateAdminConfig(): string[] {
  const warnings: string[] = [];

  // Check if using default secret in production
  if (
    process.env.NODE_ENV === "production" &&
    ADMIN_CONFIG.SECRET === "raid-always-more-admin-secret-2024"
  ) {
    warnings.push(
      "CRITICAL: Using default admin secret in production. Change ADMIN_SECRET environment variable immediately!",
    );
  }

  // Check if cookies are secure in production
  if (
    process.env.NODE_ENV === "production" &&
    !ADMIN_CONFIG.COOKIE_SETTINGS.SECURE
  ) {
    warnings.push(
      "WARNING: Admin cookies are not marked as secure in production",
    );
  }

  return warnings;
}

// Default export
export default ADMIN_CONFIG;
