import { useEffect, useState } from "react";
import "./Navbar.css"; // Plain CSS

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">

        <div className="logo">Dev16Studio</div>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#howitworks">How It Works</a></li>
          <li><a href="#portfolio">Projects</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
        </ul>

        <a href="#contact" className="nav-cta">Start Project</a>

      </div>
    </nav>
  );
}