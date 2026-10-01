-- ============================================================
-- Phase 3: manageable site content (services, gallery, reviews)
-- Run ONCE in Supabase → SQL Editor → New query → Run.
-- Safe to re-run the table/policy parts; seed INSERTs run only if empty.
-- ============================================================

-- ---------- 1. TABLES ----------
create table if not exists services (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null default '',
  image_url text not null default '',
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists gallery (
  id bigint generated always as identity primary key,
  label text not null default '',
  image_url text not null default '',
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists testimonials (
  id bigint generated always as identity primary key,
  name text not null,
  role text not null default '',
  text text not null default '',
  photo_url text not null default '',
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table services enable row level security;
alter table gallery enable row level security;
alter table testimonials enable row level security;

-- ---------- 2. PUBLIC READ (website visitors may read active rows only) ----------
drop policy if exists "Public read active services" on services;
create policy "Public read active services"
on services for select to anon using (active = true);

drop policy if exists "Public read active gallery" on gallery;
create policy "Public read active gallery"
on gallery for select to anon using (active = true);

drop policy if exists "Public read active testimonials" on testimonials;
create policy "Public read active testimonials"
on testimonials for select to anon using (active = true);

-- NOTE: no INSERT/UPDATE/DELETE policies for anon → only the server
-- (service_role key in admin APIs) can change content. Visitors read-only.

-- ---------- 3. IMAGE STORAGE BUCKET (public read, server-only write) ----------
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

drop policy if exists "Public read site images" on storage.objects;
create policy "Public read site images"
on storage.objects for select to anon using (bucket_id = 'site-images');

-- No public insert/update/delete policies → uploads go through
-- /api/admin/upload which uses the service_role key. Safe.

-- ---------- 4. SEED DATA (only if tables are empty) ----------
-- Services (same 6 as the website shows today)
insert into services (title, description, image_url, sort_order)
select * from (values
  ('Bespoke Suits', '2-pc / 3-pc suits & blazers with sharp shoulders and clean drape.', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=700&auto=format&fit=crop', 1),
  ('Sherwani & Indo-Western', 'Royal wedding wear with rich fabrics and regal finishing.', 'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=700&auto=format&fit=crop', 2),
  ('Kurta Pajama & Pathani', 'Breathable festive & daily kurtas in cotton, linen & silk.', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=700&auto=format&fit=crop', 3),
  ('Custom Shirts', 'Choose collar, cuff & fit — crisp shirts made to your size.', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=700&auto=format&fit=crop', 4),
  ('Trousers & Chinos', 'Perfect waist, length & taper for office and casual wear.', 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=700&auto=format&fit=crop', 5),
  ('Alteration & Repair', 'Same-day fitting correction, tapering, zip & finishing.', 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=700&auto=format&fit=crop', 6)
) as v(title, description, image_url, sort_order)
where not exists (select 1 from services);

-- Gallery (same 8 photos as the website shows today)
insert into gallery (label, image_url, sort_order)
select * from (values
  ('Business Suit', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=700&auto=format&fit=crop', 1),
  ('Wedding Look', 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=700&auto=format&fit=crop', 2),
  ('Kurta Style', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=700&auto=format&fit=crop', 3),
  ('Blazer Detail', 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=700&auto=format&fit=crop', 4),
  ('Crisp Shirts', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=700&auto=format&fit=crop', 5),
  ('Fabric Library', 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=700&auto=format&fit=crop', 6),
  ('Ready Styles', 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=700&auto=format&fit=crop', 7),
  ('Office Fit', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=700&auto=format&fit=crop', 8)
) as v(label, image_url, sort_order)
where not exists (select 1 from gallery);

-- Testimonials (same 3 reviews as the website shows today)
insert into testimonials (name, role, text, photo_url, sort_order)
select * from (values
  ('Rahul Sharma', 'Wedding Client', 'My wedding sherwani fit was absolutely perfect. Fabric quality excellent, finishing premium. Got so many compliments!', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop', 1),
  ('Amit Verma', 'Regular Customer', 'Trusted tailor for years — suits to shirts, always precise stitching and on-time delivery. Highly recommended.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop', 2),
  ('Simran Kaur', 'Family Function', 'Ordered kurtas for whole family. Home measurement was so easy, fitting perfect for everyone. Very professional.', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop', 3)
) as v(name, role, text, photo_url, sort_order)
where not exists (select 1 from testimonials);
