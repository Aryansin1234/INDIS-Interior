import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/pages/PageHero";
import { collections } from "@/data/site";

export const metadata: Metadata = {
  title: "Collections",
  description: "Explore INDIS Interiors categories: living, bedroom, dining, kitchen, and accent interior design."
};

export default function CollectionsPage() {
  return (
    <>
      <PageHero eyebrow="Collections" title="Interior categories with space to grow into filtered project galleries." text="Browse the core INDIS categories: Living, Bedroom, Dining, Kitchen, and Accent." />
      <section className="section">
        <div className="container listing-grid">
          {collections.map((collection) => (
            <Link className="listing-card" href={`/collections/${collection.slug}`} key={collection.slug}>
              <div className="listing-card__image">
                <Image src={collection.image.src} alt={collection.image.alt} fill sizes="(max-width: 680px) 91vw, (max-width: 1024px) 44vw, 30vw" />
              </div>
              <span>Collection</span>
              <h2>{collection.title}</h2>
              <p>{collection.intro}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
