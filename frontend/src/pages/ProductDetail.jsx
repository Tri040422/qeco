import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products"; // import mảng sản phẩm
import "../styles/style.css";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <p>Sản phẩm không tồn tại.</p>;
  }

  return (
    <section className="detail-section">
      <img src={product.image} alt={product.name} className="detail-img" />
      <div className="detail-info">
        <h2>{product.name}</h2>
        <p>{product.desc}</p>
        <strong>Giá: {product.price}</strong>
        <br />
        <button>🛒 Thêm vào giỏ</button>
      </div>
    </section>
  );
};

export default ProductDetail;
