import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { NAV_LINKS, SITE } from "../../data/site";
import { handleAnchor } from "../../lib/smoothScroll";
import "./Footer.css";

export default function Footer() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const wordY = useTransform(scrollYProgress, [0, 1], [reduce ? "0%" : "60%", "0%"]);

  return (
    <footer className="footer" ref={ref}>
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#top" onClick={handleAnchor} className="brand">
            <img src="/dev16-mark.png" alt="" width="28" height="28" />
            <span>
              Dev16 <span className="brand-light">Studio</span>
            </span>
          </a>
          <p>Websites that help small businesses grow.</p>
        </div>

        <nav className="footer-links" aria-label="Footer">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={handleAnchor}>
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={handleAnchor}>
            Contact
          </a>
        </nav>
      </div>

      <div className="footer-word-wrap" aria-hidden="true">
        <motion.div className="footer-word" style={{ y: wordY }}>
          Dev16 <em>Studio</em>
        </motion.div>
      </div>

      <div className="container footer-bottom">
        <span>
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </span>
        <span>Designed &amp; built by Dev16 Studio</span>
      </div>
    </footer>
  );
}
