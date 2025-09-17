// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/style.css";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }
    if (!form.agree) {
      alert("Bạn cần đồng ý với điều khoản!");
      return;
    }
    // TODO: gọi API đăng ký
    console.log("Đăng ký:", form);
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Đăng Ký</h2>
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
          <input
            type="password"
            name="confirm"
            placeholder="Nhập lại mật khẩu"
            value={form.confirm}
            onChange={handleChange}
            required
          />
          <label className="checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            Đồng ý với các điều khoản của chúng tôi
          </label>
          <button type="submit" className="auth-btn">
            Create Account
          </button>
        </form>
        <div className="auth-footer">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
