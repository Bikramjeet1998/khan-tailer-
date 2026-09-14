import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khan Tailor — Style • Comfort • Perfection | Amritsar",
  description:
    "Khan Tailor Amritsar — On-door measurement & delivery, modern & traditional stitching, perfect fitting. Call 82646-20991. Gumtala Link Road, Airport Road, Amritsar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
