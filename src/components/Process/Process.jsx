import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import { EASE_OUT } from "../../lib/motion";
import "./Process.css";

const STEPS = [
  {
    title: "Discovery",
    desc: "We talk through your business, your customers and what the website needs to achieve. You get a clear scope before any work starts.",
  },
  {
    title: "Design",
    desc: "I design a clean, modern interface around your brand, focused on making it obvious what you offer and how to get in touch.",
  },
  {
    title: "Development",
    desc: "Your site is built mobile-first with fast load times, smooth interactions and solid foundations for search engines.",
  },
  {
    title: "Launch",
    desc: "We review everything together, then your site goes live, ready to attract visitors and turn them into customers.",
  },
];

function Step({ step, index, progress }) {
  const start = index / STEPS.length;
  const lit = useTransform(progress, [start, start + 0.06], [0, 1]);
  const dotScale = useTransform(lit, [0, 1], [0.4, 1]);

  return (
    <motion.li
      className="process-step"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay: index * 0.08 }}
    >
      <div className="step-marker">
        <motion.span className="step-dot-fill" style={{ opacity: lit, scale: dotScale }} />
      </div>
      <span className="step-num">Step 0{index + 1}</span>
      <h3>{step.title}</h3>
      <p>{step.desc}</p>
    </motion.li>
  );
}

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section id="process" className="section process">
      <div className="container">
        <SectionHeader
          eyebrow="Process"
          title="A simple process, *no surprises*."
          intro="Four clear stages from first conversation to launch, with you kept in the loop at every step."
        />

        <div className="process-track" ref={ref}>
          <div className="process-line" aria-hidden="true">
            <motion.span className="process-line-fill is-h" style={{ scaleX: progress }} />
            <motion.span className="process-line-fill is-v" style={{ scaleY: progress }} />
          </div>
          <ol className="process-steps">
            {STEPS.map((step, i) => (
              <Step key={step.title} step={step} index={i} progress={progress} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
