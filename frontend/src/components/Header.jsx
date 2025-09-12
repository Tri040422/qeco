import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="header">
    <div className="logo-container">
      <img src="/images/logo-qeco.jpg" alt="QeCo Logo" className="logo-image" />
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
          <Link to="/register">Đăng ký</Link>
        </li>
        <li>
          <Link to="/login">Đăng nhập</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
      </ul>
    </nav>
    <div className="search-box">
      <input type="text" placeholder="Bạn cần tìm gì?" /> <button>🔍</button>
    </div>
  </header>
);
export default Header;
