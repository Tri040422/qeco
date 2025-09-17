// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/style.css";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: gọi API login
    console.log("Đăng nhập:", form);
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Đăng nhập</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div className="auth-options">
            <label className="checkbox">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              Ghi nhớ tôi
            </label>
            <Link to="/forgot" className="forgot-link">
              Quên mật khẩu
            </Link>
          </div>
          <button type="submit" className="auth-btn">
            Đăng nhập
          </button>
        </form>
        <div className="auth-footer">
          Không có tài khoản? <Link to="/register">Đăng Ký</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
