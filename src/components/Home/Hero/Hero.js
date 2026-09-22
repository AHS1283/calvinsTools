import React, { useEffect, useState, useRef } from "react";
import {
 
} from "lucide-react";
import "./Hero.css";

const AUTO_ROTATE_MS = 5000;

const trailers = [
  {
    id: "food",
    number: "01",
    type: "FOOD",
    title: "Food Trailer",
    eyebrow: "MOBILE BUSINESS",
    description:
      "A professional mobile kitchen built for food businesses, catering and events.",
    image: "/assets/food_image.png",
    tags: ["Food", "Events", "Catering"],
    route: "/trailers/rent?category=food",
  },
  {
    id: "beauty",
    number: "02",
    type: "Speciality Trailer",
    title: "Nail Salon Trailer",
    eyebrow: "MOBILE STUDIO",
    description:
      "A refined mobile beauty studio for nail services, appointments and events.",
    image: "/assets/nail_image.png",
    tags: ["Beauty", "Nails", "Studio"],
    route: "/trailers/rent?category=beauty",
  },
  {
    id: "retail",
    number: "03",
    type: "RETAIL",
    title: "Retail Trailer",
    eyebrow: "MOBILE STORE",
    description:
      "A flexible mobile retail space made for pop-ups, exhibitions and events.",
    image: "/assets/retail_image.png",
    tags: ["Retail", "Pop-Up", "Events"],
    route: "/trailers/rent?category=retail",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const timerRef = useRef(null);
  const changeTimeoutRef = useRef(null);

  const activeTrailer = trailers[activeIndex];

  /*
   * =========================================================
   * CHANGE TRAILER
   * =========================================================
   */
  const changeTrailer = (index) => {
    if (
      index === activeIndex ||
      isChanging ||
      index < 0 ||
      index >= trailers.length
    ) {
      return;
    }

    setIsChanging(true);

    if (changeTimeoutRef.current) {
      clearTimeout(changeTimeoutRef.current);
    }

    changeTimeoutRef.current = setTimeout(() => {
      setActiveIndex(index);
      setIsChanging(false);
    }, 180);
  };

  /*
   * =========================================================
   * NEXT TRAILER
   * =========================================================
   */
  // const nextTrailer = () => {
  //   const nextIndex =
  //     (activeIndex + 1) % trailers.length;

  //   changeTrailer(nextIndex);
  // };

  /*
   * =========================================================
   * PREVIOUS TRAILER
   * =========================================================
   */
  // const previousTrailer = () => {
  //   const previousIndex =
  //     (activeIndex - 1 + trailers.length) %
  //     trailers.length;

  //   changeTrailer(previousIndex);
  // };

  /*
   * =========================================================
   * AUTO ROTATION
   *
   * This only changes the Hero trailer.
   * It does NOT scroll the page.
   * =========================================================
   */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        return (prev + 1) % trailers.length;
      });
    }, AUTO_ROTATE_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  /*
   * =========================================================
   * CLEANUP CHANGE TIMEOUT
   * =========================================================
   */
  useEffect(() => {
    return () => {
      if (changeTimeoutRef.current) {
        clearTimeout(changeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      className="rento-hero"
      id="home"
    >
      <div className="rento-hero-container">

        {/* ===================================================
            TRAILER TYPE SWITCHER (rounded shadow container)
            =================================================== */}
        <div className="rento-type-switcher">
          {trailers.map((trailer, index) => (
            <button
              key={trailer.id}
              className={
                index === activeIndex
                  ? "rento-type-btn active"
                  : "rento-type-btn"
              }
              onClick={() => changeTrailer(index)}
              type="button"
            >
              <span className="type-number">
                {trailer.number}
              </span>

              <span className="type-title">
                {trailer.type}
              </span>

              {index === activeIndex && (
                <span
                  className="type-progress"
                  key={activeIndex}
                  style={{
                    animationDuration:
                      `${AUTO_ROTATE_MS}ms`,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ===================================================
            SUB HEADER / TRAILER COUNTER
            =================================================== */}
        <div className="rento-hero-subheader">
          <span className="rento-subheader-label">
            FEATURED TRAILERS
          </span>

          <div className="rento-counter">
            <span>
              {activeTrailer.number}
            </span>

            <i>/</i>

            <span>03</span>
          </div>
        </div>

        {/* ===================================================
            MAIN SHOWCASE
            =================================================== */}
        <div className="rento-showcase">

          {/* =================================================
              IMAGE
              ================================================= */}
          <div
            className={`rento-image-wrapper ${
              isChanging ? "is-changing" : ""
            }`}
          >
            <div className="rento-image-frame">
              <img
                src={activeTrailer.image}
                alt={activeTrailer.title}
                className="rento-trailer-image"
              />
            </div>

            <div className="rento-image-number">
              {activeTrailer.number}
            </div>
          </div>

          {/* =================================================
              CONTENT
              ================================================= */}
          <div className="rento-content">

            <div className="rento-category">
              {activeTrailer.eyebrow}
            </div>

            <h1>
              {activeTrailer.title}
            </h1>

            <p>
              {activeTrailer.description}
            </p>

            <div className="rento-content-bottom">

              {/* TAGS */}
              <div className="rento-tags">
                {activeTrailer.tags.map((tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* EXPLORE */}
              {/* <a
                href={activeTrailer.route}
                className="rento-explore-btn"
              >
                <span>Explore</span>

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.5}
                />
              </a> */}

            </div>
          </div>
        </div>

        {/* ===================================================
            BOTTOM CONTROLS
            =================================================== */}
        <div className="rento-bottom">
          <div className="rento-controls">

            {/* <button
              onClick={previousTrailer}
              aria-label="Previous trailer"
              type="button"
            >
              <ChevronLeft
                size={19}
                strokeWidth={1.4}
              />
            </button> */}
{/* 
            <button
              onClick={nextTrailer}
              aria-label="Next trailer"
              type="button"
            >
              <ChevronRight
                size={19}
                strokeWidth={1.4}
              />
            </button> */}

          </div>
        </div>

      </div>
    </section>
  );
}
