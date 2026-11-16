"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LETTERS = ["I", "N", "D", "I", "S"];

export default function Preloader() {
  const [show, setShow]         = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let value = 0;

    const tick = setInterval(() => {
      const step = value < 60 ? Math.random() * 14 + 6
                 : value < 90 ? Math.random() * 4  + 1
                 : 0;
      value = Math.min(90, value + step);
      setProgress(Math.floor(value));
    }, 80);

    const finish = () => {
      clearInterval(tick);
      setProgress(100);
      setTimeout(() => {
        setShow(false);
      }, 520);
    };

    if (document.readyState === "complete") {
      setTimeout(finish, 700);
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      clearInterval(tick);
      window.removeEventListener("load", finish);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Top half — slides up */}
          <motion.div
            className="preloader preloader--top"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.86, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="preloader__brand" aria-label="INDIS Interiors">
              <div className="preloader__letters" aria-hidden>
                {LETTERS.map((l, i) => (
                  <motion.span
                    key={i}
                    className="preloader__letter"
                    initial={{ opacity: 0, y: "0.5em", filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0,       filter: "blur(0px)"  }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {l}
                  </motion.span>
                ))}
              </div>

              <motion.span
                className="preloader__rule"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.65, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              />

              <motion.span
                className="preloader__sub"
                initial={{ opacity: 0, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, letterSpacing: "0.3em" }}
                transition={{ delay: 0.82, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
              >
                Interiors
              </motion.span>
            </div>
          </motion.div>

          {/* Bottom half — slides down */}
          <motion.div
            className="preloader preloader--bottom"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.86, ease: [0.76, 0, 0.24, 1], delay: 0.07 }}
          >
            {/* Location tag */}
            <motion.p
              className="preloader__location"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              Hyderabad, India
            </motion.p>

            {/* Progress bar */}
            <div className="preloader__bar-track" aria-hidden>
              <motion.div
                className="preloader__bar"
                style={{ scaleX: progress / 100, transformOrigin: "left center" }}
              />
              {/* glowing dot at the tip */}
              <motion.div
                className="preloader__bar-tip"
                style={{ left: `${progress}%` }}
              />
            </div>

            {/* Tagline */}
            <motion.p
              className="preloader__tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.5 }}
            >
              Spaces shaped around the way you live.
            </motion.p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
