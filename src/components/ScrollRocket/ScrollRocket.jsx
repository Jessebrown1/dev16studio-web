import { useEffect, useState } from "react";
import { FaRocket } from "react-icons/fa";
import "./ScrollRocket.css";

export default function ScrollRocket() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);
      setVisible(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`rocket-container ${visible ? "show" : ""}`}>
      
      {/* TEXT */}
      {scrollProgress > 95 && (
        <p className="rocket-text">Ready to launch into space?</p>
      )}

      {/* BUTTON */}
      <div className="rocket-btn" onClick={scrollToTop}>
        <svg className="progress-ring" width="70" height="70">
          <circle
            className="progress-ring-bg"
            cx="35"
            cy="35"
            r="30"
          />
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
      </div>

    </div>
  );
}