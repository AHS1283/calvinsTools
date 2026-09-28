
import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Hero.css";

const AUTO_ROTATE_MS = 5000;

const trailers = [
  {
    id: "food",
    number: "01",
    type: "FOOD TRAILERS",
    title: "Food Trailers",
    eyebrow: "FOOD TRAILERS",
    description:
      "Professional food trailers designed for different menus, kitchens, catering operations, events, and growing food businesses.",
    image: "/assets/food_image.png",
    tags: [
      "Custom Food",
      "Mobile Kitchen",
      "BBQ Food",
      "Pizza",
      "Coffee",
      "Dessert",
      "Ice Cream",
      "Donut",
      "Taco",
      "Smoker",
      "Small Food",
      "Mini Food",
    ],
    route: "/trailers-for-sale",
    buttonText: "Explore Food Trailers",
  },

  {
    id: "specialty",
    number: "02",
    type: "SPECIALTY TRAILERS",
    title: "Specialty Trailers",
    eyebrow: "SPECIALTY TRAILERS",
    description:
      "Purpose-built specialty trailers for refrigeration, beauty services, mobile retail, hospitality, and specialized commercial needs.",
    image: "/assets/nail_image.png",
    tags: [
      "Refrigerated",
      "Nail Salon",
      "Mobile Retail",
      "Mobile Bar",
      "Custom Commercial",
    ],
    route: "/trailers-for-sale",
    buttonText: "Explore Specialty Trailers",
  },

  {
    id: "custom",
    number: "03",
    type: "CUSTOM TRAILERS",
    title: "Custom Trailers",
    eyebrow: "CUSTOM TRAILERS",
    description:
      "Build a trailer around your business with custom layouts, equipment, finishes, branding, and floor plans designed for your exact requirements.",
    image: "/assets/retail_image.png",
    tags: [
      "Custom Food Trailers",
      "Custom Commercial Trailers",
      "Build Your Trailer",
      "Floor Plans & Layouts",
    ],
    route: "/custom-trailers",
    buttonText: "Explore Custom Trailers",
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
   * AUTO ROTATION
   * =========================================================
   */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trailers.length);
    }, AUTO_ROTATE_MS);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  /*
   * =========================================================
   * CLEANUP
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
    <section className="rento-hero" id="home">
      <div className="rento-hero-container">

        {/* ===================================================
            MAIN TRAILER TYPE SWITCHER
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
                    animationDuration: `${AUTO_ROTATE_MS}ms`,
                  }}
                />
              )}
            </button>
          ))}
        </div>

        

        {/* ===================================================
            MAIN SHOWCASE
        =================================================== */}
        <div className="rento-showcase">

          {/* IMAGE */}
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

          {/* CONTENT */}
          <div className="rento-content">

            <div className="rento-category">
              {activeTrailer.eyebrow}
            </div>

            <h1>{activeTrailer.title}</h1>

            <p>{activeTrailer.description}</p>

            {/* RELATED CATEGORIES */}
            <div className="rento-content-bottom">

              <div className="rento-tags">
                {activeTrailer.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              {/* EXPLORE BUTTON */}
              <Link
                to={activeTrailer.route}
                className="rento-explore-btn"
              >
                <span>{activeTrailer.buttonText}</span>

                <ArrowUpRight
                  size={17}
                  strokeWidth={1.6}
                />
              </Link>

            </div>
          </div>
        </div>

        {/* ===================================================
            BOTTOM
        =================================================== */}
        <div className="rento-bottom">
          <div className="rento-controls" />
        </div>

      </div>
    </section>
  );
}
