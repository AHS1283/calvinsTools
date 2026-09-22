import React from "react";
import "./SocialSidebar.css";

const SOCIAL_LINKS = [
  {
    name: "WhatsApp",
    url: "https://wa.me/919999999999",
    className: "whatsapp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.56 2 2.11 6.45 2.11 11.93c0 1.75.46 3.45 1.33 4.95L2 22l5.25-1.37a9.9 9.9 0 0 0 4.79 1.22h.01c5.48 0 9.93-4.45 9.93-9.92C21.98 6.45 17.52 2 12.04 2Zm0 18.08h-.01a8.18 8.18 0 0 1-4.17-1.14l-.3-.18-3.11.81.83-3.03-.2-.31a8.2 8.2 0 1 1 6.96 3.85Zm4.5-6.15c-.25-.13-1.47-.73-1.7-.81-.23-.09-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.04-.38-1.98-1.2-.73-.65-1.22-1.45-1.36-1.7-.14-.25-.01-.39.11-.52.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.76 2.69 4.27 3.77.6.26 1.07.41 1.44.52.61.19 1.16.16 1.59.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://instagram.com/rentocar",
    className: "instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://facebook.com/rentocar",
    className: "facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.87.24-1.46 1.5-1.46h1.7V4c-.3-.04-1.34-.13-2.55-.13-2.52 0-4.25 1.54-4.25 4.37V10H7v3h2.9v8h3.6Z" />
      </svg>
    ),
  },
];

const SocialSidebar = () => {
  return (
    <div className="social-sidebar">

      {/* =================================================
          EXPLORE ALL TRAILERS CTA
      ================================================= */}

      <a
        href="#trailers"
        className="social-sidebar-cta"
        aria-label="Explore All Trailers"
        title="Explore All Trailers"
      >
        <span className="social-sidebar-cta-text">
          Explore All Trailers
        </span>

        <span className="social-sidebar-cta-icon">
          ↗
        </span>
      </a>

      {/* =================================================
          SOCIAL ICONS
      ================================================= */}

      {SOCIAL_LINKS.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-sidebar-item ${item.className}`}
          aria-label={item.name}
          title={item.name}
        >
          <span className="social-sidebar-icon">
            {item.icon}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;
