import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";
import "../styles/style.css";
import { useCart } from "../hooks/useCart"; // ✅ lấy hook từ context

const Products = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const { addToCart } = useCart(); // ✅ lấy hàm addToCart

  const filteredProducts = products
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
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
          <ProductCard key={item.id} data={item} addToCart={addToCart} />
          // ✅ truyền addToCart
        ))}
      </div>
    </section>
  );
};

export default Products;
