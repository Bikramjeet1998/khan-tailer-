import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type BookingBody = {
  name?: string;
  phone?: string;
  service?: string;
  msg?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as BookingBody;
    const name = (body.name || "").trim().slice(0, 100);
    const phone = (body.phone || "").trim().slice(0, 20);
    const service = (body.service || "Other").slice(0, 50);
    const message = (body.msg || "").trim().slice(0, 1000);

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required." },
        { status: 400 }
      );
    }
    if (!/^[0-9+\-\s]{7,20}$/.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { error } = await supabase
      .from("bookings")
      .insert([{ name, phone, service, message }]);

    if (error) {
      console.error("Supabase insert failed:", error.message);
      return NextResponse.json(
        { error: "Could not save booking. Please try WhatsApp." },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Bookings API error:", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
