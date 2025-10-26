import React, { useEffect, useState } from "react";

const Cart = ({ userId, token }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [adminId, setAdminId] = useState(null);
  const API_BASE = "http://localhost:8080";

  // ✅ Fetch user's cart
  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/cart/${userId}`, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Cart not found");
      const data = await res.json();
      console.log(data)
      await fetchProductsForCart(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch product details for each productId in the cart
  const fetchProductsForCart = async (cartData) => {
    try {
      const itemsWithDetails = await Promise.all(
        cartData.items.map(async (item) => {
          const res = await fetch(`${API_BASE}/product/getProductById/${item.productId}`);
          const productData = await res.json();
          return { ...item, product: productData };
        })
      );

      // ✅ Get the adminId from the first product (assuming same admin)
      if (itemsWithDetails.length > 0 && itemsWithDetails[0].product.addedBy) {
        setAdminId(itemsWithDetails[0].product.addedBy);
      }

      setCart({ ...cartData, items: itemsWithDetails });
    } catch (err) {
      console.error("Error fetching product details:", err);
    }
  };

  // 🗑️ Remove item from cart
  const handleRemoveItem = async (productId) => {
    try {
      const res = await fetch(`${API_BASE}/cart/remove/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      await fetchProductsForCart(data);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // 🔄 Clear entire cart
  const handleClearCart = async () => {
    try {
      await fetch(`${API_BASE}/cart/clear/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `${token}` },
      });
      setCart(null);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  // 🟢 Place Order with adminId in header
  const handleBuyNow = async () => {
    if (!cart || cart.items.length === 0) return alert("Cart is empty!");
    if (!adminId) return alert("Admin ID not found. Please try again.");

    setIsPlacingOrder(true);
    try {
      const orderBody = {
        userId: userId,
        paymentMethod: "COD",
        items: cart.items.map((item) => ({
          productId: item.productId,
          price: item.product?.discountedPrice || item.price,
          quantity: item.quantity,
          subtotal: (item.product?.discountedPrice || item.price) * item.quantity,
        })),
        totalPrice: cart.items.reduce(
          (sum, item) => sum + (item.product?.discountedPrice || item.price) * item.quantity,
          0
        ),
        status: "Order Placed",
      };

      const res = await fetch(`${API_BASE}/orders/placeOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
          adminId: adminId, // ✅ send adminId in header
        },
        body: JSON.stringify(orderBody),
      });

      if (!res.ok) throw new Error("Failed to place order");
      const orderData = await res.json();

      console.log("✅ Order placed successfully:", orderData);
      alert("🎉 Order placed successfully! Check 'My Orders' for details.");
      await handleClearCart();
    } catch (err) {
      console.error("Error placing order:", err);
      alert("❌ Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
        Loading your cart...
      </div>
    );

  if (!cart || !cart.items || cart.items.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">🛒 Your cart is empty</h1>
        <p className="text-gray-500">Start adding some amazing products!</p>
      </div>
    );

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + (item.product?.discountedPrice || item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-8 text-blue-700 border-b pb-3">🛍️ Your Cart</h1>

        {/* Items */}
        <div className="grid grid-cols-1 divide-y divide-gray-200">
          {cart.items.map((item, idx) => {
            const p = item.product;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center justify-between py-6 gap-6 hover:bg-gray-50 rounded-lg transition"
              >
                <div className="flex items-center gap-6 w-full sm:w-2/3">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-28 h-28 object-cover rounded-xl shadow-md border"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{p.name}</h2>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{p.description}</p>
                    <p className="text-gray-700 font-medium mt-2">₹{p.discountedPrice}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-gray-700">
                    Subtotal: ₹{(p.discountedPrice * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <p className="text-gray-700">
              Total Items: <span className="font-semibold">{totalItems}</span>
            </p>
            <p className="text-xl font-bold mt-2">
              Total Price: <span className="text-blue-700">₹{totalPrice.toLocaleString()}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Admin ID:</strong> {adminId || "Fetching..."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleClearCart}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Clear Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isPlacingOrder}
              className={`${
                isPlacingOrder ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
              } text-white px-8 py-2 rounded-lg font-semibold transition`}
            >
              {isPlacingOrder ? "Placing Order..." : "Buy Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
