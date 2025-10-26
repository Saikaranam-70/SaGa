import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [inCart, setInCart] = useState(false);

  const userId = localStorage.getItem("userId"); // logged-in user

  // Fetch product
  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:8080/product/getProductById/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      console.error("Error fetching product:", err);
    } finally {
      setLoading(false);
    }
  };

  // Check if product already in user's cart
  const checkInCart = async () => {
    if (!userId || !product) return;
    try {
      const res = await fetch(`http://localhost:8080/cart/${userId}`);
      if (res.ok) {
        const cart = await res.json();
        const exists = cart.items?.some((i) => i.productId === product.productId);
        setInCart(exists);
      }
    } catch (err) {
      console.error("Error checking cart:", err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    checkInCart();
  }, [product]);

  // Add item to cart or redirect if exists
  const handleAddToCart = async () => {
    if (!userId) {
      toast.error("Please login to add products to cart");
      return;
    }

    // If already in cart, redirect to cart page
    if (inCart) {
      toast("Product already in cart! Redirecting...", { icon: "🛒" });
      navigate("/cart");
      return;
    }

    setAddingToCart(true);
    const toastId = toast.loading("Adding to cart...");

    try {
      const res = await fetch(`http://localhost:8080/cart/add/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.productId,
          name: product.name,
          price: product.discountedPrice,
          quantity: 1,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Product added to cart!", { id: toastId });
        setInCart(true);
      } else {
        toast.error(data.message || "Failed to add to cart", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Try again later", { id: toastId });
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-20 text-gray-500">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20 text-red-500">Product not found!</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative group">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-2xl shadow-lg group-hover:scale-105 transform transition-transform duration-500"
          />
          <span
            onClick={handleAddToCart}
            className="absolute top-4 right-4 bg-white p-3 rounded-full shadow hover:bg-gray-200 cursor-pointer transition"
          >
            <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
          </span>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.discountedPrice.toLocaleString()}
              </span>
              {product.discount > 0 && (
                <span className="text-gray-500 line-through">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
              {product.discount > 0 && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.attributes.map((attr, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-gray-500 text-sm">{attr.key}</span>
                  <span className="text-gray-900 font-semibold">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className={`flex-1 py-3 ${
                inCart
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-semibold rounded-xl transition`}
            >
              {inCart ? "Go to Cart" : addingToCart ? "Adding..." : "Add to Cart"}
            </button>
            <button
              onClick={() => console.log(`Buying ${product.name}`)}
              className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Info */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Product Details</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Category: {product.category}</li>
          <li>Brand: {product.brand}</li>
          <li>Stock: {product.stock}</li>
          <li>Average Rating: {product.averageRating}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductPage;
