"use client";

import { useState, type PointerEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/site";
import SectionIntro from "@/components/ui/SectionIntro";

export default function CollectionsShowcase() {
  const [active, setActive] = useState(collections[0].slug);
  const activeCollection = collections.find((c) => c.slug === active) ?? collections[0];
  const activeIndex = Math.max(0, collections.findIndex((c) => c.slug === active));

  function handleMagnetMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.08;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.16;
    event.currentTarget.style.setProperty("--magnet-x", `${x}px`);
    event.currentTarget.style.setProperty("--magnet-y", `${y}px`);
  }

  function resetMagnet(event: PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--magnet-x", "0px");
    event.currentTarget.style.setProperty("--magnet-y", "0px");
  }

  /* First tap → activate (show image). Second tap → navigate. */

  return (
    <section id="collections-showcase" className="section collections-showcase">
      <div className="container">
        <SectionIntro eyebrow="Collections" title="Rooms composed as living, functional chapters." text="Living, Bedroom, Dining, Kitchen, and Accent collections are structured for quick browsing and future project filtering." />
        <div className="collections-showcase__stage">
          <div className="collections-showcase__word" aria-hidden>Collections</div>
          <div className="collections-showcase__image">
            {/* clipping frame — overflow: hidden stays here */}
            <div className="collections-showcase__image-frame">
              <AnimatePresence mode="wait">
                <motion.div
                  className="collections-showcase__image-layer"
                  key={activeCollection.slug}
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(14px) saturate(0.82)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px) saturate(1)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(10px) saturate(0.9)" }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image src={activeCollection.image.src} alt={activeCollection.image.alt} fill sizes="(max-width: 900px) 91vw, 54vw" />
                </motion.div>
              </AnimatePresence>
              <div className="collections-showcase__counter" aria-hidden>
                {String(activeIndex + 1).padStart(2, "0")} / {String(collections.length).padStart(2, "0")}
              </div>
            </div>

            {/* caption — absolute on desktop, flows below frame on mobile */}
            <motion.div
              className="collections-showcase__caption"
              key={`${activeCollection.slug}-caption`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <span>{activeCollection.title}</span>
              <p>{activeCollection.intro}</p>
            </motion.div>
          </div>
          <div className="collections-showcase__links">
            {collections.map((collection) => (
              <div
                key={collection.slug}
                className={`collections-showcase__link-row${active === collection.slug ? " is-active" : ""}`}
              >
                {/* Name — only changes the image, never navigates */}
                <button
                  type="button"
                  className="collections-showcase__link-name"
                  onPointerEnter={() => setActive(collection.slug)}
                  onPointerMove={handleMagnetMove as unknown as React.PointerEventHandler<HTMLButtonElement>}
                  onPointerLeave={resetMagnet as unknown as React.PointerEventHandler<HTMLButtonElement>}
                  onFocus={() => setActive(collection.slug)}
                  onClick={() => setActive(collection.slug)}
                  aria-pressed={active === collection.slug}
                >
                  {collection.title}
                </button>

                {/* Arrow — dedicated navigation */}
                <Link
                  className="collections-showcase__link-nav"
                  href={`/collections/${collection.slug}`}
                  aria-label={`Browse ${collection.title} collection`}
                >
                  <ArrowUpRight size={18} aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
