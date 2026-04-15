import React from "react";
import "./Testimonials.css";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const testimonials = [
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

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="testimonials-container">

        {/* Header */}
        <motion.div
          className="testimonials-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>What Clients Say</h2>
          <p>Trusted by businesses who value quality and results.</p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="testimonials-grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((item, index) => (
            <motion.div
              className="testimonial-card"
              key={index}
              variants={fadeUp}
            >
              <p className="testimonial-text">“{item.text}”</p>

              <div className="testimonial-user">
                <div className="avatar">{item.name.charAt(0)}</div>
                <div>
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>






      </div>
    </section>




  );
};

export default Testimonials;