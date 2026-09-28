import { useState, useEffect } from "react";
import "./Navbar.css";
import BookingModal from "../BookingModal/BookingModal";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const hash = window.location.hash
      ? window.location.hash.replace("#", "")
      : "";

    // Agar hash ke through kisi section pe aaye ho, seedha wahan scroll karo
    if (window.location.pathname === "/" && hash) {
      const scrollToHashTarget = () => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };

      let attempts = 0;
      const maxAttempts = 20;
      const interval = setInterval(() => {
        attempts += 1;
        if (scrollToHashTarget() || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 100);

      return () => {
        clearInterval(interval);
        if ("scrollRestoration" in window.history) {
          window.history.scrollRestoration = "auto";
        }
      };
    }

    const resetToHero = () => {
      if (window.location.pathname === "/" && !window.location.hash) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
      }
    };

    resetToHero();

    const timer1 = setTimeout(resetToHero, 50);
    const timer2 = setTimeout(resetToHero, 200);
    const timer3 = setTimeout(resetToHero, 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  const closeMenu = () => {
    setOpen(false);
  };

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();

    if (targetId === "home") {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
        return;
      }

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      return;
    }

    // Kisi aur page se ho to seedha home ke uss section pe hash ke sath jao
    if (window.location.pathname !== "/") {
      window.location.href = `/#${targetId}`;
      return;
    }

    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleTrailersForSale = (e) => {
    e.preventDefault();
    closeMenu();

    window.location.href = "/trailers-for-sale";
  };

  const handleTrailersForRent = (e) => {
    e.preventDefault();
    closeMenu();

    window.location.href = "/trailerrental";
  };

  const openBooking = (e) => {
    e.preventDefault();

    closeMenu();
    setShowBooking(true);
  };

  const closeBooking = () => {
    setShowBooking(false);
  };

  return (
    <header className="navbar-wrapper">
      <div className="navbar">

        {/* =========================
            LOGO
        ========================== */}
        <a
          className="brand"
          href="/"
          onClick={(e) => handleNavClick(e, "home")}
          aria-label="CALVIN'S TOOLS Home"
        >
          <img
            src="/assets/logo1.png"
            alt="Calvin's Tools"
            className="brand-logo"
          />
        </a>

        {/* =========================
            MOBILE CENTER TITLE
        ========================== */}
        <div className="mobile-brand-title">
          CALVINSTOOLS
        </div>

        {/* =========================
            NAVIGATION
        ========================== */}
        <nav
          className={`nav-links ${open ? "open" : ""}`}
          aria-label="Main navigation"
        >
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "home")}
          >
            Home
          </a>

          <a
            href="/#about"
            onClick={(e) => handleNavClick(e, "about")}
          >
            About
          </a>

          <a
            href="/trailers-for-sale"
            onClick={handleTrailersForSale}
          >
            Trailers for Sale
          </a>

          <a
            href="/trailerrental"
            onClick={handleTrailersForRent}
          >
            Trailers for Rent
          </a>

          <a
            href="/#why-calvins"
            onClick={(e) =>
              handleNavClick(e, "why-calvins")
            }
          >
            Why Calvin's
          </a>

          <a
            href="/#how-it-works"
            onClick={(e) =>
              handleNavClick(e, "how-it-works")
            }
          >
            How It Works
          </a>

          <a
            href="/#reviews"
            onClick={(e) => handleNavClick(e, "reviews")}
          >
            Reviews
          </a>

          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, "contact")}
          >
            Contact
          </a>
        </nav>

        {/* =========================
            BOOKING CTA
        ========================== */}
        <a
          className="nav-cta"
          href="/#contact"
          onClick={openBooking}
        >
          <span>Book a Trailer</span>
          <span className="nav-cta-arrow">↗</span>
        </a>

        {/* =========================
            MOBILE MENU
        ========================== */}
        <button
          type="button"
          className={`menu-toggle ${open ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span></span>
          <span></span>
        </button>
      </div>

      {/* =========================
          BOOKING MODAL
      ========================== */}
      <BookingModal
        isOpen={showBooking}
        onClose={closeBooking}
      />
    </header>
  );
}

export default Navbar;
