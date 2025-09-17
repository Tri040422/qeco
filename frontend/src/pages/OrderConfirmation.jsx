// src/pages/OrderConfirmation.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const OrderConfirmation = () => {
  return (
    <div className="order-success">
      <h1 className="success-text">Đặt hàng thành công</h1>
      <Link to="/" className="back-home">
        ← Về trang chủ
      </Link>
    </div>
  );
};

export default OrderConfirmation;
