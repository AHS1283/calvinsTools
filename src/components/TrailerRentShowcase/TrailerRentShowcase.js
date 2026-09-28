import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import "./TrailerRentShowcase.css";

/* =========================================================
   RENTAL CATEGORY DATA
========================================================= */

const RENTAL_CATEGORY_META = {
  food: {
    label: "FOOD TRAILERS",
    short: "FOOD",
    tag: "MOBILE KITCHEN",
    title: "Food Trailers",
    highlight: "ready when your business needs them.",
    description:
      "Professional food trailers available for businesses, events, catering and entrepreneurs who want the freedom to operate anywhere.",
    // Public assets folder se local image path
    image: "/assets/sale1.png",
  },

  specialty: {
    label: "SPECIALTY TRAILERS",
    short: "SPECIALTY",
    tag: "SPECIALTY RENTAL",
    title: "Specialty Trailers",
    highlight: "built for your next opportunity.",
    description:
      "Flexible specialty trailers for businesses, events and temporary operations that need professional mobile space.",
    // Public assets folder se local image path
    image: "/assets/sale2.png",
  },

  custom: {
    label: "CUSTOM TRAILERS",
    short: "CUSTOM",
    tag: "CUSTOM RENTAL",
    title: "Custom Trailers",
    highlight: "flexible for the way you work.",
    description:
      "Rent a trailer designed around your business needs, with the space and flexibility to keep your operation moving.",
    // Public assets folder se local image path
    image: "/assets/sale3.png",
  },
};

const RENTAL_CATEGORIES = ["food", "specialty", "custom"];

/* =========================================================
   CATEGORY LINKS

   Every category goes to TrailerRental page,
   but directly to its relevant section.
========================================================= */

const getRentalCategoryLink = (category) => {
  switch (category) {
    case "food":
      return "/trailerrental#food-trailers";

    case "specialty":
      return "/trailerrental#specialty-trailers";

    case "custom":
      return "/trailerrental#custom-trailers";

    default:
      return "/trailerrental";
  }
};

/* =========================================================
   COMPONENT
========================================================= */

function TrailerRentShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rentalTrailers, setRentalTrailers] = useState([]);

  /* =======================================================
     FIRESTORE
  ======================================================= */

  useEffect(() => {
    const rentalRef = collection(db, "rentalTrailers");

    const unsubscribe = onSnapshot(
      rentalRef,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRentalTrailers(data);
      },
      (error) => {
        console.error(
          "Error loading rental trailers:",
          error
        );
      }
    );

    return () => unsubscribe();
  }, []);

  /* =======================================================
     BUILD RENTAL ITEMS
  ======================================================= */

  const rentalItems = RENTAL_CATEGORIES.map(
    (category, index) => {
      const meta = RENTAL_CATEGORY_META[category];

      const firebaseItem = rentalTrailers.find(
        (item) =>
          String(item.category || "").toLowerCase() ===
          category
      );

      return {
        id: `${category}-rental`,

        number: String(index + 1).padStart(2, "0"),

        category: meta.label,

        short: meta.short,

        title: meta.title,

        highlight: meta.highlight,

        description: meta.description,

        image:
          firebaseItem?.images?.[0] ||
          firebaseItem?.image ||
          meta.image,

        tag: meta.tag,

        /* -----------------------------------------------
           IMPORTANT:
           Each category opens its own section
           on TrailerRental page.
        ------------------------------------------------ */

        link: getRentalCategoryLink(category),

        cta: `Explore ${meta.title}`,
      };
    }
  );

  const current =
    rentalItems[activeIndex] || rentalItems[0];

  /* =======================================================
     HANDLE CATEGORY CLICK
  ======================================================= */

  const handleExploreRental = (event) => {
    event.preventDefault();

    const target =
      current?.link || "/trailerrental";

    window.location.href = target;
  };

  /* =======================================================
     HANDLE ALL RENTALS
     
     No hash here = page opens from TOP.
  ======================================================= */

  const handleExploreAll = (event) => {
    event.preventDefault();

    window.location.href = "/trailerrental";
  };

  /* =======================================================
     EMPTY SAFETY
  ======================================================= */

  if (!current) {
    return null;
  }

  return (
    <section
      className="rental-solutions-section"
      id="trailers-for-rent"
    >
      <div className="rental-solutions-wrapper">

        {/* INTRO */}
        <div className="rental-intro">
          <span className="rental-intro-label">
            05 TRAILERS FOR RENT
          </span>

          <h2 className="rental-intro-title">
            Need a trailer?{" "}
            <span>Rent instead.</span>
          </h2>

          <p className="rental-intro-text">
            Professional trailers ready for your business,
            event or next opportunity. Choose what you need
            and get moving.
          </p>
        </div>

        {/* CATEGORY SELECTOR */}
        <div className="rental-selector">
          <div className="rental-selector-heading">
            RENTAL OPTIONS
          </div>

          <div className="rental-selector-list">
            {rentalItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`rental-selector-item ${
                  index === activeIndex
                    ? "is-active"
                    : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="rental-selector-number">
                  {item.number}
                </span>

                <span className="rental-selector-name">
                  {item.short}
                </span>

                <span className="rental-selector-arrow">
                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.7}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT SHOWCASE */}
        <div className="rental-product">

          {/* IMAGE */}
          <div className="rental-product-image-wrap">
            <div className="rental-product-image-label">
              <span>{current.number}</span>
              <span>{current.tag}</span>
            </div>

            <div className="rental-product-image-box">
              <img
                src={current.image}
                alt={current.title}
                className="rental-product-image"
              />
            </div>

            <div className="rental-product-image-caption">
              AVAILABLE FOR RENT
            </div>
          </div>

          {/* CONTENT */}
          <div className="rental-product-content">
            <span className="rental-product-category">
              {current.category}
            </span>

            <h3 className="rental-product-title">
              {current.title}
            </h3>

            <h4 className="rental-product-highlight">
              {current.highlight}
            </h4>

            <p className="rental-product-description">
              {current.description}
            </p>

            <a
              href={current.link}
              className="rental-product-cta"
              onClick={handleExploreRental}
            >
              <span>{current.cta}</span>

              <span
                className="rental-product-cta-arrow"
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

        {/* EXPLORE ALL */}
        <div className="rental-showcase-bottom">
          <p>
            Looking for something specific?
          </p>

          <a
            href="/trailerrental"
            className="explore-all-rentals"
            onClick={handleExploreAll}
          >
            <span>
              Explore All Rental Trailers
            </span>

            <ArrowUpRight
              size={18}
              strokeWidth={1.8}
            />
          </a>
        </div>

      </div>
    </section>
  );
}

export default TrailerRentShowcase;