import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

const ALLOWED_STATUS = ["New", "Pending", "Done"] as const;

// GET — list all bookings (newest first). Admin only.
export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw error;
    return NextResponse.json({ bookings: data });
  } catch (e) {
    console.error("Admin list error:", e);
    return NextResponse.json({ error: "Could not load bookings." }, { status: 500 });
  }
}

// PATCH — change status. Admin only. Body: { id, status }
export async function PATCH(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  try {
    const { id, status } = (await req.json()) as { id?: number; status?: string };
    if (!id || !status || !(ALLOWED_STATUS as readonly string[]).includes(status)) {
      return NextResponse.json({ error: "Invalid id or status." }, { status: 400 });
    }
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Admin update error:", e);
    return NextResponse.json({ error: "Could not update." }, { status: 500 });
  }
}

// DELETE — remove a booking. Admin only. URL: /api/admin/bookings?id=5
export async function DELETE(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("bookings").delete().eq("id", Number(id));
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Admin delete error:", e);
    return NextResponse.json({ error: "Could not delete." }, { status: 500 });
  }
}
