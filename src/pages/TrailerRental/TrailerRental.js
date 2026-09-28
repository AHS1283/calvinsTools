import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

import {
  ArrowRight,
  ChevronDown,
  Search,
  Utensils,
  Snowflake,
  Store,
  Coffee,
  Flame,
  IceCream,
  Truck,
} from "lucide-react";

import "./TrailerRental.css";

/* =========================================================
   ICONS MAP
========================================================= */
const ICONS = {
  Utensils,
  Snowflake,
  Store,
  Coffee,
  Flame,
  IceCream,
  Truck,
};

/* =========================================================
   HERO ASSETS & OPTIONS
========================================================= */
const HERO_IMAGE = "/assets/trailerssale.png";

const trailerSizes = [
  "10 FT Food Trailers",
  "12 FT Food Trailers",
  "14 FT Food Trailers",
  "16 FT Food Trailers",
  "20 FT Food Trailers",
  "22 FT Food Trailers",
];

const sizeOptions = [
  { label: "All Sizes", value: "all" },
  { label: "10 FT", value: "10" },
  { label: "12 FT", value: "12" },
  { label: "14 FT", value: "14" },
  { label: "16 FT", value: "16" },
  { label: "20 FT", value: "20" },
  { label: "22 FT", value: "22" },
];

const typeOptions = [
  { label: "All Types", value: "all" },
  { label: "Food Trailers", value: "food" },
  { label: "Specialty Trailers", value: "specialty" },
];

/* =========================================================
   HELPERS
========================================================= */
const getTrailerSizes = (item) => {
  if (Array.isArray(item?.sizes)) {
    return item.sizes.map((size) => String(size));
  }
  if (typeof item?.sizes === "string") {
    return item.sizes
      .split(",")
      .map((size) => size.trim())
      .filter(Boolean);
  }
  if (item?.size) {
    return [String(item.size)];
  }
  return [];
};

const getTrailerImage = (item) => {
  if (item?.image) return item.image;
  if (item?.imageUrl) return item.imageUrl;
  if (Array.isArray(item?.images) && item.images.length > 0) return item.images[0];
  if (typeof item?.images === "string") return item.images;
  return "";
};

/* =========================================================
   FILTER DROPDOWN COMPONENT
========================================================= */
function FilterDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
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
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selected = options.find((option) => option.value === value);

  return (
    <div className="rent-dropdown" ref={wrapRef}>
      <button
        type="button"
        className="rent-select-wrap"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="rent-dropdown-label">{label}</span>
        <span className="rent-dropdown-value">
          {selected?.label || "Select"}
        </span>
        <ChevronDown size={14} className="rent-dropdown-chevron" />
      </button>

      {open && (
        <ul className="rent-dropdown-menu" role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`rent-dropdown-option ${
                option.value === value ? "is-selected" : ""
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
   TRAILER CARD COMPONENT
========================================================= */
function TrailerCard({ item }) {
  const navigate = useNavigate();
  const Icon = ICONS[item?.icon] || Utensils;
  const title = item?.title || item?.name || "Rental Trailer";
  const description =
    item?.description || item?.summary || "Explore this trailer rental option.";
  const image = getTrailerImage(item);

  const goToDetails = () => {
    navigate(`/trailers-for-rent/${item.id}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToDetails();
    }
  };

  return (
    <article
      className="rent-trailer-card"
      onClick={goToDetails}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
    >
      {image && (
        <div className="rent-card-image">
          <img
            src={image}
            alt={title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}

      <div className="rent-card-face rent-card-front">
        <div className="rent-card-icon">
          <Icon size={22} strokeWidth={1.7} />
        </div>

        <div className="rent-card-content">
          <span className="rent-card-label">TRAILERS FOR RENT</span>
          <h3>{title}</h3>
          <p>{description}</p>
          <span className="rent-card-link">
            Explore Trailer
            <ArrowRight size={17} />
          </span>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   SIZE CARD COMPONENT
========================================================= */
function SizeCard({ size }) {
  const sizeNumber = String(size).split(" ")[0];

  return (
    <Link
      to={`/trailers-for-rent/size/${sizeNumber}`}
      className="rent-size-card"
    >
      <div className="rent-size-number">
        {sizeNumber}
        <span>FT</span>
      </div>

      <div className="rent-size-info">
        <h3>{size}</h3>
        <span>View Available Trailers</span>
      </div>

      <ArrowRight size={19} />
    </Link>
  );
}

/* =========================================================
   MAIN RENTAL PAGE COMPONENT
========================================================= */
export default function TrailerRental() {
  const [allTrailers, setAllTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    setError("");

    const rentalCollection = collection(db, "rentalTrailers");
    const unsubscribe = onSnapshot(
      rentalCollection,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllTrailers(items);
        setLoading(false);
      },
      (firebaseError) => {
        console.error("Error loading rental trailers:", firebaseError);
        setError("Unable to load rental trailers. Please try again.");
        setAllTrailers([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;
    const hash = window.location.hash;
    if (!hash) return;

    const timer = setTimeout(() => {
      try {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } catch (scrollError) {
        console.error("Invalid hash:", scrollError);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [loading]);

  const foodTrailers = useMemo(() => {
    return allTrailers.filter(
      (trailer) => String(trailer?.category || "").toLowerCase() === "food"
    );
  }, [allTrailers]);

  const specialtyTrailers = useMemo(() => {
    return allTrailers.filter(
      (trailer) => String(trailer?.category || "").toLowerCase() === "specialty"
    );
  }, [allTrailers]);

  const filteredFood = useMemo(() => {
    if (typeFilter === "specialty") return [];
    const value = search.trim().toLowerCase();

    return foodTrailers.filter((item) => {
      const title = String(item?.title || item?.name || "").toLowerCase();
      const description = String(
        item?.description || item?.summary || ""
      ).toLowerCase();
      const category = String(item?.category || "").toLowerCase();

      const matchesSearch =
        !value ||
        title.includes(value) ||
        description.includes(value) ||
        category.includes(value);

      const itemSizes = getTrailerSizes(item);
      const matchesSize =
        sizeFilter === "all" ||
        itemSizes.some((size) =>
          String(size).toLowerCase().includes(sizeFilter.toLowerCase())
        );

      return matchesSearch && matchesSize;
    });
  }, [foodTrailers, search, typeFilter, sizeFilter]);

  const filteredSpecialty = useMemo(() => {
    if (typeFilter === "food") return [];
    const value = search.trim().toLowerCase();

    return specialtyTrailers.filter((item) => {
      const title = String(item?.title || item?.name || "").toLowerCase();
      const description = String(
        item?.description || item?.summary || ""
      ).toLowerCase();
      const category = String(item?.category || "").toLowerCase();

      const matchesSearch =
        !value ||
        title.includes(value) ||
        description.includes(value) ||
        category.includes(value);

      const itemSizes = getTrailerSizes(item);
      const matchesSize =
        sizeFilter === "all" ||
        itemSizes.some((size) =>
          String(size).toLowerCase().includes(sizeFilter.toLowerCase())
        );

      return matchesSearch && matchesSize;
    });
  }, [specialtyTrailers, search, typeFilter, sizeFilter]);

  const showFoodSection = typeFilter !== "specialty";
  const showSpecialtySection = typeFilter !== "food";
  const noResultsAtAll =
    allTrailers.length > 0 &&
    filteredFood.length === 0 &&
    filteredSpecialty.length === 0;

  if (loading) {
    return (
      <main className="trailers-rent-page">
        <div className="rent-container rent-loading">
          <div className="rent-loader"></div>
          <p>Loading rental trailers...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="trailers-rent-page">
        <div className="rent-container rent-error">
          <h2>Rental Trailers</h2>
          <p>{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rent-primary-btn"
          >
            Try Again
            <ArrowRight size={18} />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="trailers-rent-page">
      {/* HERO */}
      <section className="rent-hero">
        <div className="rent-container rent-hero-inner">
          <div className="rent-hero-copy">
            <span className="rent-eyebrow">
              CALVIN'S TOOLS INC. / TRAILERS FOR RENT
            </span>
            <h1>
              Rent the Right Trailer.
              <span>Keep Business Moving.</span>
            </h1>
            <p>
              Flexible food, commercial, specialty, and custom trailer rentals
              designed for businesses, events, and temporary operations.
            </p>
            <div className="rent-hero-actions">
              <a href="#food-trailers" className="rent-primary-btn">
                Browse Rentals
                <ArrowRight size={18} />
              </a>
              <Link to="/contact" className="rent-secondary-btn">
                Ask About Rental
              </Link>
            </div>
          </div>

          <div
            className="rent-hero-stat"
            style={{
              backgroundImage: `
                linear-gradient(
                  180deg,
                  rgba(17, 17, 17, 0.10) 0%,
                  rgba(17, 17, 17, 0.35) 55%,
                  rgba(17, 17, 17, 0.88) 100%
                ),
                url("${HERO_IMAGE}")
              `,
            }}
          >
            <div className="rent-hero-stat-top">
              <span className="rent-hero-tag">CALVIN'S TOOLS</span>
              <span className="rent-hero-count">
                {String(allTrailers.length).padStart(2, "0")} RENTALS
              </span>
            </div>
            <div className="rent-hero-stat-bottom">
              <span className="rent-hero-tag">TRAILERS FOR RENT</span>
              <span className="rent-hero-pill">
                <i></i>
                AVAILABLE NOW
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="rent-search-section">
        <div className="rent-container rent-filters-row">
          <div className="rent-search-box">
            <Search size={20} />
            <input
              type="search"
              placeholder="Search food, BBQ, coffee, refrigerated..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search trailers for rent"
            />
          </div>

          <div className="rent-filter-selects">
            <FilterDropdown
              label="Type"
              options={typeOptions}
              value={typeFilter}
              onChange={setTypeFilter}
            />
            <FilterDropdown
              label="Size"
              options={sizeOptions}
              value={sizeFilter}
              onChange={setSizeFilter}
            />
            {(typeFilter !== "all" || sizeFilter !== "all" || search) && (
              <button
                type="button"
                className="rent-clear-filters"
                onClick={() => {
                  setTypeFilter("all");
                  setSizeFilter("all");
                  setSearch("");
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FOOD SECTION */}
      {showFoodSection && (
        <section className="rent-category-section" id="food-trailers">
          <div className="rent-container">
            <div className="rent-section-heading">
              <div>
                <span className="rent-eyebrow">01 / FOOD TRAILERS</span>
                <h2>Food Trailers for Rent</h2>
              </div>
              <p>
                From compact mobile kitchens to fully equipped setups, explore
                rental trailer options designed for different menus, workflows,
                and business models.
              </p>
            </div>

            <div className="rent-card-grid">
              {filteredFood.length > 0 ? (
                filteredFood.map((item) => (
                  <TrailerCard key={item.id} item={item} />
                ))
              ) : (
                <div className="rent-no-results">
                  No food trailer categories match your filters.
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* SPECIALTY SECTION */}
      {showSpecialtySection && (
        <section
          className="rent-category-section rent-specialty"
          id="specialty-trailers"
        >
          <div className="rent-container">
            <div className="rent-section-heading">
              <div>
                <span className="rent-eyebrow">02 / SPECIALTY TRAILERS</span>
                <h2>Specialty & Commercial Rentals</h2>
              </div>
              <p>
                Explore specialized mobile spaces for refrigeration, retail,
                salons, hospitality, and other commercial applications, available
                for rent.
              </p>
            </div>

            <div className="rent-card-grid">
              {filteredSpecialty.length > 0 ? (
                filteredSpecialty.map((item) => (
                  <TrailerCard key={item.id} item={item} />
                ))
              ) : (
                <div className="rent-no-results">
                  No specialty trailer categories match your filters.
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* NO RESULTS */}
      {noResultsAtAll && (
        <section className="rent-category-section">
          <div className="rent-container">
            <div className="rent-no-results rent-no-results-global">
              No trailers match your search and filters. Try adjusting your
              selection.
            </div>
          </div>
        </section>
      )}

      {/* SIZES SECTION */}
      <section className="rent-size-section">
        <div className="rent-container">
          <div className="rent-section-heading">
            <div>
              <span className="rent-eyebrow">03 / SHOP BY SIZE</span>
              <h2>Find Your Trailer Size</h2>
            </div>
            <p>
              Browse available rental trailers by length to find the right
              footprint for your equipment, menu, storage, and service
              requirements.
            </p>
          </div>

          <div className="rent-size-grid">
            {trailerSizes.map((size) => (
              <SizeCard key={size} size={size} />
            ))}
          </div>
        </div>
      </section>

     
     
    </main>
  );
}