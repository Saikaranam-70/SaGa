import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const ShopNow = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/product/getAllProducts");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Shop Now</h2>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by product, category or brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.productId}
            className="bg-gray-100 rounded-2xl shadow-lg overflow-hidden relative cursor-pointer hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-60 object-cover"
              onClick={() => navigate(`/product/${product.productId}`)}
            />

            <button
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-200 transition"
              onClick={() => console.log(`Added ${product.name} to cart`)}
            >
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
            </button>

            <div className="p-4">
              <h3
                className="text-lg font-semibold mb-2 text-gray-800 hover:text-blue-600"
                onClick={() => navigate(`/product/${product.productId}`)}
              >
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2 truncate">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-bold">
                  ₹{product.discountedPrice.toLocaleString()}
                </span>
                {product.discount > 0 && (
                  <span className="text-sm text-red-500 line-through">
                    ₹{product.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500 mt-12">
            No products found for "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
};

export default ShopNow;
