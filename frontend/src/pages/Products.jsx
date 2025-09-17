import React, { useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products";
import "../styles/style.css";

const Products = () => {
  const [page, setPage] = useState(1);
  const perPage = 8;
  const totalPages = Math.ceil(products.length / perPage);

  const currentProducts = products.slice((page - 1) * perPage, page * perPage);

  const fmt = (n) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(n);

  return (
    <div className="products-page">
      <h2 className="products-title">SẢN PHẨM</h2>
      <div className="products-grid">
        {currentProducts.map((p) => (
          <Link key={p.id} to={`/products/${p.id}`} className="product-card">
            <img src={p.img} alt={p.name} />
            <p>{p.name}</p>
            <span>{fmt(p.price)}</span>
          </Link>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`page-btn ${page === i + 1 ? "active" : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="page-btn"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Products;
