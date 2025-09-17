// src/pages/Cart.jsx
import React from "react";
import { useCart } from "../hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import "../styles/style.css";

const Cart = () => {
  const { cartItems, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

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
              <span>Tổng tạm tính</span>
              <span>{total.toLocaleString()}đ</span>
            </div>
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
        <input type="text" placeholder="Nhập mã" />
        <button className="checkout-btn" style={{ flex: "0 0 auto" }}>
          Áp dụng
        </button>
      </div>

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
