
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

import {
  ArrowRight,
  ChevronDown,
  Search,
  Utensils,
  Flame,
  ChefHat,
  Snowflake,
  Truck,
  CalendarDays,
  Clock3,
} from "lucide-react";

import "./TrailersForRent.css";

const ICONS = {
  Utensils,
  Flame,
  ChefHat,
  Snowflake,
  Truck,
};

/* =========================================================
   RENTAL CATEGORIES
========================================================= */

const rentalCategories = [
  {
    key: "food trailer",
    title: "Food Trailers",
    description:
      "Flexible food trailer rentals for catering, events, pop-ups and food businesses.",
    icon: Utensils,
  },
  {
    key: "bbq",
    title: "BBQ Trailers",
    description:
      "Professional BBQ trailer setups for events, catering and outdoor service.",
    icon: Flame,
  },
  {
    key: "mobile kitchen",
    title: "Mobile Kitchens",
    description:
      "Practical mobile kitchen trailers for temporary and commercial operations.",
    icon: ChefHat,
  },
  {
    key: "refrigerated",
    title: "Refrigerated Trailers",
    description:
      "Temperature-controlled trailers for food, beverages, storage and events.",
    icon: Snowflake,
  },
];

const typeFilterOptions = [
  {
    label: "All Types",
    value: "all",
  },
  ...rentalCategories.map((category) => ({
    label: category.title,
    value: category.key,
  })),
];

const sizeOptions = [
  {
    label: "All Sizes",
    value: "all",
  },
  {
    label: "14 FT",
    value: "14 FT",
  },
  {
    label: "16 FT",
    value: "16 FT",
  },
  {
    label: "20 FT",
    value: "20 FT",
  },
];

const rentalSteps = [
  {
    number: "01",
    icon: Truck,
    title: "Choose Your Trailer",
    description:
      "Browse available rental trailers and choose the setup that fits your operation.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Select Your Dates",
    description:
      "Choose the rental dates you need and send us your booking request.",
  },
  {
    number: "03",
    icon: Clock3,
    title: "Reserve & Prepare",
    description:
      "Complete your reservation and get your trailer ready for business.",
  },
];

/* =========================================================
   CUSTOM DROPDOWN
========================================================= */

function RentFilterDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        wrapRef.current &&
        !wrapRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const selected = options.find(
    (option) => option.value === value
  );

  return (
    <div className="rent-dropdown" ref={wrapRef}>
      <button
        type="button"
        className="rent-select-wrap"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="rent-dropdown-label">
          {label}
        </span>

        <span className="rent-dropdown-value">
          {selected?.label}
        </span>

        <ChevronDown
          size={14}
          className="rent-dropdown-chevron"
        />
      </button>

      {open && (
        <ul
          className="rent-dropdown-menu"
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`rent-dropdown-option${
                option.value === value
                  ? " is-selected"
                  : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* =========================================================
   TRAILER CARD
========================================================= */

function RentalTrailerCard({ trailer }) {
  const navigate = useNavigate();
  const Icon =
    ICONS[trailer.icon] || Utensils;

  const [flipped, setFlipped] = useState(false);

  const goToDetails = () => {
    navigate(
      `/trailers-for-rent/${trailer.slug}`
    );
  };

  const handleActivate = () => {
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none)").matches;

    if (isTouch && !flipped) {
      setFlipped(true);
      return;
    }

    goToDetails();
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      handleActivate();
    }
  };

  return (
    <article
      className={`rent-trailer-card${
        flipped ? " is-flipped" : ""
      }`}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${trailer.name}`}
    >
      <div className="rent-card-inner">

        {/* FRONT */}
        <div className="rent-card-face rent-card-front">

          <div className="rent-card-icon">
            <Icon
              size={22}
              strokeWidth={1.7}
            />
          </div>

          <div className="rent-card-content">

            <span className="rent-card-label">
              {trailer.category}
            </span>

            <h3>{trailer.name}</h3>

            <p>{trailer.description}</p>

            <div className="rent-card-meta">

              <span>{trailer.size}</span>

              <span className="rent-card-price">
                {trailer.daily}
                <small> / day</small>
              </span>

            </div>

            <span className="rent-card-link">
              View Details
              <ArrowRight size={17} />
            </span>

          </div>
        </div>

        {/* BACK */}
        <div className="rent-card-face rent-card-back">

          <div className="rent-card-icon rent-card-icon-back">
            <Icon
              size={22}
              strokeWidth={1.7}
            />
          </div>

          <h3>{trailer.name}</h3>

          <div className="rent-back-pricing">

            <div>
              <span>WEEKEND</span>
              <strong>{trailer.weekend}</strong>
            </div>

            <div>
              <span>WEEKLY</span>
              <strong>{trailer.weekly}</strong>
            </div>

            <div>
              <span>MONTHLY</span>
              <strong>{trailer.monthly}</strong>
            </div>

          </div>

          <div className="rent-back-equipment">
            {Array.isArray(trailer.equipment) &&
              trailer.equipment.map((item) => (
                <small key={item}>
                  {item}
                </small>
              ))}
          </div>

          <Link
            to={`/rent-trailer?trailer=${trailer.slug}`}
            className="rent-back-btn"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <CalendarDays size={16} />
            Book Now
          </Link>

        </div>
      </div>
    </article>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function TrailersForRent() {
  const [rentalTrailers, setRentalTrailers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [activeCategory, setActiveCategory] =
    useState("all");

  const [sizeFilter, setSizeFilter] =
    useState("all");

  /* =======================================================
     FIREBASE RENTAL TRAILERS
  ======================================================= */

  useEffect(() => {
    const rentalRef = collection(
      db,
      "rentalTrailers"
    );

    const unsubscribe = onSnapshot(
      rentalRef,
      (snapshot) => {
        const items = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

        setRentalTrailers(items);
        setLoading(false);
      },
      (error) => {
        console.error(
          "Error loading rental trailers:",
          error
        );

        setRentalTrailers([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  /* =======================================================
     FILTER TRAILERS
  ======================================================= */

  const filteredTrailers = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    return rentalTrailers.filter(
      (trailer) => {
        const name =
          trailer.name || "";

        const category =
          trailer.category || "";

        const description =
          trailer.description || "";

        const size =
          trailer.size || "";

        const equipment =
          Array.isArray(trailer.equipment)
            ? trailer.equipment
            : [];

        const matchesSearch =
          !value ||
          name
            .toLowerCase()
            .includes(value) ||
          category
            .toLowerCase()
            .includes(value) ||
          description
            .toLowerCase()
            .includes(value) ||
          size
            .toLowerCase()
            .includes(value) ||
          equipment.some((item) =>
            String(item)
              .toLowerCase()
              .includes(value)
          );

        const matchesCategory =
          activeCategory === "all" ||
          trailer.categoryKey ===
            activeCategory;

        const matchesSize =
          sizeFilter === "all" ||
          size === sizeFilter;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesSize
        );
      }
    );
  }, [
    rentalTrailers,
    search,
    activeCategory,
    sizeFilter,
  ]);

  /* =======================================================
     ACTIVE FILTER CHECK
  ======================================================= */

  const hasActiveFilters =
    activeCategory !== "all" ||
    sizeFilter !== "all" ||
    search.trim() !== "";

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearAllFilters = () => {
    setSearch("");
    setActiveCategory("all");
    setSizeFilter("all");
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main className="trailers-rent-page">
        <div
          className="rent-container"
          style={{
            padding: "80px 0",
          }}
        >
          Loading rental trailers...
        </div>
      </main>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="trailers-rent-page">

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="rent-hero">

        <div className="rent-container rent-hero-inner">

          {/* HERO COPY */}
          <div className="rent-hero-copy">

            <span className="rent-eyebrow">
              CALVIN'S TOOLS INC. / TRAILERS FOR RENT
            </span>

            <h1>
              Rent the Right Trailer.
              <span>
                Keep Business Moving.
              </span>
            </h1>

            <p className="rent-hero-description">
              Flexible trailer rentals for food
              businesses, catering, events,
              pop-ups, temporary kitchens and
              commercial operations.
            </p>

            <div className="rent-hero-actions">

              <a
                href="#rental-inventory"
                className="rent-primary-button"
              >
                View Rental Inventory
                <ArrowRight size={18} />
              </a>

              <Link
                to="/contact"
                className="rent-secondary-button"
              >
                Ask About Rental
              </Link>

            </div>

          </div>

          {/* HERO IMAGE */}
          <div className="rent-hero-visual">

            <div className="rent-hero-image">

              {/* PUBLIC/ASSETS IMAGE */}
              <img
                src="/assets/renttrailerimage.png"
                alt="Trailer available for rent"
              />

              <div className="rent-image-overlay" />

              <div className="rent-image-top">

                <span>
                  CALVIN'S TOOLS
                </span>

                <strong>
                  01 / 04
                </strong>

              </div>

              <div className="rent-image-bottom">

                <span>
                  TRAILER RENTALS
                </span>

                <span className="rent-status">
                  <i />
                  AVAILABLE NOW
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          SEARCH + FILTERS
      =================================================== */}

      <section className="rent-search-section">

        <div className="rent-container rent-filters-row">

          <div className="rent-search-box">

            <Search size={20} />

            <input
              type="search"
              placeholder="Search rental trailers..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              aria-label="Search rental trailers"
            />

          </div>

          <div className="rent-filter-selects">

            <RentFilterDropdown
              label="Type"
              options={typeFilterOptions}
              value={activeCategory}
              onChange={setActiveCategory}
            />

            <RentFilterDropdown
              label="Size"
              options={sizeOptions}
              value={sizeFilter}
              onChange={setSizeFilter}
            />

            {hasActiveFilters && (
              <button
                type="button"
                className="rent-clear-filters"
                onClick={
                  clearAllFilters
                }
              >
                Clear Filters
              </button>
            )}

          </div>

        </div>

      </section>

      {/* ===================================================
          CATEGORIES
      =================================================== */}

      <section className="rent-categories">

        <div className="rent-container">

          <div className="rent-section-heading">

            <div>

              <span className="rent-eyebrow">
                01 / RENTAL OPTIONS
              </span>

              <h2>
                Find a Trailer
                <em>
                  {" "}
                  for Your Operation.
                </em>
              </h2>

            </div>

            <p>
              Browse rental options by trailer
              type and choose the setup that
              fits your business, event or
              temporary operation.
            </p>

          </div>

          <div className="rent-category-grid">

            {/* ALL */}
            <button
              type="button"
              className={
                activeCategory === "all"
                  ? "rent-category-card active"
                  : "rent-category-card"
              }
              onClick={() =>
                setActiveCategory("all")
              }
            >

              <span className="rent-category-number">
                00
              </span>

              <div className="rent-category-icon">
                <Truck
                  size={21}
                  strokeWidth={1.7}
                />
              </div>

              <div>

                <h3>
                  All Rental Trailers
                </h3>

                <p>
                  View all currently available
                  rental trailer options.
                </p>

              </div>

              <ArrowRight
                className="rent-category-arrow"
                size={18}
              />

            </button>

            {/* CATEGORIES */}
            {rentalCategories.map(
              (category, index) => {
                const Icon =
                  category.icon;

                return (
                  <button
                    type="button"
                    key={category.key}
                    className={
                      activeCategory ===
                      category.key
                        ? "rent-category-card active"
                        : "rent-category-card"
                    }
                    onClick={() =>
                      setActiveCategory(
                        category.key
                      )
                    }
                  >

                    <span className="rent-category-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <div className="rent-category-icon">
                      <Icon
                        size={21}
                        strokeWidth={1.7}
                      />
                    </div>

                    <div>

                      <h3>
                        {category.title}
                      </h3>

                      <p>
                        {category.description}
                      </p>

                    </div>

                    <ArrowRight
                      className="rent-category-arrow"
                      size={18}
                    />

                  </button>
                );
              }
            )}

          </div>

        </div>

      </section>

      {/* ===================================================
          INVENTORY
      =================================================== */}

      <section
        className="rent-inventory"
        id="rental-inventory"
      >

        <div className="rent-container">

          <div className="rent-inventory-header">

            <div>

              <span className="rent-eyebrow">
                02 / AVAILABLE RENTALS
              </span>

              <h2>
                Rental Inventory,
                <em>
                  {" "}
                  Ready When You Are.
                </em>
              </h2>

            </div>

            <p>
              Choose your trailer, review
              the rental options and reserve
              the dates that work for your
              business.
            </p>

          </div>

          <div className="rent-trailer-grid">

            {filteredTrailers.length > 0 ? (
              filteredTrailers.map(
                (trailer) => (
                  <RentalTrailerCard
                    key={trailer.id}
                    trailer={trailer}
                  />
                )
              )
            ) : (
              <div className="rent-empty">

                <Search size={30} />

                <h3>
                  No trailers found
                </h3>

                <p>
                  Try another search or
                  browse all rental trailers.
                </p>

                <button
                  type="button"
                  onClick={
                    clearAllFilters
                  }
                >
                  View All Rentals
                </button>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* ===================================================
          PROCESS
      =================================================== */}

      <section className="rent-process">

        <div className="rent-container">

          <div className="rent-process-heading">

            <span className="rent-eyebrow">
              03 / HOW RENTING WORKS
            </span>

            <h2>
              Simple From
              <em>
                {" "}
                Start to Finish.
              </em>
            </h2>

          </div>

          <div className="rent-process-grid">

            {rentalSteps.map((step) => {

              const Icon =
                step.icon;

              return (
                <div
                  className="rent-process-card"
                  key={step.number}
                >

                  <span>
                    {step.number}
                  </span>

                  <Icon
                    size={22}
                    strokeWidth={1.5}
                  />

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* ===================================================
          CTA
      =================================================== */}

      <section className="rent-cta">

        <div className="rent-container">

          <div className="rent-cta-inner">

            <div>

              <span className="rent-eyebrow">
                NEED A TRAILER FOR YOUR NEXT PROJECT?
              </span>

              <h2>
                Let's Get Your
                <em>
                  {" "}
                  Business Moving.
                </em>
              </h2>

              <p>
                Tell us what you need and our
                team will help you find the
                right rental trailer for your
                operation.
              </p>

            </div>

            <div className="rent-cta-actions">

              <Link
                to="/contact"
                className="rent-primary-button"
              >
                Contact Calvin's Tools
                <ArrowRight size={18} />
              </Link>

              <a
                href="#rental-inventory"
                className="rent-secondary-button"
              >
                Browse Rentals
              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
