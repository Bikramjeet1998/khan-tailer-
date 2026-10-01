'use client';

import { useCallback, useEffect, useRef, useState } from "react";

type Booking = {
  id: number;
  name: string;
  phone: string;
  service: string;
  message: string | null;
  status: string;
  created_at: string;
};

type ContentItem = {
  id: number;
  sort_order: number;
  active: boolean;
  [key: string]: unknown;
};

const STATUS_STYLE: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  Pending: "bg-amber-100 text-amber-800",
  Done: "bg-green-100 text-green-700",
};

const CONTENT_TYPES: Record<
  string,
  { label: string; img: string; name: string; fields: { k: string; label: string; textarea?: boolean }[] }
> = {
  services: {
    label: "Services",
    img: "image_url",
    name: "title",
    fields: [
      { k: "title", label: "Title" },
      { k: "description", label: "Description", textarea: true },
      { k: "image_url", label: "Photo URL" },
    ],
  },
  gallery: {
    label: "Gallery",
    img: "image_url",
    name: "label",
    fields: [
      { k: "label", label: "Caption" },
      { k: "image_url", label: "Photo URL" },
    ],
  },
  testimonials: {
    label: "Reviews",
    img: "photo_url",
    name: "name",
    fields: [
      { k: "name", label: "Name" },
      { k: "role", label: "Role (e.g. Wedding Client)" },
      { k: "text", label: "Review text", textarea: true },
      { k: "photo_url", label: "Photo URL" },
    ],
  },
};

function ContentManager({ type }: { type: keyof typeof CONTENT_TYPES }) {
  const cfg = CONTENT_TYPES[type];
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [drafts, setDrafts] = useState<Record<number, Record<string, string>>>({});
  const [showAdd, setShowAdd] = useState(false);
  const [newItem, setNewItem] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<{ id: number | "new"; field: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/content?type=${type}`);
    if (res.ok) {
      const { items } = await res.json();
      setItems(items);
    }
    setLoading(false);
  }, [type]);

  useEffect(() => {
    load();
  }, [load]);

  function draft(id: number, key: string, fallback: unknown) {
    return drafts[id]?.[key] ?? String(fallback ?? "");
  }
  function setDraft(id: number, key: string, value: string) {
    setDrafts((d) => ({ ...d, [id]: { ...d[id], [key]: value } }));
  }

  async function save(id: number) {
    const body: Record<string, unknown> = { id, ...(drafts[id] || {}) };
    await fetch(`/api/admin/content?type=${type}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setDrafts((d) => {
      const { [id]: _gone, ...rest } = d;
      return rest;
    });
    load();
  }

  async function toggleActive(item: ContentItem) {
    await fetch(`/api/admin/content?type=${type}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, active: !item.active }),
    });
    load();
  }

  async function move(item: ContentItem, dir: -1 | 1) {
    const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);
    const i = sorted.findIndex((x) => x.id === item.id);
    const other = sorted[i + dir];
    if (!other) return;
    await fetch(`/api/admin/content?type=${type}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, sort_order: other.sort_order }),
    });
    await fetch(`/api/admin/content?type=${type}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: other.id, sort_order: item.sort_order }),
    });
    load();
  }

  async function remove(id: number) {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/admin/content?type=${type}&id=${id}`, { method: "DELETE" });
    load();
  }

  async function add() {
    const maxOrder = items.reduce((m, x) => Math.max(m, x.sort_order), 0);
    await fetch(`/api/admin/content?type=${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newItem, sort_order: maxOrder + 1, active: true }),
    });
    setNewItem({});
    setShowAdd(false);
    load();
  }

  function pickFile(target: { id: number | "new"; field: string }) {
    setUploadTarget(target);
    fileRef.current?.click();
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !uploadTarget) return;
    setUploading(`${uploadTarget.id}-${uploadTarget.field}`);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    setUploading(null);
    if (!res.ok) {
      alert("Upload failed (image must be under 4 MB).");
      return;
    }
    const { url } = await res.json();
    if (uploadTarget.id === "new") {
      setNewItem((n) => ({ ...n, [uploadTarget.field]: url }));
    } else {
      await fetch(`/api/admin/content?type=${type}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: uploadTarget.id, [uploadTarget.field]: url }),
      });
      load();
    }
  }

  const inputCls =
    "w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-amber-500";

  return (
    <div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
      <button
        onClick={() => setShowAdd(!showAdd)}
        className="gold-bg rounded-full px-5 py-2.5 text-sm font-bold text-white shadow"
      >
        {showAdd ? "✕ Cancel" : `＋ Add ${cfg.label.slice(0, -1)}`}
      </button>

      {showAdd && (
        <div className="mt-3 rounded-2xl border bg-white p-4 shadow-sm">
          {cfg.fields.map((f) => (
            <div key={f.k} className="mb-2">
              <label className="text-xs font-bold text-stone-500">{f.label}</label>
              {f.textarea ? (
                <textarea rows={2} value={newItem[f.k] || ""} onChange={(e) => setNewItem((n) => ({ ...n, [f.k]: e.target.value }))} className={inputCls} />
              ) : (
                <input value={newItem[f.k] || ""} onChange={(e) => setNewItem((n) => ({ ...n, [f.k]: e.target.value }))} className={inputCls} />
              )}
            </div>
          ))}
          <div className="flex gap-2">
            <button onClick={() => pickFile({ id: "new", field: cfg.img })} className="rounded-full border border-stone-300 px-4 py-2 text-xs font-bold text-stone-700">
              📷 {uploading === `new-${cfg.img}` ? "Uploading…" : "Upload photo"}
            </button>
            <button onClick={add} className="rounded-full bg-green-600 px-4 py-2 text-xs font-bold text-white">
              Save new
            </button>
          </div>
          {newItem[cfg.img] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={newItem[cfg.img]} alt="preview" className="mt-2 h-20 w-20 rounded-xl object-cover" />
          )}
        </div>
      )}

      {loading && <p className="mt-4 text-sm text-stone-500">Loading…</p>}

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className={`rounded-2xl border bg-white p-4 shadow-sm ${item.active ? "" : "opacity-60"}`}>
            <div className="flex gap-3">
              {String(item[cfg.img] || "") && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={String(item[cfg.img])} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
              )}
              <div className="min-w-0 flex-1 space-y-2">
                {cfg.fields.map((f) =>
                  f.k === cfg.img ? (
                    <div key={f.k} className="flex gap-2">
                      <input value={draft(item.id, f.k, item[f.k])} onChange={(e) => setDraft(item.id, f.k, e.target.value)} placeholder="Photo URL" className={inputCls} />
                      <button onClick={() => pickFile({ id: item.id, field: f.k })} title="Upload new photo" className="shrink-0 rounded-xl border border-stone-300 px-3 text-sm">
                        {uploading === `${item.id}-${f.k}` ? "…" : "📷"}
                      </button>
                    </div>
                  ) : f.textarea ? (
                    <textarea key={f.k} rows={2} value={draft(item.id, f.k, item[f.k])} onChange={(e) => setDraft(item.id, f.k, e.target.value)} placeholder={f.label} className={inputCls} />
                  ) : (
                    <input key={f.k} value={draft(item.id, f.k, item[f.k])} onChange={(e) => setDraft(item.id, f.k, e.target.value)} placeholder={f.label} className={inputCls} />
                  )
                )}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => save(item.id)} className="rounded-full bg-stone-900 px-3 py-1.5 text-xs font-bold text-white">
                💾 Save
              </button>
              <button onClick={() => move(item, -1)} className="rounded-full border px-3 py-1.5 text-xs font-bold" title="Move up">↑</button>
              <button onClick={() => move(item, 1)} className="rounded-full border px-3 py-1.5 text-xs font-bold" title="Move down">↓</button>
              <button onClick={() => toggleActive(item)} className="rounded-full border px-3 py-1.5 text-xs font-bold">
                {item.active ? "👁 Hide" : "👁 Show"}
              </button>
              <button onClick={() => remove(item.id)} className="ml-auto rounded-full px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {!loading && items.length === 0 && (
        <p className="mt-4 text-sm text-stone-500">Nothing here yet — add your first one above.</p>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"bookings" | "services" | "gallery" | "testimonials">("bookings");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/bookings");
    if (res.status === 401) {
      setAuthed(false);
    } else if (res.ok) {
      const { bookings } = await res.json();
      setBookings(bookings);
      setAuthed(true);
    }
    setLoading(false);
    setChecking(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPassword("");
      load();
    } else {
      setLoginError("Wrong password. Try again.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setBookings([]);
  }

  async function setStatus(id: number, status: string) {
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  }

  async function remove(id: number, name: string) {
    if (!confirm(`Delete booking from ${name}?`)) return;
    await fetch(`/api/admin/bookings?id=${id}`, { method: "DELETE" });
    load();
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fdfbf6]">
        <p className="text-stone-500">Loading…</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fdfbf6] px-4">
        <form onSubmit={login} className="w-full max-w-sm rounded-3xl border bg-white p-8 shadow-xl">
          <h1 className="font-display text-2xl font-bold text-stone-900">🔒 Admin Login</h1>
          <p className="mt-1 text-sm text-stone-500">Khan Tailor — admin panel</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="mt-5 w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-amber-500"
          />
          {loginError && <p className="mt-2 text-sm font-bold text-red-600">{loginError}</p>}
          <button className="gold-bg mt-4 w-full rounded-2xl py-3 font-bold text-white">
            Login →
          </button>
          <a href="/" className="mt-3 block text-center text-sm text-stone-400 hover:underline">
            ← Back to website
          </a>
        </form>
      </main>
    );
  }

  const counts = {
    New: bookings.filter((b) => b.status === "New").length,
    Pending: bookings.filter((b) => b.status === "Pending").length,
    Done: bookings.filter((b) => b.status === "Done").length,
  };

  const tabs = [
    ["bookings", `📋 Bookings (${bookings.length})`],
    ["services", "🧵 Services"],
    ["gallery", "🖼 Gallery"],
    ["testimonials", "⭐ Reviews"],
  ] as const;

  return (
    <main className="min-h-screen bg-[#fdfbf6] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl font-bold text-stone-900">Admin Panel</h1>
          <div className="flex gap-2">
            <button
              onClick={load}
              className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-stone-700 hover:border-amber-500"
            >
              ↻ Refresh
            </button>
            <button
              onClick={logout}
              className="rounded-full bg-stone-900 px-4 py-2 text-sm font-bold text-white"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
                tab === key ? "gold-bg text-white shadow" : "border border-stone-300 bg-white text-stone-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "bookings" && (
            <>
              <p className="text-sm text-stone-500">
                {bookings.length} total • {counts.New} new • {counts.Pending} pending • {counts.Done} done
              </p>
              {loading && <p className="mt-4 text-sm text-stone-500">Loading…</p>}
              {!loading && bookings.length === 0 && (
                <div className="mt-4 rounded-3xl border bg-white p-10 text-center text-stone-500">
                  No bookings yet. New enquiries from the website will appear here.
                </div>
              )}
              <div className="mt-4 space-y-3">
                {bookings.map((b) => (
                  <div key={b.id} className="rounded-2xl border bg-white p-4 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-bold text-stone-900">
                        {b.name}{" "}
                        <a href={`tel:+91${b.phone}`} className="ml-1 font-normal text-amber-700 hover:underline">
                          📞 {b.phone}
                        </a>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLE[b.status] || "bg-stone-100"}`}>
                        {b.status}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-stone-500">
                      {b.service} • {new Date(b.created_at).toLocaleString("en-IN")}
                    </div>
                    {b.message && <div className="mt-2 text-sm text-stone-700">“{b.message}”</div>}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(["New", "Pending", "Done"] as const).map(
                        (s) =>
                          s !== b.status && (
                            <button
                              key={s}
                              onClick={() => setStatus(b.id, s)}
                              className="rounded-full border border-stone-200 px-3 py-1.5 text-xs font-bold text-stone-600 hover:border-amber-500 hover:text-amber-700"
                            >
                              Mark {s}
                            </button>
                          )
                      )}
                      <a
                        href={`https://wa.me/91${b.phone}?text=${encodeURIComponent(`Hello ${b.name}, this is Khan Tailor regarding your ${b.service} booking.`)}`}
                        target="_blank"
                        className="rounded-full bg-green-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-green-700"
                      >
                        WhatsApp ↪
                      </a>
                      <button
                        onClick={() => remove(b.id, b.name)}
                        className="ml-auto rounded-full px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {tab === "services" && <ContentManager type="services" />}
          {tab === "gallery" && <ContentManager type="gallery" />}
          {tab === "testimonials" && <ContentManager type="testimonials" />}
        </div>

        <a href="/" className="mt-6 block text-center text-sm text-stone-400 hover:underline">
          ← Back to website
        </a>
      </div>
    </main>
  );
}
