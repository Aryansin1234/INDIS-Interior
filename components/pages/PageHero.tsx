import ButtonLink from "@/components/ui/ButtonLink";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
  cta?: { href: string; label: string };
};

export default function PageHero({ eyebrow, title, text, cta }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="headline">{title}</h1>
        <p className="lead">{text}</p>
        {cta ? (
          <div className="button-row">
            <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}
