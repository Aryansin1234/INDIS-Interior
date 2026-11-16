import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { services } from "@/data/site";
import { getService } from "@/lib/utils";
import ButtonLink from "@/components/ui/ButtonLink";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service" };
  return { title: service.title, description: service.intro };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <section className="detail-hero">
        <div className="container detail-hero__grid">
          <div className="detail-meta">
            <span>Service</span>
            <h1 className="headline">{service.title}</h1>
            <p className="lead">{service.intro}</p>
            <div className="button-row">
              <ButtonLink href="/contact">Request Consultation</ButtonLink>
              <ButtonLink href="/services" variant="secondary">All Services</ButtonLink>
            </div>
          </div>
          <div className="detail-hero__image">
            <Image src={service.image.src} alt={service.image.alt} fill priority sizes="(max-width: 1024px) 91vw, 48vw" />
          </div>
        </div>
      </section>
      <section className="detail-body">
        <div className="container detail-body__grid">
          <h2>What this can include</h2>
          <div className="content-panel">
            <ul className="detail-list">
              {service.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
