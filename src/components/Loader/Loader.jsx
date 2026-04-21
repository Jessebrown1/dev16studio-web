import { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-screen">

      {/* 🔥 LOGO */}
      <div className="loader-logo">
        <img src="/dev16.png" alt="Dev16" />
      </div>

      {/* BRAND TEXT */}
      <div className="loader-brand">Dev16 OS</div>

      {/* PROGRESS BAR */}
      <div className="loader-bar">
        <div
          className="loader-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* TEXT */}
      <div className="loader-text">
        Initializing experience... {progress}%
      </div>
    </div>
  );
}