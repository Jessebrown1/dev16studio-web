import React from "react";
import "./HowItWorks.css";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.4, // controls delay between steps
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const steps = [
  {
    number: "01",
    title: "Discovery",
    desc: "We discuss your business, goals, and what you need your website to achieve.",
  },
  {
    number: "02",
    title: "Design",
    desc: "I design a modern, clean interface focused on user experience and conversions.",
  },
  {
    number: "03",
    title: "Development",
    desc: "Your website is built with performance, speed, and responsiveness in mind.",
  },
  {
    number: "04",
    title: "Launch",
    desc: "Your website goes live, ready to attract and convert your audience.",
  },
];

const HowItWorks = () => {
  return (
    <section className="how">
      <div className="how-container">

        {/* Header */}
        <motion.div
          className="how-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>How It Works</h2>
          <p>A simple, effective process designed to deliver results.</p>
        </motion.div>

        {/* Steps with stagger */}
        <motion.div
          className="how-steps"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div
              className="step"
              key={index}
              variants={fadeUp}
            >
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;