import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path to wherever your firebase.js lives
import "./BookingModal.css";

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  trailerType: "",
  date: "",
  message: "",
};

function BookingModal({ isOpen, onClose }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Reset form state each time modal opens
  useEffect(() => {
    if (isOpen) {
      setForm(INITIAL_FORM);
      setStatus("idle");
      setErrorMsg("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.date) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      await addDoc(collection(db, "bookings"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setStatus("success");
    } catch (err) {
      console.error("Booking submit error:", err);
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div className="booking-overlay" onClick={handleOverlayClick}>
      <div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <button
          type="button"
          className="booking-close"
          onClick={onClose}
          aria-label="Close booking form"
        >
          ×
        </button>

        {status === "success" ? (
          <div className="booking-success">
            <h3 id="booking-modal-title">Request received</h3>
            <p>
              Thanks, {form.name.split(" ")[0]}! We've got your booking
              request and will reach out shortly to confirm.
            </p>
            <button
              type="button"
              className="booking-submit"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 id="booking-modal-title">Book a Trailer</h3>
            <p className="booking-subtitle">
              Fill in your details and we'll confirm availability.
            </p>

            <form className="booking-form" onSubmit={handleSubmit}>
              <label>
                Full Name *
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email *
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone *
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Trailer Type
                <select
                  name="trailerType"
                  value={form.trailerType}
                  onChange={handleChange}
                >
                  <option value="">Select a trailer</option>
                  <option value="Utility Trailer">Utility Trailer</option>
                  <option value="Enclosed Trailer">Enclosed Trailer</option>
                  <option value="Flatbed Trailer">Flatbed Trailer</option>
                  <option value="Car Hauler">Car Hauler</option>
                </select>
              </label>

              <label>
                Preferred Date *
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  rows="3"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Anything we should know?"
                />
              </label>

              {errorMsg && <p className="booking-error">{errorMsg}</p>}

              <button
                type="submit"
                className="booking-submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending..." : "Submit Request"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

export default BookingModal;
