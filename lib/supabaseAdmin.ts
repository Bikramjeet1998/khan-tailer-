import { createClient } from "@supabase/supabase-js";

// Service-role client — SERVER ONLY (never import in browser code).
// Bypasses Row Level Security, so the admin panel can READ/UPDATE/DELETE.
// Key stays private: plain env vars, no NEXT_PUBLIC_ prefix.
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY env vars");
  }
  return createClient(url, key);
}
