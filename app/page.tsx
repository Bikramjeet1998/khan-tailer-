'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

const PHONE = "8264620991";
const PHONE_DISPLAY = "82646-20991";
const ADDRESS = "Gumtala Link Road, Airport Road, Jujhar Singh Avenue, Amritsar (143001)";
const WHATSAPP = `https://wa.me/91${PHONE}?text=${encodeURIComponent("Hello Khan Tailor, I want to book a stitching / measurement visit.")}`;
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Gumtala Link Road Airport Road Jujhar Singh Avenue Amritsar 143001")}`;

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

const P = {
  suitMain: img("photo-1507679799987-c73779587ccf", 900),
  suit2: img("photo-1594938298603-c8148c4dae35", 700),
  blazer: img("photo-1593030761757-71fae45fa0e7", 700),
  groom: img("photo-1603252109303-2751441dd157", 800),
  businessman: img("photo-1519085360753-af0119f7cbe7", 700),
  fashionMan: img("photo-1552374196-c4e7ffc6e126", 700),
  indianMen: img("photo-1602810318383-e386cc2a3ccf", 700),
  shirtsHang: img("photo-1620012253295-c15cc3e65df4", 700),
  whiteShirt: img("photo-1596755094514-f87e34085b2c", 700),
  rack: img("photo-1434389677669-e08b4cac3105", 700),
  store: img("photo-1441986300917-64674bd600d8", 700),
  rack2: img("photo-1544441893-675973e31985", 700),
  sewing: img("photo-1584992236310-6edddc08acff", 800),
  fabricWhite: img("photo-1620799140408-edc6dcb6d633", 700),
  fabricColor: img("photo-1528459801416-a9e53bbf4e17", 700),
  fashion: img("photo-1558769132-cb1aea458c5e", 700),
  tshirt: img("photo-1521572163474-6864f9cf17ab", 700),
  wedding: img("photo-1543076447-215ad9ba6923", 800),
  face1: img("photo-1507003211169-0a1dd7228f2d", 200),
  face2: img("photo-1500648767791-00dcc994a43e", 200),
  face3: img("photo-1494790108377-be9c29b29330", 200),
};

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-zoom");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    ["#collection", "Collection"],
    ["#services", "Services"],
    ["#gallery", "Gallery"],
    ["#process", "Process"],
    ["#faq", "FAQ"],
    ["#contact", "Contact"],
  ];

  return (
    <div className="sticky top-0 z-50">
      <div className="gold-bg px-2 py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.12em] text-white sm:text-xs sm:tracking-[0.18em]">
        ✓ Made-to-Measure &nbsp; ✓ 10,000+ Happy Customers
        <span className="hidden sm:inline">&nbsp;&nbsp; ✓ Free Fitting Fix &nbsp;&nbsp; ✓ On-Door Service</span>
        <span className="sm:hidden"><br />✓ On-Door Service</span>
      </div>
      <header
        className={`transition-all duration-500 ${
          scrolled ? "glass shadow-lg shadow-amber-900/10" : "bg-[#fdfbf6]/80 backdrop-blur"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-3">
          <a href="#home" className="flex min-w-0 items-center gap-2">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 ring-amber-500/60 shadow sm:h-11 sm:w-11">
              <Image src={P.suit2} alt="Khan Tailor" fill className="object-cover" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="font-display block truncate text-lg font-bold tracking-wide text-stone-900 sm:text-xl">
                Khan <span className="gold-text">Tailor</span>
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-700 min-[420px]:block">
                Style • Comfort • Perfection
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-medium text-stone-600 lg:flex">
            <a href="#collection" className="transition hover:text-amber-700">Collection</a>
            <a href="#services" className="transition hover:text-amber-700">Services</a>
            <a href="#gallery" className="transition hover:text-amber-700">Gallery</a>
            <a href="#process" className="transition hover:text-amber-700">Process</a>
            <a href="#faq" className="transition hover:text-amber-700">FAQ</a>
            <a href="#contact" className="transition hover:text-amber-700">Contact</a>
          </nav>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <a
              href={WHATSAPP}
              target="_blank"
              className="hidden rounded-full border border-stone-300 bg-white/70 px-4 py-2 text-sm font-semibold text-stone-700 backdrop-blur transition hover:border-amber-500 sm:block"
            >
              WhatsApp
            </a>
            <a
              href={`tel:+91${PHONE}`}
              className="gold-bg hidden whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold text-white shadow-lg shadow-amber-500/30 transition hover:brightness-110 min-[420px]:block sm:px-4 sm:text-sm"
            >
              📞 {PHONE_DISPLAY}
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white/80 text-lg font-bold text-stone-800 shadow-sm backdrop-blur transition hover:border-amber-500 lg:hidden"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {open && (
          <nav className="glass mx-3 mb-3 rounded-2xl p-2 shadow-xl lg:hidden">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-stone-800 transition hover:bg-amber-100"
              >
                {label}
              </a>
            ))}
            <div className="grid grid-cols-2 gap-2 p-2">
              <a
                href={`tel:+91${PHONE}`}
                className="gold-bg rounded-full py-2.5 text-center text-sm font-bold text-white"
              >
                📞 Call
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                className="rounded-full bg-green-600 py-2.5 text-center text-sm font-bold text-white"
              >
                WhatsApp
              </a>
            </div>
          </nav>
        )}
      </header>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="dot-pattern relative overflow-hidden pt-8 md:pt-12">
      <div className="animate-blob pointer-events-none absolute -left-24 top-20 h-96 w-96 rounded-full bg-amber-200/50 blur-3xl" />
      <div className="animate-blob pointer-events-none absolute -right-24 top-64 h-[28rem] w-[28rem] rounded-full bg-orange-100 blur-3xl" style={{ animationDelay: "-6s" }} />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 md:grid-cols-2 md:gap-12 md:pb-20">
        <div>
          <span className="hero-anim hero-anim-1 glass inline-flex max-w-full items-center gap-2 rounded-full px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-800 shadow-sm sm:px-4 sm:text-xs sm:tracking-[0.18em]">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-green-500" />
            <span className="truncate">Amritsar • On-door tailoring</span>
          </span>
          <h1 className="hero-anim hero-anim-2 font-display mt-4 text-4xl font-bold leading-[1.08] text-stone-900 sm:text-5xl md:mt-5 md:text-6xl">
            Tailored to
            <br />
            <span className="gold-text">Perfection,</span>
            <br />
            Made for You.
          </h1>
          <p className="hero-anim hero-anim-3 mt-4 max-w-md text-sm leading-relaxed text-stone-600 sm:text-[15px] md:mt-5">
            Bespoke Suits, Wedding Sherwanis, Kurta-Pajama & Shirts — crafted with premium
            fabrics and precise measurements. From measurement to delivery,{" "}
            <b className="text-stone-900">everything at your doorstep.</b>
          </p>
          <div className="hero-anim hero-anim-4 mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-7">
            <a
              href="#collection"
              className="gold-bg rounded-full px-7 py-3.5 text-center font-bold text-white shadow-xl shadow-amber-500/30 transition hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Explore Collection →
            </a>
            <a
              href={`tel:+91${PHONE}`}
              className="glass rounded-full px-7 py-3.5 text-center font-bold text-stone-800 shadow transition hover:-translate-y-0.5"
            >
              📞 {PHONE_DISPLAY}
            </a>
          </div>
          <div className="hero-anim hero-anim-4 mt-8 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[P.face1, P.face2, P.face3].map((f) => (
                <span key={f} className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white">
                  <Image src={f} alt="customer" fill className="object-cover" />
                </span>
              ))}
            </div>
            <div className="text-sm">
              <div className="font-bold text-stone-900">★★★★★ 4.9/5</div>
              <div className="text-stone-500">Loved by 10,000+ customers</div>
            </div>
          </div>
        </div>

        <div className="hero-anim hero-anim-3 relative mx-1 sm:mx-0">
          <div className="img-hover-zoom relative overflow-hidden rounded-[1.5rem] shadow-2xl shadow-amber-900/20 ring-1 ring-amber-900/10 sm:rounded-[2rem]">
            <div className="relative h-[340px] w-full sm:h-[440px] md:h-[520px]">
              <Image src={P.suitMain} alt="Perfectly fitted bespoke suit" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>

          <div className="glass animate-floaty absolute left-2 top-6 flex items-center gap-2 rounded-2xl p-2 pr-4 shadow-xl sm:gap-3 sm:p-3 sm:pr-5 md:-left-6">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl sm:h-12 sm:w-12">
              <Image src={P.sewing} alt="hand stitching" fill className="object-cover" />
            </span>
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-700 sm:text-xs">Master Craft</span>
              <span className="block text-xs font-bold text-stone-900 sm:text-sm">Hand-finished details</span>
            </span>
          </div>

          <div className="glass animate-floaty2 absolute bottom-6 right-2 flex items-center gap-2 rounded-2xl p-2 pr-4 shadow-xl sm:gap-3 sm:p-3 sm:pr-5 md:-right-4">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl sm:h-12 sm:w-12">
              <Image src={P.fabricWhite} alt="premium fabric" fill className="object-cover" />
            </span>
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-700 sm:text-xs">Today&apos;s slot</span>
              <span className="block text-xs font-bold text-stone-900 sm:text-sm">Home visit available ✓</span>
            </span>
          </div>
        </div>
      </div>

      <div className="relative border-y border-amber-200/60 bg-white/60 py-3 backdrop-blur">
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8 text-sm font-bold uppercase tracking-[0.2em] text-stone-500">
            {["Bespoke Suits", "Sherwani", "Kurta Pajama", "Blazers", "Shirts", "Pathani", "Tuxedo", "Alteration"].concat(["Bespoke Suits", "Sherwani", "Kurta Pajama", "Blazers", "Shirts", "Pathani", "Tuxedo", "Alteration"]).map((t, i) => (
              <span key={i} className="flex items-center gap-8">
                <span>{t}</span>
                <span className="text-amber-500">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const categories = [
  { title: "Bestsellers", sub: "Most loved fits", image: P.suit2 },
  { title: "Wedding", sub: "Sherwani & suits", image: P.wedding },
  { title: "Kurta Style", sub: "Festive & daily", image: P.indianMen },
  { title: "Shirts", sub: "Formal & casual", image: P.shirtsHang },
];

const services = [
  { title: "Bespoke Suits", desc: "2-pc / 3-pc suits & blazers with sharp shoulders and clean drape.", image: P.suit2 },
  { title: "Sherwani & Indo-Western", desc: "Royal wedding wear with rich fabrics and regal finishing.", image: P.groom },
  { title: "Kurta Pajama & Pathani", desc: "Breathable festive & daily kurtas in cotton, linen & silk.", image: P.indianMen },
  { title: "Custom Shirts", desc: "Choose collar, cuff & fit — crisp shirts made to your size.", image: P.whiteShirt },
  { title: "Trousers & Chinos", desc: "Perfect waist, length & taper for office and casual wear.", image: P.fashionMan },
  { title: "Alteration & Repair", desc: "Same-day fitting correction, tapering, zip & finishing.", image: P.sewing },
];

const gallery = [
  { src: P.suitMain, label: "Business Suit", h: "h-64 md:h-80" },
  { src: P.wedding, label: "Wedding Look", h: "h-64 md:h-80" },
  { src: P.indianMen, label: "Kurta Style", h: "h-64 md:h-80" },
  { src: P.blazer, label: "Blazer Detail", h: "h-64 md:h-72" },
  { src: P.whiteShirt, label: "Crisp Shirts", h: "h-64 md:h-72" },
  { src: P.fabricColor, label: "Fabric Library", h: "h-64 md:h-72" },
  { src: P.rack, label: "Ready Styles", h: "h-64 md:h-72" },
  { src: P.businessman, label: "Office Fit", h: "h-64 md:h-72" },
];

export default function Page() {
  useReveal();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Categories like TailorStore */}
      <section id="collection" className="mx-auto max-w-6xl px-4 py-14">
        <div className="reveal flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">Shop by occasion</p>
            <h2 className="font-display mt-1 text-3xl font-bold text-stone-900 md:text-4xl">Popular Categories</h2>
          </div>
          <a href={WHATSAPP} target="_blank" className="hidden text-sm font-bold text-amber-700 hover:underline md:block">
            Ask on WhatsApp →
          </a>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((c, i) => (
            <a
              key={c.title}
              href="#services"
              className={`reveal-zoom group relative overflow-hidden rounded-3xl shadow-sm transition hover:shadow-xl ${i % 2 ? "md:mt-8" : ""}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="img-hover-zoom relative h-64 md:h-80">
                <Image src={c.image} alt={c.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="glass absolute bottom-3 left-3 right-3 rounded-2xl p-3">
                  <div className="text-sm font-bold text-stone-900">{c.title}</div>
                  <div className="text-xs text-stone-500">{c.sub}</div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* How it works - like TailorStore */}
      <section id="process" className="border-y border-amber-100 bg-white/70 py-14 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          <p className="reveal text-center text-xs font-bold uppercase tracking-[0.25em] text-amber-700">Here&apos;s how it works</p>
          <h2 className="reveal font-display mt-1 text-center text-3xl font-bold text-stone-900 md:text-4xl">
            From First Call to Perfect Fit
          </h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "1", t: "Choose a style", d: "Pick from collection or send your own design on WhatsApp.", icon: "🎨" },
              { n: "2", t: "Home measurement", d: "We visit your home — precise measuring, no tape hassle.", icon: "📏" },
              { n: "3", t: "Expert stitching", d: "Master cutting, premium lining, careful finishing.", icon: "🧵" },
              { n: "4", t: "Delivered + fitted", d: "On-time doorstep delivery with free fitting check.", icon: "🤵" },
            ].map((s, i) => (
              <div key={s.n} className="reveal glass rounded-3xl p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl" style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="gold-bg mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl text-white shadow-lg">{s.icon}</div>
                <div className="mt-1 text-xs font-bold text-amber-600">STEP {s.n}</div>
                <div className="font-bold text-stone-900">{s.t}</div>
                <div className="mt-1 text-sm text-stone-500">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature services */}
      <section id="services" className="mx-auto max-w-6xl px-4 py-14">
        <p className="reveal text-center text-xs font-bold uppercase tracking-[0.25em] text-amber-700">Premium tailoring services</p>
        <h2 className="reveal font-display mt-1 text-center text-3xl font-bold text-stone-900 md:text-4xl">Our Signature Services</h2>
        <p className="reveal mx-auto mt-2 max-w-xl text-center text-sm text-stone-500">
          Every garment is individually cut, stitched and pressed — modern slim or classic comfort, your choice.
        </p>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div key={s.title} className="reveal group overflow-hidden rounded-3xl border border-stone-100 bg-white shadow-sm transition hover:-translate-y-1.5 hover:shadow-2xl" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
              <div className="img-hover-zoom relative h-56 overflow-hidden">
                <Image src={s.image} alt={s.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-stone-900">{s.title}</h3>
                <p className="mt-1 text-sm text-stone-500">{s.desc}</p>
                <a href={WHATSAPP} target="_blank" className="mt-3 inline-block text-sm font-bold text-amber-700 transition group-hover:translate-x-1">
                  Book this →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bespoke collection alternating - like Krishna */}
      <section className="mx-auto max-w-6xl space-y-6 px-4 pb-14">
        {[
          {
            tag: "Bespoke Collection",
            title: "Luxury Suits for Every Occasion",
            desc: "Business meetings to weddings — premium fabrics, precise measurements and refined finishing for a sharp, lasting fit.",
            points: ["Premium suiting fabrics", "Half/full canvas options", "Free fitting correction"],
            image: P.businessman,
            cta: "Book a Consultation",
          },
          {
            tag: "Wedding Special",
            title: "Sherwanis Crafted for Your Big Day",
            desc: "Regal sherwanis, Indo-westerns & tuxedos with rich buttons, lining and elegance in every stitch.",
            points: ["Groom + family packages", "Urgent wedding delivery", "Home trial available"],
            image: P.groom,
            cta: "Plan Wedding Outfit",
          },
          {
            tag: "Everyday Elegance",
            title: "Kurtas & Shirts for Daily Comfort",
            desc: "Soft cottons and linens, tailored for Punjab weather — festive shine or everyday ease.",
            points: ["Cotton, linen, silk", "Modern + traditional cuts", "All sizes, all fabrics"],
            image: P.fashion,
            cta: "Order Kurta / Shirt",
          },
        ].map((b, i) => (
          <div key={b.title} className={`reveal grid overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-stone-100 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="img-hover-zoom relative h-72 overflow-hidden md:h-auto md:min-h-[340px]">
              <Image src={b.image} alt={b.title} fill className="object-cover" />
            </div>
            <div className="p-8 md:p-10">
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-800">{b.tag}</span>
              <h3 className="font-display mt-3 text-2xl font-bold text-stone-900 md:text-3xl">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-500">{b.desc}</p>
              <ul className="mt-4 space-y-2 text-sm font-medium text-stone-700">
                {b.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-xs text-green-700">✓</span> {pt}
                  </li>
                ))}
              </ul>
              <a href={WHATSAPP} target="_blank" className="gold-bg mt-6 inline-block rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5">
                {b.cta} →
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Fabric variety */}
      <section className="border-y border-amber-100 bg-gradient-to-b from-amber-50/80 to-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="reveal font-display text-center text-3xl font-bold text-stone-900">Choose Your Fabric & Style</h2>
          <p className="reveal mt-2 text-center text-sm text-stone-500">200+ fabrics — cotton, linen, suiting, silk. Bring your own or pick ours.</p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            {[
              { n: "Royal Blue Suiting", image: P.suitMain },
              { n: "Ivory Sherwani", image: P.wedding },
              { n: "White Cotton", image: P.fabricWhite },
              { n: "Festive Prints", image: P.fabricColor },
              { n: "Casual Linen", image: P.tshirt },
            ].map((f, i) => (
              <div key={f.n} className="reveal-zoom group text-center" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="img-hover-zoom relative mx-auto h-36 w-full overflow-hidden rounded-2xl shadow md:h-44">
                  <Image src={f.image} alt={f.n} fill className="object-cover" />
                </div>
                <div className="mt-2 text-xs font-bold text-stone-700">{f.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="reveal font-display text-center text-3xl font-bold text-stone-900">Style Gallery</h2>
        <p className="reveal mt-2 text-center text-sm text-stone-500">Real fits, real fabrics — a glimpse of what we love to stitch</p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {gallery.map((g, i) => (
            <div key={g.label + i} className={`reveal-zoom group relative overflow-hidden rounded-2xl ${g.h}`} style={{ transitionDelay: `${(i % 4) * 80}ms` }}>
              <Image src={g.src} alt={g.label} fill className="object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="glass absolute bottom-3 left-3 translate-y-2 rounded-full px-3 py-1 text-xs font-bold text-stone-800 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                {g.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-stone-400">Sample style photos for reference — send your design, we&apos;ll stitch it.</p>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <h2 className="reveal font-display text-center text-3xl font-bold text-stone-900">What Customers Say</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            { name: "Rahul Sharma", role: "Wedding Client", text: "My wedding sherwani fit was absolutely perfect. Fabric quality excellent, finishing premium. Got so many compliments!", face: P.face1 },
            { name: "Amit Verma", role: "Regular Customer", text: "Trusted tailor for years — suits to shirts, always precise stitching and on-time delivery. Highly recommended.", face: P.face2 },
            { name: "Simran Kaur", role: "Family Function", text: "Ordered kurtas for whole family. Home measurement was so easy, fitting perfect for everyone. Very professional.", face: P.face3 },
          ].map((t, i) => (
            <div key={t.name} className="reveal glass rounded-3xl p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="text-amber-500">★★★★★</div>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-amber-200">
                  <Image src={t.face} alt={t.name} fill className="object-cover" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-stone-900">{t.name}</span>
                  <span className="block text-xs text-stone-500">{t.role}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal-zoom gold-bg mt-8 rounded-[2rem] p-8 text-center text-white shadow-xl md:p-10">
          <h3 className="font-display text-2xl font-bold md:text-3xl">Our Fit Guarantee</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/90">
            If the first fit isn&apos;t quite right, we&apos;ll refine it at no cost. Trusted quality and on-time delivery — that&apos;s the Khan promise.
          </p>
          <a href={`tel:+91${PHONE}`} className="mt-5 inline-block rounded-full bg-white px-7 py-3 font-bold text-stone-900 shadow transition hover:-translate-y-0.5">
            📞 Call {PHONE_DISPLAY}
          </a>
        </div>
      </section>

      {/* FAQ - helps Google show us for common searches */}
      <section id="faq" className="mx-auto max-w-4xl px-4 pb-14">
        <h2 className="reveal font-display text-center text-3xl font-bold text-stone-900">
          Common Questions — Tailor in Amritsar
        </h2>
        <div className="mt-6 space-y-3">
          {[
            {
              q: "Do you offer home measurement and delivery in Amritsar?",
              a: "Yes. Khan Tailor offers on-door service — we come to your home for measurement and deliver the stitched clothes to your doorstep in Amritsar, including Gumtala, Airport Road and nearby areas. Call 82646-20991.",
            },
            {
              q: "What do you stitch? Suits, sherwani, kurta-pajama?",
              a: "We stitch bespoke suits & blazers, wedding sherwanis & Indo-westerns, kurta-pajama & Pathani suits, custom shirts & trousers, plus same-day alteration and repair.",
            },
            {
              q: "Where is Khan Tailor located?",
              a: "Gumtala Link Road, Airport Road, Jujhar Singh Avenue, Amritsar (143001). Open Mon–Sun, 9:30 AM – 9:00 PM. Home service available.",
            },
            {
              q: "Do you do urgent / wedding stitching?",
              a: "Yes, we handle urgent wedding and function orders with fast measurement and on-time delivery. Call 82646-20991 and tell us your date.",
            },
          ].map((f) => (
            <details key={f.q} className="reveal group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer list-none font-bold text-stone-900">
                <span className="mr-2 text-amber-600">+</span> {f.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-amber-100 bg-white py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <div className="reveal-left overflow-hidden rounded-[2rem] bg-stone-900 p-8 text-white">
            <h2 className="font-display text-3xl font-bold">Visit or Call Us</h2>
            <p className="mt-2 text-sm text-stone-400">Near you in Amritsar — home service in nearby areas.</p>
            <div className="img-hover-zoom relative mt-5 h-48 overflow-hidden rounded-2xl">
              <Image src={P.store} alt="Khan Tailor store" fill className="object-cover" />
              <div className="glass-dark absolute bottom-3 left-3 rounded-full px-4 py-1.5 text-xs font-bold text-white">
                📍 Gumtala Link Road, Amritsar
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <a href={`tel:+91${PHONE}`} className="glass-dark flex items-center gap-3 rounded-2xl p-4 transition hover:border-amber-400">
                <span className="gold-bg flex h-10 w-10 items-center justify-center rounded-full">📞</span>
                <span><span className="block text-xs uppercase tracking-widest text-stone-400">Contact</span><span className="text-lg font-bold text-amber-300">{PHONE_DISPLAY}</span></span>
              </a>
              <a href={MAPS} target="_blank" className="glass-dark flex items-center gap-3 rounded-2xl p-4 transition hover:border-amber-400">
                <span className="gold-bg flex h-10 w-10 items-center justify-center rounded-full">📍</span>
                <span><span className="block text-xs uppercase tracking-widest text-stone-400">Address</span><span className="font-medium">{ADDRESS}</span></span>
              </a>
              <div className="glass-dark flex items-center gap-3 rounded-2xl p-4">
                <span className="gold-bg flex h-10 w-10 items-center justify-center rounded-full">⏰</span>
                <span><span className="block text-xs uppercase tracking-widest text-stone-400">Timing</span><span className="font-medium">Mon – Sun • 9:30 AM – 9:00 PM</span></span>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <a href={WHATSAPP} target="_blank" className="flex-1 rounded-full bg-green-600 py-3 text-center font-bold transition hover:bg-green-700">WhatsApp</a>
              <a href={MAPS} target="_blank" className="flex-1 rounded-full border border-white/20 py-3 text-center font-bold transition hover:border-amber-300 hover:text-amber-300">Direction</a>
            </div>
          </div>

          <div className="reveal-right rounded-[2rem] border border-stone-100 bg-cream bg-[#fffdf8] p-8 shadow-xl">
            <h3 className="font-display text-2xl font-bold text-stone-900">Book a Home Visit</h3>
            <p className="text-sm text-stone-500">Fill this — it opens WhatsApp ready to send.</p>
            <form
              className="mt-5 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                const msg = `Hello Khan Tailor, I want to book:%0AName: ${f.get("name")}%0APhone: ${f.get("phone")}%0AService: ${f.get("service")}%0AMessage: ${f.get("msg")}`;
                window.open(`https://wa.me/91${PHONE}?text=${msg}`, "_blank");
              }}
            >
              <input name="name" required placeholder="Your name" className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200" />
              <input name="phone" required placeholder="Your mobile number" className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200" />
              <select name="service" className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-500">
                <option>Suit / Blazer</option>
                <option>Sherwani</option>
                <option>Kurta Pajama</option>
                <option>Shirt / Trouser</option>
                <option>Alteration</option>
                <option>Other</option>
              </select>
              <textarea name="msg" rows={3} placeholder="e.g. Need 2 kurtas for wedding next week" className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200" />
              <button className="gold-bg w-full rounded-2xl py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110">
                Send Booking on WhatsApp →
              </button>
              <p className="text-center text-xs text-stone-400">Free measurement nearby • Home service available</p>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-stone-950 py-10 text-center text-sm text-stone-400">
        <div className="font-display text-2xl font-bold text-white">Khan <span className="gold-text">Tailor</span></div>
        <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-amber-500">Style • Comfort • Perfection</div>
        <div className="mt-3 px-4">{ADDRESS} • 📞 {PHONE_DISPLAY}</div>
        <div className="mt-2 text-xs text-stone-600">© {new Date().getFullYear()} Khan Tailor, Amritsar.</div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/90 backdrop-blur-xl md:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="grid grid-cols-2 gap-2 p-2">
          <a href={`tel:+91${PHONE}`} className="rounded-full bg-stone-900 py-2.5 text-center text-sm font-bold text-amber-300">📞 Call Now</a>
          <a href={WHATSAPP} className="rounded-full bg-green-600 py-2.5 text-center text-sm font-bold text-white">WhatsApp</a>
        </div>
      </div>
      <div className="h-14 md:hidden" />
    </main>
  );
}
