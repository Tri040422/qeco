import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Checkout = () => {
  const { cartItems, discount, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    note: "",
    paymentMethod: "cod",
  });

  const itemsPrice = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const totalPrice = Math.max(0, itemsPrice - discount);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/orders", {
        shippingAddress: {
          name: form.name,
          address: form.address,
          phone: form.phone,
          email: form.email,
          note: form.note,
        },
        paymentMethod: form.paymentMethod,
        items: cartItems.map((i) => ({
          product: i._id,
          qty: i.qty,
        })),
        discount,
        totalPrice,
      });
      clearCart();
      navigate(`/order/${res.data.orderId}`);
    } catch (err) {
      alert(err.response?.data?.message || "❌ Lỗi đặt hàng");
    }
  };

  return (
    <div className="page-container">
      <h1 className="section-title">Thanh toán</h1>
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            required
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Địa chỉ"
            required
            value={form.address}
            onChange={handleChange}
          />
          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="note"
            placeholder="Ghi chú (không bắt buộc)"
            value={form.note}
            onChange={handleChange}
          />

          <h3>Phương thức thanh toán</h3>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={form.paymentMethod === "cod"}
              onChange={handleChange}
            />
            Thanh toán khi nhận hàng
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="vnpay"
              checked={form.paymentMethod === "vnpay"}
              onChange={handleChange}
            />
            VNPay
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="momo"
              checked={form.paymentMethod === "momo"}
              onChange={handleChange}
            />
            Momo
          </label>

          <button type="submit" className="checkout-btn">
            Đặt hàng
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Tóm tắt đơn hàng</h3>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex-between"
              style={{ marginBottom: "0.5rem" }}
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <span>{(item.price * item.qty).toLocaleString()}đ</span>
            </div>
          ))}
          <hr />
          <div className="flex-between">
            <span>Tạm tính</span>
            <span>{itemsPrice.toLocaleString()}đ</span>
          </div>
          <div className="flex-between">
            <span>Giảm giá</span>
            <span>-{discount.toLocaleString()}đ</span>
          </div>
          <div className="flex-between" style={{ fontWeight: "bold" }}>
            <span>Tổng</span>
            <span>{totalPrice.toLocaleString()}đ</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
