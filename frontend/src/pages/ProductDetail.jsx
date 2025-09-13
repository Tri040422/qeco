import React from "react";
import { useParams } from "react-router-dom";
import products from "../data/products"; // import danh sách sản phẩm
import "../styles/style.css";
import { useCart } from "../hooks/useCart"; // import hook giỏ hàng

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  const { addToCart, cartItems } = useCart();
  const isInCart = product && cartItems.some((item) => item.id === product.id);

  if (!product) {
    return <p>Sản phẩm không tồn tại.</p>;
  }

  // Hàm format giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <section className="detail-section">
      <img src={product.image} alt={product.name} className="detail-img" />
      <div className="detail-info">
        <h2>{product.name}</h2>
        <p>{product.desc}</p>
        <strong>Giá: {formatPrice(product.price)}</strong>
        <br />
        <button
          onClick={() => !isInCart && addToCart(product)}
          disabled={isInCart}
          className={isInCart ? "btn-disabled" : "btn-add"}
        >
          {isInCart ? "✔ Đã có trong giỏ" : "🛒 Thêm vào giỏ"}
        </button>
      </div>
    </section>
  );
};

export default ProductDetail;
