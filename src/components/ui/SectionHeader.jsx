import { motion } from "framer-motion";
import SplitReveal from "./SplitReveal";
import { EASE_OUT } from "../../lib/motion";

const fade = (delay) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 0.9, delay, ease: EASE_OUT },
});

/** title supports *italic accent* markup. */
export default function SectionHeader({ eyebrow, title, intro, center = false, className = "" }) {
  return (
    <div className={`section-head ${center ? "is-center" : ""} ${className}`}>
      {eyebrow && (
        <motion.span className="eyebrow" {...fade(0)}>
          {eyebrow}
        </motion.span>
      )}
      <SplitReveal text={title} className="section-title" delay={0.1} />
      {intro && (
        <motion.p className="section-intro" {...fade(0.35)}>
          {intro}
        </motion.p>
      )}
    </div>
  );
}
