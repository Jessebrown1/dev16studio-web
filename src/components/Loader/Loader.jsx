import { useEffect, useState } from "react";
import "./Loader.css";

const logs = [
  "Booting Dev16 OS...",
  "Loading assets...",
  "Initializing shaders...",
  "Connecting modules...",
  "Optimizing UI engine...",
  "Starting experience..."
];

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // terminal logs effect
  useEffect(() => {
    if (logIndex < logs.length - 1) {
      const t = setTimeout(() => {
        setLogIndex(logIndex + 1);
      }, 700);

      return () => clearTimeout(t);
    }
  }, [logIndex]);

  return (
    <div className="loader-screen">

      {/* LOGO */}
      <div className="loader-logo">
        <img src="/dev16.png" alt="Dev16" />
      </div>

      {/* TERMINAL LOGS */}
      <div className="loader-logs">
        {logs.slice(0, logIndex + 1).map((log, i) => (
          <div key={i} className="log-line">
            &gt; {log}
          </div>
        ))}
      </div>

      {/* BRAND */}
      <div className="loader-brand">Dev16 OS</div>

      {/* PROGRESS BAR */}
      <div className="loader-bar">
        <div
          className="loader-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="loader-text">
        Initializing... {progress}%
      </div>
    </div>
  );
}