import { useEffect, useState } from "react";
import "./ScrollSystem.css";

export default function ScrollSystem() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.body.scrollHeight - window.innerHeight;

      setProgress((scrollTop / docHeight) * 100);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-system">
      <div className="scroll-bar">
        <div
          className="scroll-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}