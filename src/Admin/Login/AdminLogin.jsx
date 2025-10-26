import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Login successful!");
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminId", data.userId);
        setFormData({ email: "", password: "" });
        // redirect to dashboard or home
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 1500);
      } else {
        toast.error(data.message || "Invalid credentials!");
      }
    } catch (error) {
      toast.error("Something went wrong! Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Toaster position="top-center" />
      <div className="login-box">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to access your account</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="signup-text">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
