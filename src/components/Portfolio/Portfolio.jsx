import React from "react";
import "./Portfolio.css";
import { motion } from "framer-motion";
import rest from "../../assets/rest.jpg";
import art from "../../assets/art.jpg";
import barber from"../../assets/barber.jpg";
import auto from "../../assets/auto.jpg";
import non from "../../assets/non.jpg";
import spoon from "../../assets/spoon.jpg";
import estate from "../../assets/estate.jpg";
import kim from "../../assets/kim.jpg";
import news from "../../assets/news.jpg";

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
    title: "Barbershop Website That Books Clients 24/7",
    desc: "Turn visitors into paying customers with a smooth booking system and premium design.",
    image: barber,
    link: "https://barber-shop-henna.vercel.app/"
  },
  {
    title: "Restaurant Website That Drives Orders",
    desc: "A mouth-watering, mobile-first design that keeps customers engaged and ready to order.",
    image: rest,
    link: "https://foodapp-phi-azure.vercel.app/"
  },
  {
    title: "Landing Page Built to Convert",
    desc: "Designed to capture attention instantly and turn clicks into real business results.",
    image: art,
    link: "https://designer-ems1.vercel.app/"  
  },
  {
    title: "Auto Business Website That Builds Trust",
    desc: "Professional design that positions your brand as reliable and attracts serious clients.",
    image: auto,
    link: "https://ghautoshopx.vercel.app/"
  },
  {
    title: "Restaurant Experience That Sells Your Brand",
    desc: "High-end visuals and smart layout that make customers choose you instantly.",
    image: spoon,
    link: "https://goldenspoon-chi.vercel.app/"  
  },
  {
    title: "Real Estate Website That Generates Leads",
    desc: "Clean, modern platform built to showcase properties and bring in serious buyers.",
    image: estate,
    link: "https://casaz-estate-em6l.vercel.app/"  
  },
  {
    title: "Business Website That Elevates Your Brand",
    desc: "Stand out online with a premium look that builds trust and attracts high-value clients.",
    image: kim,
    link: "https://kim-s-royal-bloom-dag7.vercel.app/"  
  },
  {
    title: "Tech Blog Built for Growth",
    desc: "Fast, modern platform designed to keep readers engaged and coming back.",
    image: news,
    link: "https://tech-blog-omega-five.vercel.app/"  
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