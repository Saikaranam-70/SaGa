import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/product/getProductByCategory/${categoryName}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">{categoryName}</h1>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
          Back Home
        </Link>
      </header>

      <main className="max-w-7xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;
