import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type ClickBody = {
  source?: string;
  phone?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ClickBody;
    const source = (body.source || "unknown").trim().slice(0, 100);
    const phone = (body.phone || "").trim().slice(0, 20);

    const supabase = getSupabase();
    const { error } = await supabase
      .from("whatsapp_clicks")
      .insert([{ source, phone }]);

    if (error) {
      console.error("WhatsApp click insert failed:", error.message);
      return NextResponse.json(
        { error: "Could not log click." },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("WhatsApp clicks API error:", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
