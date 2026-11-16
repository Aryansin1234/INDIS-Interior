import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/pages/PageHero";
import { articles, collections, services } from "@/data/site";

export const metadata: Metadata = {
  title: "Design Ideas",
  description: "Interior design inspiration and practical planning ideas for Hyderabad homes by INDIS Interiors."
};

export default function DesignIdeasPage() {
  return (
    <>
      <PageHero eyebrow="Design ideas" title="Inspiration for kitchens, bedrooms, lighting, materials, and compact homes." text="A design inspiration hub that connects practical advice with INDIS services and collections." />
      <section className="section">
        <div className="container section-intro">
          <div>
            <p className="eyebrow">Start exploring</p>
            <h2 className="title-serif">Room-by-room thinking.</h2>
          </div>
          <p className="lead">Use these categories as an editorial entry point into collections, services, and journal content.</p>
        </div>
        <div className="container listing-grid">
          {collections.slice(0, 3).map((collection) => (
            <Link className="listing-card" href={`/collections/${collection.slug}`} key={collection.slug}>
              <div className="listing-card__image">
                <Image src={collection.image.src} alt={collection.image.alt} fill sizes="(max-width: 680px) 91vw, 30vw" />
              </div>
              <span>Collection</span>
              <h2>{collection.title} ideas</h2>
              <p>{collection.intro}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="section-tight">
        <div className="container listing-grid">
          {services.slice(0, 3).map((service) => (
            <Link className="listing-card content-panel" href={`/services/${service.slug}`} key={service.slug}>
              <span>Service guide</span>
              <h3>{service.title}</h3>
              <p>{service.intro}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="section-tight">
        <div className="container listing-grid">
          {articles.map((article) => (
            <Link className="listing-card" href={`/journal/${article.slug}`} key={article.slug}>
              <span>{article.category}</span>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
