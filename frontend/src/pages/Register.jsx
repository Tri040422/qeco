// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/style.css";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "customer", // mặc định
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }
    if (!form.agree) {
      alert("Bạn cần đồng ý với điều khoản!");
      return;
    }

    const res = await register(form.name, form.email, form.password, form.role);
    if (res.success) {
      navigate("/");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Đăng Ký</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Tên hiển thị"
            value={form.name}
            onChange={handleChange}
            required
          />
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

          {/* Chọn vai trò */}
          <div className="role-select">
            <label>
              <input
                type="radio"
                name="role"
                value="customer"
                checked={form.role === "customer"}
                onChange={handleChange}
              />
              Khách hàng
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={form.role === "admin"}
                onChange={handleChange}
              />
              Chủ shop
            </label>
          </div>

          <label className="checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
            />
            Đồng ý với các điều khoản
          </label>

          <button type="submit" className="auth-btn">
            Tạo tài khoản
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
