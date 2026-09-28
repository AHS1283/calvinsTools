import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import "./TrailerSolutions.css";

const solutions = {
  food: {
    number: "01",
    category: "FOOD TRAILERS",
    short: "FOOD",
    title: "Turn your idea",
    highlight: "into a mobile business.",
    description:
      "Professional food trailers designed for kitchens, catering, events, pop-ups and businesses ready to serve customers anywhere.",
    image: "/assets/food_trailer.png",
    tag: "MOBILE KITCHEN",
    link: "/trailers-for-sale",
    cta: "Explore Food Trailers",
  },

  specialty: {
    number: "02",
    category: "SPECIALTY TRAILERS",
    short: "SPECIALTY",
    title: "Build beyond",
    highlight: "the traditional business.",
    description:
      "Purpose-built trailers for refrigeration, beauty services, mobile retail, hospitality and specialized commercial businesses.",
    image: "/assets/nail_trailer.png",
    tag: "SPECIALTY BUSINESS",
    link: "/trailers-for-sale",
    cta: "Explore Specialty Trailers",
  },

  custom: {
    number: "03",
    category: "CUSTOM TRAILERS",
    short: "CUSTOM",
    title: "Designed around",
    highlight: "the way you work.",
    description:
      "Create a trailer around your exact business requirements with custom layouts, equipment, finishes, branding and floor plans.",
    image: "/assets/retail_trailer.png",
    tag: "CUSTOM BUILD",
    link: "/custom-trailers",
    cta: "Build Your Trailer",
  },
};

const solutionKeys = Object.keys(solutions);

function TrailerSolutions() {
  const [active, setActive] = useState("food");
  const [changing, setChanging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [changed, setChanged] = useState(false);

  const isFirstRender = useRef(true);
  const changeTimer = useRef(null);

  const current = solutions[active];

  const changeSolution = (type) => {
    if (type === active || changing) return;

    setChanging(true);

    if (changeTimer.current) {
      clearTimeout(changeTimer.current);
    }

    changeTimer.current = setTimeout(() => {
      setActive(type);
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
    if (isPaused) return;

    const timer = setInterval(() => {
      setActive((currentActive) => {
        const index = solutionKeys.indexOf(currentActive);

        return solutionKeys[(index + 1) % solutionKeys.length];
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    return () => {
      if (changeTimer.current) {
        clearTimeout(changeTimer.current);
      }
    };
  }, []);

  const handleExplore = (event) => {
    event.preventDefault();

    window.location.href = current.link;
  };

  return (
    <section
      className="solutions-section"
      id="trailers"
      aria-labelledby="solutions-title"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="solutions-wrapper">

        {/* INTRO */}
        <div className="solutions-intro">
          <div className="solutions-intro-label">
            <span>04</span>

            <div className="label-line" />

            TRAILER SOLUTIONS
          </div>

          <div className="solutions-intro-content">
            <div>
              <h2 id="solutions-title">
                Built to move.
                <br />
                <span>Ready to grow.</span>
              </h2>
            </div>

            <p>
              Mobile spaces for businesses ready to work, grow and meet
              customers beyond a fixed location.
            </p>
          </div>
        </div>

        {/* SELECTOR */}
        <div className="solutions-selector">
          <div className="selector-heading">
            OUR
            <br />
            TRAILERS
          </div>

          <div
            className="selector-options"
            role="tablist"
            aria-label="Trailer categories"
          >
            {solutionKeys.map((key) => {
              const item = solutions[key];
              const isSelected = active === key;

              const activeClass = isSelected
                ? changed
                  ? "active-changed"
                  : "active"
                : "";

              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`solution-panel-${key}`}
                  className={`selector-item ${activeClass}`}
                  onClick={() => changeSolution(key)}
                >
                  <span className="selector-badge">
                    {item.number}
                  </span>

                  <span className="selector-name">
                    {item.short}
                  </span>

                  <span
                    className="selector-arrow"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PRODUCT */}
        <div
          id={`solution-panel-${active}`}
          className={`solution-product ${
            changing ? "changing" : ""
          }`}
          role="tabpanel"
        >

          {/* INDEX */}
          <div className="product-index">
            <span>CALVIN'S</span>

            <strong>{current.number}</strong>

            <small>/03</small>
          </div>

          {/* IMAGE */}
          <div className="product-image-wrap">
            <div className="product-image">
              <img
                key={current.image}
                src={current.image}
                alt={`${current.category} by Calvin's Tools`}
                loading="lazy"
              />

              <div className="product-image-shade" />

              <div className="product-image-label">
                {current.tag}
              </div>

              <div
                className="product-image-corner"
                aria-hidden="true"
              >
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.8}
                />
              </div>
            </div>

            <div className="product-caption">
              <span>MOBILE BUSINESS</span>

              <span>
                {current.number} / 03
              </span>
            </div>
          </div>

          {/* CONTENT */}
          <div className="product-content">
            <div className="product-category">
              {current.category}
            </div>

            <h3>
              {current.title}
              <br />
              <em>{current.highlight}</em>
            </h3>

            <p>{current.description}</p>

            <a
              href={current.link}
              className="product-cta"
              onClick={handleExplore}
            >
              <span>{current.cta}</span>

              <span
                className="product-cta-arrow"
                aria-hidden="true"
              >
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.8}
                />
              </span>
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="solutions-bottom">
          <div className="solutions-progress">
            {solutionKeys.map((key) => (
              <span
                key={key}
                className={
                  active === key
                    ? "progress-dot active"
                    : "progress-dot"
                }
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default TrailerSolutions;