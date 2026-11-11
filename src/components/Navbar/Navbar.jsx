import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Magnetic from "../ui/Magnetic";
import { NAV_LINKS, SITE, whatsappLink } from "../../data/site";
import { EASE_IN_OUT, EASE_OUT } from "../../lib/motion";
import { lockScroll, scrollToId } from "../../lib/smoothScroll";
import "./Navbar.css";

const MENU_CLOSED = "circle(0px at calc(100% - 37px) 32px)";
const MENU_OPEN = "circle(2400px at calc(100% - 37px) 32px)";

export default function Navbar({ ready }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 24);
      setProgress(max > 0 ? y / max : 0);
      // hide while scrolling down, reveal on the way back up
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 320);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link for the section in the middle of the screen
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock page scroll while the mobile menu is open; close on Escape or desktop resize
  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const go = (e, id) => {
    e.preventDefault();
    if (open) {
      setOpen(false);
      setTimeout(() => scrollToId(id), 60);
    } else {
      scrollToId(id);
    }
  };

  const showBar = ready && (!hidden || open);

  return (
    <>
      <motion.header
        className={`nav ${scrolled && !open ? "is-solid" : ""} ${open ? "is-open" : ""}`}
        initial={{ y: "-100%" }}
        animate={{ y: showBar ? "0%" : "-100%" }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: ready && !scrolled ? 0.5 : 0 }}
      >
        <div className="nav-inner">
          <a href="#top" className="brand" onClick={(e) => go(e, "top")}>
            <img src="/dev16-mark.png" alt="" width="30" height="30" />
            <span>
              Dev16 <span className="brand-light">Studio</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => go(e, link.id)}
                className={active === link.id ? "is-active" : ""}
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Magnetic className="nav-cta">
            <a href="#contact" onClick={(e) => go(e, "contact")} className="btn btn-primary btn-sm">
              Start a project
            </a>
          </Magnetic>

          <button
            type="button"
            className={`nav-toggle ${open ? "is-open" : ""}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="toggle-line" />
            <span className="toggle-line" />
          </button>
        </div>

        <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: MENU_CLOSED }}
            animate={{ clipPath: MENU_OPEN }}
            exit={{ clipPath: MENU_CLOSED }}
            transition={{ duration: 0.85, ease: EASE_IN_OUT }}
          >
            <div className="container menu-inner">
              <motion.p
                className="menu-label"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.25 }}
              >
                Navigation
              </motion.p>

              <nav className="menu-links" aria-label="Mobile">
                {NAV_LINKS.map((link, i) => (
                  <div className="menu-link-mask" key={link.id}>
                    <motion.a
                      href={`#${link.id}`}
                      onClick={(e) => go(e, link.id)}
                      className={`menu-link ${active === link.id ? "is-active" : ""}`}
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%", transition: { duration: 0.35, ease: EASE_IN_OUT } }}
                      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.22 + i * 0.06 }}
                    >
                      <span className="menu-index">0{i + 1}</span>
                      <span className="menu-text">{link.label}</span>
                      <ArrowUpRight className="menu-arrow" size={18} />
                    </motion.a>
                  </div>
                ))}
              </nav>

              <motion.div
                className="menu-footer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12, transition: { duration: 0.25 } }}
                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.55 }}
              >
                <a href="#contact" onClick={(e) => go(e, "contact")} className="btn btn-primary menu-cta">
                  Start a project <ArrowUpRight size={18} />
                </a>
                <div className="menu-contacts">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp size={16} /> WhatsApp
                  </a>
                  <a href={`mailto:${SITE.email}`}>
                    <Mail size={16} /> Email
                  </a>
                </div>
                <p className="menu-location">{SITE.location}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
