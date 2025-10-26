import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_BASE = "http://localhost:8080";

const Orders = ({ userId, token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all user orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/orders/user/${userId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = await res.json();

      // Fetch product details for each order item
      const ordersWithProducts = await Promise.all(
        data.map(async (order) => {
          const itemsWithDetails = await Promise.all(
            order.items.map(async (item) => {
              const prodRes = await fetch(`${API_BASE}/product/getProductById/${item.productId}`);
              const productData = await prodRes.json();
              return { ...item, product: productData };
            })
          );
          return { ...order, items: itemsWithDetails };
        })
      );

      setOrders(ordersWithProducts);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-lg font-semibold text-gray-600">
        Loading your orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-lg font-semibold text-gray-500">
        No orders found.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h2>

      {orders.map((order) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-lg rounded-2xl p-5 mb-8 border border-gray-200"
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-semibold text-gray-700">
                Order ID: <span className="text-gray-600">{order.id}</span>
              </p>
              <p className="text-sm text-gray-500">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`px-4 py-1 text-sm rounded-full font-semibold ${
                  order.status === "Order Placed"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "Shipped"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>

          {/* Animated status bar */}
          <motion.div
            className="h-2 bg-gray-200 rounded-full mb-6"
            initial={{ width: "0%" }}
            animate={{
              width:
                order.status === "Order Placed"
                  ? "30%"
                  : order.status === "Shipped"
                  ? "70%"
                  : "100%",
              backgroundColor:
                order.status === "Order Placed"
                  ? "#FACC15"
                  : order.status === "Shipped"
                  ? "#3B82F6"
                  : "#22C55E",
            }}
            transition={{ duration: 0.8 }}
          />

          <div className="grid gap-4 md:grid-cols-2">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border rounded-xl p-3 hover:shadow-md transition"
              >
                <img
                  src={item.product?.imageUrl || "/placeholder.jpg"}
                  alt={item.product?.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {item.product?.name}
                  </p>
                  <p className="text-gray-500 text-sm line-clamp-2">
                    {item.product?.description}
                  </p>
                  <p className="mt-1 text-sm text-gray-700">
                    Quantity: <span className="font-medium">{item.quantity}</span>
                  </p>
                  <p className="mt-1 font-semibold text-gray-800">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-5 border-t pt-4 text-gray-700">
            <p>
              Payment Method:{" "}
              <span className="font-medium">{order.paymentMethod}</span>
            </p>
            <p className="font-bold text-lg">Total: ₹{order.totalPrice.toLocaleString()}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Orders;
