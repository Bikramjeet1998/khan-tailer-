import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

const TABLES = ["services", "gallery", "testimonials"] as const;
type Table = (typeof TABLES)[number];

// Only these fields may be written per table (blocks junk/hacking).
const FIELDS: Record<Table, string[]> = {
  services: ["title", "description", "image_url", "sort_order", "active"],
  gallery: ["label", "image_url", "sort_order", "active"],
  testimonials: ["name", "role", "text", "photo_url", "sort_order", "active"],
};

function getTable(req: Request): Table | null {
  const t = new URL(req.url).searchParams.get("type");
  return TABLES.includes(t as Table) ? (t as Table) : null;
}

function pick(body: Record<string, unknown>, table: Table) {
  const out: Record<string, unknown> = {};
  for (const f of FIELDS[table]) {
    if (body[f] !== undefined) out[f] = body[f];
  }
  return out;
}

// GET ?type=services — list ALL rows (incl. hidden). Admin only.
export async function GET(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  const table = getTable(req);
  if (!table) return NextResponse.json({ error: "Bad type." }, { status: 400 });
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from(table).select("*").order("sort_order");
    if (error) throw error;
    return NextResponse.json({ items: data });
  } catch (e) {
    console.error("Admin content list error:", e);
    return NextResponse.json({ error: "Could not load." }, { status: 500 });
  }
}

// POST ?type=services — create row. Admin only.
export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  const table = getTable(req);
  if (!table) return NextResponse.json({ error: "Bad type." }, { status: 400 });
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from(table).insert([pick(body, table)]).select().single();
    if (error) throw error;
    return NextResponse.json({ item: data });
  } catch (e) {
    console.error("Admin content create error:", e);
    return NextResponse.json({ error: "Could not create." }, { status: 500 });
  }
}

// PATCH ?type=services — update row. Admin only. Body: { id, ...fields }
export async function PATCH(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  const table = getTable(req);
  if (!table) return NextResponse.json({ error: "Bad type." }, { status: 400 });
  try {
    const body = (await req.json()) as Record<string, unknown> & { id?: number };
    if (!body.id) return NextResponse.json({ error: "Missing id." }, { status: 400 });
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from(table).update(pick(body, table)).eq("id", body.id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Admin content update error:", e);
    return NextResponse.json({ error: "Could not update." }, { status: 500 });
  }
}

// DELETE ?type=services&id=3 — delete row. Admin only.
export async function DELETE(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  const table = getTable(req);
  const id = new URL(req.url).searchParams.get("id");
  if (!table || !id) return NextResponse.json({ error: "Bad type or id." }, { status: 400 });
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from(table).delete().eq("id", Number(id));
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Admin content delete error:", e);
    return NextResponse.json({ error: "Could not delete." }, { status: 500 });
  }
}
