import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const OffersCarousel = () => {
  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    try {
      const response = await fetch("http://localhost:8080/product/offer/getAll");
      const data = await response.json();
      setOffers(data);
    } catch (err) {
      console.error("Error fetching offers:", err);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <div className="w-full h-screen relative">
  <Slider {...settings}>
    {offers.map((offer) => (
      <div
        key={offer.offerId}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <img
          src={offer.imgUrl}
          alt={`Offer ${offer.offerId}`}
          className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
        />

        {/* Overlay Content (Text + Button) */}
        <div className="absolute inset-0 bg-black/30 flex flex-col items-start justify-center px-8 md:px-16">
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            {offer.title || "Special Offer!"}
          </h2>
          <p className="text-white/90 text-lg md:text-2xl mb-6 drop-shadow-md">
            {offer.description || "Grab it before it's gone!"}
          </p>
          <Link to='/shop'>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all">
            Shop Now
          </button>
          </Link>
        </div>
      </div>
    ))}
  </Slider>
</div>

  );
};

export default OffersCarousel;
