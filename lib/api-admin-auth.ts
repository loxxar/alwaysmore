import { cookies } from "next/headers";
import { ADMIN_CONFIG, AdminAuth } from "./admin-config";

export async function isAdminRequestAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(ADMIN_CONFIG.COOKIE_NAMES.TOKEN)?.value;
  const user = store.get(ADMIN_CONFIG.COOKIE_NAMES.USER)?.value;
  return AdminAuth.isAuthenticated(token, user);
}
