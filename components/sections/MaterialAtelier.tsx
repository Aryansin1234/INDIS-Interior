"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { materialSamples } from "@/data/site";

export default function MaterialAtelier() {
  const [active, setActive] = useState(0);
  const sample = materialSamples[active];

  return (
    <section className="section material-atelier">
      <div className="container material-atelier__grid">
        <div>
          <p className="eyebrow">Material atelier</p>
          <h2 className="headline">A tactile library of finishes, light, and detail.</h2>
          <p className="lead">Material specifications and supplier details should be added only when confirmed by the studio.</p>
          <div className="material-atelier__samples" role="tablist" aria-label="Material samples">
            {materialSamples.map((item, index) => (
              <button key={item.name} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)}>
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <motion.div className="material-atelier__image" key={sample.name} initial={{ opacity: 0.6, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
          <Image src={sample.image.src} alt={sample.image.alt} fill sizes="(max-width: 1024px) 91vw, 48vw" />
          <div>
            <span>{sample.name}</span>
            <p>{sample.text}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
