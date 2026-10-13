import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
export const SESSION_COOKIE_NAME = "moppehjalpen_admin_session";

export function signSession() {
  return crypto
    .createHmac("sha256", process.env.AUTH_SECRET || "moppehjalpen-secret")
    .update(ADMIN_PASSWORD)
    .digest("hex");
}

export function getAdminSession() {
  return cookies().get(SESSION_COOKIE_NAME)?.value;
}

export function isAdminAuthenticated() {
  return getAdminSession() === signSession();
}
