import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import logo from "/images/logo.jpg";
import "../styles/style.css";

const Header = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();

  return (
    <header className="header">
      {/* Logo */}
      <Link to="/" className="header-logo">
        <img src={logo} alt="QeCo Logo" className="logo-image" />
      </Link>

      {/* Navigation */}
      <nav className="header-nav">
        <NavLink to="/" end>
          Trang chủ
        </NavLink>
        <NavLink to="/products">Sản phẩm</NavLink>
        <NavLink to="/contact">Liên hệ</NavLink>
      </nav>

      {/* Icons */}
      <div className="header-icons">
        <Link to="/cart" className="icon-btn">
          🛒 <span>({cartItems.length})</span>
        </Link>
        {user ? (
          <Link to="/profile" className="icon-btn">
            👤
          </Link>
        ) : (
          <Link to="/login" className="icon-btn">
            🔑
          </Link>
        )}
        <div className="divider"></div>
        <button className="icon-btn">☰</button>
      </div>
    </header>
  );
};

export default Header;
