import React from "react";
import { Link } from "react-router-dom";

const formatVND = (n) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    n || 0
  );

const ProductCard = ({ data, addToCart }) => {
  if (!data) return null;

  const id = data._id || data.id;
  const img = data.image?.startsWith("/uploads")
    ? `${import.meta.env.VITE_BACKEND_URL}${data.image}`
    : data.image;

  return (
    <div className="product-card">
      {img && <img src={img} alt={data.name} className="product-img" />}
      <h4>{data.name}</h4>
      {data.desc && <p>{data.desc}</p>}
      <strong>{formatVND(data.price)}</strong>

      <div style={{ display: "flex", gap: 8 }}>
        <Link to={`/product/${id}`} className="btn btn-ghost">
          Xem chi tiết
        </Link>
        {addToCart && (
          <button onClick={() => addToCart(data)} className="btn btn-primary">
            Thêm vào giỏ
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
