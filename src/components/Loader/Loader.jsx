import { useEffect, useState } from "react";
import "./Loader.css";

/**
 * Intro shown on every load:
 *  1. a gold ring draws around the logo           (in)
 *  2. a glowing seam sweeps across the middle      (seam)
 *  3. the screen splits open along the seam        (out)
 */
const SEAM_AT = 1000;
const SPLIT_AT = 1400;
const DONE_AFTER = 1000;

export default function Loader({ onReveal }) {
  const [phase, setPhase] = useState("in"); // in → seam → out → done

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const t = setTimeout(() => {
        setPhase("done");
        onReveal();
      }, 150);
      return () => clearTimeout(t);
    }

    const t1 = setTimeout(() => setPhase("seam"), SEAM_AT);
    const t2 = setTimeout(() => {
      setPhase("out");
      onReveal();
    }, SPLIT_AT);
    const t3 = setTimeout(() => setPhase("done"), SPLIT_AT + DONE_AFTER);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onReveal]);

  if (phase === "done") return null;

  return (
    <div className={`loader is-${phase}`} aria-hidden="true">
      <div className="loader-half is-top" />
      <div className="loader-half is-bottom" />
      <div className="loader-seam" />

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
