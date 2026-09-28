import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./FeaturedTrailers.css";

const featuredOptions = [
  {
    id: "01",
    key: "sale",
    category: "TRAILERS FOR SALE",
    name: "Ready to launch.",
    highlight: "Built for business.",
    description:
      "Explore professional food and specialty trailers built for entrepreneurs, caterers, events, and growing businesses.",
    image: "/assets/food_trailer.png",
    label: "READY TO BUY",
    buttonText: "View Trailers for Sale",
    buttonLink: "/trailers-for-sale",
  },

  {
    id: "02",
    key: "rent",
    category: "TRAILERS FOR RENT",
    name: "Business on demand.",
    highlight: "Rent. Serve. Grow.",
    description:
      "Flexible trailer rental options for events, catering, pop-ups, seasonal businesses, and short-term operations.",
    image: "/assets/food_trailer.png",
    label: "AVAILABLE TO RENT",
    buttonText: "View Trailers for Rent",
    buttonLink: "/trailers-for-rent",
  },

  {
    id: "03",
    key: "custom",
    category: "CUSTOM TRAILERS",
    name: "Designed around.",
    highlight: "Your business.",
    description:
      "Create a trailer around your exact requirements with custom layouts, equipment, finishes, branding, and floor plans.",
    image: "/assets/retail_trailer.png",
    label: "CUSTOM BUILD",
    buttonText: "Start Your Custom Build",
    buttonLink: "/custom-trailers",
  },
];

function FeaturedTrailers() {
  const [active, setActive] = useState(0);
  const [changing, setChanging] = useState(false);
  const [changed, setChanged] = useState(false);

  const changeTimer = useRef(null);
  const isFirstRender = useRef(true);

  const current = featuredOptions[active];

  const changeTrailer = (index) => {
    if (index === active || changing) return;

    if (changeTimer.current) {
      clearTimeout(changeTimer.current);
    }

    setChanging(true);

    changeTimer.current = setTimeout(() => {
      setActive(index);
      setChanging(false);
    }, 220);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setChanged(true);

    const timer = setTimeout(() => {
      setChanged(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((currentIndex) =>
        currentIndex === featuredOptions.length - 1
          ? 0
          : currentIndex + 1
      );
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (changeTimer.current) {
        clearTimeout(changeTimer.current);
      }
    };
  }, []);

  return (
    <section
      className="featured-trailers"
      id="featured-trailers"
      aria-labelledby="featured-title"
    >
      <div className="featured-inner">

        {/* HEADER */}
        <div className="featured-header">

          <div className="featured-label">
            <span>05</span>
            <i></i>
            EXPLORE YOUR OPTIONS
          </div>

          <div className="featured-heading">
            <h2 id="featured-title">
              Buy it.
              <br />
              <em>Rent it. Build it.</em>
            </h2>

            <p>
              Choose the trailer solution that fits your
              business and your next move.
            </p>
          </div>

        </div>

        {/* SHOWCASE */}
        <div
          className={`featured-showcase ${
            changing ? "featured-changing" : ""
          }`}
        >

          {/* IMAGE */}
          <div className="featured-visual">

            <div className="featured-image">

              <img
                key={current.image}
                src={current.image}
                alt={`${current.category} by Calvin's Tools`}
              />

              <div className="featured-overlay"></div>

              <div className="featured-image-top">
                <span>CALVIN'S / 2026</span>
                <strong>{current.id}</strong>
              </div>

              <div className="featured-image-bottom">

                <div className="featured-available">
                  <span></span>
                  {current.label}
                </div>

                <div className="featured-image-category">
                  {current.category}
                </div>

              </div>

            </div>

          </div>

          {/* DETAILS */}
          <div className="featured-details">

            <div className="featured-details-category">
              {current.category}
            </div>

            <h3>
              {current.name}
              <br />
              <em>{current.highlight}</em>
            </h3>

            <p className="featured-description">
              {current.description}
            </p>

            <Link
              to={current.buttonLink}
              className="featured-primary"
            >
              <span>{current.buttonText}</span>

              <ArrowUpRight
                size={18}
                strokeWidth={1.7}
              />
            </Link>

          </div>

        </div>

        {/* NAVIGATION */}
        <div
          className="featured-navigation"
          role="tablist"
          aria-label="Trailer options"
        >

          {featuredOptions.map((option, index) => {

            const isSelected = active === index;

            const activeClass = isSelected
              ? changed
                ? "active-changed"
                : "active"
              : "";

            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={activeClass}
                onClick={() => changeTrailer(index)}
              >

                <span className="navigation-number">
                  {option.id}
                </span>

                <div className="navigation-content">

                  <strong>
                    {option.category}
                  </strong>

                  <small>
                    {option.key === "sale" &&
                      "READY TO BUY"}

                    {option.key === "rent" &&
                      "FLEXIBLE RENTAL"}

                    {option.key === "custom" &&
                      "BUILT TO ORDER"}
                  </small>

                </div>

                <span className="navigation-arrow">
                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.7}
                  />
                </span>

              </button>
            );
          })}

        </div>

        {/* PROGRESS */}
        <div className="featured-progress">

          <div className="featured-progress-line">
            <span
              style={{
                width: `${
                  ((active + 1) /
                    featuredOptions.length) *
                  100
                }%`,
              }}
            />
          </div>

          <div className="featured-progress-info">
            <span>
              {current.id} / 03
            </span>

            <span>
              CALVIN'S TOOLS
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default FeaturedTrailers;