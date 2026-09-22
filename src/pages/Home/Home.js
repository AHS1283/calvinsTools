import { useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Home/Hero/Hero";
import About from "../../components/Home/About/About";
import TrailerSolutions from "../../components/TrailerSolutions/TrailerSolutions";
import FeaturedTrailers from "../../components/FeaturedTrailers/FeaturedTrailers";
import WhyCalvinsTools from "../../components/WhyCalvinsTools/WhyCalvinsTools";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Reviews from "../../components/Reviews/Reviews";
import Stats from "../../components/Stats/Stats";
import SocialSidebar from "../../components/SocialSidebar/SocialSidebar";
import Footer from "../../components/Footer/Footer";

import "./Home.css";

function Home() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Always start Home at the top.
    window.scrollTo(0, 0);

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return (
    <div className="home-page">
      <Navbar />

      <main>
        {/* HOME */}
        <section id="home" className="home-section">
          <Hero />
        </section>

        {/* ABOUT */}
        <section id="about" className="home-section">
          <About />
        </section>

        {/* STATS */}
        <section className="home-section">
          <Stats />
        </section>

        {/* TRAILER SOLUTIONS */}
        <section id="trailers" className="home-section">
          <TrailerSolutions />
        </section>

        {/* FEATURED TRAILERS */}
        <section id="featured-trailers" className="home-section">
          <FeaturedTrailers />
        </section>

        {/* WHY CALVIN'S TOOLS */}
        <section id="why-calvins" className="home-section">
          <WhyCalvinsTools />
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="home-section">
          <HowItWorks />
        </section>

        {/* SOCIAL */}
        <SocialSidebar />

        {/* REVIEWS */}
        <section id="reviews" className="home-section">
          <Reviews />
        </section>

        {/* CONTACT */}
        <section id="contact" className="home-section" />

      </main>

      <Footer />
    </div>
  );
}

export default Home;