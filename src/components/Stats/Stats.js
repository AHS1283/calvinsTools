
import React, { useEffect, useRef, useState } from "react";
import "./Stats.css";

const stats = [
  {
    number: 150,
    suffix: "+",
    label: "TRAILERS",
    description: "Mobile food spaces ready for business.",
  },
  {
    number: 25,
    suffix: "+",
    label: "CITIES SERVED",
    description: "Helping businesses move across locations.",
  },
  {
    number: 500,
    suffix: "+",
    label: "BUSINESSES",
    description: "Food entrepreneurs choosing mobile spaces.",
  },
  {
    number: 10,
    suffix: "+",
    label: "YEARS EXPERIENCE",
    description: "Building practical solutions for businesses.",
  },
];

function AnimatedNumber({ value, suffix, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }

    let startTime = null;
    const duration = 1800;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value, start]);

  return (
    <>
      {count}
      <span>{suffix}</span>
    </>
  );
}

function Stats() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stats-section"
      id="stats"
    >
      <div className="stats-inner">

        {/* TOP LABEL */}
        <div className="stats-top">
          <div className="stats-label">
            <span>04</span>
            <i></i>
            CALVIN'S TOOLS / AT A GLANCE
          </div>

          <div className="stats-note">
            BUILT TO MOVE
          </div>
        </div>

        {/* HEADER */}
        <div className="stats-header">

          <div className="stats-heading">
            <span>NUMBERS THAT MOVE WITH US</span>

            <h2>
              Built to move.
              <br />
              <em>Built for business.</em>
            </h2>
          </div>

          <div className="stats-intro">
            <p>
              From the first idea to the first customer,
              our mobile spaces are designed to help
              businesses move forward.
            </p>
          </div>

        </div>

        {/* TIMELINE */}
        <div className="stats-timeline">

          <div className="timeline-line">
            <div className="timeline-progress"></div>
          </div>

          {stats.map((stat, index) => (
            <article
              className="timeline-item"
              key={stat.label}
            >

              {/* NUMBER */}
              <div className="timeline-number">
                <AnimatedNumber
                  value={stat.number}
                  suffix={stat.suffix}
                  start={isVisible}
                />
              </div>

              {/* DOT */}
              <div className="timeline-dot">
                <span></span>
              </div>

              {/* CONTENT */}
              <div className="timeline-content">

                <div className="timeline-index">
                  0{index + 1}
                </div>

                <h3>{stat.label}</h3>

                <p>{stat.description}</p>

              </div>

            </article>
          ))}

        </div>
{/* 
        
        <div className="stats-bottom">

          <div className="stats-bottom-status">
            <span></span>
            ALWAYS MOVING
          </div>

          <p>
            Your business doesn't have to
            <br />
            <em>stay in one place.</em>
          </p>

          <a
            href="#trailers"
            className="stats-link"
          >
            EXPLORE TRAILERS
            <strong>↗</strong>
          </a>

        </div> */}

      </div>
    </section>
  );
}

export default Stats;
