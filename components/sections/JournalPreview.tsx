import Link from "next/link";
import Image from "next/image";
import { articles } from "@/data/site";
import SectionIntro from "@/components/ui/SectionIntro";

export default function JournalPreview() {
  return (
    <section className="section journal-preview">
      <div className="container">
        <SectionIntro eyebrow="Journal / Design ideas" title="Practical design thinking, presented with editorial calm." text="A magazine-inspired structure for published blogs and future design inspiration content." />
        <div className="journal-preview__grid">
          {articles.map((article) => (
            <Link href={`/journal/${article.slug}`} className="journal-card" key={article.slug}>
              <div className="journal-card__image">
                <Image src={article.image.src} alt={article.image.alt} fill sizes="(max-width: 800px) 91vw, 30vw" />
              </div>
              <span>{article.category} · {article.readTime}</span>
              <h3>{article.title}</h3>
              <p>{article.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
