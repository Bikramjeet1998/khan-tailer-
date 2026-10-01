# Phase 3 — Manage Content + Photo Uploads (Step-by-Step Document)

Goal: edit Services, Gallery photos, and Reviews YOURSELF from `/admin`
— no code changes. Upload shop photos straight from your phone.

---

## PART A — What I (developer) did in code

### Step 1 — `supabase-phase3.sql` (database + storage setup file)
New file in project root. Creates:
- Tables `services`, `gallery`, `testimonials`
  (title/text + image URL + `sort_order` + `active` on/off switch)
- Row Level Security: **visitors can only READ active rows** —
  no public insert/update/delete (only the server with master key can change).
- Storage bucket `site-images` (public read, server-only upload).
- **Seed data**: the same 6 services, 8 gallery photos, 3 reviews the site
  shows today — so the website looks IDENTICAL after migration.

### Step 2 — Public API `app/api/content/route.ts`
- `GET /api/content` → `{ services, gallery, testimonials }` (active only).
- Used by the homepage. Returns empty arrays on error (site falls back).

### Step 3 — Admin content API `app/api/admin/content/route.ts`
One route for all 3 tables (`?type=services|gallery|testimonials`), login required:
- GET → all rows incl. hidden ones
- POST → create row (only allowed fields accepted — junk blocked)
- PATCH `{id, ...fields}` → edit row
- DELETE `?type=&id=` → delete row

### Step 4 — Upload API `app/api/admin/upload/route.ts`
- `POST` multipart form with `file` → checks: logged in, is an image,
  under 4 MB → saves to `site-images` bucket with unique name →
  returns public `{ url }`.
- Uploads go through the server (master key), so the bucket needs
  NO public-write rule. Safe.

### Step 5 — Homepage now loads live content (`app/page.tsx`)
- Hardcoded lists renamed to `DEFAULT_*` (fallback if DB empty/offline).
- New `useSiteContent()` hook fetches `/api/content` once on load;
  replaces sections only when the database actually returns rows.
- **Site can never look broken**: DB down → old content shows.

### Step 6 — Admin panel tabs (`app/admin/page.tsx`)
- Tabs: 📋 Bookings | 🧵 Services | 🖼 Gallery | ⭐ Reviews
- Each content tab: **Add new**, edit any field + 💾 Save per card,
  📷 upload photo (or paste URL), ↑↓ reorder, 👁 Hide/Show, Delete.
- Hidden items disappear from the website instantly (active = false).

### Step 7 — Build verified
`npm run build` → success. New routes:
`/api/content`, `/api/admin/content`, `/api/admin/upload`.

---

## PART B — What YOU must do

### Step 1 — Run the SQL in Supabase (5 min, one time)
1. Supabase → Khan Tailer → **SQL Editor → + New query**
2. Open `supabase-phase3.sql` from the project, copy ALL of it, paste, **Run**
3. Verify: **Table Editor** → `services` (6 rows), `gallery` (8 rows),
   `testimonials` (3 rows). **Storage** (left menu) → bucket `site-images` exists.

### Step 2 — Push the code
```
git add -A
git commit -m "Phase 3: manageable content and photo uploads"
git push origin main
```
(No new env vars — Vercel already has everything. Wait for redeploy.)

### Step 3 — Test (phone-friendly, do it from mobile)
1. Open `/admin` → login → **Services** tab → 6 items visible ✅
2. Edit a title → 💾 Save → open website → changed ✅
3. **Gallery** → ＋Add → 📷 upload a shop photo from phone → Save new → visible on site ✅
4. 👁 Hide one item → disappears from site → 👁 Show → back ✅
5. ↑↓ reorder two items → website order changes ✅

### How it fits together
```
You in /admin ──edit/upload──▶ admin APIs (login-checked, master key)
                                      │ writes
                                      ▼
                              Supabase tables + site-images bucket
                                      │ public read (active only)
                                      ▼
Visitor homepage ── GET /api/content ──▶ live Services/Gallery/Reviews
(DB empty/down → DEFAULT_* fallback, site still perfect)
```

## Beginner notes (MySQL → Postgres, Storage)
- `sort_order int` = MySQL `INT` column used for `ORDER BY sort_order`.
- `active boolean` = MySQL `TINYINT(1)`; Hide/Show flips true/false.
- Storage bucket = just a folder for images; "public read" = anyone with
  the link can view (needed — website visitors must load photos).
- 4 MB upload cap = hosting limit; phone photos usually 2–5 MB —
  if upload fails, pick a smaller photo or screenshot it.
