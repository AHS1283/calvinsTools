import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowUpRight } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import "./TrailerShowcase.css";

/* =========================================================
   TRAILER CATEGORY DATA
========================================================= */

const CATEGORY_META = {
  food: {
    label: "FOOD TRAILERS",
    short: "FOOD",
    tag: "MOBILE KITCHEN",
    title: "Food Trailers",
    highlight: "built for business on the move.",
    description:
      "Professional food trailers designed for restaurants, catering, events, pop-ups and entrepreneurs ready to take their business anywhere.",
    // Public assets folder se local image path
    image: "/assets/rent1.png",
  },

  specialty: {
    label: "SPECIALTY TRAILERS",
    short: "SPECIALTY",
    tag: "SPECIALTY BUSINESS",
    title: "Specialty Trailers",
    highlight: "made for your unique business.",
    description:
      "Purpose-built specialty trailers created for mobile businesses, services, events and unique commercial operations.",
    // Public assets folder se local image path
    image: "/assets/rent2.png",
  },

  custom: {
    label: "CUSTOM TRAILERS",
    short: "CUSTOM",
    tag: "BUILT YOUR WAY",
    title: "Custom Trailers",
    highlight: "designed around your vision.",
    description:
      "Fully customizable trailers built around your business needs, layout, equipment, branding and the way you want to work.",
    // Public assets folder se local image path
    image: "/assets/rent3.png",
  },
};

/* =========================================================
   AVAILABLE CATEGORIES
========================================================= */

const TRAILER_CATEGORIES = [
  "food",
  "specialty",
  "custom",
];

/* =========================================================
   CATEGORY LINKS
========================================================= */

const getCategoryLink = (category) => {
  if (category === "food") {
    return "/trailers-for-sale#food-trailers";
  }

  if (category === "specialty") {
    return "/trailers-for-sale#specialty-trailers";
  }

  return "/trailers-for-sale";
};

/* =========================================================
   COMPONENT
========================================================= */

function TrailerShowcase() {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [changing, setChanging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [changed, setChanged] = useState(false);

  const isFirstRender = useRef(true);
  const changeTimer = useRef(null);

  /* =======================================================
     FIREBASE DATA
  ======================================================= */

  useEffect(() => {
    const trailersRef = collection(db, "trailers");

    const unsubscribe = onSnapshot(
      trailersRef,
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTrailers(items);
        setLoading(false);
      },
      (error) => {
        console.error(
          "Error loading trailers:",
          error
        );

        setTrailers([]);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  /* =======================================================
     PREPARE ONLY 3 CATEGORIES
     (same simple exact-match pattern as TrailerRentShowcase)
  ======================================================= */

  const items = useMemo(() => {
    return TRAILER_CATEGORIES.map(
      (category, index) => {
        const meta = CATEGORY_META[category];

        const firebaseItem = trailers.find(
          (item) =>
            String(item.category || "")
              .toLowerCase()
              .trim() === category
        );

        return {
          id: `${category}-trailer`,

          number: String(index + 1).padStart(
            2,
            "0"
          ),

          category: meta.label,

          short: meta.short,

          title: meta.title,

          highlight: meta.highlight,

          description:
            firebaseItem?.description ||
            meta.description,

          /*
            Firestore images array first,
            then a single image field,
            then local fallback image
          */
          image:
            firebaseItem?.images?.[0] ||
            firebaseItem?.image ||
            meta.image,

          tag: meta.tag,

          link: getCategoryLink(category),

          cta: `Explore ${meta.title}`,
        };
      }
    );
  }, [trailers]);

  /* =======================================================
     CURRENT ITEM
  ======================================================= */

  const total = items.length;

  const current =
    items[activeIndex] || items[0];

  /* =======================================================
     CHANGE TRAILER
  ======================================================= */

  const changeSolution = (index) => {
    if (
      index === activeIndex ||
      changing ||
      index < 0 ||
      index >= total
    ) {
      return;
    }

    setChanging(true);

    if (changeTimer.current) {
      clearTimeout(changeTimer.current);
    }

    changeTimer.current = setTimeout(() => {
      setActiveIndex(index);
      setChanging(false);
    }, 220);
  };

  /* =======================================================
     ACTIVE CHANGE ANIMATION
  ======================================================= */

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setChanged(true);

    const timer = setTimeout(() => {
      setChanged(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [activeIndex]);

  /* =======================================================
     AUTO SLIDER
  ======================================================= */

  useEffect(() => {
    if (
      isPaused ||
      total <= 1
    ) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        return (prev + 1) % total;
      });
    }, 3500);

    return () => {
      clearInterval(timer);
    };
  }, [isPaused, total]);

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (changeTimer.current) {
        clearTimeout(changeTimer.current);
      }
    };
  }, []);

  /* =======================================================
     EXPLORE
  ======================================================= */

  const handleExplore = (event) => {
    event.preventDefault();

    if (!current?.link) {
      return;
    }

    window.location.href = current.link;
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <section
        className="solutions-section"
        id="trailers"
      >
        <div className="solutions-wrapper">
          <p style={{ padding: "40px 0" }}>
            Loading trailers...
          </p>
        </div>
      </section>
    );
  }

  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <section
      className="solutions-section"
      id="trailers"
      aria-labelledby="solutions-title"
      onMouseEnter={() =>
        setIsPaused(true)
      }
      onMouseLeave={() =>
        setIsPaused(false)
      }
    >
      <div className="solutions-wrapper">

        {/* INTRO */}
        <div className="solutions-intro">
          <div className="solutions-intro-label">
            <span>03</span>
            <div className="label-line" />
            TRAILERS FOR SALE
          </div>

          <div className="solutions-intro-content">
            <div>
              <h2 id="solutions-title">
                Built to move.
                <br />
                <span>
                  Ready to grow.
                </span>
              </h2>
            </div>

            <p>
              Mobile spaces for businesses
              ready to work, grow and meet
              customers beyond a fixed
              location.
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
            {items.map(
              (item, index) => {
                const isSelected =
                  activeIndex === index;

                const activeClass =
                  isSelected
                    ? changed
                      ? "active-changed"
                      : "active"
                    : "";

                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    id={`solution-tab-${index}`}
                    aria-selected={
                      isSelected
                    }
                    aria-controls={`solution-panel-${index}`}
                    className={`selector-item ${activeClass}`}
                    onClick={() =>
                      changeSolution(index)
                    }
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
              }
            )}
          </div>
        </div>

        {/* PRODUCT */}
        <div
          id={`solution-panel-${activeIndex}`}
          className={`solution-product ${
            changing
              ? "changing"
              : ""
          }`}
          role="tabpanel"
          aria-labelledby={`solution-tab-${activeIndex}`}
        >
          {/* INDEX */}
          <div className="product-index">
            <span>
              CALVIN'S
            </span>

            <strong>
              {current.number}
            </strong>

            <small>
              /03
            </small>
          </div>

          {/* IMAGE */}
          <div className="product-image-wrap">
            <div className="product-image">
              <img
                key={current.image}
                src={current.image}
                alt={`${current.category} by Calvin's Tools`}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src =
                    CATEGORY_META.food.image;
                }}
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
              <span>
                MOBILE BUSINESS
              </span>

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

              <em>
                {current.highlight}
              </em>
            </h3>

            <p>
              {current.description}
            </p>

            <a
              href={current.link}
              className="product-cta"
              onClick={
                handleExplore
              }
            >
              <span>
                {current.cta}
              </span>

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
          <a
            href="/trailers-for-sale"
            className="explore-all-trailers"
          >
            <span>Explore All Trailers</span>

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

export default TrailerShowcase;
