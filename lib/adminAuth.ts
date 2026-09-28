import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

// Simple password login for ONE admin (you).
// Session = random token + HMAC signature in an httpOnly cookie.
// Nobody can forge it without ADMIN_SECRET. No database table needed.

const COOKIE = "kt_admin";
const AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function adminSecret(): string {
  const s = process.env.ADMIN_SECRET;
  if (!s) throw new Error("Missing ADMIN_SECRET env var");
  return s;
}

function sign(token: string): string {
  return createHmac("sha256", adminSecret()).update(token).digest("hex");
}

export async function createAdminSession(): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const store = await cookies();
  store.set(COOKIE, `${token}.${sign(token)}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: AGE_SECONDS,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function destroyAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  try {
    const store = await cookies();
    const value = store.get(COOKIE)?.value;
    if (!value) return false;
    const [token, sig] = value.split(".");
    if (!token || !sig) return false;
    const expected = sign(token);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function checkAdminPassword(password: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error("Missing ADMIN_PASSWORD env var");
  return typeof password === "string" && password === expected;
}
