import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import { articles } from "@/data/site";
import { getArticle } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Journal" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero__grid">
          <div className="detail-meta">
            <span>{article.category} · {article.readTime}</span>
            <h1 className="headline">{article.title}</h1>
            <p className="lead">{article.excerpt}</p>
          </div>
          <div className="detail-hero__image">
            <Image src={article.image.src} alt={article.image.alt} fill priority sizes="(max-width: 1024px) 91vw, 48vw" />
          </div>
        </div>
      </section>
      <section className="detail-body">
        <div className="container detail-body__grid">
          <div>
            <p className="article-meta">Article</p>
            <h2>Design guidance</h2>
          </div>
          <article className="article-body">
            {article.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="button-row">
              <ButtonLink href="/contact">Discuss Your Home</ButtonLink>
              <ButtonLink href="/journal" variant="secondary">Back to Journal</ButtonLink>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
