import React from "react";
import { ArrowUpRight } from "lucide-react";
import "./TrailerSize.css";

const trailerSizes = [
  {
    size: "10",
    title: "10 FT Food Trailer",
    description: "Compact & efficient",
  },
  {
    size: "12",
    title: "12 FT Food Trailer",
    description: "Perfect for growing brands",
  },
  {
    size: "14",
    title: "14 FT Food Trailer",
    description: "More room to operate",
  },
  {
    size: "16",
    title: "16 FT Food Trailer",
    description: "Built for busy service",
  },
  {
    size: "20",
    title: "20 FT Food Trailer",
    description: "Maximum workspace",
  },
  {
    size: "22",
    title: "22 FT Food Trailer",
    description: "Full-scale mobile setup",
  },
];

const TrailerSize = () => {
  return (
    <section className="trailer-size-section" id="trailer-sizes">
      <div className="trailer-size-container">

        {/* Header */}
        <div className="trailer-size-header">
          <div className="trailer-size-heading">
            <span className="trailer-size-eyebrow">
              08 / SHOP BY SIZE
            </span>

            <h2>
              Find Your
              <span> Trailer Size</span>
            </h2>
          </div>

          <div className="trailer-size-intro">
            <p>
              Browse available trailers by length to find the right
              footprint for your equipment, menu, storage, and service
              requirements.
            </p>

            <a href="#trailers" className="trailer-size-main-link">
              <span>Explore All Trailers</span>
              <ArrowUpRight size={17} strokeWidth={2.2} />
            </a>
          </div>
        </div>

        {/* Size Cards */}
        <div className="trailer-size-grid">
          {trailerSizes.map((trailer) => (
            <a
              href="#trailers"
              className="trailer-size-card"
              key={trailer.size}
              aria-label={`View ${trailer.title}`}
            >
              <div className="trailer-size-number">
                <strong>{trailer.size}</strong>
                <small>FT</small>
              </div>

              <div className="trailer-size-content">
                <h3>{trailer.title}</h3>
                <p>{trailer.description}</p>
              </div>

              <div className="trailer-size-arrow">
                <ArrowUpRight size={20} strokeWidth={2} />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom note */}
        <div className="trailer-size-bottom">
          <span className="trailer-size-line"></span>

          <p>
            Need a custom size?
            <a href="#contact"> Talk to our team</a>
          </p>
        </div>

      </div>
    </section>
  );
};

export default TrailerSize;