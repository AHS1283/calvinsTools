import React, { useState, useEffect } from "react";
import "./HowItWorks.css";

const AUTO_ROTATE_MS = 4000;

const steps = [
  {
    number: "01",
    title: "Browse Trailers",
    description:
      "Explore our available food trailers and mobile spaces to find an option that fits your business.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "02",
    title: "Choose Your Trailer",
    description:
      "Select the trailer that matches your size, setup, event, and business requirements.",
    image:
      "https://reicoglobal.com/cdn/shop/files/urbanbox-r1-pt-food-trailer-5416676.jpg?v=1751899482&width=1440",
  },
  {
    number: "03",
    title: "Book Your Rental",
    description:
      "Send us your rental details and preferred dates. Our team will help you complete the booking.",
    image:
      "https://image.made-in-china.com/2f0j00PyRTSHLIJwuE/Street-Style-Food-Truck-Mini-Machine-Food-Mini-Tractor-Trailer-Truck-Mobile-Breakfast-Food-Carts-for-Sale.webp",
  },
  {
    number: "04",
    title: "Get Moving",
    description:
      "Once everything is confirmed, your trailer is ready to become part of your next business move.",
    image:
      "https://s.alicdn.com/%40sc04/kf/Hbf3be832ebb8477d80c9ab886804f2c3e/Small-Outdoor-Catering-Mobile-Street-Food-Truck-New-Mobile-Street-Food-Trailer-Kiosk-Design-For-Street-Food-Vending-Cart.jpg",
  },
];

function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];

  // 0 → 100, how far along the wave the accent line should be drawn
  const waveProgress = (activeIndex / (steps.length - 1)) * 100;

  // auto-advance to the next step; restarts whenever activeIndex
  // changes, so a manual tab click also resets the timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % steps.length);
    }, AUTO_ROTATE_MS);

    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="how-it-works-inner">

        {/* TOP */}
        <div className="how-top">
          <div className="how-label">
            <span>07</span>
            <i></i>
            HOW IT WORKS
          </div>

          <div className="how-top-note">
            SIMPLE PROCESS / BIG POSSIBILITIES
          </div>
        </div>

        {/* HEADING */}
        <div className="how-heading-area">

          <div>
            <span className="how-eyebrow">
              FROM IDEA TO ROAD
            </span>

            <h2>
              Rent it.
              <br />
              <em>Roll with it.</em>
            </h2>
          </div>

          <div className="how-intro">
            <p>
              Getting a mobile food space should be simple.
              Choose your trailer, tell us what you need,
              and get ready to take your business on the road.
            </p>

          </div>

        </div>

        {/* STEPS */}
        <div className="how-steps">

          {/* CLICKABLE NUMBER CIRCLES */}
          <div className="how-step-tabs">

            {/* wavy line running through the circles; the accent
                portion redraws itself as the active step advances */}
            <svg
              className="how-step-wave"
              viewBox="0 0 300 40"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                className="how-step-wave-track"
                d="M0,20 C25,2 75,38 100,20 C125,2 175,38 200,20 C225,2 275,38 300,20"
                fill="none"
                pathLength="100"
              />
              <path
                className="how-step-wave-fill"
                d="M0,20 C25,2 75,38 100,20 C125,2 175,38 200,20 C225,2 275,38 300,20"
                fill="none"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={100 - waveProgress}
              />
            </svg>

            {steps.map((step, index) => (
              <button
                type="button"
                key={step.number}
                data-label={step.title}
                className={`how-step-tab ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show step ${step.number}: ${step.title}`}
              >
                {step.number}
                {index === activeIndex && (
                  <span
                    className="how-step-tab-progress"
                    key={activeIndex}
                    style={{ animationDuration: `${AUTO_ROTATE_MS}ms` }}
                  ></span>
                )}
              </button>
            ))}
          </div>

          {/* ACTIVE STEP DETAIL CARD */}
          <article className="how-step-card" key={activeStep.number}>

            <div className="how-step-card-image">
              <img
                src={activeStep.image}
                alt={`${activeStep.title} food trailer`}
                loading="lazy"
              />
            </div>

            <div className="how-step-card-content">

              <span className="how-step-label">
                STEP {activeStep.number}
              </span>

              <h3>{activeStep.title}</h3>

              <p>{activeStep.description}</p>

              <span className="how-line"></span>

            </div>

          </article>

        </div>

        {/* BOTTOM */}
        <div className="how-bottom">

          <div className="how-status">
            <span></span>
            READY WHEN YOU ARE
          </div>

          <p>
            Your next business move starts with
            one simple booking.
          </p>

          <a href="#contact" className="how-cta">
            START YOUR BOOKING
            <strong>↗</strong>
          </a>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
