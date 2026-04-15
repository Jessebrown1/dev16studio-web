import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Portfolio from "./components/Portfolio/Portfolio";
import Contact from "./components/Contact/Contact";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Testimonials from "./components/Testimonials/Testimonials";
import "./index.css";

function App() {
  return (
    <div className="App">

      {/* Navbar */}
      <Navbar />

      {/* ✅ Scroll Container */}
      <div className="scroll-container">

        {/* Hero */}
        <section id="home" className="snap-section">
          <Hero />
        </section>

        {/* Services */}
        <section id="services" className="snap-section">
          <Services />
        </section>


        <section id="HowItWorks" className="snap-section">
          <HowItWorks />
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="snap-section">
          <Portfolio />
        </section>

        
        <section id="testimonials" className="snap-section">
          <Testimonials />
        </section>

        {/* Contact */}
        <section id="contact" className="snap-section">
          <Contact />
        </section>

      </div>

    </div>
  );
}

export default App;