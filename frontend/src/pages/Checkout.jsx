// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
    navigate("/order-confirmation");
  };

  return (
    <div className="page-container">
      <h1 className="section-title">Thanh toán</h1>
      <div className="checkout-content">
        {/* Form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            required
            onChange={handleChange}
          />
          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              required
              onChange={handleChange}
            />
          </div>
          <label>
            <input type="checkbox" /> Vận chuyển tới địa chỉ khác
          </label>
          <textarea
            name="note"
            placeholder="Ghi chú (không bắt buộc)"
            onChange={handleChange}
          ></textarea>
          <button type="submit" className="checkout-btn">
            Thanh toán
          </button>
        </form>

        {/* Tóm tắt */}
        <div className="checkout-summary">
          <h3>Sản phẩm</h3>
          {cartItems.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
              }}
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <span>{(item.price * item.qty).toLocaleString()}đ</span>
            </div>
          ))}
          <hr />
          <div className="flex-between">
            <span>Thành tiền</span>
            <span>{total.toLocaleString()}đ</span>
          </div>
          <div className="flex-between">
            <span>Phí vận chuyển</span>
            <span>Miễn phí</span>
          </div>
          <div className="flex-between" style={{ fontWeight: "bold" }}>
            <span>Tổng</span>
            <span>{total.toLocaleString()}đ</span>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label>
              <input type="radio" name="pay" defaultChecked /> Thanh toán khi
              nhận hàng
            </label>
            <br />
            <label>
              <input type="radio" name="pay" /> Thẻ tín dụng
            </label>
            <br />
            <label>
              <input type="radio" name="pay" /> Thẻ nội địa Napas
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
