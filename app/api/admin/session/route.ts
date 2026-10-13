import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_PASSWORD, SESSION_COOKIE_NAME, signSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const username = body.username || "admin";
  const password = body.password || "";

  if (username !== "admin" || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Felaktigt lösenord eller användarnamn." }, { status: 401 });
  }

  const token = signSession();
  cookies().set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
