import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { collections, projects } from "@/data/site";
import { getCollection } from "@/lib/utils";
import ButtonLink from "@/components/ui/ButtonLink";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection" };
  return { title: `${collection.title} Collection`, description: collection.intro };
}

export default async function CollectionDetailPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const relatedProjects = projects.filter((project) => project.category === collection.slug);

  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero__grid">
          <div className="detail-meta">
            <span>Collection</span>
            <h1 className="headline">{collection.title}</h1>
            <p className="lead">{collection.intro}</p>
            <ButtonLink href="/contact">Discuss this Room</ButtonLink>
          </div>
          <div className="detail-hero__image">
            <Image src={collection.image.src} alt={collection.image.alt} fill priority sizes="(max-width: 1024px) 91vw, 48vw" />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container section-intro">
          <div>
            <p className="eyebrow">Related project slots</p>
            <h2 className="title-serif">Ready for real {collection.title.toLowerCase()} project case studies.</h2>
          </div>
          <p className="lead">No fabricated locations, names, or claims are used. Add confirmed INDIS projects as they become available.</p>
        </div>
        <div className="container listing-grid">
          {relatedProjects.length ? relatedProjects.map((project) => (
            <Link className="listing-card" href={`/projects/${project.slug}`} key={project.slug}>
              <div className="listing-card__image">
                <Image src={project.image.src} alt={project.image.alt} fill sizes="(max-width: 680px) 91vw, 30vw" />
              </div>
              <span>{project.label}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
            </Link>
          )) : <p className="lead">Project slots for this collection can be added in `data/site.ts`.</p>}
        </div>
      </section>
    </>
  );
}
