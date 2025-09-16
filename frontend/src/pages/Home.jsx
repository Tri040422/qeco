import React, { useState, useEffect } from "react";
import CategoryBlock from "../components/CategoryBlock";
import ProductCard from "../components/ProductCard";
import "../styles/style.css";
import { useCart } from "../hooks/useCart";
import logo from "/images/logo-qeco.jpg";
import productsData from "../data/products"; // ✅ lấy danh sách từ data

// ✅ alias cho dễ đọc
const productList = Array.isArray(productsData) ? productsData : [];

// ✅ FAQ local
const faqList = [
  { q: "Ecolite là gì?", a: "Ecolite là dòng sản phẩm thân thiện môi trường." },
  {
    q: "Làm sao để liên lạc với QeCo?",
    a: "Bạn có thể liên hệ qua email hoặc hotline.",
  },
  { q: "Phí vận chuyển là bao nhiêu?", a: "Tùy khu vực, thường từ 20k VNĐ." },
  {
    q: "Cách đổi trả hàng khi sản phẩm lỗi hoặc không vừa ý?",
    a: "Trong vòng 7 ngày, miễn phí đổi trả.",
  },
  {
    q: "QeCo có nhận custom sản phẩm không?",
    a: "Có, vui lòng gửi yêu cầu chi tiết.",
  },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const t = setTimeout(() => {
      setFeedbacks([
        { id: 1, text: "Sản phẩm đẹp và thân thiện!" },
        { id: 2, text: "Dịch vụ rất tốt!" },
        { id: 3, text: "Ship nhanh, đóng gói cẩn thận!" },
      ]);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const filteredProducts = productList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? item.category === selectedCategory : true)
  );

  // Nếu data không có isFeatured, chọn đại một vài item đầu làm “nổi bật”
  const featuredProducts = productList.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="welcome" style={{ background: "#f0f0f0" }}>
        <h1>Chào mừng bạn đến với QeCo</h1>
        <p>Sản phẩm trang trí thân thiện môi trường</p>
        <img
          src={logo}
          alt="QeCo"
          style={{ width: 120, borderRadius: 12, marginTop: 12 }}
        />
      </section>

      {/* Search */}
      <section
        className="search"
        style={{ margin: "1.5rem auto", textAlign: "center" }}
      >
        <input
          type="text"
          placeholder="Tìm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            width: "60%",
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />
      </section>

      {/* Category */}
      <section className="categories">
        <h2>PHÂN LOẠI</h2>
        <div className="category-list">
          {["Lót ly", "Hũ nến", "Lọ hoa"].map((cat) => (
            <CategoryBlock
              key={cat}
              title={cat}
              onClick={() =>
                setSelectedCategory((c) => (c === cat ? null : cat))
              }
              active={cat === selectedCategory}
            />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="featured">
        <h2>Sản phẩm nổi bật</h2>
        <div className="product-list">
          {featuredProducts.map((item) => (
            <ProductCard
              key={item.id || item._id}
              data={item}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* Product List */}
      <section className="products">
        <h2>SẢN PHẨM {selectedCategory ? `- ${selectedCategory}` : ""}</h2>
        <div className="product-list">
          {filteredProducts.map((item) => (
            <ProductCard
              key={item.id || item._id}
              data={item}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* Feedback */}
      <section className="feedbacks">
        <h2>FEEDBACKS</h2>
        {feedbacks.length === 0 ? (
          <p>Đang tải feedback...</p>
        ) : (
          feedbacks.map((fb) => <p key={fb.id}>"{fb.text}"</p>)
        )}
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2>CÂU HỎI THƯỜNG GẶP</h2>
        {faqList.map((faq, i) => (
          <div
            key={i}
            className="faq-item"
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          >
            <div className="faq-question" style={{ fontWeight: 600 }}>
              {faq.q}
            </div>
            {openFaq === i && <p style={{ marginTop: 8 }}>{faq.a}</p>}
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;
