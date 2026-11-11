import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import SplitReveal from "../ui/SplitReveal";
import Magnetic from "../ui/Magnetic";
import { SITE, whatsappLink } from "../../data/site";
import { EASE_OUT } from "../../lib/motion";
import "./Contact.css";

const fade = (delay) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 0.9, ease: EASE_OUT, delay },
});

export default function Contact() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.88, 1]);
  const glow = useTransform(scrollYProgress, [0.4, 1], [0, 1]);

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <motion.div ref={ref} className="contact-panel" style={{ scale }}>
          <motion.div className="contact-glow" style={{ opacity: glow }} aria-hidden="true" />
          <motion.span className="eyebrow" {...fade(0)}>
            Contact
          </motion.span>
          <SplitReveal text="Have a project in mind? *Let's build it.*" className="contact-title" stagger={0.07} />
          <motion.p className="contact-intro" {...fade(0.35)}>
            Tell me a little about your business and what you need. I&rsquo;ll get back to you
            with honest advice and the clearest next step.
          </motion.p>

          <motion.div className="contact-actions" {...fade(0.5)}>
            <Magnetic className="contact-btn">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                <FaWhatsapp size={18} /> Chat on WhatsApp
              </a>
            </Magnetic>
            <Magnetic className="contact-btn">
              <a href={`mailto:${SITE.email}`} className="btn btn-ghost btn-lg">
                <Mail size={18} /> Send an email
              </a>
            </Magnetic>
          </motion.div>

          <motion.p className="contact-direct" {...fade(0.6)}>
            Or write directly to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
