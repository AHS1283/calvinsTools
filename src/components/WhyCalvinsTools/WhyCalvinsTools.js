import React, { useEffect, useRef, useState } from "react";
import "./WhyCalvinsTools.css";

const reasons = [
  {
    number: "01",
    title: "Quality Built",
    description:
      "Every trailer is designed with practical layouts, durable materials, and the everyday demands of a food business in mind.",
  },
  {
    number: "02",
    title: "Ready to Launch",
    description:
      "Get a mobile space that helps you start serving customers without the complexity of building everything from scratch.",
  },
  {
    number: "03",
    title: "Flexible Rentals",
    description:
      "Choose flexible trailer rental options that work for events, catering, seasonal businesses, and growing food brands.",
  },
  {
    number: "04",
    title: "Business Focused",
    description:
      "Our trailers are designed around real business needs, helping you create a practical space for serving and selling.",
  },
  {
    number: "05",
    title: "Reliable Support",
    description:
      "From choosing the right trailer to getting ready for the road, our team is here to make the process easier.",
  },
  {
    number: "06",
    title: "Built for the Road",
    description:
      "Strong, practical mobile spaces made to move with your business and give you the freedom to serve in more places.",
  },
];

function WhyCalvinsTools() {
  const [active, setActive] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const sectionRef = useRef(null);

  // Track whether the section is actually visible on screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate the highlighted card on mobile — no scrolling involved,
  // since all cards are already visible in the 2-column grid.
  useEffect(() => {
    if (!isInView) return;
    if (window.innerWidth > 700) return;

    const interval = setInterval(() => {
      setActive((current) => (current + 1) % reasons.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [isInView]);

  const handleCardClick = (index) => {
    setActive(index);
  };

  return (
    <section
      ref={sectionRef}
      className="why-calvins-section"
      id="why-calvins"
    >
      <div className="why-calvins-inner">

        {/* TOP */}
        <div className="why-calvins-top">
          <div className="why-calvins-label">
            <span>02</span>
            <i></i>
            WHY CALVIN'S TOOLS
          </div>

          <div className="why-calvins-location">
            BUILT FOR THE ROAD
          </div>
        </div>

        {/* HEADER */}
        <div className="why-calvins-header">
          <div className="why-calvins-heading">
            <span>MORE THAN A TRAILER</span>

            <h2>
              Built around
              <br />
              <em>your business.</em>
            </h2>
          </div>

          <div className="why-calvins-intro">
            <p>
              We build practical mobile spaces for food
              entrepreneurs who want flexibility, quality,
              and the freedom to take their business
              wherever customers are.
            </p>
          </div>
        </div>

        {/* STEPS */}
        <div className="why-list">
          {reasons.map((reason, index) => (
            <article
              key={reason.number}
              className={`why-row ${
                active === index ? "active" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              {/* NUMBER */}
              <div className="why-row-number">
                {reason.number}
              </div>

              {/* TITLE */}
              <div className="why-row-title">
                <h3>{reason.title}</h3>

                <span className="why-row-arrow">
                  ↗
                </span>
              </div>

              {/* DESCRIPTION */}
              <div className="why-row-description">
                <p>{reason.description}</p>
              </div>

              {/* PROGRESS */}
              <div className="why-row-progress">
                <span></span>
              </div>
            </article>
          ))}
        </div>

        {/* ACTIVE FEATURE */}
        <div className="why-feature">
          <div className="why-feature-number">
            {reasons[active].number}
          </div>

          <div className="why-feature-content">
            <span>FEATURED REASON</span>

            <h3>{reasons[active].title}</h3>

            <p>{reasons[active].description}</p>
          </div>

          <div className="why-feature-mark">
            ↗
          </div>
        </div>

        

      </div>
    </section>
  );
}

export default WhyCalvinsTools;
