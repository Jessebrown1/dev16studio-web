import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Magnetic from "../ui/Magnetic";
import { EASE_IN_OUT, EASE_OUT } from "../../lib/motion";
import barber from "../../assets/barber.jpg";
import spoon from "../../assets/spoon.jpg";
import estate from "../../assets/estate.jpg";
import auto from "../../assets/auto.jpg";
import kim from "../../assets/kim.jpg";
import rest from "../../assets/rest.jpg";
import art from "../../assets/art.jpg";
import news from "../../assets/news.jpg";
import "./Work.css";

const FEATURED = [
  {
    title: "Barbershop Booking Site",
    category: "Barbering",
    desc: "A premium, mobile-first website for a barbershop, built around a booking flow that lets clients reserve a chair any time of day without calling ahead.",
    scope: ["Web design", "Development", "Online booking"],
    image: barber,
    link: "https://barber-shop-henna.vercel.app/",
  },
  {
    title: "Golden Spoon",
    category: "Fine dining",
    desc: "An atmospheric brand site for a high-end restaurant. Rich photography, a clear menu and an easy path from first impression to reservation.",
    scope: ["Brand website", "Menu design", "Mobile-first"],
    image: spoon,
    link: "https://goldenspoon-chi.vercel.app/",
  },
];

const PROJECTS = [
  { title: "Casaz Estate", category: "Real estate", image: estate, link: "https://casaz-estate-em6l.vercel.app/" },
  { title: "GH Auto Shop", category: "Automotive", image: auto, link: "https://ghautoshopx.vercel.app/" },
  { title: "Kim's Royal Bloom", category: "Retail", image: kim, link: "https://kim-s-royal-bloom-dag7.vercel.app/" },
  { title: "Restaurant Ordering Site", category: "Food & drink", image: rest, link: "https://foodapp-phi-azure.vercel.app/" },
  { title: "Creative Landing Page", category: "Landing page", image: art, link: "https://designer-ems1.vercel.app/" },
  { title: "Tech Blog", category: "Media", image: news, link: "https://tech-blog-omega-five.vercel.app/" },
];

const domain = (url) => new URL(url).hostname.replace(/^www\./, "");

/** Screenshot shown inside a minimal browser window, revealed by a wipe on scroll. */
function BrowserFrame({ image, title, link, delay = 0 }) {
  return (
    <div className="frame">
      <div className="frame-bar" aria-hidden="true">
        <span className="frame-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="frame-url">{domain(link)}</span>
      </div>
      <div className="frame-view">
        <motion.span
          className="frame-curtain"
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: EASE_IN_OUT, delay }}
        />
        <img src={image} alt={`${title} website preview`} loading="lazy" />
      </div>
    </div>
  );
}

function FeaturedProject({ project, index }) {
  return (
    <motion.article
      className={`featured ${index % 2 ? "is-reversed" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="featured-media"
        aria-label={`Open ${project.title} live site`}
      >
        <BrowserFrame {...project} delay={0.1} />
      </a>

      <div className="featured-info">
        <p className="featured-meta">
          <span className="featured-num">{String(index + 1).padStart(2, "0")}</span>
          <span className="featured-rule" />
          {project.category}
        </p>
        <h3>{project.title}</h3>
        <p className="featured-desc">{project.desc}</p>
        <ul className="featured-scope">
          {project.scope.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <Magnetic>
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Visit live site <ArrowUpRight size={17} className="icon-nudge" />
          </a>
        </Magnetic>
      </div>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section id="work" className="section work">
      <div className="container">
        <SectionHeader
          eyebrow="Selected work"
          title="Recent projects, built to *perform*."
          intro="Live websites for real businesses. Each one is designed around a single goal: getting the right people to take the next step."
        />

        <div className="featured-list">
          {FEATURED.map((p, i) => (
            <FeaturedProject key={p.title} project={p} index={i} />
          ))}
        </div>

        <div className="more-head">
          <h3>More projects</h3>
          <span>{String(PROJECTS.length).padStart(2, "0")} live sites</span>
        </div>

        <div className="project-grid">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: (i % 3) * 0.08 }}
            >
              <BrowserFrame {...p} delay={0.1 + (i % 3) * 0.08} />
              <div className="project-info">
                <div>
                  <h4>{p.title}</h4>
                  <span>{p.category}</span>
                </div>
                <span className="project-arrow" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
