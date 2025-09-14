import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // ✅ import hook

const Header = () => {
  const { user, logout } = useAuth(); // ✅ lấy user & logout từ context

  return (
    <header className="header sticky">
      <div className="logo-container">
        <img
          src="/images/logo-qeco.jpg"
          alt="QeCo Logo"
          className="logo-image"
        />
        <div className="logo-text-gradient">
          <span className="qc">Q</span>
          <span className="eo">e</span>
          <span className="qc">C</span>
          <span className="eo">o</span>
        </div>
      </div>

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
            <Link to="/cart">Giỏ hàng</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>

          {user ? (
            <>
              <li>Xin chào, {user.name || user.email}</li>
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

      <div className="search-box">
        <input
          type="text"
          placeholder="Bạn cần tìm gì?"
          onChange={(e) => console.log("search:", e.target.value)}
        />
        <button>🔍</button>
      </div>
    </header>
  );
};

export default Header;
