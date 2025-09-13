import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ data = {}, addToCart }) => {
  const {
    id,
    name = "Tên sản phẩm",
    desc = "Mô tả ngắn",
    price = 0,
    image,
  } = data;

  return (
    <div className="product-card">
      <Link
        to={`/product/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={image || "/placeholder.png"}
          alt={name}
          className="product-img"
        />
        <h4>{name}</h4>
        <p>{desc}</p>
        <strong>{price.toLocaleString("vi-VN")} ₫</strong>
      </Link>

      <button
        className="add-to-cart-btn"
        onClick={() => addToCart && addToCart(data)}
      >
        Thêm vào giỏ
      </button>
    </div>
  );
};

export default ProductCard;
