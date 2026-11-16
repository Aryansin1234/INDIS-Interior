import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/pages/PageHero";
import { projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Recent Projects",
  description: "Browse INDIS Interiors project case-study slots prepared for genuine residential interior photography and metadata."
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="Recent projects" title="Portfolio pages structured for real INDIS work." text="The site is ready to showcase completed homes as architectural case studies once genuine photography and project details are supplied." cta={{ href: "/contact", label: "Discuss a Project" }} />
      <section className="section">
        <div className="container listing-grid">
          {projects.map((project) => (
            <Link className="listing-card" href={`/projects/${project.slug}`} key={project.slug}>
              <div className="listing-card__image">
                <Image src={project.image.src} alt={project.image.alt} fill sizes="(max-width: 680px) 91vw, (max-width: 1024px) 44vw, 30vw" />
              </div>
              <span>{project.label}</span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
