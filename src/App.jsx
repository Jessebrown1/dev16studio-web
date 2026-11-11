import { useCallback, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

import ShaderBackground from "./components/Background/ShaderBackground";
import Loader from "./components/Loader/Loader";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Work from "./components/Work/Work";
import Services from "./components/Services/Services";
import Process from "./components/Process/Process";
import About from "./components/About/About";
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import BackToTop from "./components/BackToTop/BackToTop";
import { initSmoothScroll, lockScroll } from "./lib/smoothScroll";

export default function App() {
  const [ready, setReady] = useState(false);
  const handleReveal = useCallback(() => setReady(true), []);

  // Always start at the top behind the intro, with smooth scrolling on
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    return initSmoothScroll();
  }, []);

  // Keep the page still while the startup screen plays
  useEffect(() => {
    lockScroll(!ready);
  }, [ready]);

  return (
    <MotionConfig reducedMotion="user">
      <ShaderBackground />
      <Loader onReveal={handleReveal} />

      <Navbar ready={ready} />
      <div className="site">
        <main>
          <Hero ready={ready} />
          <Work />
          <Services />
          <Process />
          <About />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>

      <BackToTop />
    </MotionConfig>
  );
}
