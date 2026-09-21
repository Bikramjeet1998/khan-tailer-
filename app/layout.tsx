import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://khan-tailer-iota.vercel.app";
const PHONE = "+918264620991";
const ADDRESS = "Gumtala Link Road, Airport Road, Jujhar Singh Avenue, Amritsar, Punjab 143001";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Khan Tailor Amritsar — Bespoke Suits, Sherwani, Kurta | On-Door Service",
    template: "%s | Khan Tailor Amritsar",
  },
  description:
    "Khan Tailor Amritsar — best tailor near Gumtala, Airport Road for bespoke suits, sherwani, kurta-pajama, shirts & alteration. On-door measurement & delivery, perfect fitting. Call 82646-20991.",
  keywords: [
    "tailor in Amritsar",
    "Khan Tailor",
    "Khan Tailor Amritsar",
    "bespoke suits Amritsar",
    "sherwani tailor Amritsar",
    "kurta pajama stitching",
    "shirt pant tailor",
    "suit alteration Amritsar",
    "on door tailor service",
    "Gumtala tailor",
    "Airport Road tailor",
    "wedding suit stitching Punjab",
  ],
  authors: [{ name: "Khan Tailor" }],
  creator: "Khan Tailor",
  publisher: "Khan Tailor",
  formatDetection: { telephone: true, address: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Khan Tailor Amritsar",
    title: "Khan Tailor Amritsar — Style • Comfort • Perfection",
    description:
      "Bespoke suits, sherwani, kurta-pajama & shirts with on-door measurement & delivery in Amritsar. Call 82646-20991.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Khan Tailor Amritsar — perfectly fitted bespoke suit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khan Tailor Amritsar — Bespoke Suits, Sherwani, Kurta",
    description: "On-door tailoring in Amritsar. Perfect fitting, trusted quality. Call 82646-20991.",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Tailor",
  other: {
    "geo.region": "IN-PB",
    "geo.placename": "Amritsar",
    "geo.position": "31.6340;74.8723",
    ICBM: "31.6340, 74.8723",
  },
  // After you verify in Google Search Console, paste the code here:
  verification: { google: "cJl1-lN8cbgXSsN79CKRKXWXIs9NXTMfO1_4VkEerHY" },
};

export const viewport: Viewport = {
  themeColor: "#b8911f",
  width: "device-width",
  initialScale: 1,
};

function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": `${SITE_URL}/#business`,
    name: "Khan Tailor",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop",
    url: SITE_URL,
    telephone: PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gumtala Link Road, Airport Road, Jujhar Singh Avenue",
      addressLocality: "Amritsar",
      addressRegion: "Punjab",
      postalCode: "143001",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 31.634, longitude: 74.8723 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:30",
        closes: "21:00",
      },
    ],
    sameAs: [],
    description:
      "Bespoke tailor in Amritsar for suits, sherwani, kurta-pajama, shirts and alteration with on-door measurement and delivery.",
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bespoke Suit Stitching" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sherwani Stitching" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kurta Pajama Stitching" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shirt & Trouser Stitching" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Suit Alteration & Repair" } },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you offer home measurement and delivery in Amritsar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Khan Tailor offers on-door measurement and delivery in Amritsar including Gumtala and Airport Road. Call 82646-20991.",
        },
      },
      {
        "@type": "Question",
        name: "What do you stitch?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bespoke suits, sherwani, kurta-pajama, shirts, trousers and alteration.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Khan Tailor located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Gumtala Link Road, Airport Road, Jujhar Singh Avenue, Amritsar 143001. Open daily 9:30 AM – 9 PM.",
        },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body className="antialiased">
        <LocalBusinessSchema />
        <FaqSchema />
        {children}
      </body>
    </html>
  );
}
