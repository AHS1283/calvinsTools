
import React, { useMemo, useState } from "react";
import {
  ArrowRight,
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

const foodTrailers = [
  {
    title: "Custom Food Trailers",
    description:
      "Purpose-built food trailers designed around your menu, equipment, workflow, and business needs.",
    icon: Utensils,
  },
  {
    title: "Mobile Kitchen Trailers",
    description:
      "Professional mobile kitchens with practical layouts for catering, events, and food businesses.",
    icon: Truck,
  },
  {
    title: "BBQ Food Trailers",
    description:
      "Built for BBQ businesses with layouts designed for smokers, prep areas, cooking equipment, and service.",
    icon: Flame,
  },
  {
    title: "Pizza Trailers",
    description:
      "Mobile pizza trailers designed for efficient preparation, cooking, storage, and customer service.",
    icon: Flame,
  },
  {
    title: "Coffee Trailers",
    description:
      "Compact mobile coffee trailers designed for cafes, events, markets, and high-volume service.",
    icon: Coffee,
  },
  {
    title: "Dessert Trailers",
    description:
      "Flexible dessert trailers for bakeries, sweet shops, events, festivals, and mobile businesses.",
    icon: IceCream,
  },
  {
    title: "Ice Cream Trailers",
    description:
      "Mobile ice cream trailers designed for convenient service, refrigeration, and customer flow.",
    icon: IceCream,
  },
  {
    title: "Donut Trailers",
    description:
      "Mobile donut trailers with practical layouts for preparation, cooking, display, and service.",
    icon: Utensils,
  },
  {
    title: "Taco Trailers",
    description:
      "Purpose-built taco trailers designed around prep, cooking, refrigeration, storage, and service.",
    icon: Utensils,
  },
  {
    title: "Smoker Trailers",
    description:
      "Heavy-duty mobile smoker trailer solutions for BBQ professionals and catering businesses.",
    icon: Flame,
  },
  {
    title: "Small Food Trailers",
    description:
      "Compact food trailers for businesses looking for an efficient mobile setup with a smaller footprint.",
    icon: Truck,
  },
  {
    title: "Mini Food Trailers",
    description:
      "Smaller mobile food solutions designed for simple menus, events, pop-ups, and new businesses.",
    icon: Truck,
  },
];

const specialtyTrailers = [
  {
    title: "Refrigerated Trailers",
    description:
      "Mobile refrigeration solutions designed for temperature-sensitive products and commercial use.",
    icon: Snowflake,
  },
  {
    title: "Nail Salon Trailers",
    description:
      "Professional mobile salon spaces designed for beauty professionals and mobile services.",
    icon: Store,
  },
  {
    title: "Mobile Retail Trailers",
    description:
      "Flexible mobile retail spaces for brands, pop-ups, markets, events, and traveling businesses.",
    icon: Store,
  },
  {
    title: "Mobile Bar Trailers",
    description:
      "Customizable mobile bar spaces designed for events, hospitality businesses, and private functions.",
    icon: Coffee,
  },
  {
    title: "Custom Commercial Trailers",
    description:
      "Commercial trailer solutions built around specialized business requirements and workflows.",
    icon: Truck,
  },
];

const trailerSizes = [
  "10 FT Food Trailers",
  "12 FT Food Trailers",
  "14 FT Food Trailers",
  "16 FT Food Trailers",
  "20 FT Food Trailers",
  "22 FT Food Trailers",
];

const makeSlug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function TrailerCard({ item }) {
  const Icon = item.icon;

  return (
    <article className="sale-trailer-card">
      <div className="sale-card-icon">
        <Icon size={22} strokeWidth={1.7} />
      </div>

      <div className="sale-card-content">
        <span className="sale-card-label">TRAILERS FOR SALE</span>

        <h3>{item.title}</h3>

        <p>{item.description}</p>

        <a
          href={`/trailers-for-sale/${makeSlug(item.title)}`}
          className="sale-card-link"
        >
          Explore Trailer
          <ArrowRight size={17} />
        </a>
      </div>
    </article>
  );
}

function SizeCard({ size }) {
  return (
    <a
      href={`/trailers-for-sale/${makeSlug(size)}`}
      className="sale-size-card"
    >
      <div className="sale-size-number">
        {size.split(" ")[0]}
        <span>FT</span>
      </div>

      <div className="sale-size-info">
        <h3>{size}</h3>
        <span>View Available Trailers</span>
      </div>

      <ArrowRight size={19} />
    </a>
  );
}

export default function TrailersForSale() {
  const [search, setSearch] = useState("");

  const filteredFood = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return foodTrailers;

    return foodTrailers.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
  }, [search]);

  const filteredSpecialty = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return specialtyTrailers;

    return specialtyTrailers.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
  }, [search]);

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
              Explore professionally built food, commercial, specialty, and
              custom trailers designed for businesses ready to take their
              operation on the road.
            </p>

            <div className="sale-hero-actions">
              <a href="#food-trailers" className="sale-primary-btn">
                Browse Trailers
                <ArrowRight size={18} />
              </a>

              <a href="/get-a-quote" className="sale-secondary-btn">
                Get a Custom Quote
              </a>
            </div>
          </div>

          <div className="sale-hero-stat">
            <span>BUILT AROUND</span>
            <strong>Your Business</strong>

            <p>
              Practical layouts, durable construction, and flexible
              configurations.
            </p>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="sale-search-section">
        <div className="sale-container">
          <div className="sale-search-box">
            <Search size={20} />

            <input
              type="search"
              placeholder="Search food, BBQ, coffee, refrigerated..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search trailers for sale"
            />
          </div>
        </div>
      </section>

      {/* FOOD TRAILERS */}
      <section
        className="sale-category-section"
        id="food-trailers"
      >
        <div className="sale-container">
          <div className="sale-section-heading">
            <div>
              <span className="sale-eyebrow">
                01 / FOOD TRAILERS
              </span>

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
                <TrailerCard
                  key={item.title}
                  item={item}
                />
              ))
            ) : (
              <div className="sale-no-results">
                No food trailer categories found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SPECIALTY TRAILERS */}
      <section className="sale-category-section sale-specialty">
        <div className="sale-container">
          <div className="sale-section-heading">
            <div>
              <span className="sale-eyebrow">
                02 / SPECIALTY TRAILERS
              </span>

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
                <TrailerCard
                  key={item.title}
                  item={item}
                />
              ))
            ) : (
              <div className="sale-no-results">
                No specialty trailer categories found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TRAILER SIZE */}
      <section className="sale-size-section">
        <div className="sale-container">
          <div className="sale-section-heading">
            <div>
              <span className="sale-eyebrow">
                03 / SHOP BY SIZE
              </span>

              <h2>Find Your Trailer Size</h2>
            </div>

            <p>
              Browse available trailers by length to find the right footprint
              for your equipment, menu, storage, and service requirements.
            </p>
          </div>

          <div className="sale-size-grid">
            {trailerSizes.map((size) => (
              <SizeCard
                key={size}
                size={size}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sale-cta">
        <div className="sale-container sale-cta-inner">
          <div>
            <span className="sale-eyebrow">
              CAN'T FIND WHAT YOU NEED?
            </span>

            <h2>
              Build a Trailer
              <span>Around Your Business.</span>
            </h2>

            <p>
              Tell us what you're looking for and our team can help you
              explore a custom trailer configuration.
            </p>
          </div>

          <a
            href="/get-a-quote"
            className="sale-primary-btn"
          >
            Get a Custom Quote
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  );
}
