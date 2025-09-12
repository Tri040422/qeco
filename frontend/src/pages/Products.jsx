import React from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "../styles/style.css";

const Products = () => {
  return (
    <section className="products">
      <h1>SẢN PHẨM</h1>
      <div className="product-list">
        {products.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};

export default Products;
