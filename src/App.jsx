import React, { useState, useEffect } from "react";

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
  const [launch, setLaunch] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasLoaded = localStorage.getItem("dev16_loaded");

    if (hasLoaded) {
      setLoading(false);
      setReady(true);
    }
  }, []);

  const handleFinishLoading = () => {
    localStorage.setItem("dev16_loaded", "true");

    // 🚀 START LAUNCH SEQUENCE
    setLaunch(true);

    setTimeout(() => {
      setLoading(false);
      setReady(true);
    }, 900); // match animation
  };

  return (
    <div className={`main-container ${launch ? "launch-mode" : ""}`}>

      {loading && (
        <Loader onFinish={handleFinishLoading} launch={launch} />
      )}

      {ready && (
        <div className="app-fade-in">

          <ScrollSystem />
          <Navbar />

          <div className="scroll-container">

            <section id="home" className="snap-section">
              <Hero />
            </section>

            <section id="services" className="snap-section">
              <Services />
            </section>

            <section id="HowItWorks" className="snap-section">
              <HowItWorks />
            </section>

            <section id="portfolio" className="snap-section">
              <Portfolio />
            </section>

            <section id="testimonials" className="snap-section">
              <Testimonials />
            </section>

            <section id="contact" className="snap-section">
              <Contact />
            </section>

          </div>

          <ScrollRocket />

        </div>
      )}

    </div>
  );
}

export default App;