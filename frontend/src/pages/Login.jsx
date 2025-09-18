import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/style.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form.email, form.password);
    if (res.success) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.role === "admin") {
        navigate("/admin/orders");
      } else {
        navigate("/");
      }
    } else {
      alert(res.message);
    }
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
          Không có tài khoản? <Link to="/register">Đăng ký</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
