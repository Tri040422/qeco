import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left */}
      <div className="footer-left">
        <div className="footer-logo">
          <span style={{ color: "#fdd600" }}>Q</span>
          <span style={{ color: "#00a8cc" }}>e</span>
          <span style={{ color: "#fdd600" }}>C</span>
          <span style={{ color: "#00a8cc" }}>o</span>
        </div>
        <p>
          Quét để kết nối
          <br />
          Sống càng thêm xanh
        </p>
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            Fb
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Ig
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            Tw
          </a>
        </div>
      </div>

      {/* Right links */}
      <div className="footer-links">
        <div>
          <h4>Thông tin</h4>
          <ul>
            <li>
              <Link to="/about">Về QeCo</Link>
            </li>
            <li>
              <Link to="/custom">Custom theo yêu cầu</Link>
            </li>
            <li>
              <Link to="/faq">Câu hỏi thường gặp</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>Hỗ trợ</h4>
          <ul>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
            <li>
              <Link to="/returns">Đổi trả hàng</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
