import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { FiShoppingCart, FiUser, FiLogIn, FiMenu } from "react-icons/fi";
import logo from "/images/logo.jpg";
import "../styles/style.css";

const Header = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

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
          <FiShoppingCart /> <span>({cartItems.length})</span>
        </Link>
        {user ? (
          <Link to="/profile" className="icon-btn">
            <FiUser />
          </Link>
        ) : (
          <Link to="/login" className="icon-btn">
            <FiLogIn />
          </Link>
        )}
        <div className="divider"></div>
        <button className="icon-btn" onClick={() => setOpen(!open)}>
          <FiMenu />
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="mobile-nav">
          <NavLink to="/" end onClick={() => setOpen(false)}>
            Trang chủ
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            Sản phẩm
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Liên hệ
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
