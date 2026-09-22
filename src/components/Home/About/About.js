
import React from "react";
import "./About.css";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">

        {/* =========================
            SECTION INTRO
        ========================== */}
        <div className="about-heading">

          <div className="about-heading-left">
            <span className="about-small-title">
              ABOUT US
            </span>
          </div>

          <div className="about-heading-right">

            <h2 className="about-main-title">

              {/* FIRST LINE */}
              <span className="title-line title-line-one">
                Mobile Spaces.
              </span>

              {/* WORD BY WORD LINE */}
              <span className="title-line-two">

                <span className="word">
                  Built
                </span>{" "}

                <span className="word">
                  for
                </span>{" "}

                <span className="word">
                  Business.
                </span>

              </span>

            </h2>

            <p className="about-intro">
              Professional trailers that give businesses the freedom
              to operate, grow and reach customers anywhere.
            </p>

          </div>

        </div>


        {/* =========================
            MAIN CONTENT
        ========================== */}
        <div className="about-content">

          {/* IMAGE */}
          <div className="about-image">

            <img
              src="/assets/about_trailer.png"
              alt="Calvin's Tools trailer for rent"
            />

            <div className="about-image-label">

              <span>
                CALVIN'S TOOLS
              </span>

              <small>
                TRAILERS FOR RENT
              </small>

            </div>

          </div>


          {/* TEXT */}
          <div className="about-text">

            <span className="about-number">
              01
            </span>

            <h3>
              Your business deserves
              <br />
              <span>
                a space that moves.
              </span>
            </h3>

            <p>
              At Calvin's Tools, we provide practical and flexible
              trailers that help businesses take their ideas on the road.
            </p>

            <p>
              From food and beauty to retail, our mobile spaces are
              designed to bring your business closer to your customers.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;
