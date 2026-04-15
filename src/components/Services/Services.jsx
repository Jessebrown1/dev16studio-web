import React, { useRef } from "react";
import "./Services.css";
import { motion } from "framer-motion";
import { FaCode, FaShoppingCart, FaRocket, FaMobileAlt } from "react-icons/fa";

const services = [
  {
    icon: <FaCode />,
    title: "Custom Development",
    desc: "Precision-built websites engineered for performance, scalability, and a refined digital presence.",
  },
  {
    icon: <FaShoppingCart />,
    title: "E-Commerce",
    desc: "High-converting online stores designed to elevate user experience and maximize revenue.",
  },
  {
    icon: <FaRocket />,
    title: "Performance Optimization",
    desc: "Speed, SEO, and technical enhancements that position your brand ahead of the competition.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Responsive Experience",
    desc: "Seamless cross-device design ensuring consistency across all screen sizes.",
  },
];

const Services = () => {
  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  };

  return (
    <section className="services-section">
      <div className="services-container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="services-header"
        >
          <h2>Crafted for Impact</h2>
          <p>
            I design and build digital experiences that combine elegance,
            performance, and conversion-driven strategy.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="service-card"
            >
              <div className="card-overlay" />

              <div className="card-content">
                <div className="icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>

              <div className="card-line" />
            </motion.div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default Services;