import React from "react";
import "./Portfolio.css";
import { motion } from "framer-motion";
import rest from "../../assets/rest.jpg";
import art from "../../assets/art.jpg";
import barber from"../../assets/barber.jpg";
import auto from "../../assets/auto.jpg";
import non from "../../assets/non.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const projects = [
  {
    title: "barber shop Website",
    desc: "Modern online website with smooth UI and a booking system.",
    image: barber,
    link: "https://barber-shop-henna.vercel.app/"
  },
  {
    title: "Restaurant Website",
    desc: "Clean and responsive restaurant landing page.",
    image: rest,
  },
  {
    title: "Business Landing Page",
    desc: "High-converting landing page for a brand.",
    image: art,
  },
  {
    title: "Autoshop Website",
    desc: "Personal brand website with modern UI.",
    image: auto,
  },
  {
    title: "Non-Governmental Organizations Website",
    desc: "Personal brand website with modern UI.",
    image: non,
  },
];

const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="container">

        <motion.div
          className="section-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>My Work</h2>
          <p>Some of the projects I’ve designed and developed.</p>
        </motion.div>

        <motion.div
          className="portfolio-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div
              className="portfolio-card"
              key={index}
              variants={fadeUp}
            >
              <div className="image-wrapper">
                <img src={project.image} alt={project.title} />

                <div className="overlay">
                  <a
  href={project.link}
  target="_blank"
  rel="noopener noreferrer"
>
  <button>View Project</button>
</a>
                </div>
              </div>

              <div className="portfolio-content">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Portfolio;