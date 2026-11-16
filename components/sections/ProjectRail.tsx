import { ParallaxSlider } from "@/components/block/parallax-slider";
import { projects } from "@/data/site";

const slides = projects.map((project) => ({
  title: project.title,
  image: project.image.src,
  alt:   project.image.alt,
  href:  `/projects/${project.slug}`,
}));

export default function ProjectRail() {
  return (
    <section id="projects-showcase" className="project-rail" aria-labelledby="selected-projects">
      <ParallaxSlider
        slides={slides}
        orientation="landscape"
        parallax={0.28}
        eyebrow="Selected projects"
        title={<span id="selected-projects">Spaces shaped<br />with intention.</span>}
        description="Drag or scroll to explore. Each study is prepared for real INDIS photography and room notes."
        label="Selected projects"
        className="project-rail__slider"
      />
    </section>
  );
}
