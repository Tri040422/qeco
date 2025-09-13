import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "../styles/style.css";

const Products = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const filteredProducts = products
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.priceValue - b.priceValue;
      if (sort === "price-desc") return b.priceValue - a.priceValue;
      return 0;
    });

  return (
    <section className="products">
      <h1>SẢN PHẨM</h1>

      {/* Search + Sort */}
      <div className="controls">
        <input
          type="text"
          placeholder="Tìm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="sort-select"
        >
          <option value="">Sắp xếp</option>
          <option value="price-asc">Giá: Thấp đến Cao</option>
          <option value="price-desc">Giá: Cao đến Thấp</option>
        </select>
      </div>

      {/* List */}
      <div className="product-list">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};

export default Products;
