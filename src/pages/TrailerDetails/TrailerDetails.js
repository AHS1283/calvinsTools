import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useParams,
  Link,
  useLocation,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../firebase";

import "./TrailerDetails.css";


// =====================================================
// STATIC TRAILER DATA
// =====================================================

const trailerData = {
  "custom-food-trailers": {
    category: "Food Trailers",
    title: "Custom Food Trailers",
    subtitle: "Built Around Your Business",
    description:
      "Purpose-built food trailers designed around your menu, equipment, workflow, storage, service requirements, and business goals.",
    image: "/assets/food_trailer.png",
    price: "Starting at $25,000",
    rentPrice: "$350 / day",
    size: "Custom",
    features: [
      "Custom kitchen layout",
      "Commercial cooking equipment",
      "Refrigeration options",
      "Water & plumbing systems",
      "Electrical configuration",
      "Serving windows",
      "Storage solutions",
      "Exterior branding",
    ],
  },

  "mobile-kitchen-trailers": {
    category: "Food Trailers",
    title: "Mobile Kitchen Trailers",
    subtitle: "Professional Mobile Kitchen",
    description:
      "Professional mobile kitchen trailers designed for catering, events, food businesses, and high-volume service.",
    image: "/assets/food_trailer.png",
    price: "Starting at $22,000",
    rentPrice: "$325 / day",
    size: "12–22 FT",
    features: [
      "Commercial kitchen setup",
      "Prep counters",
      "Cooking equipment",
      "Refrigeration",
      "Storage",
      "Electrical system",
      "Water system",
      "Serving window",
    ],
  },

  "bbq-food-trailers": {
    category: "Food Trailers",
    title: "BBQ Food Trailers",
    subtitle: "Built for BBQ Businesses",
    description:
      "Heavy-duty BBQ food trailers designed for smokers, preparation, cooking, storage, and efficient customer service.",
    image: "/assets/food_trailer.png",
    price: "Starting at $24,000",
    rentPrice: "$350 / day",
    size: "14–22 FT",
    features: [
      "BBQ cooking setup",
      "Smoker configuration",
      "Prep area",
      "Commercial refrigeration",
      "Storage",
      "Serving window",
      "Electrical system",
      "Water system",
    ],
  },

  "pizza-trailers": {
    category: "Food Trailers",
    title: "Pizza Trailers",
    subtitle: "Made for Mobile Pizza",
    description:
      "Mobile pizza trailers designed for preparation, cooking, storage, and fast customer service.",
    image: "/assets/food_trailer.png",
    price: "Starting at $23,000",
    rentPrice: "$325 / day",
    size: "12–20 FT",
    features: [
      "Pizza oven configuration",
      "Preparation counters",
      "Refrigeration",
      "Ingredient storage",
      "Serving window",
      "Electrical system",
      "Water system",
      "Custom branding",
    ],
  },

  "coffee-trailers": {
    category: "Food Trailers",
    title: "Coffee Trailers",
    subtitle: "Compact Coffee Business",
    description:
      "Compact mobile coffee trailers designed for cafes, events, markets, festivals, and high-volume beverage service.",
    image: "/assets/food_trailer.png",
    price: "Starting at $20,000",
    rentPrice: "$300 / day",
    size: "10–16 FT",
    features: [
      "Coffee equipment setup",
      "Counter space",
      "Refrigeration",
      "Water system",
      "Electrical system",
      "Storage",
      "Service window",
      "Branding options",
    ],
  },

  "dessert-trailers": {
    category: "Food Trailers",
    title: "Dessert Trailers",
    subtitle: "Built for Sweet Businesses",
    description:
      "Flexible dessert trailers designed for bakeries, sweet shops, events, festivals, and mobile businesses.",
    image: "/assets/food_trailer.png",
    price: "Starting at $21,000",
    rentPrice: "$300 / day",
    size: "10–16 FT",
    features: [
      "Prep area",
      "Display area",
      "Refrigeration",
      "Storage",
      "Electrical system",
      "Water system",
      "Service window",
      "Custom branding",
    ],
  },

  "ice-cream-trailers": {
    category: "Food Trailers",
    title: "Ice Cream Trailers",
    subtitle: "Mobile Ice Cream Business",
    description:
      "Mobile ice cream trailers designed for convenient service, refrigeration, storage, and efficient customer flow.",
    image: "/assets/food_trailer.png",
    price: "Starting at $21,500",
    rentPrice: "$300 / day",
    size: "10–16 FT",
    features: [
      "Commercial refrigeration",
      "Freezer configuration",
      "Service counter",
      "Storage",
      "Electrical system",
      "Water system",
      "Serving window",
      "Branding options",
    ],
  },

  "donut-trailers": {
    category: "Food Trailers",
    title: "Donut Trailers",
    subtitle: "Fresh Donuts on the Road",
    description:
      "Mobile donut trailers with practical layouts for preparation, cooking, display, and customer service.",
    image: "/assets/food_trailer.png",
    price: "Starting at $22,000",
    rentPrice: "$325 / day",
    size: "12–16 FT",
    features: [
      "Donut preparation area",
      "Cooking equipment",
      "Display counter",
      "Refrigeration",
      "Storage",
      "Electrical system",
      "Water system",
      "Service window",
    ],
  },

  "taco-trailers": {
    category: "Food Trailers",
    title: "Taco Trailers",
    subtitle: "Built for Taco Businesses",
    description:
      "Purpose-built taco trailers designed around preparation, cooking, refrigeration, storage, and service.",
    image: "/assets/food_trailer.png",
    price: "Starting at $22,000",
    rentPrice: "$325 / day",
    size: "12–20 FT",
    features: [
      "Cooking equipment",
      "Prep counters",
      "Refrigeration",
      "Ingredient storage",
      "Water system",
      "Electrical system",
      "Serving window",
      "Custom branding",
    ],
  },

  "smoker-trailers": {
    category: "Food Trailers",
    title: "Smoker Trailers",
    subtitle: "Heavy-Duty BBQ Solution",
    description:
      "Heavy-duty mobile smoker trailer solutions for BBQ professionals, caterers, restaurants, and events.",
    image: "/assets/food_trailer.png",
    price: "Starting at $25,000",
    rentPrice: "$375 / day",
    size: "16–22 FT",
    features: [
      "Heavy-duty smoker",
      "BBQ preparation area",
      "Cooking equipment",
      "Storage",
      "Commercial refrigeration",
      "Electrical system",
      "Water system",
      "Custom configuration",
    ],
  },

  "small-food-trailers": {
    category: "Food Trailers",
    title: "Small Food Trailers",
    subtitle: "Compact Business Setup",
    description:
      "Compact food trailers for businesses looking for an efficient mobile setup with a smaller footprint.",
    image: "/assets/food_trailer.png",
    price: "Starting at $18,000",
    rentPrice: "$275 / day",
    size: "10–12 FT",
    features: [
      "Compact kitchen",
      "Prep counter",
      "Cooking equipment",
      "Storage",
      "Electrical system",
      "Water system",
      "Serving window",
      "Custom layout",
    ],
  },

  "mini-food-trailers": {
    category: "Food Trailers",
    title: "Mini Food Trailers",
    subtitle: "Simple & Efficient",
    description:
      "Smaller mobile food solutions designed for simple menus, events, pop-ups, and new businesses.",
    image: "/assets/food_trailer.png",
    price: "Starting at $16,000",
    rentPrice: "$250 / day",
    size: "8–10 FT",
    features: [
      "Compact setup",
      "Basic cooking equipment",
      "Storage",
      "Electrical system",
      "Water system",
      "Service counter",
      "Serving window",
      "Custom branding",
    ],
  },

  "refrigerated-trailers": {
    category: "Specialty Trailers",
    title: "Refrigerated Trailers",
    subtitle: "Reliable Mobile Refrigeration",
    description:
      "Mobile refrigeration solutions designed for temperature-sensitive products and commercial applications.",
    image: "/assets/food_trailer.png",
    price: "Starting at $24,000",
    rentPrice: "$350 / day",
    size: "12–22 FT",
    features: [
      "Commercial refrigeration",
      "Temperature control",
      "Insulated interior",
      "Storage system",
      "Electrical system",
      "Heavy-duty flooring",
      "Lighting",
      "Security features",
    ],
  },

  "nail-salon-trailers": {
    category: "Specialty Trailers",
    title: "Nail Salon Trailers",
    subtitle: "Beauty Services on Wheels",
    description:
      "Professional mobile salon spaces designed for beauty professionals and mobile service businesses.",
    image: "/assets/food_trailer.png",
    price: "Starting at $28,000",
    rentPrice: "$375 / day",
    size: "16–22 FT",
    features: [
      "Salon workstations",
      "Water system",
      "Electrical system",
      "Storage",
      "Lighting",
      "Customer seating",
      "Ventilation",
      "Custom interior",
    ],
  },

  "mobile-retail-trailers": {
    category: "Specialty Trailers",
    title: "Mobile Retail Trailers",
    subtitle: "Your Store on Wheels",
    description:
      "Flexible mobile retail spaces for brands, pop-ups, markets, events, and traveling businesses.",
    image: "/assets/food_trailer.png",
    price: "Starting at $24,000",
    rentPrice: "$325 / day",
    size: "12–22 FT",
    features: [
      "Retail shelving",
      "Display areas",
      "Customer counter",
      "Electrical system",
      "Lighting",
      "Storage",
      "Service window",
      "Custom branding",
    ],
  },

  "mobile-bar-trailers": {
    category: "Specialty Trailers",
    title: "Mobile Bar Trailers",
    subtitle: "Built for Hospitality",
    description:
      "Customizable mobile bar spaces designed for events, hospitality businesses, and private functions.",
    image: "/assets/food_trailer.png",
    price: "Starting at $26,000",
    rentPrice: "$375 / day",
    size: "14–22 FT",
    features: [
      "Custom bar counter",
      "Refrigeration",
      "Storage",
      "Water system",
      "Electrical system",
      "Lighting",
      "Service windows",
      "Custom finishes",
    ],
  },

  "custom-commercial-trailers": {
    category: "Specialty Trailers",
    title: "Custom Commercial Trailers",
    subtitle: "Built Around Your Operation",
    description:
      "Commercial trailer solutions built around specialized business requirements and workflows.",
    image: "/assets/food_trailer.png",
    price: "Request a Quote",
    rentPrice: "Rental Available",
    size: "Custom",
    features: [
      "Custom floor plan",
      "Specialized equipment",
      "Electrical system",
      "Plumbing",
      "Storage",
      "Commercial finishes",
      "Branding",
      "Custom exterior",
    ],
  },
};


// =====================================================
// SLUG HELPER
// =====================================================

function makeSlug(text = "") {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


// =====================================================
// SIZE + PRICE HELPERS
// =====================================================

const SIZE_STEP = 2;
const BUY_PRICE_PER_FOOT = 750;
const RENT_PRICE_PER_FOOT = 15;

function parseSizeRange(sizeStr = "") {
  const match = String(sizeStr).match(
    /(\d+)\s*[–-]\s*(\d+)\s*([A-Za-z]*)/
  );

  if (!match) {
    return null;
  }

  const min = parseInt(match[1], 10);
  const max = parseInt(match[2], 10);
  const unit = match[3] || "FT";

  if (
    Number.isNaN(min) ||
    Number.isNaN(max) ||
    min >= max
  ) {
    return null;
  }

  return {
    min,
    max,
    unit,
  };
}

function buildSizeOptions(sizeStr) {
  const range = parseSizeRange(sizeStr);

  if (!range) {
    return [
      {
        label: sizeStr || "Custom",
        value: null,
      },
    ];
  }

  const {
    min,
    max,
    unit,
  } = range;

  const options = [];

  for (
    let value = min;
    value < max;
    value += SIZE_STEP
  ) {
    options.push({
      label: `${value} ${unit}`,
      value,
    });
  }

  options.push({
    label: `${max} ${unit}`,
    value: max,
  });

  return options;
}

function parsePriceAmount(priceStr = "") {
  const match = String(priceStr).match(/[\d,]+/);

  if (!match) {
    return null;
  }

  return parseInt(
    match[0].replace(/,/g, ""),
    10
  );
}

function scalePriceForSize(
  priceStr,
  range,
  selectedValue,
  perFootIncrement
) {
  const baseAmount = parsePriceAmount(priceStr);

  if (
    baseAmount === null ||
    !range ||
    selectedValue === null ||
    selectedValue === undefined
  ) {
    return priceStr;
  }

  const extraFeet = Math.max(
    0,
    selectedValue - range.min
  );

  const scaledAmount =
    baseAmount +
    extraFeet * perFootIncrement;

  return priceStr.replace(
    /[\d,]+/,
    scaledAmount.toLocaleString("en-US")
  );
}


// =====================================================
// COMPONENT
// =====================================================

export default function TrailerDetails() {
  const { slug } = useParams();

  const location = useLocation();


  // ===================================================
  // SCROLL TO TOP
  // ===================================================

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);


  // ===================================================
  // AUTOMATIC SALE / RENT DETECTION
  // ===================================================

  const isRentalPage =
    location.pathname.startsWith(
      "/trailers-for-rent"
    );

  const backPath = isRentalPage
    ? "/trailers-for-rent"
    : "/trailers-for-sale";


  // ===================================================
  // FIREBASE TRAILER
  // ===================================================

  const [firebaseTrailer, setFirebaseTrailer] =
    useState(null);

  const [firebaseLoading, setFirebaseLoading] =
    useState(false);


  // ===================================================
  // LOAD DATA
  // ===================================================

  useEffect(() => {
    let cancelled = false;

    const loadTrailer = async () => {
      try {
        setFirebaseLoading(true);

        const collectionName =
          isRentalPage
            ? "rentalTrailers"
            : "trailers";

        const snapshot = await getDocs(
          collection(
            db,
            collectionName
          )
        );

        let found = null;

        snapshot.forEach((doc) => {
          const data = doc.data();

          const title =
            data.title ||
            data.name ||
            "";

          const currentSlug =
            data.slug ||
            doc.id ||
            makeSlug(title);

          if (
            currentSlug === slug ||
            doc.id === slug ||
            makeSlug(title) === slug
          ) {
            found = {
              id: doc.id,
              ...data,
              slug: currentSlug,
            };
          }
        });

        if (!cancelled) {
          setFirebaseTrailer(found);
          setFirebaseLoading(false);
        }
      } catch (error) {
        console.error(
          "Error loading trailer:",
          error
        );

        if (!cancelled) {
          setFirebaseTrailer(null);
          setFirebaseLoading(false);
        }
      }
    };

    loadTrailer();

    return () => {
      cancelled = true;
    };
  }, [
    slug,
    isRentalPage,
  ]);


  // ===================================================
  // FINAL TRAILER DATA
  // ===================================================

  const trailer = useMemo(() => {
    if (firebaseTrailer) {
      const data = firebaseTrailer;

      return {
        ...data,

        category:
          data.category ||
          data.type ||
          "Trailer",

        title:
          data.title ||
          data.name ||
          "Trailer",

        subtitle:
          data.subtitle ||
          (
            isRentalPage
              ? "Available for Rental"
              : "Built Around Your Business"
          ),

        description:
          data.description ||
          "Professional trailer solution designed around your business requirements.",

        image:
          data.image ||
          data.images?.[0] ||
          "/assets/food_trailer.png",

        price:
          data.price ||
          data.pricePerDay ||
          "Request a Quote",

        rentPrice:
          data.rentPrice ||
          data.rentalPrice ||
          data.pricePerDay ||
          "Rental Available",

        size:
          data.size ||
          (
            Array.isArray(data.sizes)
              ? data.sizes.join(", ")
              : "Custom"
          ),

        features:
          Array.isArray(data.features) &&
          data.features.length > 0
            ? data.features
            : (
                trailerData[slug]?.features ||
                trailerData[
                  "custom-food-trailers"
                ].features
              ),
      };
    }

    return (
      trailerData[slug] ||
      trailerData["custom-food-trailers"]
    );
  }, [
    firebaseTrailer,
    slug,
    isRentalPage,
  ]);


  // ===================================================
  // SIZE SELECTION
  // ===================================================

  const sizeRange = useMemo(
    () =>
      parseSizeRange(
        trailer.size
      ),
    [trailer.size]
  );

  const sizeOptions = useMemo(
    () =>
      buildSizeOptions(
        trailer.size
      ),
    [trailer.size]
  );

  const [selectedSize, setSelectedSize] =
    useState(
      sizeOptions[0]?.value ?? null
    );

  useEffect(() => {
    setSelectedSize(
      sizeOptions[0]?.value ?? null
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    trailer.size,
    slug,
  ]);

  const selectedSizeLabel = useMemo(() => {
    if (!sizeRange) {
      return trailer.size;
    }

    return `${
      selectedSize ?? sizeRange.min
    } ${sizeRange.unit}`;
  }, [
    sizeRange,
    selectedSize,
    trailer.size,
  ]);

  const displayedPrice = useMemo(
    () =>
      scalePriceForSize(
        trailer.price,
        sizeRange,
        selectedSize,
        BUY_PRICE_PER_FOOT
      ),
    [
      trailer.price,
      sizeRange,
      selectedSize,
    ]
  );

  const displayedRentPrice = useMemo(
    () =>
      scalePriceForSize(
        trailer.rentPrice,
        sizeRange,
        selectedSize,
        RENT_PRICE_PER_FOOT
      ),
    [
      trailer.rentPrice,
      sizeRange,
      selectedSize,
    ]
  );


  // ===================================================
  // STATE
  // ===================================================

  const [mode, setMode] =
    useState(
      isRentalPage
        ? "rent"
        : null
    );

  const [pickupDate, setPickupDate] =
    useState("");

  const [returnDate, setReturnDate] =
    useState("");

  const [availability, setAvailability] =
    useState(null);

  const [showInquiry, setShowInquiry] =
    useState(false);


  // ===================================================
  // DATE
  // ===================================================

  const today = new Date()
    .toISOString()
    .split("T")[0];


  // ===================================================
  // AVAILABILITY
  // ===================================================

  const checkAvailability = () => {
    if (
      !pickupDate ||
      !returnDate
    ) {
      setAvailability({
        available: false,
        message:
          "Please select both pickup and return dates.",
      });

      return;
    }

    if (
      returnDate <= pickupDate
    ) {
      setAvailability({
        available: false,
        message:
          "Return date must be after the pickup date.",
      });

      return;
    }

    setAvailability({
      available: true,
      message:
        "This trailer is available for your selected dates.",
    });
  };


  // ===================================================
  // RENT
  // ===================================================

  const handleRent = () => {
    if (
      !availability?.available
    ) {
      return;
    }

    const bookingData = {
      trailerId:
        firebaseTrailer?.id ||
        slug,

      trailerSlug: slug,

      trailerName:
        trailer.title,

      selectedSize:
        selectedSizeLabel,

      pickupDate,

      returnDate,

      rentPrice:
        displayedRentPrice,
    };

    localStorage.setItem(
      "calvinsTrailerBooking",
      JSON.stringify(
        bookingData
      )
    );

    window.location.href =
      `/rent-trailer?trailer=${encodeURIComponent(
        slug
      )}`;
  };


  // ===================================================
  // LOADING
  // ===================================================

  if (
    firebaseLoading &&
    !trailerData[slug]
  ) {
    return (
      <main className="trailer-details-page">
        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
          }}
        >
          Loading trailer...
        </div>
      </main>
    );
  }


  // ===================================================
  // RENDER
  // ===================================================

  return (
    <main className="trailer-details-page">

      {/* =================================================
          BACK
      ================================================= */}

      <div className="details-container">
        <Link
          to={backPath}
          className="details-back"
        >
          <ArrowLeft size={16} />

          {isRentalPage
            ? "Back to Trailers for Rent"
            : "Back to Trailers for Sale"}
        </Link>
      </div>


      {/* =================================================
          HERO
      ================================================= */}

      <section className="details-hero">

        <div className="details-container details-hero-grid">

          {/* IMAGE */}

          <div className="details-image-wrap">

            <img
              src={trailer.image}
              alt={trailer.title}
            />

            <div className="details-image-badge">

              <Check size={15} />

              {isRentalPage
                ? "Available for Rental"
                : "Built by Calvin's Tools"}

            </div>

          </div>


          {/* CONTENT */}

          <div className="details-content">

            <span className="details-eyebrow">

              {trailer.category}

              {" / "}

              {isRentalPage
                ? "Trailers for rent"
                : "Available options"}

            </span>


            <h1>
              {trailer.title}
            </h1>


            <h2>
              {trailer.subtitle}
            </h2>


            <p className="details-description">
              {trailer.description}
            </p>


            {/* =================================================
                SIZE SELECTOR — CHIPS
            ================================================= */}

            {sizeOptions.length > 1 && (

              <div className="details-size-selector">

                <span className="details-size-selector-label">
                  Select size
                </span>

                <div
                  className="size-chip-group"
                  role="group"
                  aria-label="Select trailer size"
                >

                  {sizeOptions.map(
                    (option) => {

                      const isActive =
                        (
                          option.value ??
                          null
                        ) ===
                        (
                          selectedSize ??
                          null
                        );

                      return (
                        <button
                          key={option.label}
                          type="button"
                          className={`size-chip ${
                            isActive
                              ? "active"
                              : ""
                          }`}
                          aria-pressed={
                            isActive
                          }
                          onClick={() =>
                            setSelectedSize(
                              option.value
                            )
                          }
                        >
                          {option.label}
                        </button>
                      );
                    }
                  )}

                </div>

              </div>

            )}


            {/* META */}

            <div className="details-meta">

              <div>
                <span>
                  Size
                </span>

                <strong>
                  {selectedSizeLabel}
                </strong>
              </div>


              {!isRentalPage && (
                <div>
                  <span>
                    Buy
                  </span>

                  <strong>
                    {displayedPrice}
                  </strong>
                </div>
              )}


              <div>
                <span>
                  Rent
                </span>

                <strong>
                  {displayedRentPrice}
                </strong>
              </div>

            </div>


            {/* =================================================
                SALE ACTIONS
            ================================================= */}

            {!isRentalPage && (

              <div className="details-actions">

                <button
                  type="button"
                  className={`details-buy-btn ${
                    mode === "buy"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {

                    setMode("buy");

                    setAvailability(
                      null
                    );

                  }}
                >

                  <ShoppingCart
                    size={17}
                  />

                  Buy This Trailer

                </button>


                <button
                  type="button"
                  className={`details-rent-btn ${
                    mode === "rent"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {

                    setMode("rent");

                    setAvailability(
                      null
                    );

                  }}
                >

                  <CalendarDays
                    size={17}
                  />

                  Rent This Trailer

                </button>

              </div>

            )}


            {/* =================================================
                RENT PAGE ACTION
            ================================================= */}

            {isRentalPage && (

              <div className="details-actions">

                <button
                  type="button"
                  className="details-rent-btn active"
                  onClick={() => {

                    setMode("rent");

                    setAvailability(
                      null
                    );

                  }}
                >

                  <CalendarDays
                    size={17}
                  />

                  Rent This Trailer

                </button>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =================================================
          BUY SECTION
      ================================================= */}

      {!isRentalPage &&
        mode === "buy" && (

          <section className="details-action-panel">

            <div className="details-container">

              <div className="action-panel-inner">

                <div>

                  <span className="details-eyebrow">
                    Purchase inquiry
                  </span>

                  <h2>
                    Interested in this trailer?
                  </h2>

                  <p>
                    Contact our team for pricing,
                    specifications, availability,
                    financing options, and
                    purchase details.
                  </p>

                </div>


                <div className="action-panel-buttons">

                  <button
                    type="button"
                    onClick={() =>
                      setShowInquiry(
                        true
                      )
                    }
                  >

                    Request Purchase Details

                    <ArrowRight
                      size={17}
                    />

                  </button>


                  <a
                    href="tel:+10000000000"
                  >

                    <Phone size={17} />

                    Call Our Team

                  </a>

                </div>

              </div>

            </div>

          </section>

        )}


      {/* =================================================
          RENT SECTION
      ================================================= */}

      {mode === "rent" && (

        <section className="rent-section">

          <div className="details-container">

            <div className="rent-heading">

              <span className="details-eyebrow">
                Rental availability
              </span>

              <h2>
                Check Trailer Availability
              </h2>

              <p>
                Select your pickup and return
                dates to check whether this
                trailer is available.
              </p>

            </div>


            <div className="rent-box">

              <div className="rent-date-field">

                <label htmlFor="pickupDate">

                  <CalendarDays
                    size={16}
                  />

                  Pickup Date

                </label>


                <input
                  id="pickupDate"
                  type="date"
                  value={pickupDate}
                  min={today}
                  onChange={(e) => {

                    setPickupDate(
                      e.target.value
                    );

                    setAvailability(
                      null
                    );

                  }}
                />

              </div>


              <div className="rent-date-field">

                <label htmlFor="returnDate">

                  <CalendarDays
                    size={16}
                  />

                  Return Date

                </label>


                <input
                  id="returnDate"
                  type="date"
                  value={returnDate}
                  min={
                    pickupDate ||
                    today
                  }
                  onChange={(e) => {

                    setReturnDate(
                      e.target.value
                    );

                    setAvailability(
                      null
                    );

                  }}
                />

              </div>


              <button
                type="button"
                className="availability-btn"
                onClick={
                  checkAvailability
                }
              >

                Check Availability

                <ArrowRight
                  size={17}
                />

              </button>

            </div>


            {/* RESULT */}

            {availability && (

              <div
                className={`availability-result ${
                  availability.available
                    ? "available"
                    : "not-available"
                }`}
              >

                <div className="availability-icon">

                  {availability.available ? (
                    <Check size={20} />
                  ) : (
                    <X size={20} />
                  )}

                </div>


                <div>

                  <strong>

                    {availability.available
                      ? "Trailer Available"
                      : "Not Available"}

                  </strong>

                  <p>
                    {availability.message}
                  </p>

                </div>


                {availability.available && (

                  <button
                    type="button"
                    className="reserve-btn"
                    onClick={
                      handleRent
                    }
                  >

                    Reserve Trailer

                    <ArrowRight
                      size={17}
                    />

                  </button>

                )}

              </div>

            )}

          </div>

        </section>

      )}


      {/* =================================================
          FEATURES
      ================================================= */}

      <section className="details-features">

        <div className="details-container">

          <div className="details-section-heading">

            <div>

              <span className="details-eyebrow">
                Trailer details
              </span>

              <h2>
                What's Included
              </h2>

            </div>


            <p>
              Every trailer configuration can
              be adapted to your business
              requirements.
            </p>

          </div>


          <div className="features-grid">

            {trailer.features.map(
              (feature) => (

                <div
                  className="feature-item"
                  key={feature}
                >

                  <Check size={17} />

                  <span>
                    {feature}
                  </span>

                </div>

              )
            )}

          </div>

        </div>

      </section>


      {/* =================================================
          SERVICE
      ================================================= */}

      <section className="details-service">

        <div className="details-container">

          <div className="service-grid">

            <div>

              <Truck size={22} />

              <h3>
                Delivery Options
              </h3>

              <p>
                Ask our team about trailer
                delivery and pickup options
                for your location.
              </p>

            </div>


            <div>

              <ShieldCheck size={22} />

              <h3>
                Quality Built
              </h3>

              <p>
                Built with practical layouts
                and materials selected for
                commercial use.
              </p>

            </div>


            <div>

              <Clock3 size={22} />

              <h3>
                Support
              </h3>

              <p>
                Our team can help with
                configuration, purchasing,
                rental, and custom builds.
              </p>

            </div>


            <div>

              <MapPin size={22} />

              <h3>
                Custom Locations
              </h3>

              <p>
                Tell us where you operate
                and we can discuss the right
                trailer solution.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          PURCHASE MODAL
      ================================================= */}

      {!isRentalPage &&
        showInquiry && (

          <div className="inquiry-overlay">

            <div className="inquiry-modal">

              <button
                type="button"
                className="inquiry-close"
                onClick={() =>
                  setShowInquiry(
                    false
                  )
                }
                aria-label="Close"
              >

                <X size={20} />

              </button>


              <span className="details-eyebrow">
                Purchase inquiry
              </span>


              <h2>
                Request Details
              </h2>


              <p>

                Tell us how we can help with{" "}

                <strong>
                  {trailer.title}
                </strong>{" "}

                ({selectedSizeLabel}).

              </p>


              <form
                onSubmit={(e) => {

                  e.preventDefault();

                  alert(
                    "Thank you! Your purchase inquiry has been submitted."
                  );

                  setShowInquiry(
                    false
                  );

                }}
              >

                <input
                  type="text"
                  placeholder="Full Name"
                  required
                />


                <input
                  type="email"
                  placeholder="Email Address"
                  required
                />


                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                />


                <textarea
                  rows="4"
                  placeholder="Tell us what you need..."
                />


                <button type="submit">

                  Submit Inquiry

                  <ArrowRight
                    size={17}
                  />

                </button>

              </form>


              <div className="inquiry-contact">

                <Mail size={15} />

                Our team will contact you
                with the next steps.

              </div>

            </div>

          </div>

        )}

    </main>
  );
}