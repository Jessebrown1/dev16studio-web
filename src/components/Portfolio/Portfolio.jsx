import React from "react";
import "./Portfolio.css";
import { motion } from "framer-motion";

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
    title: "E-commerce Website",
    desc: "Modern online store with smooth UI and checkout.",
    image: "https://via.placeholder.com/600x400",
  },
  {
    title: "Restaurant Website",
    desc: "Clean and responsive restaurant landing page.",
    image: "https://via.placeholder.com/600x400",
  },
  {
    title: "Business Landing Page",
    desc: "High-converting landing page for a brand.",
    image: "https://via.placeholder.com/600x400",
  },
  {
    title: "Portfolio Website",
    desc: "Personal brand website with modern UI.",
    image: "https://via.placeholder.com/600x400",
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
                  <button>View Project</button>
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