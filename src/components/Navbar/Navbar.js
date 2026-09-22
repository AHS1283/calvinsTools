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

    const resetToHero = () => {
      // Only reset scroll when we are on Home
      if (window.location.pathname === "/") {
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

  /*
   * HOME SECTION NAVIGATION
   */
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeMenu();

    // HOME / HERO
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

    // Other sections
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /*
   * TRAILERS FOR SALE
   * Opens separate page instead of Home #trailers section.
   */
  const handleTrailersForSale = (e) => {
    e.preventDefault();
    closeMenu();

    window.location.href = "/trailers-for-sale";
  };

  /*
   * BOOKING
   */
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

        {/* LOGO */}
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

        {/* NAVIGATION */}
        <nav
          className={`nav-links ${open ? "open" : ""}`}
          aria-label="Main navigation"
        >
          {/* HOME */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "home")}
          >
            Home
          </a>

          {/* ABOUT */}
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, "about")}
          >
            About
          </a>

          {/* TRAILERS FOR SALE */}
          <a
            href="/trailers-for-sale"
            onClick={handleTrailersForSale}
          >
            Trailers for Sale
          </a>

          {/* FEATURED */}
          <a
            href="#featured-trailers"
            onClick={(e) =>
              handleNavClick(e, "featured-trailers")
            }
          >
            Featured
          </a>

          {/* WHY CALVIN'S */}
          <a
            href="#why-calvins"
            onClick={(e) =>
              handleNavClick(e, "why-calvins")
            }
          >
            Why Calvin's
          </a>

          {/* HOW IT WORKS */}
          <a
            href="#how-it-works"
            onClick={(e) =>
              handleNavClick(e, "how-it-works")
            }
          >
            How It Works
          </a>

          {/* REVIEWS */}
          <a
            href="#reviews"
            onClick={(e) => handleNavClick(e, "reviews")}
          >
            Reviews
          </a>

          {/* CONTACT */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
          >
            Contact
          </a>
        </nav>

        {/* BOOKING CTA */}
        <a
          className="nav-cta"
          href="#contact"
          onClick={openBooking}
        >
          <span>Book a Trailer</span>
          <span className="nav-cta-arrow">↗</span>
        </a>

        {/* MOBILE MENU */}
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

      {/* BOOKING MODAL */}
      <BookingModal
        isOpen={showBooking}
        onClose={closeBooking}
      />
    </header>
  );
}

export default Navbar;