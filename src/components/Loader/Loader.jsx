import { useEffect, useState } from "react";
import "./Loader.css";

/**
 * Intro shown on every load:
 *  1. a gold ring draws around the logo                       (in)
 *  2. the ring becomes a circular window that expands outward,
 *     with a glowing gold rim, revealing the site behind it    (open)
 */
const OPEN_AT = 1050;
const DONE_AFTER = 1250;

export default function Loader({ onReveal }) {
  const [phase, setPhase] = useState("in"); // in → open → done

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const t = setTimeout(() => {
        setPhase("done");
        onReveal();
      }, 150);
      return () => clearTimeout(t);
    }

    const t1 = setTimeout(() => {
      setPhase("open");
      onReveal();
    }, OPEN_AT);
    const t2 = setTimeout(() => setPhase("done"), OPEN_AT + DONE_AFTER);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onReveal]);

  if (phase === "done") return null;

  return (
    <div className={`loader is-${phase}`} aria-hidden="true">
      {/* A circle whose huge shadow covers the screen; growing the circle opens a window onto the site */}
      <div className="loader-iris" />

      <div className="loader-core">
        <div className="loader-ring">
          <svg viewBox="0 0 100 100">
            <circle className="ring-track" cx="50" cy="50" r="46" />
            <circle className="ring-progress" cx="50" cy="50" r="46" />
          </svg>
          <img src="/dev16-mark.png" alt="" width="40" height="40" />
        </div>
        <p className="loader-name">
          Dev16 <em>Studio</em>
        </p>
      </div>
    </div>
  );
}
