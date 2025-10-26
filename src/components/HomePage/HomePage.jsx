import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/product/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  const fetchProducts = (category) => {
    if (!productsByCategory[category]) {
      fetch(`http://localhost:8080/product/getProductByCategory/${category}`)
        .then((res) => res.json())
        .then((data) =>
          setProductsByCategory((prev) => ({ ...prev, [category]: data }))
        )
        .catch(console.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Premium Store</h1>
      </header>

      <main className="max-w-7xl mx-auto py-10 px-4">
        {categories.map((category) => (
          <div key={category} className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">{category}</h2>
              <Link
                to={`/category/${category}`}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                View More
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productsByCategory[category]?.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 mt-1 text-sm line-clamp-3">{product.description}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-indigo-600 font-bold">
                        ₹{product.discountedPrice.toLocaleString()}
                      </span>
                      <span className="text-gray-400 line-through">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {!productsByCategory[category] && fetchProducts(category)}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default HomePage;
