import { useEffect, useState } from "react";
import "./Loader.css";

const SEEN_KEY = "dev16-intro-seen";

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Fast intro: a ring draws around the logo, then the screen splits open.
 * Repeat visits in the same session just get a quick fade.
 */
export default function Loader({ onReveal }) {
  const [quick] = useState(hasSeenIntro);
  const [phase, setPhase] = useState("in"); // in → out → done

  useEffect(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage unavailable: always show the full intro */
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = quick || reduce ? 120 : 950;
    const t1 = setTimeout(() => {
      setPhase("out");
      onReveal();
    }, hold);
    const t2 = setTimeout(() => setPhase("done"), hold + 850);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onReveal, quick]);

  if (phase === "done") return null;

  return (
    <div
      className={`loader ${phase === "out" ? "is-out" : ""} ${quick ? "is-quick" : ""}`}
      aria-hidden="true"
    >
      <div className="loader-half is-top" />
      <div className="loader-half is-bottom" />

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
