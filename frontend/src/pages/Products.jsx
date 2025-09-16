import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import "../styles/style.css";
import { useCart } from "../hooks/useCart";
// dữ liệu tĩnh (giữ lại file này)
import staticProducts from "../data/products";

const SOURCE = import.meta.env.VITE_PRODUCTS_SOURCE || "api";
const BASE = import.meta.env.VITE_BACKEND_URL;

const mapImage = (p) => ({
  ...p,
  // map id để ProductCard/link cũ vẫn chạy (trước đây bạn dùng item.id)
  id: p._id || p.id,
  image: p.image?.startsWith("/uploads") ? `${BASE}${p.image}` : p.image, // /images/... dùng ảnh ở public
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
        // Nếu API rỗng, fallback sang static cho đẹp UI
        setProducts(list.length ? list : staticProducts.map(mapImage));
      } catch {
        // API lỗi -> fallback static
        setProducts(staticProducts.map(mapImage));
      }
    };

    if (SOURCE === "static") loadStatic();
    else loadApi();
  }, []);

  const filteredProducts = products
    .filter((item) => item.name?.toLowerCase().includes(search.toLowerCase()))
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
        {filteredProducts.length === 0 ? (
          <p>Không có sản phẩm nào.</p>
        ) : (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} data={item} addToCart={addToCart} />
          ))
        )}
      </div>
    </section>
  );
};

export default Products;
