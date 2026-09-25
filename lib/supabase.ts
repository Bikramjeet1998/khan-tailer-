import { createClient } from "@supabase/supabase-js";

// Server-only client — used ONLY inside API routes (app/api/...).
// Uses private env vars (no NEXT_PUBLIC_ prefix), so keys NEVER reach the browser.
// Browser writes are still protected by Row Level Security in Supabase.
export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase env vars (SUPABASE_URL / SUPABASE_ANON_KEY)");
  }
  return createClient(url, key);
}
