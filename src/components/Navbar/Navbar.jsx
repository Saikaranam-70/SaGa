import { useState, useEffect } from "react";
import { ShoppingCart, User, Menu, X, Search, LogOut } from "lucide-react";
import { Link as BrowserLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-3xl font-extrabold text-blue-600 tracking-tight cursor-pointer"
        >
          Sa<span className="text-gray-900">Ga</span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-6 items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <Search className="text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="bg-transparent flex-1 ml-2 outline-none text-gray-700 placeholder-gray-500"
          />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {["Home", "Shop", "Categories", "Offers", "About", "Contact"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-gray-700 hover:text-blue-600 font-medium transition-all hover:scale-105"
              >
                {link}
              </a>
            )
          )}
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <BrowserLink to='/cart'>
          <button className="relative">
            <ShoppingCart className="text-gray-700 hover:text-blue-600 transition-transform hover:scale-110" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              2
            </span>
          </button>
          </BrowserLink>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700 transition"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          ) : (
            <BrowserLink to="/login">
              <button>
                <User className="text-gray-700 hover:text-blue-600 transition-transform hover:scale-110" />
              </button>
            </BrowserLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-gray-700 hover:text-blue-600 transition"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-inner">
          <div className="flex flex-col space-y-3 px-6 py-4">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-gray-100 w-full px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
            {["Home", "Shop", "Categories", "Offers", "About", "Contact"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  {link}
                </a>
              )
            )}
            <div className="flex space-x-4 mt-3">
              <ShoppingCart className="text-gray-700 hover:text-blue-600" />
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              ) : (
                <BrowserLink to="/login">
                  <User className="text-gray-700 hover:text-blue-600" />
                </BrowserLink>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
