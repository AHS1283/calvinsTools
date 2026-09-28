import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SocialSidebar from "./components/SocialSidebar/SocialSidebar";

import Home from "./pages/Home/Home";
import TrailersForSale from "./pages/TrailersForSale/TrailersForSale";
import TrailerDetails from "./pages/TrailerDetails/TrailerDetails";
import TrailersForRent from "./pages/TrailersForRent/TrailersForRent";
import TrailerRental from "./pages/TrailerRental/TrailerRental";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/trailers-for-sale"
          element={<TrailersForSale />}
        />

        <Route
          path="/trailers-for-sale/:slug"
          element={<TrailerDetails />}
        />

        <Route
          path="/trailers-for-rent"
          element={<TrailersForRent />}
        />

        <Route
          path="/trailers-for-rent/:slug"
          element={<TrailerDetails />}
        />

        <Route
          path="/trailerrental"
          element={<TrailerRental />}
        />

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>

      <SocialSidebar />

      <Footer />
    </>
  );
}

export default App;