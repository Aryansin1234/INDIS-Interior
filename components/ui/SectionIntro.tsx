type SectionIntroProps = {
  eyebrow: string;
  title: string;
  text?: string;
  aside?: React.ReactNode;
};

export default function SectionIntro({ eyebrow, title, text, aside }: SectionIntroProps) {
  return (
    <div className="section-intro" data-reveal>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="headline">{title}</h2>
      </div>
      {aside ?? (text ? <p className="lead">{text}</p> : null)}
    </div>
  );
}
