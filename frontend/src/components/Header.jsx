import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

// import ảnh từ public (Vite cho phép import đường dẫn tuyệt đối bắt đầu bằng /)
import logo from "/images/logo-qeco.jpg";

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search)}`);
      setSearch("");
    }
  };

  return (
    <header className="header sticky">
      {/* Logo */}
      <Link to="/" className="logo-container">
        <img src={logo} alt="QeCo Logo" className="logo-image" />
        <div className="logo-text-gradient">
          <span className="qc">Q</span>
          <span className="eo">e</span>
          <span className="qc">C</span>
          <span className="eo">o</span>
        </div>
      </Link>

      {/* Navigation */}
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            <Link to="/products">Sản phẩm</Link>
          </li>
          <li>
            <Link to="/contact">Liên hệ</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/cart">Giỏ hàng ({cartItems.length})</Link>
          </li>

          {user ? (
            <>
              <li>Xin chào, {user.username || user.email}</li>
              {user.role === "admin" && (
                <li>
                  <Link to="/admin">Quản trị</Link>
                </li>
              )}
              <li>
                <button onClick={logout} className="logout-btn">
                  Đăng xuất
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Đăng ký</Link>
              </li>
              <li>
                <Link to="/login">Đăng nhập</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Search box */}
      <form className="search-box" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Bạn cần tìm gì?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
    </header>
  );
};

export default Header;
