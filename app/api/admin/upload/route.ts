import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { isAdmin } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB (hosting upload limit)

// POST — upload a photo to the site-images bucket. Admin only.
// Send as multipart form with field "file". Returns { url } (public link).
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file sent." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files allowed." }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Image must be under 4 MB." }, { status: 400 });
    }
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().slice(0, 5);
    const path = `${Date.now()}-${randomBytes(8).toString("hex")}.${ext}`;

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.storage
      .from("site-images")
      .upload(path, file, { contentType: file.type });
    if (error) throw error;

    const { data } = supabase.storage.from("site-images").getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
