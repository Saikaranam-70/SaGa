import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            SaGa is your one-stop online shop offering a wide range of products. Quality products, fast delivery, and top-notch customer support.
          </p>
        </div>
        
        <div className="footer-section">
          <h4>Customer Service</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/shipping">Shipping Policy</Link></li>
            <li><Link to="/returns">Return Policy</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/category/Dress">Dress</Link></li>
            <li><Link to="/category/Mobile">Mobile</Link></li>
            <li><Link to="/category/BackCover">Back Covers</Link></li>
            <li><Link to="/category/Other">Other Products</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul className="social-icons">
            <li>
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <FaFacebookF />
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedinIn />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SaGa. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
