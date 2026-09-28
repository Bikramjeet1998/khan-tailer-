'use client';

import { useCallback, useEffect, useState } from "react";

type Booking = {
  id: number;
  name: string;
  phone: string;
  service: string;
  message: string | null;
  status: string;
  created_at: string;
};

const STATUS_STYLE: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  Pending: "bg-amber-100 text-amber-800",
  Done: "bg-green-100 text-green-700",
};

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

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
          <p className="mt-1 text-sm text-stone-500">Khan Tailor — bookings panel</p>
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

  return (
    <main className="min-h-screen bg-[#fdfbf6] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold text-stone-900">📋 Bookings</h1>
            <p className="text-sm text-stone-500">
              {bookings.length} total • {counts.New} new • {counts.Pending} pending • {counts.Done} done
            </p>
          </div>
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

        {loading && <p className="mt-4 text-sm text-stone-500">Loading…</p>}

        {!loading && bookings.length === 0 && (
          <div className="mt-8 rounded-3xl border bg-white p-10 text-center text-stone-500">
            No bookings yet. New enquiries from the website will appear here.
          </div>
        )}

        <div className="mt-6 space-y-3">
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

        <a href="/" className="mt-6 block text-center text-sm text-stone-400 hover:underline">
          ← Back to website
        </a>
      </div>
    </main>
  );
}
