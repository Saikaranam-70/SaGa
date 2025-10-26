import React, { useEffect, useState } from 'react';
import './TopDiscounts.css';

const TopDiscounts = () => {
  const [topDiscounts, setTopDiscounts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollInterval = 3000;

  useEffect(() => {
    const fetchTopDiscounts = async () => {
      try {
        const response = await fetch('http://localhost:8080/product/top-discounts');
        const data = await response.json();
        setTopDiscounts(data);
      } catch (error) {
        console.error('Error fetching top discounts:', error);
      }
    };

    fetchTopDiscounts();
  }, []);

  useEffect(() => {
    if (topDiscounts.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topDiscounts.length);
      }, scrollInterval);
      return () => clearInterval(interval);
    }
  }, [topDiscounts]);

  if (topDiscounts.length === 0) {
    return <div className="loading">Loading top discounts...</div>;
  }

  return (
    <div className="top-discounts-container">
      <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {topDiscounts.map((product, index) => (
          <div className="slide" key={product.id || index}>
            <img
              src={`http://localhost:8080/product/images/${product.imageUrl}`}
              alt={product.name}
              onError={(e) => (e.target.src = '/images/placeholder.png')}
            />
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>

      <div className="dots">
        {topDiscounts.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            role="button"
            aria-label={`Go to slide ${index + 1}`}
          ></span>
        ))}
      </div>

      <div className="arrows">
        <button
          onClick={() => setCurrentIndex((currentIndex - 1 + topDiscounts.length) % topDiscounts.length)}
          aria-label="Previous slide"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrentIndex((currentIndex + 1) % topDiscounts.length)}
          aria-label="Next slide"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default TopDiscounts;
