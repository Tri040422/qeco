import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios"; // chuẩn hóa baseURL
import "../styles/style.css";

const Cart = () => {
  const {
    cartItems,
    updateQty,
    removeFromCart,
    discount,
    setDiscount,
    coupon,
    setCoupon,
  } = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal - discount;

  const applyCoupon = async () => {
    try {
      const res = await api.post("/coupons/apply", {
        code,
        itemsPrice: subtotal,
      });
      setDiscount(res.data.discount);
      setCoupon(res.data.code);
      setMsg(`Áp dụng mã ${res.data.code} thành công!`);
    } catch (err) {
      setDiscount(0);
      setCoupon(null);
      setMsg(err.response?.data?.message || "Không áp dụng được mã");
    }
  };

  return (
    <div className="page-container">
      <h1 className="section-title">Giỏ hàng của tôi</h1>

      {cartItems.length === 0 ? (
        <p>Chưa có sản phẩm nào.</p>
      ) : (
        <div className="cart-content">
          {/* Bảng sản phẩm */}
          <table className="cart-table">
            <thead>
              <tr>
                <th>SẢN PHẨM</th>
                <th>GIÁ</th>
                <th>SỐ LƯỢNG</th>
                <th>TỔNG</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-img"
                    />
                    {item.name}
                  </td>
                  <td>{item.price.toLocaleString()}đ</td>
                  <td>
                    <div className="qty-box">
                      <button onClick={() => updateQty(item, item.qty - 1)}>
                        -
                      </button>
                      <input type="text" readOnly value={item.qty} />
                      <button onClick={() => updateQty(item, item.qty + 1)}>
                        +
                      </button>
                    </div>
                  </td>
                  <td>{(item.price * item.qty).toLocaleString()}đ</td>
                  <td>
                    <button onClick={() => removeFromCart(item)}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tóm tắt */}
          <div className="cart-summary">
            <h3>Tổng tiền</h3>
            <div className="flex-between">
              <span>Tạm tính</span>
              <span>{subtotal.toLocaleString()}đ</span>
            </div>
            {discount > 0 && (
              <div className="flex-between" style={{ color: "green" }}>
                <span>Giảm giá ({coupon})</span>
                <span>-{discount.toLocaleString()}đ</span>
              </div>
            )}
            <div className="flex-between">
              <span>Phí vận chuyển</span>
              <span>Miễn phí</span>
            </div>
            <div className="flex-between" style={{ fontWeight: "bold" }}>
              <span>Thành tiền</span>
              <span>{total.toLocaleString()}đ</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Thanh toán
            </button>
          </div>
        </div>
      )}

      {/* Voucher */}
      <div className="voucher-box">
        <input
          type="text"
          placeholder="Nhập mã"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="checkout-btn"
          style={{ flex: "0 0 auto" }}
          onClick={applyCoupon}
        >
          Áp dụng
        </button>
      </div>
      {msg && <p style={{ color: coupon ? "green" : "red" }}>{msg}</p>}

      {/* Nút điều hướng */}
      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <Link to="/" className="btn-gray">
          Trở lại trang chủ
        </Link>
        <Link to="/products" className="btn-gray">
          Thêm sản phẩm
        </Link>
      </div>
    </div>
  );
};

export default Cart;
