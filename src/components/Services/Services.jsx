import { motion } from "framer-motion";
import { LayoutTemplate, ShoppingBag, MousePointerClick, Gauge, Check } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { EASE_OUT } from "../../lib/motion";
import "./Services.css";

const SERVICES = [
  {
    icon: LayoutTemplate,
    title: "Business websites",
    desc: "Custom-designed, multi-page sites that explain what you do, build credibility and make it easy to get in touch.",
    points: ["Custom design, no templates", "WhatsApp & contact integration", "Easy-to-update content"],
  },
  {
    icon: ShoppingBag,
    title: "Online stores",
    desc: "E-commerce experiences that present your products beautifully and make buying simple on any device.",
    points: ["Product catalogue & cart", "Payment integration", "Order-focused checkout"],
  },
  {
    icon: MousePointerClick,
    title: "Landing pages",
    desc: "Focused single pages for a launch, offer or campaign, structured to turn attention into enquiries.",
    points: ["Conversion-led structure", "Lead capture forms", "Built for ads & social traffic"],
  },
  {
    icon: Gauge,
    title: "Speed & SEO",
    desc: "Technical improvements that help your site load fast, rank better and keep visitors from bouncing.",
    points: ["Performance tuning", "On-page SEO setup", "Analytics & tracking"],
  },
];

// Spotlight that follows the mouse across a card
const trackSpotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="container services-layout">
        <div className="services-aside">
          <SectionHeader
            eyebrow="Services"
            title="What I can *build* for you."
            intro="Every project is designed and developed from scratch around your business, your customers and what you need the website to achieve."
          />
        </div>

        <div className="services-list">
          {SERVICES.map(({ icon, title, desc, points }, i) => {
            const Icon = icon;
            return (
            <motion.article
              key={title}
              className="service-card card"
              onMouseMove={trackSpotlight}
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: EASE_OUT }}
            >
              <div className="service-top">
                <span className="service-icon">
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <span className="service-num">0{i + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <ul className="service-points">
                {points.map((pt, j) => (
                  <motion.li
                    key={pt}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.3 + j * 0.08 }}
                  >
                    <Check size={15} strokeWidth={2.2} /> {pt}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
