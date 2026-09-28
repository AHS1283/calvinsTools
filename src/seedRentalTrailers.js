// =========================================================
// ONE-TIME SCRIPT — run this once to seed Firestore's
// "rentalTrailers" collection, then delete this file.
// =========================================================

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // apne actual path ke hisaab se adjust karo

// Har item mein "sizes" default rakha hai — apne hisaab se
// baad me Firestore console se edit kar sakte ho.
const ALL_SIZES = ["10", "12", "14", "16", "20", "22"];

const foodTrailers = [
  {
    title: "Custom Food Trailers",
    description:
      "Purpose-built food trailer rentals designed around your menu, equipment, workflow, and business needs.",
    icon: "Utensils",
    category: "food",
    sizes: ALL_SIZES,
  },
  {
    title: "Mobile Kitchen Trailers",
    description:
      "Professional mobile kitchen rentals with practical layouts for catering, events, and food businesses.",
    icon: "Truck",
    category: "food",
    sizes: ALL_SIZES,
  },
  {
    title: "BBQ Food Trailers",
    description:
      "Built for BBQ businesses with layouts designed for smokers, prep areas, cooking equipment, and service.",
    icon: "Flame",
    category: "food",
    sizes: ALL_SIZES,
  },
  {
    title: "Pizza Trailers",
    description:
      "Mobile pizza trailer rentals designed for efficient preparation, cooking, storage, and customer service.",
    icon: "Flame",
    category: "food",
    sizes: ALL_SIZES,
  },
  {
    title: "Coffee Trailers",
    description:
      "Compact mobile coffee trailer rentals designed for cafes, events, markets, and high-volume service.",
    icon: "Coffee",
    category: "food",
    sizes: ALL_SIZES,
  },
  {
    title: "Dessert Trailers",
    description:
      "Flexible dessert trailer rentals for bakeries, sweet shops, events, festivals, and mobile businesses.",
    icon: "IceCream",
    category: "food",
    sizes: ALL_SIZES,
  },
  {
    title: "Ice Cream Trailers",
    description:
      "Mobile ice cream trailer rentals designed for convenient service, refrigeration, and customer flow.",
    icon: "IceCream",
    category: "food",
    sizes: ALL_SIZES,
  },
  {
    title: "Donut Trailers",
    description:
      "Mobile donut trailer rentals with practical layouts for preparation, cooking, display, and service.",
    icon: "Utensils",
    category: "food",
    sizes: ALL_SIZES,
  },
  {
    title: "Taco Trailers",
    description:
      "Purpose-built taco trailer rentals designed around prep, cooking, refrigeration, storage, and service.",
    icon: "Utensils",
    category: "food",
    sizes: ALL_SIZES,
  },
  {
    title: "Smoker Trailers",
    description:
      "Heavy-duty mobile smoker trailer rentals for BBQ professionals and catering businesses.",
    icon: "Flame",
    category: "food",
    sizes: ALL_SIZES,
  },
  {
    title: "Small Food Trailers",
    description:
      "Compact food trailer rentals for businesses looking for an efficient mobile setup with a smaller footprint.",
    icon: "Truck",
    category: "food",
    sizes: ALL_SIZES,
  },
  {
    title: "Mini Food Trailers",
    description:
      "Smaller mobile food rental solutions designed for simple menus, events, pop-ups, and new businesses.",
    icon: "Truck",
    category: "food",
    sizes: ALL_SIZES,
  },
];

const specialtyTrailers = [
  {
    title: "Refrigerated Trailers",
    description:
      "Mobile refrigeration rental solutions designed for temperature-sensitive products and commercial use.",
    icon: "Snowflake",
    category: "specialty",
    sizes: ALL_SIZES,
  },
  {
    title: "Nail Salon Trailers",
    description:
      "Professional mobile salon space rentals designed for beauty professionals and mobile services.",
    icon: "Store",
    category: "specialty",
    sizes: ALL_SIZES,
  },
  {
    title: "Mobile Retail Trailers",
    description:
      "Flexible mobile retail space rentals for brands, pop-ups, markets, events, and traveling businesses.",
    icon: "Store",
    category: "specialty",
    sizes: ALL_SIZES,
  },
  {
    title: "Mobile Bar Trailers",
    description:
      "Customizable mobile bar space rentals designed for events, hospitality businesses, and private functions.",
    icon: "Coffee",
    category: "specialty",
    sizes: ALL_SIZES,
  },
  {
    title: "Custom Commercial Trailers",
    description:
      "Commercial trailer rental solutions built around specialized business requirements and workflows.",
    icon: "Truck",
    category: "specialty",
    sizes: ALL_SIZES,
  },
];

async function seedRentalTrailers() {
  const rentalRef = collection(db, "rentalTrailers");

  const allItems = [...foodTrailers, ...specialtyTrailers];

  for (const item of allItems) {
    try {
      await addDoc(rentalRef, item);
      console.log("Added:", item.title);
    } catch (error) {
      console.error("Failed to add:", item.title, error);
    }
  }

  console.log("Seeding complete.");
}

seedRentalTrailers();