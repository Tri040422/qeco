import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ data = {} }) => {
  const {
    id,
    name = "Tên sản phẩm",
    desc = "Mô tả ngắn",
    price = "$0",
    image,
  } = data;

  return (
    <Link
      to={`/product/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="product">
        {image && <img src={image} alt={name} className="product-img" />}
        <h4>{name}</h4>
        <p>{desc}</p>
        <strong>{price}</strong>
      </div>
    </Link>
  );
};

export default ProductCard;
