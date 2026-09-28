import { useEffect } from "react";

import Hero from "../../components/Home/Hero/Hero";
import About from "../../components/Home/About/About";


import WhyCalvinsTools from "../../components/WhyCalvinsTools/WhyCalvinsTools";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Reviews from "../../components/Reviews/Reviews";
import Stats from "../../components/Stats/Stats";
import TrailerSize from "../../components/TrailerSize/TrailerSize";

import TrailerShowcase from "../../components/TrailerShowcase/TrailerShowcase";
import TrailerRentShowcase from "../../components/TrailerRentShowcase/TrailerRentShowcase";

import "./Home.css";

function Home() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return (
    <div className="home-page">
      <main>

        {/* =================================================
            HERO
        ================================================= */}
        <section
          id="home"
          className="home-section"
        >
          <Hero />
        </section>

        {/* =================================================
            ABOUT
        ================================================= */}
        <section
          id="about"
          className="home-section"
        >
          <About />
        </section>



        {/* =================================================
            TRAILER SOLUTIONS
        ================================================= */}
        <section
          id="trailers"
          className="home-section"
        >
          <TrailerShowcase />
        </section>
        {/* =================================================
            STATS
        ================================================= */}
        <section className="home-section">
          <Stats />
        </section>

        {/* =================================================
            TRAILERS FOR RENT
        ================================================= */}
        <section
          id="trailers-for-rent"
          className="home-section"
        >
          <TrailerRentShowcase />
        </section>




        {/* =================================================
            WHY CALVIN'S TOOLS
        ================================================= */}
        <section
          id="why-calvins"
          className="home-section"
        >
          <WhyCalvinsTools />
        </section>

        {/* =================================================
            HOW IT WORKS
        ================================================= */}
        <section
          id="how-it-works"
          className="home-section"
        >
          <HowItWorks />
        </section>

        <section
          id="trailer-sizes"
          className="home-section"
        >
          <TrailerSize />
        </section>


        {/* =================================================
            REVIEWS
        ================================================= */}
        <section
          id="reviews"
          className="home-section"
        >
          <Reviews />
        </section>

        {/* =================================================
            CONTACT
        ================================================= */}
        <section
          id="contact"
          className="home-section"
        />

      </main>
    </div>
  );
}

export default Home;