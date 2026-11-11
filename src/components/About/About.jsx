import { motion } from "framer-motion";
import { Check, MapPin } from "lucide-react";
import SplitReveal from "../ui/SplitReveal";
import ScrollWords from "../ui/ScrollWords";
import Counter from "../ui/Counter";
import { SITE } from "../../data/site";
import { EASE_OUT } from "../../lib/motion";
import "./About.css";

const PRINCIPLES = [
  "You talk directly to the person building your site",
  "Clear scope agreed before any work begins",
  "Mobile-first and fast by default",
  "Honest advice on what will actually help your business",
];

const TOOLKIT = ["React", "Vite", "Tailwind CSS", "Framer Motion", "Vercel"];

const STATS = [
  { to: 8, suffix: "+", label: "Client sites live" },
  { to: 7, suffix: "", label: "Industries served" },
  { to: 100, suffix: "%", label: "Custom, no templates" },
];

const STATEMENT =
  "Dev16 Studio is an independent web design and development studio. Instead of handing you off to an account manager, you work with me from the first call to launch day. I focus on small and growing businesses that need a website that looks established, works perfectly on a phone and gives customers a clear reason to get in touch.";

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <div className="about-copy">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            About
          </motion.span>
          <SplitReveal text="A one-person studio, *fully invested* in your result." className="section-title" />
          <ScrollWords text={STATEMENT} className="about-statement" />

          <ul className="about-stats">
            {STATS.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: i * 0.1 }}
              >
                <span className="about-stat-value">
                  <Counter to={s.to} suffix={s.suffix} />
                </span>
                <span className="about-stat-label">{s.label}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          className="about-panel card"
          initial={{ opacity: 0, y: 60, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: EASE_OUT }}
        >
          <h3 className="panel-label">How I work</h3>
          <ul className="about-principles">
            {PRINCIPLES.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 + i * 0.08 }}
              >
                <span className="principle-check">
                  <Check size={14} strokeWidth={2.4} />
                </span>
                {p}
              </motion.li>
            ))}
          </ul>

          <h3 className="panel-label">Toolkit</h3>
          <ul className="about-tools">
            {TOOLKIT.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>

          <p className="about-location">
            <MapPin size={16} /> {SITE.location}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
