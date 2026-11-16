import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import ButtonLink from "@/components/ui/ButtonLink";
import { projects, collections } from "@/data/site";
import { getProject } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const collection = collections.find((item) => item.slug === project.category);

  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero__grid">
          <div className="detail-meta">
            <span>{project.label}</span>
            <h1 className="headline">{project.title}</h1>
            <p className="lead">{project.summary}</p>
            <div className="button-row">
              <ButtonLink href="/contact">Plan a Similar Home</ButtonLink>
              <ButtonLink href="/projects" variant="secondary">All Projects</ButtonLink>
            </div>
          </div>
          <div className="detail-hero__image">
            <Image src={project.image.src} alt={project.image.alt} fill priority sizes="(max-width: 1024px) 91vw, 48vw" />
          </div>
        </div>
      </section>
      <section className="detail-body">
        <div className="container detail-body__grid">
          <div>
            <h2>Case study framework</h2>
          </div>
          <div className="content-panel">
            <ul className="detail-list">
              <li><strong>Category:</strong> {collection?.title ?? project.category}</li>
              <li><strong>Location:</strong> Add only when confirmed by INDIS.</li>
              <li><strong>Materials:</strong> Add confirmed materials and finish notes here.</li>
              <li><strong>Design considerations:</strong> Add actual planning challenges, storage needs, lighting approach, and execution notes here.</li>
            </ul>
          </div>
        </div>
        <div className="container detail-gallery">
          {project.detailImages.map((image) => (
            <div className="detail-image" key={image.src}>
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 680px) 91vw, 44vw" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
