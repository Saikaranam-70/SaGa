import React, { useState } from "react";
import "./AdminNavbar.css";

const AdminNavbar = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    if (onLogout) onLogout();
    else window.location.href = "/login";
  };

  return (
    <header className="admin-header">
      <nav className="admin-navbar">
        <div className="nav-left">
          <h1 className="nav-logo">SaGa Admin</h1>
        </div>

        <div className={`nav-center ${menuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li><a href="/admin/dashboard">Dashboard</a></li>
            <li><a href="/admin/products">Products</a></li>
            <li><a href="/admin/orders">Orders</a></li>
            <li><a href="/admin/users">Users</a></li>
            <li><a href="/admin/reports">Reports</a></li>
          </ul>
        </div>

        <div className="nav-right">
          <div className="admin-profile">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Admin"
              className="admin-avatar"
            />
            <span className="admin-name">Admin</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <div
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </div>
      </nav>
    </header>
  );
};

export default AdminNavbar;
