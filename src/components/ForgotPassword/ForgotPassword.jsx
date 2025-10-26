import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://localhost:8080/user/forgot-password?email=${email}`,
        {
          method: "POST",
        }
      );
      const result = await response.json();

      if (response.ok) {
        toast.success("Password reset link sent to your email!");
        navigate("/login"); // Redirect to login
      } else {
        toast.error(result.message || "Failed to send reset link");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-white rounded-xl font-semibold transition ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center mt-4">
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Back to Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
