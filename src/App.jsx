import React from "react";
import Navbar from "./components/Navbar/Navbar";
import OffersCarousel from "./components/OffersCarousel/OffersCarousel";
import Categories from "./components/Categories/Categories";
import TopDiscounts from "./components/TopDiscounts/TopDiscounts";
import HomePage from "./components/HomePage/HomePage";
import SignUp from "./components/SignUp/SignUp";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div className="bg-gray-50">
      {/* Navbar */}
      

      {/* Carousel at the very top */}
      <section className="w-full">
        <OffersCarousel />
      </section>

      {/* Main Home Content */}
      <main className="max-w-7xl mx-auto px-4 py-16 space-y-16">
  
        <HomePage />
      </main>

      <Footer />
    </div>
  );
};

export default App;
