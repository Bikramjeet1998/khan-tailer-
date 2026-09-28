import { NextResponse } from "next/server";
import { checkAdminPassword, createAdminSession } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { password } = (await req.json()) as { password?: string };
    if (!checkAdminPassword(password)) {
      return NextResponse.json({ error: "Wrong password." }, { status: 401 });
    }
    await createAdminSession();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Admin login error:", e);
    return NextResponse.json({ error: "Server not configured." }, { status: 500 });
  }
}
