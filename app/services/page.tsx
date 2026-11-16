import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/pages/PageHero";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Interior design services by INDIS Interiors: modular kitchens, wardrobes, full home interiors, false ceiling and lighting, and custom design solutions."
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Interior design services for complete, practical homes." text="Actual INDIS offerings are preserved and structured into dedicated pages for consultation-led discovery." cta={{ href: "/contact", label: "Get Free Consultation" }} />
      <section className="section">
        <div className="container listing-grid">
          {services.map((service) => (
            <Link className="listing-card" href={`/services/${service.slug}`} key={service.slug}>
              <div className="listing-card__image">
                <Image src={service.image.src} alt={service.image.alt} fill sizes="(max-width: 680px) 91vw, (max-width: 1024px) 44vw, 30vw" />
              </div>
              <span>Service</span>
              <h2>{service.title}</h2>
              <p>{service.intro}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
