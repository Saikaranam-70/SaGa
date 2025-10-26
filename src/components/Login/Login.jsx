import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/authentication/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.userId);

        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(result.message || "Login failed. Please try again.");
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
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 cursor-pointer text-blue-600 font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-white rounded-xl font-semibold transition ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {/* Extra Links */}
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </p>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Forget Password?{" "}
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-blue-600 font-medium cursor-pointer hover:underline"
              >
                Reset
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
