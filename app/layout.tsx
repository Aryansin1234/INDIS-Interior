import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import "@/components/layout/layout.css";
import "@/components/sections/sections.css";
import "@/components/pages/pages.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GlobalMotion from "@/components/interactions/GlobalMotion";
import Preloader from "@/components/layout/Preloader";
import "@/components/layout/preloader.css";
import { business } from "@/data/site";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"]
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://indisinteriors.com"),
  title: {
    default: "INDIS Interiors | Interior Designers in Hyderabad",
    template: "%s | INDIS Interiors"
  },
  description:
    "INDIS Interiors is a Hyderabad-based interior design studio creating elegant, functional, personalized home interiors across Andhra Pradesh and Telangana.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "INDIS Interiors | Interior Designers in Hyderabad",
    description:
      "Elegant, functional, and personalized home interiors by a Hyderabad-based studio with over 15 years of experience.",
    url: "https://indisinteriors.com",
    siteName: "INDIS Interiors",
    locale: "en_IN",
    type: "website"
  }
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  telephone: business.phone,
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "NBR Towers, 3rd Floor, Road No-36, Jubilee Hills",
    addressLocality: "Hyderabad",
    postalCode: "500033",
    addressRegion: "Telangana",
    addressCountry: "IN"
  },
  areaServed: ["Hyderabad", "Telangana", "Andhra Pradesh"],
  url: "https://indisinteriors.com"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to Unsplash (all project/collection images) */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>
        <Preloader />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-shell">
          <Header />
          <main id="main-content" className="site-main">
            {children}
          </main>
          <Footer />
        </div>
        <GlobalMotion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
