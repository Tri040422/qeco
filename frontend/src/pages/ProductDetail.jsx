import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/style.css";
import { useCart } from "../hooks/useCart";
import axios from "axios";
import staticProducts from "../data/products";

const SOURCE = import.meta.env.VITE_PRODUCTS_SOURCE || "api";
const BASE = import.meta.env.VITE_BACKEND_URL;

const mapImage = (p) => ({
  ...p,
  id: p._id || p.id,
  image: p.image?.startsWith("/uploads") ? `${BASE}${p.image}` : p.image,
});

const ProductDetail = () => {
  const { id } = useParams(); // có thể là ObjectId (API) hoặc số (static)
  const [product, setProduct] = useState(null);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const pickStatic = () => {
      const numericId = Number(id);
      const p = staticProducts.find((x) => x.id === numericId);
      return p ? mapImage(p) : null;
    };

    const loadStatic = () => setProduct(pickStatic());

    const loadApi = async () => {
      try {
        const res = await axios.get(`${BASE}/api/products/${id}`);
        const p = mapImage(res.data);
        setProduct(p);
      } catch {
        // API fail → fallback static (hữu ích khi route dùng số id)
        setProduct(pickStatic());
      }
    };

    if (SOURCE === "static") loadStatic();
    else loadApi();
  }, [id]);

  if (!product) return <p>Đang tải sản phẩm...</p>;

  const isInCart = cartItems.some((item) => item.id === product.id);
  const formatPrice = (price) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  return (
    <section className="detail-section">
      {product.image && (
        <img src={product.image} alt={product.name} className="detail-img" />
      )}
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
