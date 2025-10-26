import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Registration successful! Please verify your email.");
        setFormData({ name: "", email: "", password: "", phone: "" });
      } else {
        toast.error(data.message || "User already exists!");
      }
    } catch (error) {
      toast.error("Something went wrong! Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="register-box">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
