import { useEffect, useState, useRef } from "react";
import { FaRocket } from "react-icons/fa";
import "./ScrollRocket.css";

export default function ScrollRocket() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [particles, setParticles] = useState([]);

  const particleId = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);
      setVisible(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 spawn particles
  useEffect(() => {
    if (!launching) return;

    const interval = setInterval(() => {
      const newParticle = {
        id: particleId.current++,
        x: Math.random() * 40 - 20,
        size: Math.random() * 10 + 10,
        life: 0
      };

      setParticles((prev) => [...prev, newParticle]);
    }, 40);

    return () => clearInterval(interval);
  }, [launching]);

  // animate particles
  useEffect(() => {
    if (!launching && particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life + 0.04 }))
          .filter((p) => p.life < 1)
      );
    }, 40);

    return () => clearInterval(interval);
  }, [launching, particles]);

  const handleLaunch = () => {
    if (launching) return;

    setLaunching(true);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setLaunching(false);
      setParticles([]);
    }, 700);
  };

  return (
    <div className={`rocket-container ${visible ? "show" : ""}`}>
      
      {scrollProgress > 95 && (
        <p className="rocket-text">Ready to launch into space?</p>
      )}

      <div
        className={`rocket-btn ${launching ? "launch" : ""}`}
        onClick={handleLaunch}
      >
        {/* 🔥 SMOKE */}
        <div className="smoke-container">
          {particles.map((p) => (
            <span
              key={p.id}
              className="smoke"
              style={{
                left: `calc(50% + ${p.x}px)`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: 1 - p.life,
                transform: `translateY(${p.life * 120}px) scale(${1.5 + p.life})`
              }}
            />
          ))}
        </div>

        <svg className="progress-ring" width="70" height="70">
          <circle className="progress-ring-bg" cx="35" cy="35" r="30" />
          <circle
            className="progress-ring-fill"
            cx="35"
            cy="35"
            r="30"
            style={{
              strokeDasharray: 188,
              strokeDashoffset: 188 - (scrollProgress / 100) * 188
            }}
          />
        </svg>

        <FaRocket className="rocket-icon" />

        {/* 🔥 FLAME */}
        <div className="rocket-flame"></div>
      </div>
    </div>
  );
}