import Image from "next/image";
import type { ImageAsset } from "@/data/site";

type ImagePanelProps = {
  image: ImageAsset;
  shape?: "tall" | "wide" | "square";
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export default function ImagePanel({ image, shape = "wide", priority = false, className = "", sizes }: ImagePanelProps) {
  return (
    <figure className={`image-frame ${className}`} data-shape={shape} data-image-reveal data-parallax-soft>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 768px) 91vw, (max-width: 1200px) 45vw, 650px"}
      />
      {image.kind === "conceptual-placeholder" ? <figcaption>{image.credit}</figcaption> : null}
    </figure>
  );
}
