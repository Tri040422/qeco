import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import "../styles/style.css";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="page-container detail-page">
        <h2>Sản phẩm không tồn tại</h2>
      </div>
    );
  }

  const formatPrice = (n) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(n);

  return (
    <div className="page-container detail-page">
      <div className="detail-top">
        {/* Hình ảnh */}
        <div className="detail-images">
          <img src={product.img} alt={product.name} className="detail-img" />
        </div>

        {/* Thông tin */}
        <div className="detail-info">
          <h1>{product.name}</h1>
          <div className="status">Còn hàng</div>
          <div className="rating">⭐⭐⭐⭐⭐ (4 đánh giá)</div>
          <div className="detail-price">{formatPrice(product.price)}</div>
          <p className="desc">
            {product.desc ||
              "Sản phẩm thủ công thân thiện môi trường, chất liệu bền nhẹ, chống nước và dễ lau chùi."}
          </p>

          <div className="qty-box">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
            <input type="text" value={qty} readOnly />
            <button onClick={() => setQty((q) => q + 1)}>+</button>
          </div>

          <button className="add-cart-btn">🛒 Thêm vào giỏ</button>
        </div>
      </div>

      {/* Related */}
      <div className="related">
        <h2 className="section-title">SẢN PHẨM KHÁC</h2>
        <div className="related-grid">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <div key={p.id} className="product-card">
                <img src={p.img} alt={p.name} />
                <p>{p.name}</p>
                <span>{formatPrice(p.price)}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
