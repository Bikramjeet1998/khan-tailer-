'use client';

import Image from "next/image";

const PHONE = "8264620991";
const PHONE_DISPLAY = "82646-20991";
const ADDRESS = "Gumtala Link Road, Airport Road, Jujhar Singh Avenue, Amritsar (143001)";
const WHATSAPP = `https://wa.me/91${PHONE}?text=${encodeURIComponent("Hello Khan Tailor, I want to book a stitching / measurement visit.")}`;
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Gumtala Link Road Airport Road Jujhar Singh Avenue Amritsar 143001")}`;

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const HERO_IMG = img("photo-1507679799987-c73779587ccf", 900);
const HERO_SIDE = img("photo-1594938298603-c8148c4dae35", 600);
const CRAFT_IMG = img("photo-1584992236310-6edddc08acff", 900);
const FABRIC_IMG = img("photo-1620799140408-edc6dcb6d633", 900);

const services = [
  {
    title: "Suits & Blazers",
    desc: "Sharp 2-pc / 3-pc suits, wedding & office blazers with perfect shoulder fitting.",
    price: "from ₹2,499 stitching",
    image: img("photo-1594938298603-c8148c4dae35"),
  },
  {
    title: "Sherwani & Indo-Western",
    desc: "Royal wedding sherwanis, Jodhpuri & Indo-western — traditional grace, modern finish.",
    price: "from ₹3,499 stitching",
    image: img("photo-1610030469983-98e550d6193c"),
  },
  {
    title: "Kurta Pajama & Pathani",
    desc: "Everyday to festive kurtas, Pathani suits in all fabrics — comfort fit.",
    price: "from ₹499 stitching",
    image: img("photo-1602810318383-e386cc2a3ccf"),
  },
  {
    title: "Shirt & Pant",
    desc: "Formal & casual shirts, trousers with clean stitching and correct length.",
    price: "from ₹349 stitching",
    image: img("photo-1596755094514-f87e34085b2c"),
  },
  {
    title: "Fabrics & Custom Style",
    desc: "Slim modern or classic traditional — bring any fabric, we handle all.",
    price: "all fabrics handled",
    image: img("photo-1620799140408-edc6dcb6d633"),
  },
  {
    title: "Alteration & Repair",
    desc: "Fitting correction, tapering, length, zip & urgent same-day alterations.",
    price: "same-day available",
    image: img("photo-1584992236310-6edddc08acff"),
  },
];

const gallery = [
  { src: img("photo-1507679799987-c73779587ccf", 600), label: "Wedding Suit" },
  { src: img("photo-1594938298603-c8148c4dae35", 600), label: "Classic Blazer" },
  { src: img("photo-1593030761757-71fae45fa0e7", 600), label: "Premium Finish" },
  { src: img("photo-1602810318383-e386cc2a3ccf", 600), label: "Kurta Style" },
  { src: img("photo-1434389677669-e08b4cac3105", 600), label: "Shirts Collection" },
  { src: img("photo-1441986300917-64674bd600d8", 600), label: "Fabric & Fit" },
];

const whyUs = [
  { icon: "🛵", title: "On-Door Service", desc: "From measurement to delivery — everything at your doorstep." },
  { icon: "🧥", title: "Modern & Traditional", desc: "Slim party-wear to classic comfort — both styles available." },
  { icon: "✅", title: "Perfect Fit, On-Time", desc: "Guaranteed fitting. Reasonable rates, trusted quality." },
];

const steps = [
  { n: "01", t: "Call / WhatsApp", d: `Call ${PHONE_DISPLAY} to book your stitching.` },
  { n: "02", t: "Home Measurement", d: "We visit home, take measurements & discuss style." },
  { n: "03", t: "Expert Stitching", d: "Master cutting, stitching, finishing & pressing." },
  { n: "04", t: "Doorstep Delivery", d: "On-time delivery + free fitting check." },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-200/40 bg-[#0c0c0e]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#home" className="flex items-center gap-2">
          <span className="relative h-10 w-10 overflow-hidden rounded-full gold-gradient-bg">
            <Image src={HERO_SIDE} alt="Khan Tailor" fill className="object-cover" />
          </span>
          <span className="leading-tight">
            <span className="font-display block text-xl tracking-wide gold-gradient-text font-bold">
              Khan Tailor
            </span>
            <span className="block text-[11px] uppercase tracking-[0.2em] text-amber-200/80">
              Style • Comfort • Perfection
            </span>
          </span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
          <a href="#services" className="hover:text-amber-300">Services</a>
          <a href="#gallery" className="hover:text-amber-300">Gallery</a>
          <a href="#why" className="hover:text-amber-300">Why Us</a>
          <a href="#contact" className="hover:text-amber-300">Contact</a>
        </nav>
        <a
          href={`tel:+91${PHONE}`}
          className="gold-gradient-bg rounded-full px-4 py-2 text-sm font-semibold text-black shadow hover:brightness-110"
        >
          📞 {PHONE_DISPLAY}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-pattern relative overflow-hidden bg-[#0c0c0e] text-white">
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-14 pt-12 md:grid-cols-2 md:pt-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-amber-300">
            ✂️ Amritsar • On-door tailor service
          </span>
          <h1 className="font-display mt-5 text-4xl leading-tight font-bold md:text-6xl">
            Look Sharp.
            <br />
            <span className="gold-gradient-text">Feel Perfect.</span>
          </h1>
          <p className="mt-4 max-w-md text-neutral-300">
            Khan Tailor — modern & traditional stitching for Suits, Sherwani,
            Kurta-Pajama, Shirt-Pant. Measurement to delivery,{" "}
            <span className="text-amber-300 font-semibold">everything at your doorstep.</span>
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`tel:+91${PHONE}`}
              className="gold-gradient-bg rounded-full px-6 py-3 font-semibold text-black shadow-lg shadow-amber-500/20 hover:brightness-110"
            >
              Call Now — {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:border-amber-300 hover:text-amber-300"
            >
              WhatsApp to Book
            </a>
          </div>
          <div className="mt-8 grid max-w-md grid-cols-3 gap-3 text-center">
            {[
              ["15+", "Years Exp."],
              ["10k+", "Dresses Stitched"],
              ["4.9★", "Trusted Quality"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-xl font-bold text-amber-300">{v}</div>
                <div className="text-xs text-neutral-400">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-amber-400/30 shadow-2xl shadow-black">
            <div className="relative h-[420px] w-full">
              <Image
                src={HERO_IMG}
                alt="Man in perfectly fitted suit by Khan Tailor"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <div className="font-display text-2xl font-bold gold-gradient-text">Khan Tailor</div>
                <p className="text-xs uppercase tracking-[0.3em] text-amber-200">
                  Trusted • Quality • Perfect Fit
                </p>
                <a href="#contact" className="gold-gradient-bg mt-4 block rounded-xl py-3 text-center font-bold text-black">
                  Book Home Visit →
                </a>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-amber-300/40 bg-black/90 p-3 pr-5 shadow-xl">
            <span className="relative h-12 w-12 overflow-hidden rounded-xl">
              <Image src={HERO_SIDE} alt="Blazer detail" fill className="object-cover" />
            </span>
            <span>
              <span className="block text-xs text-neutral-400">Next slot</span>
              <span className="block text-sm font-bold text-amber-300">Today • Home Visit Available</span>
            </span>
          </div>
        </div>
      </div>
      <div className="gold-gradient-bg py-2 text-center text-xs font-bold uppercase tracking-[0.25em] text-black">
        Style • Comfort • Perfection
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* Strip images */}
      <section className="mx-auto max-w-6xl px-4 pt-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[HERO_IMG, HERO_SIDE, CRAFT_IMG, FABRIC_IMG].map((s, i) => (
            <div key={i} className="relative h-40 overflow-hidden rounded-2xl md:h-48">
              <Image src={s} alt="Khan Tailor work" fill className="object-cover transition hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* Services with images */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-14">
        <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
          What we stitch
        </p>
        <h2 className="font-display mt-2 text-center text-3xl font-bold md:text-4xl">
          Services for Every Occasion
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-neutral-600">
          Wedding, festival, office or daily wear — bring your fabric, we stitch it perfectly.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur">
                  {s.price}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{s.desc}</p>
                <a href={WHATSAPP} target="_blank" className="mt-3 inline-block text-sm font-bold text-amber-700 hover:text-amber-900">
                  Book this →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Craftsmanship banner */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid overflow-hidden rounded-3xl bg-[#0c0c0e] text-white md:grid-cols-2">
          <div className="relative h-64 md:h-auto">
            <Image src={CRAFT_IMG} alt="Tailor stitching with care" fill className="object-cover" />
          </div>
          <div className="p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">Master Craftsmanship</p>
            <h3 className="font-display mt-2 text-3xl font-bold">Finishing You Can Feel</h3>
            <p className="mt-3 text-sm text-neutral-300">
              Clean inner finishing, strong stitching, proper pressing and fitting check on every piece.
              Modern machines + experienced hands = long-lasting perfect fit.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-200">
              <li>✔ Premium lining & interlining</li>
              <li>✔ Chalk-mark precise cutting</li>
              <li>✔ Double-check fitting before delivery</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="bg-neutral-100/70 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-center text-3xl font-bold">Our Style Gallery</h2>
          <p className="mt-2 text-center text-neutral-600">A glimpse of fits we love to stitch</p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            {gallery.map((g) => (
              <div key={g.src + g.label} className="group relative h-56 overflow-hidden rounded-2xl md:h-72">
                <Image
                  src={g.src}
                  alt={g.label}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold">
                  {g.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-neutral-500">
            Sample style photos for reference. Send your own design on WhatsApp — we will stitch it.
          </p>
        </div>
      </section>

      {/* Why choose us */}
      <section id="why" className="bg-[#0c0c0e] py-14 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
            Why choose us
          </p>
          <h2 className="font-display mt-2 text-center text-3xl font-bold md:text-4xl">
            The <span className="gold-gradient-text">Khan Tailor</span> Promise
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {whyUs.map((w) => (
              <div key={w.title} className="rounded-2xl border border-amber-400/25 bg-white/5 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full gold-gradient-bg text-2xl">
                  {w.icon}
                </div>
                <h3 className="mt-4 font-bold text-amber-300 uppercase tracking-wide text-sm">{w.title}</h3>
                <p className="mt-2 text-sm text-neutral-300">{w.desc}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-8 overflow-hidden rounded-2xl">
            <div className="relative h-48 w-full md:h-56">
              <Image src={FABRIC_IMG} alt="Premium fabrics" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center md:flex-row md:gap-8">
                <div>
                  <div className="text-xl font-bold">Need urgent stitching for wedding?</div>
                  <div className="text-sm text-neutral-300">Call now — fast measurement & delivery.</div>
                </div>
                <a href={`tel:+91${PHONE}`} className="gold-gradient-bg mt-3 rounded-full px-6 py-3 font-bold text-black md:mt-0">
                  📞 {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-center text-3xl font-bold">How It Works</h2>
        <p className="mt-2 text-center text-neutral-600">Easy 4-step doorstep tailoring</p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="font-display text-3xl font-bold text-amber-500">{s.n}</div>
              <div className="mt-2 font-bold">{s.t}</div>
              <div className="mt-1 text-sm text-neutral-600">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-amber-50/60 border-y border-amber-200/50 py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <div className="rounded-3xl bg-[#0c0c0e] p-8 text-white">
            <h2 className="font-display text-3xl font-bold">Visit or Call Us</h2>
            <p className="mt-2 text-neutral-400">Near you in Amritsar — home service in nearby areas.</p>
            <div className="relative mt-5 h-44 overflow-hidden rounded-2xl">
              <Image src={HERO_SIDE} alt="Khan Tailor shop" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 text-sm font-bold">📍 Gumtala Link Road, Amritsar</div>
            </div>
            <div className="mt-5 space-y-4 text-sm">
              <a href={`tel:+91${PHONE}`} className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-4 hover:border-amber-400">
                <span className="flex h-10 w-10 items-center justify-center rounded-full gold-gradient-bg">📞</span>
                <span><span className="block text-neutral-400 text-xs uppercase tracking-widest">Contact</span><span className="text-lg font-bold text-amber-300">{PHONE_DISPLAY}</span></span>
              </a>
              <a href={MAPS} target="_blank" className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-4 hover:border-amber-400">
                <span className="flex h-10 w-10 items-center justify-center rounded-full gold-gradient-bg">📍</span>
                <span><span className="block text-neutral-400 text-xs uppercase tracking-widest">Address</span><span className="font-medium">{ADDRESS}</span></span>
              </a>
              <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full gold-gradient-bg">⏰</span>
                <span><span className="block text-neutral-400 text-xs uppercase tracking-widest">Timing</span><span className="font-medium">Mon – Sun • 9:30 AM – 9:00 PM</span></span>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <a href={WHATSAPP} target="_blank" className="flex-1 rounded-full bg-green-600 py-3 text-center font-bold hover:bg-green-700">
                WhatsApp
              </a>
              <a href={MAPS} target="_blank" className="flex-1 rounded-full border border-white/20 py-3 text-center font-bold hover:border-amber-300 hover:text-amber-300">
                Get Direction
              </a>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-xl">
            <h3 className="text-xl font-bold">Book a Home Visit</h3>
            <p className="text-sm text-neutral-600">Fill this — it will open WhatsApp ready to send.</p>
            <form
              className="mt-5 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                const msg = `Hello Khan Tailor, I want to book:%0AName: ${f.get("name")}%0APhone: ${f.get("phone")}%0AService: ${f.get("service")}%0AMessage: ${f.get("msg")}`;
                window.open(`https://wa.me/91${PHONE}?text=${msg}`, "_blank");
              }}
            >
              <input name="name" required placeholder="Your name" className="w-full rounded-xl border px-4 py-3 outline-none focus:border-amber-500" />
              <input name="phone" required placeholder="Your mobile number" className="w-full rounded-xl border px-4 py-3 outline-none focus:border-amber-500" />
              <select name="service" className="w-full rounded-xl border px-4 py-3 outline-none focus:border-amber-500">
                <option>Suit / Blazer</option>
                <option>Sherwani</option>
                <option>Kurta Pajama</option>
                <option>Shirt Pant</option>
                <option>Alteration</option>
                <option>Other</option>
              </select>
              <textarea name="msg" rows={3} placeholder="e.g. Need 2 kurtas for wedding next week" className="w-full rounded-xl border px-4 py-3 outline-none focus:border-amber-500" />
              <button className="gold-gradient-bg w-full rounded-xl py-3 font-bold text-black hover:brightness-110">
                Send Booking on WhatsApp →
              </button>
              <p className="text-center text-xs text-neutral-500">No advance needed • Free measurement nearby</p>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-[#0c0c0e] py-8 text-center text-sm text-neutral-400">
        <div className="font-display text-2xl font-bold gold-gradient-text">Khan Tailor</div>
        <div className="mt-1 text-xs uppercase tracking-[0.25em]">Style • Comfort • Perfection</div>
        <div className="mt-3">{ADDRESS} • 📞 {PHONE_DISPLAY}</div>
        <div className="mt-2 text-xs text-neutral-500">© {new Date().getFullYear()} Khan Tailor, Amritsar.</div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-2 gap-2 border-t bg-white/95 p-2 backdrop-blur md:hidden">
        <a href={`tel:+91${PHONE}`} className="rounded-full bg-black py-3 text-center font-bold text-amber-300">
          📞 Call Now
        </a>
        <a href={WHATSAPP} className="rounded-full bg-green-600 py-3 text-center font-bold text-white">
          WhatsApp
        </a>
      </div>
      <div className="h-16 md:hidden" />
    </main>
  );
}
