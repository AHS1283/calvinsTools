
import React from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import "./Footer.css";

/* =========================================================
   FOOTER LINK COLUMNS
========================================================= */

const linkColumns = [
  {
    heading: "Trailers",
    links: [
      {
        label: "Food Trailers",
        href: "#trailers",
      },
      {
        label: "Beauty Trailers",
        href: "#trailers",
      },
      {
        label: "Retail Trailers",
        href: "#trailers",
      },
      {
        label: "Custom Builds",
        href: "#contact",
      },
    ],
  },

  {
    heading: "Company",
    links: [
      {
        label: "How It Works",
        href: "#how-it-works",
      },
      {
        label: "Pricing",
        href: "#pricing",
      },
      {
        label: "FAQs",
        href: "#faq",
      },
      {
        label: "Careers",
        href: "#careers",
      },
    ],
  },

  {
    heading: "Get in Touch",
    links: [
      {
        label: "info@calvinstools.com",
        href: "mailto:info@calvinstools.com",
      },
      {
        label: "+1 770-746-4733",
        href: "tel:+17707464733",
      },
      {
        label: "2066 Joseph E. Boone Blvd NW, Atlanta, GA 30314, united states",
        href: "#",
      },
    ],
  },
];

/* =========================================================
   SOCIAL LINKS
========================================================= */

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: <FaInstagram />,
  },

  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: <FaLinkedinIn />,
  },

  {
    label: "YouTube",
    href: "https://www.youtube.com/",
    icon: <FaYoutube />,
  },
];

/* =========================================================
   FOOTER
========================================================= */

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">

      <div className="footer-inner">

        {/* =================================================
            TOP SECTION
        ================================================= */}

        <div className="footer-top">

          {/* ===============================================
              CTA
          =============================================== */}

          <div className="footer-cta">

            <span className="footer-eyebrow">
              Mobile business, made simple
            </span>

            <h2>
              Take your
              <br />
              business anywhere.
            </h2>

            <p className="footer-description">
              Flexible trailer spaces designed for businesses
              ready to move, grow and serve customers anywhere.
            </p>

            <a
              href="#contact"
              className="footer-cta-link"
            >
              <span>
                Explore Trailers
              </span>

              <b>
                ↗
              </b>
            </a>

          </div>


          {/* ===============================================
              LINK COLUMNS
          =============================================== */}

          <div className="footer-columns">

            {linkColumns.map((column) => (

              <div
                className="footer-column"
                key={column.heading}
              >

                <h3>
                  {column.heading}
                </h3>

                <ul>

                  {column.links.map((link) => (

                    <li key={link.label}>

                      <a href={link.href}>
                        {link.label}
                      </a>

                    </li>

                  ))}

                </ul>

              </div>

            ))}

          </div>

        </div>


        {/* =================================================
            DIVIDER
        ================================================= */}

        <div className="footer-divider"></div>


        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="footer-bottom">


          {/* ===============================================
              BRAND
          =============================================== */}

          <div className="footer-mark">
            CALVIN'S TOOLS
          </div>


          {/* ===============================================
              SOCIALS
          =============================================== */}

          <div className="footer-socials">

            {socials.map((social) => (

              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Calvin's Tools on ${social.label}`}
              >

                <span className="footer-social-icon">
                  {social.icon}
                </span>

                <span className="footer-social-label">
                  {social.label}
                </span>

              </a>

            ))}

          </div>


          {/* ===============================================
              LEGAL
          =============================================== */}

          <div className="footer-legal">

            <span>
              © {year} Calvin's Tools. All rights reserved.
            </span>

            <a href="#privacy">
              Privacy
            </a>

            <a href="#terms">
              Terms
            </a>

          </div>

        </div>


        {/* =================================================
            COMPANY CREDIT
        ================================================= */}

        <div className="footer-company-credit">

          <span>
            Website designed, developed & maintained by{" "}
          </span>

          <a
            href="https://syteoslabs.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Syteos Labs
          </a>

        </div>

      </div>

    </footer>
  );
}


export default Footer;
