# Phase 1 — Backend with Supabase (Step-by-Step Document)

Goal: every "Book a Home Visit" enquiry is **saved in a database**
in addition to opening WhatsApp. Nothing visible changes for visitors.

Live site: https://khan-tailer-iota.vercel.app/
Supabase project: https://bwqrdvglsmfxqllslulp.supabase.co (Mumbai)

---

## PART A — What I (developer) did in code

### Step 1 — Installed the Supabase library
Command run in `D:\Next js\Khan-Tailer`:
```
npm install @supabase/supabase-js
```
This library lets Next.js talk to the Supabase database.
(`package.json` + `package-lock.json` updated automatically.)

### Step 2 — Created `.env.local` (secret keys, local only)
New file `.env.local` (private server-only keys — no `NEXT_PUBLIC_` prefix,
so values NEVER reach the browser):
```
SUPABASE_URL=https://bwqrdvglsmfxqllslulp.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi... (your anon public key)
```
- This file is **git-ignored** (see `.gitignore` → `.env*`), so keys never go to GitHub.
- Vercel needs the same two values separately (see Part B, Step 2).

### Step 3 — Created the database helper `lib/supabase.ts`
- One reusable function `getSupabase()` that connects using the env vars.
- Server-only: imported ONLY by the API route, never by browser code,
  so the keys stay private (no `NEXT_PUBLIC_` prefix).
- Writes are additionally protected by Row Level Security rules
  in Supabase (Part B Step 1).

### Step 4 — Created the backend API `app/api/bookings/route.ts`
- New backend endpoint: `POST /api/bookings`
- What it does:
  1. Reads name / phone / service / message from the request
  2. Validates: name + phone required, phone must look like a phone number
  3. Inserts one row into the `bookings` table in Supabase
  4. Returns `{ ok: true }` or an error message
- `export const dynamic = "force-dynamic"` → always runs fresh on the server,
  never a cached static page.

### Step 5 — Connected the booking form (`app/page.tsx`)
Old behaviour: form → opens WhatsApp only.
New behaviour (same button, two actions):
  1. Sends the data to `/api/bookings` → saved in database
  2. Opens WhatsApp exactly as before (works even if saving fails)
- Shows "✓ Booking saved!" for 5 seconds, then clears the form.

### Step 6 — Verified the build
```
npm run build
```
Result: success. New route visible in output as `ƒ /api/bookings`
(`ƒ = Dynamic`, runs on demand on the server.)

---

## PART B — What YOU must do (2 manual steps)

### Step 1 — Create the `bookings` table in Supabase (5 min)
1. Open https://supabase.com → your **Khan Tailer** project
2. Left menu → **SQL Editor** → **+ New query**
3. Paste this SQL and click **Run**:

```sql
create table bookings (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  service text not null default 'Other',
  message text,
  status text not null default 'New',
  created_at timestamptz not null default now()
);

alter table bookings enable row level security;

create policy "Allow public inserts"
on bookings for insert to anon
with check (true);
```

What this means (MySQL comparison):
- `bigint generated always as identity` = MySQL `BIGINT AUTO_INCREMENT PRIMARY KEY`
- `timestamptz default now()` = MySQL `TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
- Row Level Security + policy = "website visitors may INSERT rows,
  but may NOT read/update/delete them" (your enquiries stay private).

4. Verify: left menu → **Table Editor** → you should see an empty `bookings` table.

### Step 2 — Add the keys to Vercel (3 min)
`.env.local` works only on your laptop. The live site needs the keys too:
1. Open https://vercel.com → your `khan-tailer` project → **Settings → Environment Variables**
2. Add (as private Config variables — NO `NEXT_PUBLIC_` prefix):
   - Name: `SUPABASE_URL` → Value: `https://bwqrdvglsmfxqllslulp.supabase.co` → Environments: Production + Preview + Development
   - Name: `SUPABASE_ANON_KEY` → Value: *(your anon key)* → all environments
   - If you already added `NEXT_PUBLIC_...` versions, **delete them** and add these instead.
3. **Deployments → Redeploy** (env vars apply only after redeploy)

### Step 3 — Push the code
```
git add -A
git commit -m "Phase 1: save bookings to Supabase"
git push origin main
```

### Step 4 — Test end to end
1. Open https://khan-tailer-iota.vercel.app/ → fill the booking form with a test name
2. Supabase → **Table Editor → bookings** → your test row should appear
3. Delete the test row (select row → Delete)

---

## How it all fits together (simple diagram)

```
Visitor fills form (page.tsx)
        │  fetch POST /api/bookings
        ▼
Backend API (app/api/bookings/route.ts) ── validates ──▶ Supabase `bookings` table
        │                                                      (Row Level Security:
        │                                                       anon can INSERT only)
        └─► WhatsApp opens (unchanged, always works)
```

## Next (Phase 2, when ready)
- `/admin` page with password login (only you)
- View all bookings, mark Done/Pending, delete spam
- Reads will use a server-side safe key (service_role kept on server only)
