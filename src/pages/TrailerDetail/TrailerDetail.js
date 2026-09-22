import React, { useState } from "react";
import {
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Info,
  Truck,
  ArrowRight,
  Plus,
  Check,
} from "lucide-react";
import "./TrailerDetail.css";

// Sample Trailer Specs & Pricing Data
const TRAILER_DATA = {
  id: "CT-018",
  unitNumber: "Unit CT-018",
  title: "18' Premium Commercial Food Trailer",
  category: "FOOD TRAILER",
  location: "Atlanta, GA Hub",
  image: "/assets/food_image.png",
  specs: {
    size: "18' x 8.5'",
    gvwr: "9,990 lbs",
    hitch: "2-5/16\" Ball",
    power: "50 Amp Electrical Panel",
    equipment: ["3-Compartment Sink", "Commercial Vent Hood", "Prep Tables", "Storage Cabinets"],
  },
  baseRates: {
    daily: 180,
    weekend: 450,
    weekly: 950,
    monthly: 2800,
  },
  securityDeposit: 500,
};

// Available Add-Ons (Managed from Central Master Admin)
const MASTER_ADDONS = [
  { id: "gen", name: "7000W Quiet Generator", dailyPrice: 45, monthlyPrice: 450 },
  { id: "prop", name: "Dual 100lb Propane Tanks", dailyPrice: 20, monthlyPrice: 180 },
  { id: "pos", name: "Commercial POS Register Touchscreen", dailyPrice: 15, monthlyPrice: 120 },
  { id: "water", name: "Fresh Water Tank Extension (50 Gal)", dailyPrice: 10, monthlyPrice: 90 },
];

export default function TrailerDetail() {
  const [rentalType, setRentalType] = useState("daily"); // 'daily' | 'weekend' | 'weekly' | 'monthly'
  const [duration, setDuration] = useState(1);
  const [fulfillment, setFulfillment] = useState("pickup"); // 'pickup' | 'delivery'
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  // Add-on toggle handler
  const toggleAddOn = (addon) => {
    if (selectedAddOns.some((item) => item.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter((item) => item.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  // Dynamic Rate Calculation Logic
  const calculatePricing = () => {
    let basePrice = 0;
    let protectionFee = 0;
    let requiresOutsideInsurance = false;

    switch (rentalType) {
      case "daily":
        basePrice = TRAILER_DATA.baseRates.daily * duration;
        protectionFee = 25 * duration; // $25/day protection fee
        break;
      case "weekend":
        basePrice = TRAILER_DATA.baseRates.weekend * duration;
        protectionFee = 25 * 3 * duration; // Standard weekend = 3 days
        break;
      case "weekly":
        basePrice = TRAILER_DATA.baseRates.weekly * duration;
        protectionFee = 25 * 7 * duration; // 7 days/week
        break;
      case "monthly":
        basePrice = TRAILER_DATA.baseRates.monthly * duration;
        protectionFee = 0; // Requires COI outside insurance
        requiresOutsideInsurance = true;
        break;
      default:
        break;
    }

    const addOnsTotal = selectedAddOns.reduce((sum, item) => {
      const rate = rentalType === "monthly" ? item.monthlyPrice : item.dailyPrice;
      return sum + rate * duration;
    }, 0);

    const deliveryFee = fulfillment === "delivery" ? 150 : 0;
    const subtotal = basePrice + addOnsTotal;
    const totalDueNow = subtotal + protectionFee + TRAILER_DATA.securityDeposit + deliveryFee;

    return {
      basePrice,
      addOnsTotal,
      protectionFee,
      deliveryFee,
      subtotal,
      totalDueNow,
      requiresOutsideInsurance,
    };
  };

  const pricing = calculatePricing();

  return (
    <div className="trailer-detail-container">
      {/* HEADER SECTION */}
      <div className="detail-header">
        <div className="header-meta">
          <span className="unit-badge">{TRAILER_DATA.unitNumber}</span>
          <span className="location-badge"><Truck size={14} /> {TRAILER_DATA.location}</span>
        </div>
        <h1>{TRAILER_DATA.title}</h1>
        <p className="vin-notice">
          🔒 <strong>VIN Protection:</strong> Full 17-digit VIN will be released inside your Customer Portal upon reservation deposit for insurance setup.
        </p>
      </div>

      <div className="detail-grid">
        {/* LEFT COLUMN: VISUALS & SPECS */}
        <div className="detail-main">
          <div className="main-image-frame">
            <img src={TRAILER_DATA.image} alt={TRAILER_DATA.title} />
          </div>

          <div className="specs-card">
            <h3>Trailer Specifications</h3>
            <div className="specs-grid">
              <div><strong>Size:</strong> {TRAILER_DATA.specs.size}</div>
              <div><strong>GVWR:</strong> {TRAILER_DATA.specs.gvwr}</div>
              <div><strong>Hitch Type:</strong> {TRAILER_DATA.specs.hitch}</div>
              <div><strong>Power Setup:</strong> {TRAILER_DATA.specs.power}</div>
            </div>

            <h4 className="mt-4">Included Commercial Equipment</h4>
            <ul className="equipment-list">
              {TRAILER_DATA.specs.equipment.map((item, idx) => (
                <li key={idx}><CheckCircle2 size={16} className="text-emerald" /> {item}</li>
              ))}
            </ul>
          </div>

          {/* MASTER ADD-ONS SECTION */}
          <div className="addons-section">
            <h3>Available Equipment Add-Ons</h3>
            <p className="text-muted">Select optional gear to include with your rental:</p>

            <div className="addons-grid">
              {MASTER_ADDONS.map((addon) => {
                const isSelected = selectedAddOns.some((item) => item.id === addon.id);
                const price = rentalType === "monthly" ? `$${addon.monthlyPrice}/mo` : `$${addon.dailyPrice}/day`;

                return (
                  <div
                    key={addon.id}
                    className={`addon-card ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleAddOn(addon)}
                  >
                    <div className="addon-info">
                      <p className="addon-name">{addon.name}</p>
                      <p className="addon-price">{price}</p>
                    </div>
                    <button type="button" className="addon-btn">
                      {isSelected ? <Check size={16} /> : <Plus size={16} />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DYNAMIC BOOKING CALCULATOR */}
        <div className="booking-sidebar">
          <div className="calculator-card">
            <h3>Select Rental Period</h3>

            {/* RENTAL PERIOD TABS */}
            <div className="rental-tabs">
              {["daily", "weekend", "weekly", "monthly"].map((type) => (
                <button
                  key={type}
                  className={`tab-btn ${rentalType === type ? "active" : ""}`}
                  onClick={() => {
                    setRentalType(type);
                    setDuration(1);
                  }}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>

            {/* DURATION INPUT */}
            <div className="duration-picker">
              <label>Number of {rentalType === "monthly" ? "Months" : rentalType === "weekly" ? "Weeks" : "Days"}:</label>
              <input
                type="number"
                min="1"
                value={duration}
                onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
              />
            </div>

            {/* FULFILLMENT SELECTOR */}
            <div className="fulfillment-selector">
              <label>Fulfillment Option:</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="fulfillment"
                    value="pickup"
                    checked={fulfillment === "pickup"}
                    onChange={() => setFulfillment("pickup")}
                  />
                  Hub Pickup (Free)
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="fulfillment"
                    value="delivery"
                    checked={fulfillment === "delivery"}
                    onChange={() => setFulfillment("delivery")}
                  />
                  Site Delivery (+$150)
                </label>
              </div>
            </div>

            {/* INSURANCE ALERT BANNER */}
            {pricing.requiresOutsideInsurance ? (
              <div className="insurance-banner monthly">
                <Info size={18} />
                <div>
                  <strong>Outside Insurance Required</strong>
                  <p>Monthly rentals require your own commercial policy (COI). Complete reservation deposit now to access VIN & Lienholder details inside your portal.</p>
                </div>
              </div>
            ) : (
              <div className="insurance-banner standard">
                <ShieldCheck size={18} />
                <div>
                  <strong>Standard Protection Included</strong>
                  <p>$25/day company protection fee automatically calculated.</p>
                </div>
              </div>
            )}

            {/* COST BREAKDOWN */}
            <div className="price-breakdown">
              <div className="breakdown-row">
                <span>Base Rental Rate</span>
                <span>${pricing.basePrice.toLocaleString()}</span>
              </div>

              {selectedAddOns.length > 0 && (
                <div className="breakdown-row">
                  <span>Selected Add-Ons</span>
                  <span>+${pricing.addOnsTotal.toLocaleString()}</span>
                </div>
              )}

              {!pricing.requiresOutsideInsurance && (
                <div className="breakdown-row">
                  <span>Rental Protection Fee ($25/day)</span>
                  <span>+${pricing.protectionFee.toLocaleString()}</span>
                </div>
              )}

              {fulfillment === "delivery" && (
                <div className="breakdown-row">
                  <span>Delivery Estimate</span>
                  <span>+${pricing.deliveryFee.toLocaleString()}</span>
                </div>
              )}

              <div className="breakdown-row highlight">
                <span>Refundable Security Deposit</span>
                <span>${TRAILER_DATA.securityDeposit.toLocaleString()}</span>
              </div>

              <div className="breakdown-divider"></div>

              <div className="breakdown-row total">
                <span>Total Due Now</span>
                <span>${pricing.totalDueNow.toLocaleString()}</span>
              </div>
            </div>

            {/* RESERVE BUTTON */}
            <button className="reserve-btn" type="button">
              Reserve Trailer & Create Portal <ArrowRight size={18} />
            </button>
            <p className="guarantee-note">🔒 Instant reservation holding. Clearance required before pickup.</p>
          </div>
        </div>
      </div>
    </div>
  );
}