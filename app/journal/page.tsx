import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/pages/PageHero";
import { articles } from "@/data/site";

export const metadata: Metadata = {
  title: "Journal",
  description: "Read interior design ideas and practical planning articles from INDIS Interiors."
};

export default function JournalPage() {
  return (
    <>
      <PageHero eyebrow="Journal" title="Design notes for considered Indian homes." text="A magazine-inspired editorial area for real published content and future INDIS design guidance." />
      <section className="section">
        <div className="container listing-grid">
          {articles.map((article) => (
            <Link className="listing-card" href={`/journal/${article.slug}`} key={article.slug}>
              <div className="listing-card__image">
                <Image src={article.image.src} alt={article.image.alt} fill sizes="(max-width: 680px) 91vw, (max-width: 1024px) 44vw, 30vw" />
              </div>
              <span>{article.category} · {article.readTime}</span>
              <h2>{article.title}</h2>
              <p>{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
