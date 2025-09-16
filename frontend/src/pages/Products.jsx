import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/style.css";
import { useCart } from "../hooks/useCart";
import staticProducts from "../data/products";

const SOURCE = import.meta.env.VITE_PRODUCTS_SOURCE || "api";
const BASE = import.meta.env.VITE_BACKEND_URL;

const mapImage = (p) => ({
  ...p,
  id: p._id || p.id,
  image: p.image?.startsWith("/uploads") ? `${BASE}${p.image}` : p.image,
});

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const loadStatic = () => setProducts(staticProducts.map(mapImage));
    const loadApi = async () => {
      try {
        const res = await axios.get(`${BASE}/api/products`);
        const list = (res.data || []).map(mapImage);
        setProducts(list.length ? list : staticProducts.map(mapImage));
      } catch {
        setProducts(staticProducts.map(mapImage));
      }
    };
    SOURCE === "static" ? loadStatic() : loadApi();
  }, []);

  const filtered = products
    .filter((i) => i.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "price-asc"
        ? a.price - b.price
        : sort === "price-desc"
        ? b.price - a.price
        : 0
    );

  return (
    <section className="products">
      <h1>SẢN PHẨM</h1>
      <div className="controls">
        <input
          className="search-input"
          placeholder="Tìm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sắp xếp</option>
          <option value="price-asc">Giá: Thấp đến Cao</option>
          <option value="price-desc">Giá: Cao đến Thấp</option>
        </select>
      </div>
      <div className="product-list">
        {filtered.length === 0 ? (
          <p>Không có sản phẩm nào.</p>
        ) : (
          filtered.map((item) => (
            <ProductCard key={item.id} data={item} addToCart={addToCart} />
          ))
        )}
      </div>
    </section>
  );
};

export default Products;
