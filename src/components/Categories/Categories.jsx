import React, { useEffect, useState } from 'react';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/product/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="categories-container">
      <h2 className="categories-title">Top Categories</h2>
      <div className="categories-grid">
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div className="category-card" key={index}>
              <div className="category-image">
                <img
                  src={`https://dummyimage.com/150x150/000/fff&text=${encodeURIComponent(category)}`} 
                  alt={category}
                />
              </div>
              <h3 className="category-name">{category}</h3>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
