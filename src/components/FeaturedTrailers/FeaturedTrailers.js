import React, { useEffect, useState, useRef } from "react";
import "./FeaturedTrailers.css";

// same public/assets convention as Hero.jsx — files live in the
// public folder, referenced by path, no bundler import needed
const trailers = [
  {
    id: "01",
    name: "Street Kitchen",
    category: "FOOD TRAILER",
    location: "Available Nationwide",
    price: "₹2,499",
    period: "/ day",
    description:
      "A professional mobile kitchen built for food businesses, catering and events.",
    image: "/assets/food_trailer.png",
    features: ["Kitchen Setup", "Serving Window", "Storage"],
  },
  {
    id: "02",
    name: "Beauty Studio",
    category: "BEAUTY TRAILER",
    location: "Available Nationwide",
    price: "₹2,999",
    period: "/ day",
    description:
      "A stylish mobile beauty space designed for nail artists and beauty professionals.",
    image: "/assets/nail_trailer.png",
    features: ["Salon Interior", "Power Setup", "Client Area"],
  },
  {
    id: "03",
    name: "Mobile Store",
    category: "RETAIL TRAILER",
    location: "Available Nationwide",
    price: "₹2,199",
    period: "/ day",
    description:
      "A flexible retail space for pop-ups, merchandise, exhibitions and events.",
    image: "/assets/retail_trailer.png",
    features: ["Display Space", "Lighting", "Storage"],
  },
];

function FeaturedTrailers() {
  const [active, setActive] = useState(0);
  const [changing, setChanging] = useState(false);

  // tracks whether the selection has ever changed from the initial default
  const [changed, setChanged] = useState(false);
  const isFirstRender = useRef(true);

  const current = trailers[active];

  /* =========================================
     CHANGE TRAILER
  ========================================= */

  const changeTrailer = (index) => {
    if (index === active || changing) return;

    setChanging(true);

    setTimeout(() => {
      setActive(index);
      setChanging(false);
    }, 280);
  };

  /* =========================================
     MARK AS "CHANGED" AFTER FIRST UPDATE
  ========================================= */

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setChanged(true);
  }, [active]);

  /* =========================================
     AUTO ROTATION
  ========================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((currentIndex) => {
        return currentIndex === trailers.length - 1
          ? 0
          : currentIndex + 1;
      });
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="featured-trailers" id="featured-trailers">
      <div className="featured-inner">

        {/* =================================
            SECTION HEADER
        ================================= */}

        <div className="featured-header">

          <div className="featured-label">
            <span>05</span>
            <i></i>
            FEATURED TRAILERS
          </div>

          <div className="featured-heading">

            <h2>
              Built to move.
              <br />
              <em>Ready to work.</em>
            </h2>

            <p>
              Explore professional mobile spaces designed
              for businesses, events and entrepreneurs.
            </p>

          </div>

        </div>


        {/* =================================
            FEATURED SHOWCASE
        ================================= */}

        <div
          className={`featured-showcase ${
            changing ? "featured-changing" : ""
          }`}
        >

          {/* IMAGE SIDE */}

          <div className="featured-visual">

            <div className="featured-image">

              <img
                key={current.image}
                src={current.image}
                alt={current.name}
              />

              <div className="featured-overlay"></div>


              {/* IMAGE TOP */}

              <div className="featured-image-top">

                <span>
                  Calvin's / 2026
                </span>

                <strong>
                  {current.id}
                </strong>

              </div>


              {/* IMAGE BOTTOM */}

              <div className="featured-image-bottom">

                <div className="featured-available">
                  <span></span>
                  AVAILABLE
                </div>

                <div className="featured-image-category">
                  {current.category}
                </div>

              </div>

            </div>


            {/* IMAGE SIDE NUMBER */}

            <div className="featured-big-number">
              {current.id}
            </div>

          </div>


          {/* DETAILS SIDE */}

          <div className="featured-details">

            <div className="featured-details-category">
              {current.category}
            </div>


            <h3>
              {current.name}
            </h3>


            <p className="featured-description">
              {current.description}
            </p>


            <div className="featured-location">
              <span>⌖</span>
              {current.location}
            </div>


            {/* PRICE */}

            <div className="featured-price">

              <span>
                FROM
              </span>

              <div>
                <strong>
                  {current.price}
                </strong>

                <small>
                  {current.period}
                </small>
              </div>

            </div>


            {/* FEATURES */}

            <div className="featured-features">

              {current.features.map((feature) => (
                <span key={feature}>
                  <b>✓</b>
                  {feature}
                </span>
              ))}

            </div>


            {/* ACTIONS */}

            <div className="featured-actions">

              <a
                href="#contact"
                className="featured-primary"
              >
                Book this trailer
                <span>↗</span>
              </a>

              <a
                href="#contact"
                className="featured-secondary"
              >
                View details
              </a>

            </div>

          </div>

        </div>


        {/* =================================
            TRAILER NAVIGATION
        ================================= */}

        <div className="featured-navigation">

          {trailers.map((trailer, index) => {
            const isSelected = active === index;
            const activeClass = isSelected
              ? changed
                ? "active-changed"
                : "active"
              : "";

            return (
              <button
                key={trailer.id}
                type="button"
                className={activeClass}
                onClick={() => changeTrailer(index)}
              >

                <span className="navigation-number">
                  {trailer.id}
                </span>

                <div className="navigation-content">

                  <strong>
                    {trailer.name}
                  </strong>

                  <small>
                    {trailer.category}
                  </small>

                </div>

                <span className="navigation-arrow">
                  ↗
                </span>

                <i></i>

              </button>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default FeaturedTrailers;
