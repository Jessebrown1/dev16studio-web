import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import Magnetic from "../ui/Magnetic";
import { EASE_OUT } from "../../lib/motion";
import { handleAnchor } from "../../lib/smoothScroll";
import { SITE } from "../../data/site";
import "./Hero.css";

const WORDS = ["customers.", "bookings.", "trust.", "growth."];

function RotatingWord({ play }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!play) return;
    const id = setInterval(() => setIndex((n) => (n + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, [play]);

  return (
    <span className="rotator">
      <AnimatePresence initial={false}>
        <motion.span
          key={WORDS[index]}
          className="rotator-word"
          initial={{ y: "110%", rotate: 4 }}
          animate={{ y: "0%", rotate: 0 }}
          exit={{ y: "-110%", rotate: -4 }}
          transition={{ duration: 0.9, ease: EASE_OUT }}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Line({ children, index, play }) {
  return (
    <span className="line">
      <motion.span
        className="line-inner"
        initial={{ y: "115%" }}
        animate={{ y: play ? "0%" : "115%" }}
        transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.2 + index * 0.1 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero({ ready }) {
  const reduce = useReducedMotion();
  const heroRef = useRef(null);

  // Scroll-out: the copy drifts down, shrinks slightly and fades
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 180]);
  const copyScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.94]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const fade = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, ease: EASE_OUT, delay },
  });

  return (
    <section id="top" ref={heroRef} className="hero">
      <div className="container hero-main">
        <motion.div className="hero-copy" style={{ y: copyY, scale: copyScale, opacity: copyOpacity }}>
          <h1 className="hero-title" aria-label="Websites that win you more customers">
            <span aria-hidden="true">
              <Line index={0} play={ready}>
                Websites that win
              </Line>
              <Line index={1} play={ready}>
                you more <RotatingWord play={ready} />
              </Line>
            </span>
          </h1>

          <motion.p className="hero-lede" {...fade(0.55)}>
            Dev16 Studio designs and builds fast, modern websites for barbershops, restaurants,
            real estate and growing brands, made to earn trust at first glance.
          </motion.p>

          <motion.div className="hero-actions" {...fade(0.68)}>
            <Magnetic className="hero-btn">
              <a href="#contact" onClick={handleAnchor} className="btn btn-primary btn-lg">
                Start a project <ArrowUpRight size={18} className="icon-nudge" />
              </a>
            </Magnetic>
            <Magnetic className="hero-btn">
              <a href="#work" onClick={handleAnchor} className="btn btn-ghost btn-lg">
                View my work
              </a>
            </Magnetic>
          </motion.div>

          <motion.div className="hero-proof" {...fade(0.82)}>
            <div className="proof-avatars" aria-hidden="true">
              <span>K</span>
              <span>A</span>
              <span>D</span>
            </div>
            <p>
              <strong>8+ businesses</strong> launched across 7 industries
            </p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="container hero-bottom" {...fade(1)}>
        <span className="hero-meta">
          <MapPin size={15} /> {SITE.location}
        </span>
        <a href="#work" onClick={handleAnchor} className="hero-scroll" aria-label="Scroll to selected work">
          <span className="scroll-track">
            <span className="scroll-thumb" />
          </span>
          Scroll
        </a>
        <span className="hero-meta hero-meta-right">Web design &amp; development</span>
      </motion.div>
    </section>
  );
}
