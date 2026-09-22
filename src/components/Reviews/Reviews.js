import React, { useRef } from "react";
import "./Reviews.css";

/* =====================================================
   GOOGLE REVIEW LINK
===================================================== */

const GOOGLE_REVIEW_LINK = "https://share.google/rm9ZDpaYBmQfcRRaw";

/* =====================================================
   GOOGLE RATING
===================================================== */

const googleRating = "5.0";
const totalReviews = "120+";

/* =====================================================
   REVIEWS DATA
===================================================== */

const reviews = [
  {
    quote:
      "Worked with Mark at Calvin's Tools to start the process of renting a food trailer. While we haven't picked the trailer up yet, the process has been very easy and they have been extremely helpful.",
    name: "Cassie Albritton",
    business: "Google Customer Review",
    type: "FOOD TRAILER",
  },
  {
    quote: "Great service. Went above and beyond.",
    name: "Brendon Lobo",
    business: "Google Customer Review",
    type: "CUSTOMER REVIEW",
  },
];

/* =====================================================
   STAR COMPONENT
===================================================== */

function Stars() {
  return (
    <div className="review-stars" aria-label="5 star rating">
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
      <span>★</span>
    </div>
  );
}

/* =====================================================
   REVIEWS COMPONENT
===================================================== */

function Reviews() {
  const trackRef = useRef(null);

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".review-card");
    const amount = card ? card.offsetWidth + 24 : 320;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-inner">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="reviews-header">

          <h2>
            What Our <em>Customers</em> Have To Say
          </h2>

          <p className="reviews-subtitle">
            Trusted by our customers &mdash; real feedback from the people
            we&apos;ve worked with
          </p>

        </div>

        {/* =================================================
            RATING CARD
        ================================================= */}

        <div className="rating-card">

          <div className="rating-card-left">
            <strong>{googleRating}</strong>
            <Stars />
            <span>Based on {totalReviews} reviews</span>
          </div>

          <div className="rating-card-actions">

            <a
              href={GOOGLE_REVIEW_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="view-reviews-btn"
            >
              ★ View all reviews
            </a>

            <a
              href={GOOGLE_REVIEW_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="write-review-btn"
            >
              ✎ Write a review
            </a>

          </div>

        </div>

        {/* =================================================
            REVIEWS CAROUSEL
        ================================================= */}

        <div className="reviews-carousel-wrap">

          <button
            type="button"
            className="carousel-btn carousel-btn-prev"
            aria-label="Previous reviews"
            onClick={() => scrollByCard(-1)}
          >
            &lsaquo;
          </button>

          <div className="reviews-carousel" ref={trackRef}>

            {reviews.map((review) => (
              <article className="review-card" key={review.name}>

                <div className="review-card-top">

                  <div className="review-avatar">
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="review-card-person">
                    <strong>{review.name}</strong>
                    <Stars />
                  </div>

                </div>

                <p className="review-quote">&ldquo;{review.quote}&rdquo;</p>

                <span className="review-type">{review.type}</span>

              </article>
            ))}

          </div>

          <button
            type="button"
            className="carousel-btn carousel-btn-next"
            aria-label="Next reviews"
            onClick={() => scrollByCard(1)}
          >
            &rsaquo;
          </button>

        </div>

      </div>
    </section>
  );
}

export default Reviews;