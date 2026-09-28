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

import "./TrailersForSale.css";

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
    <div className="sale-dropdown" ref={wrapRef}>
      <button
        type="button"
        className="sale-select-wrap"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="sale-dropdown-label">{label}</span>
        <span className="sale-dropdown-value">
          {selected?.label || "Select"}
        </span>
        <ChevronDown size={14} className="sale-dropdown-chevron" />
      </button>

      {open && (
        <ul className="sale-dropdown-menu" role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`sale-dropdown-option ${
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
  const title = item?.title || item?.name || "Trailer for Sale";
  const description =
    item?.description || item?.summary || "Explore this trailer for sale.";
  const image = getTrailerImage(item);

  const goToDetails = () => {
    navigate(`/trailers-for-sale/${item.id}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToDetails();
    }
  };

  return (
    <article
      className="sale-trailer-card"
      onClick={goToDetails}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
    >
      {image && (
        <div className="sale-card-image">
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

      <div className="sale-card-face">
        <div className="sale-card-icon">
          <Icon size={22} strokeWidth={1.7} />
        </div>

        <div className="sale-card-content">
          <span className="sale-card-label">TRAILERS FOR SALE</span>
          <h3>{title}</h3>
          <p>{description}</p>
          <span className="sale-card-link">
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
      to={`/trailers-for-sale/size/${sizeNumber}`}
      className="sale-size-card"
    >
      <div className="sale-size-number">
        {sizeNumber}
        <span>FT</span>
      </div>

      <div className="sale-size-info">
        <h3>{size}</h3>
        <span>View Available Trailers</span>
      </div>

      <ArrowRight size={19} />
    </Link>
  );
}

/* =========================================================
   MAIN SALES PAGE COMPONENT
========================================================= */
export default function TrailersForSale() {
  const [allTrailers, setAllTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sizeFilter, setSizeFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    setError("");

    const saleCollection = collection(db, "trailers");
    const unsubscribe = onSnapshot(
      saleCollection,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAllTrailers(items);
        setLoading(false);
      },
      (firebaseError) => {
        console.error("Error loading sale trailers:", firebaseError);
        setError("Unable to load trailers for sale. Please try again.");
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
      <main className="trailers-sale-page">
        <div className="sale-container sale-loading">
          <div className="sale-loader"></div>
          <p>Loading trailers...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="trailers-sale-page">
        <div className="sale-container sale-error">
          <h2>Trailers for Sale</h2>
          <p>{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="sale-primary-btn"
          >
            Try Again
            <ArrowRight size={18} />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="trailers-sale-page">
      {/* HERO */}
      <section className="sale-hero">
        <div className="sale-container sale-hero-inner">
          <div className="sale-hero-copy">
            <span className="sale-eyebrow">
              CALVIN'S TOOLS INC. / TRAILERS FOR SALE
            </span>
            <h1>
              Trailers Built for
              <span>Your Business.</span>
            </h1>
            <p>
              Explore professionally built food, commercial, specialty, and custom
              trailers designed for businesses ready to take their operation on the road.
            </p>
            <div className="sale-hero-actions">
              <a href="#food-trailers" className="sale-primary-btn">
                Browse Trailers
                <ArrowRight size={18} />
              </a>
              <Link to="/get-a-quote" className="sale-secondary-btn">
                Get a Custom Quote
              </Link>
            </div>
          </div>

          <div
            className="sale-hero-stat"
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
            <div className="sale-hero-stat-top">
              <span className="sale-hero-tag">CALVIN'S TOOLS</span>
              <span className="sale-hero-count">
                {String(allTrailers.length).padStart(2, "0")} TRAILERS
              </span>
            </div>
            <div className="sale-hero-stat-bottom">
              <span className="sale-hero-tag">TRAILERS FOR SALE</span>
              <span className="sale-hero-pill">
                <i></i>
                IN STOCK
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="sale-search-section">
        <div className="sale-container sale-filters-row">
          <div className="sale-search-box">
            <Search size={20} />
            <input
              type="search"
              placeholder="Search food, BBQ, coffee, refrigerated..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search trailers for sale"
            />
          </div>

          <div className="sale-filter-selects">
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
                className="sale-clear-filters"
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
        <section className="sale-category-section" id="food-trailers">
          <div className="sale-container">
            <div className="sale-section-heading">
              <div>
                <span className="sale-eyebrow">01 / FOOD TRAILERS</span>
                <h2>Food Trailers for Sale</h2>
              </div>
              <p>
                From compact mobile kitchens to fully customized food
                businesses, explore trailer options designed for different
                menus, workflows, and business models.
              </p>
            </div>

            <div className="sale-card-grid">
              {filteredFood.length > 0 ? (
                filteredFood.map((item) => (
                  <TrailerCard key={item.id} item={item} />
                ))
              ) : (
                <div className="sale-no-results">
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
          className="sale-category-section sale-specialty"
          id="specialty-trailers"
        >
          <div className="sale-container">
            <div className="sale-section-heading">
              <div>
                <span className="sale-eyebrow">02 / SPECIALTY TRAILERS</span>
                <h2>Specialty & Commercial Trailers</h2>
              </div>
              <p>
                Explore specialized mobile spaces for refrigeration, retail,
                salons, hospitality, and other commercial applications.
              </p>
            </div>

            <div className="sale-card-grid">
              {filteredSpecialty.length > 0 ? (
                filteredSpecialty.map((item) => (
                  <TrailerCard key={item.id} item={item} />
                ))
              ) : (
                <div className="sale-no-results">
                  No specialty trailer categories match your filters.
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* NO RESULTS */}
      {noResultsAtAll && (
        <section className="sale-category-section">
          <div className="sale-container">
            <div className="sale-no-results sale-no-results-global">
              No trailers match your search and filters. Try adjusting your
              selection.
            </div>
          </div>
        </section>
      )}

      {/* SIZES SECTION */}
      <section className="sale-size-section">
        <div className="sale-container">
          <div className="sale-section-heading">
            <div>
              <span className="sale-eyebrow">03 / SHOP BY SIZE</span>
              <h2>Find Your Trailer Size</h2>
            </div>
            <p>
              Browse available trailers by length to find the right footprint
              for your equipment, menu, storage, and service requirements.
            </p>
          </div>

          <div className="sale-size-grid">
            {trailerSizes.map((size) => (
              <SizeCard key={size} size={size} />
            ))}
          </div>
        </div>
      </section>

      
    </main>
  );
}