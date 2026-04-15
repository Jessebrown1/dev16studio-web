import React from "react";
import "./Contact.css";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Contact = () => {
  return (
    <section className="contact">
      <motion.div
        className="contact-container"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="contact-title">
          Ready to Build Your Website?
        </h2>

        <p className="contact-subtitle">
          Let’s create something modern, fast, and designed to convert your visitors into customers.
        </p>

        <div className="contact-buttons">

          <a
            href="https://wa.me/233552384351?text=Hi%20I%20want%20a%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary"
          >
            💬 Chat on WhatsApp
          </a>

          <a
            href="mailto:youremail@gmail.com"
            className="btn secondary"
          >
            📧 Send an Email
          </a>

        </div>

        <p className="contact-note">
          ⚡ Usually responds within minutes
        </p>
      </motion.div>
    </section>
  );
};

export default Contact;