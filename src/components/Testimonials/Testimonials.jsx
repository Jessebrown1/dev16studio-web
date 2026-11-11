import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { EASE_OUT } from "../../lib/motion";
import "./Testimonials.css";

const TESTIMONIALS = [
  {
    name: "Kwame Mensah",
    role: "Business Owner",
    text: "The website completely transformed my business. It looks premium and converts visitors into real customers.",
  },
  {
    name: "Ama Boateng",
    role: "Entrepreneur",
    text: "Fast delivery, clean design, and very professional. I highly recommend working with him.",
  },
  {
    name: "Daniel Owusu",
    role: "Startup Founder",
    text: "The attention to detail is unmatched. My website now feels like a top-tier brand.",
  },
];

const TILT = [-3, 0, 3];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <SectionHeader center eyebrow="Client words" title="Trusted by owners who *care about quality*." />

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              className="testimonial card"
              initial={{ opacity: 0, y: 80, rotate: TILT[i] }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, ease: EASE_OUT, delay: i * 0.12 }}
            >
              <Quote size={26} className="testimonial-mark" strokeWidth={1.5} />
              <blockquote>{t.text}</blockquote>
              <figcaption>
                <span className="avatar" aria-hidden="true">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="t-name">{t.name}</span>
                  <span className="t-role">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
