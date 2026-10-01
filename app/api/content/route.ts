import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Public: read active site content for the homepage.
// Visitors can only read (RLS allows SELECT on active rows only).
export async function GET() {
  try {
    const supabase = getSupabase();
    const [services, gallery, testimonials] = await Promise.all([
      supabase.from("services").select("*").eq("active", true).order("sort_order"),
      supabase.from("gallery").select("*").eq("active", true).order("sort_order"),
      supabase.from("testimonials").select("*").eq("active", true).order("sort_order"),
    ]);
    if (services.error) throw services.error;
    if (gallery.error) throw gallery.error;
    if (testimonials.error) throw testimonials.error;
    return NextResponse.json({
      services: services.data,
      gallery: gallery.data,
      testimonials: testimonials.data,
    });
  } catch (e) {
    console.error("Content API error:", e);
    return NextResponse.json(
      { services: [], gallery: [], testimonials: [] },
      { status: 500 }
    );
  }
}
