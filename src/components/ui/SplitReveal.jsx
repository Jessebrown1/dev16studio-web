import { Fragment } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "../../lib/motion";

/**
 * Splits text into words that slide up from behind a mask.
 * Wrap words in *asterisks* to render them in the italic serif accent.
 * Plays when scrolled into view, or when `play` becomes true if provided.
 */
function tokenize(text) {
  const words = [];
  let glue = false;
  text.split(/(\*[^*]+\*)/).filter(Boolean).forEach((part) => {
    const em = part.startsWith("*") && part.endsWith("*");
    const content = em ? part.slice(1, -1) : part;
    content.split(/(\s+)/).forEach((piece) => {
      if (!piece) return;
      if (/^\s+$/.test(piece)) {
        glue = false;
        return;
      }
      if (glue && words.length) words[words.length - 1].push({ text: piece, em });
      else words.push([{ text: piece, em }]);
      glue = true;
    });
  });
  return words;
}

const container = (stagger, delay) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const word = {
  hidden: { y: "115%", rotate: 3 },
  visible: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE_OUT } },
};

export default function SplitReveal({ text, as = "h2", className = "", delay = 0, stagger = 0.06, play }) {
  const Tag = motion[as];
  const words = tokenize(text);
  const trigger =
    play === undefined
      ? { whileInView: "visible", viewport: { once: true, amount: 0.5 } }
      : { animate: play ? "visible" : "hidden" };

  return (
    <Tag
      className={className}
      aria-label={text.replace(/\*/g, "")}
      variants={container(stagger, delay)}
      initial="hidden"
      {...trigger}
    >
      {words.map((pieces, i) => (
        <Fragment key={i}>
          <span className="split-mask" aria-hidden="true">
            <motion.span className="split-word" variants={word}>
              {pieces.map((p, j) => (
                <span key={j} className={p.em ? "split-em" : undefined}>
                  {p.text}
                </span>
              ))}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </Tag>
  );
}
