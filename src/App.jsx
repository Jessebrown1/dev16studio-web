import React, { useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import Portfolio from "./components/Portfolio/Portfolio";
import Contact from "./components/Contact/Contact";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import Testimonials from "./components/Testimonials/Testimonials";
import ScrollRocket from "./components/ScrollRocket/ScrollRocket";

import Loader from "./components/Loader/Loader";
import ScrollSystem from "./components/ScrollSystem/ScrollSystem";

import "./index.css";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="main-container">

      {/* 🚀 LOADER (BOOT SCREEN) */}
      {loading && (
        <Loader onFinish={() => setLoading(false)} />
      )}

      {/* MAIN APP (after loading) */}
      {!loading && (
        <>
          {/* 📊 SCROLL PROGRESS SYSTEM */}
          <ScrollSystem />

          {/* Navbar */}
          <Navbar />

          {/* Scroll Container */}
          <div className="scroll-container">

            {/* Hero */}
            <section id="home" className="snap-section">
              <Hero />
            </section>

            {/* Services */}
            <section id="services" className="snap-section">
              <Services />
            </section>

            {/* How It Works */}
            <section id="HowItWorks" className="snap-section">
              <HowItWorks />
            </section>

            {/* Portfolio */}
            <section id="portfolio" className="snap-section">
              <Portfolio />
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="snap-section">
              <Testimonials />
            </section>

            {/* Contact */}
            <section id="contact" className="snap-section">
              <Contact />
            </section>

          </div>

          {/* 🚀 Rocket Scroll Button */}
          <ScrollRocket />
        </>
      )}

    </div>
  );
}

export default App;