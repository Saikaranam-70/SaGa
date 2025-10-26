import React, { useState } from "react";
import { link } from "../../roteUrl/Link";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showResendSection, setShowResendSection] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // register user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Registration successful! Check your email for verification.");
        setFormData({ name: "", email: "", password: "", phone: "" });
      } else {
        toast.error(result.message || "Something went wrong during registration.");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // resend verification
  const handleResendVerification = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    setIsResending(true);
    try {
      const response = await fetch(`${link}/user/resend-verification-token/${email}`);
      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Verification email sent successfully!");
        setEmail("");
      } else {
        toast.error(result.message || "Failed to send verification email.");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      {/* Sign Up Form */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
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

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold text-white transition ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </form>

        {/* Links Below Form */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-gray-700 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
          <p
            onClick={() => setShowResendSection(!showResendSection)}
            className="text-sm text-purple-600 font-semibold cursor-pointer hover:underline"
          >
            Not verified yet? Resend verification
          </p>
        </div>
      </div>

      {/* Resend Verification Form (hidden until clicked) */}
      {showResendSection && (
        <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 mt-6 transition-all duration-300">
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">
            Resend Verification Email
          </h2>

          <form onSubmit={handleResendVerification} className="space-y-5">
            <input
              type="email"
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <button
              type="submit"
              disabled={isResending}
              className={`w-full py-3 rounded-xl font-semibold text-white transition ${
                isResending
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {isResending ? "Sending..." : "Resend Verification"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUp;
