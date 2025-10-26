import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CategorySection.css';

const CategorySection = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/product/getProductByCategory/${category}`);
        const data = await response.json();
        setProducts(data.slice(0, 4)); // Show the first 4 products, this can be adjusted
      } catch (error) {
        console.error(`Error fetching products for ${category}:`, error);
      }
    };

    fetchProducts();
  }, [category]);

  if (products.length === 0) return null;

  return (
    <div className="category-section">
      <div className="category-header">
        <h2>{category}</h2>
        <Link to={`/category/${category}`} className="view-more">
          View More →
        </Link>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={`http://localhost:8080/product/images/${product.imageUrl}`}
              alt={product.name}
              className="product-image"
            />
            <h4>{product.name}</h4>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
