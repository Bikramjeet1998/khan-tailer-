# Phase 2 — Admin Panel (Step-by-Step Document)

Goal: private `/admin` page where only YOU (password login) can see all
bookings, mark them New / Pending / Done, reply on WhatsApp, and delete spam.

Live panel (after deploy): https://khan-tailer-iota.vercel.app/admin

---

## PART A — What I (developer) did in code

### Step 1 — `lib/adminAuth.ts` (password + login session)
- `checkAdminPassword()` — compares typed password with `ADMIN_PASSWORD` env var.
- `createAdminSession()` — on correct password, sets an **httpOnly cookie**
  `kt_admin` valid 7 days. Cookie = random token + HMAC signature
  (needs `ADMIN_SECRET`). Nobody can forge it without the secret.
- `isAdmin()` — verifies the cookie signature on every protected request.
- `destroyAdminSession()` — logout (deletes cookie).

### Step 2 — `lib/supabaseAdmin.ts` (master DB key, server only)
- Connects with `SUPABASE_SERVICE_ROLE_KEY` (bypasses Row Level Security).
- Imported ONLY by admin API routes — never in browser code.

### Step 3 — Admin APIs (`app/api/admin/...`, all dynamic)
| Endpoint | Method | What it does |
|---|---|---|
| `/api/admin/login` | POST `{password}` | Checks password → sets session cookie |
| `/api/admin/logout` | POST | Deletes session cookie |
| `/api/admin/bookings` | GET | Returns all bookings, newest first (login required) |
| `/api/admin/bookings` | PATCH `{id, status}` | Marks New / Pending / Done (login required) |
| `/api/admin/bookings?id=5` | DELETE | Deletes one booking (login required) |

Everyone else gets `401 Not logged in` — data stays private.

### Step 4 — Admin page (`app/admin/page.tsx`)
- Not logged in → 🔒 password form.
- Logged in → booking cards: name + tap-to-call phone, service, date,
  message, status badge, **Mark Pending / Done** buttons,
  **WhatsApp ↪** reply button, **Delete** (with confirm), counts on top,
  Refresh + Logout buttons. Mobile-friendly.

### Step 5 — `.env.local` placeholders added
```
ADMIN_PASSWORD=change-me-to-a-strong-password
ADMIN_SECRET=change-me-to-a-long-random-string-min-32-chars
SUPABASE_SERVICE_ROLE_KEY=paste-service-role-key-from-supabase-dashboard-here
```
You must fill these (Part B, Step 1). File is git-ignored, never pushed.

### Step 6 — Build verified
`npm run build` → success. New routes: `/admin`, `/api/admin/*`.

---

## PART B — What YOU must do

### Step 1 — Get the service_role key (2 min)
1. Supabase → Khan Tailer project → **Settings (gear) → API Keys**
2. Find **`service_role` `secret`** → **Reveal → Copy**
3. ⚠️ This is the MASTER key — never put it in code that goes to GitHub,
   never add `NEXT_PUBLIC_` prefix, never share screenshots of it.

### Step 2 — Fill `.env.local` on your laptop
Open `D:\Next js\Khan-Tailer\.env.local` and replace:
- `ADMIN_PASSWORD=` → your own strong password (e.g. `KhanAdmin@2026!`)
- `ADMIN_SECRET=` → any long random text, min 32 chars
  (generate: Supabase → any "Generate" button, or type random letters+numbers)
- `SUPABASE_SERVICE_ROLE_KEY=` → paste the key from Step 1
- Restart dev server after editing (`npm run dev`), env loads at startup.

### Step 3 — Add the same 3 vars to Vercel
Vercel → `khan-tailer` → **Settings → Environment Variables** → add
`ADMIN_PASSWORD`, `ADMIN_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`
(all environments: Production + Preview + Development).
Keep the earlier `SUPABASE_URL` + `SUPABASE_ANON_KEY` as they are.
Then **Deployments → Redeploy**.

### Step 4 — Push the code
```
git add -A
git commit -m "Phase 2: admin panel with login and bookings"
git push origin main
```

### Step 5 — Test
1. Open `https://khan-tailer-iota.vercel.app/admin`
2. Wrong password → "Wrong password. Try again." ✅
3. Right password → your test bookings appear ✅
4. Mark one Done, WhatsApp-reply one, delete a test row ✅
5. Logout → login form shows again ✅

---

## Security notes (simple version)
- Password lives only in env vars (laptop + Vercel), never in code/GitHub.
- Session cookie is `httpOnly` → JavaScript can't steal it.
- HMAC signature → cookie can't be forged.
- Service-role key lives only on the server → visitors can never read bookings.
- If password ever leaks: change `ADMIN_PASSWORD` in Vercel + redeploy
  (old sessions keep working max 7 days — acceptable for this shop panel).
