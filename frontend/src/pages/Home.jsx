import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // để chuyển sang Product Detail
import CategoryBlock from "../components/CategoryBlock";
import ProductCard from "../components/ProductCard";
import "../styles/style.css";

const productList = [
  {
    id: 1,
    name: "Lót ly",
    desc: "Lót ly terrazzo thủ công",
    price: "$25",
    category: "Lót ly",
    image: "/images/coaster.jpg",
    isFeatured: true,
  },
  {
    id: 2,
    name: "Hũ nến",
    desc: "Hũ nến thơm trang trí",
    price: "$35",
    category: "Hũ nến",
    image: "/images/candle-jar.jpg",
    isFeatured: false,
  },
  {
    id: 3,
    name: "Lọ hoa",
    desc: "Lọ cây hoặc hoa decor",
    price: "$40",
    category: "Lọ hoa",
    image: "/images/vase.jpg",
    isFeatured: true,
  },
];

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
  const [cart, setCart] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  // Giả lập API feedback
  useEffect(() => {
    setTimeout(() => {
      setFeedbacks([
        { id: 1, text: "Sản phẩm đẹp và thân thiện!" },
        { id: 2, text: "Dịch vụ rất tốt!" },
        { id: 3, text: "Ship nhanh, đóng gói cẩn thận!" },
      ]);
    }, 500);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} đã được thêm vào giỏ hàng!`);
  };

  const filteredProducts = productList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? item.category === selectedCategory : true)
  );

  const featuredProducts = productList.filter((p) => p.isFeatured);

  return (
    <>
      {/* Banner / Hero Slider đơn giản */}
      <section
        className="hero"
        style={{ background: "#f0f0f0", padding: "2rem", textAlign: "center" }}
      >
        <h1>Chào mừng bạn đến với QeCo</h1>
        <p>Sản phẩm trang trí thân thiện môi trường</p>
        <img
          src="/images/banner.jpg"
          alt="Banner"
          style={{ borderRadius: "12px", marginTop: "1rem" }}
        />
      </section>

      {/* Search */}
      <section
        className="search"
        style={{ margin: "2rem auto", textAlign: "center" }}
      >
        <input
          type="text"
          placeholder="Tìm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "0.5rem 1rem",
            width: "60%",
            borderRadius: "8px",
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
              onClick={handleCategoryClick}
              active={cat === selectedCategory}
            />
          ))}
        </div>
        {selectedCategory && (
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <button
              onClick={() => setSelectedCategory(null)}
              style={{
                padding: "0.5rem 1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: "#f2f2f2",
              }}
            >
              Hiện tất cả
            </button>
          </div>
        )}
      </section>

      {/* Featured */}
      <section className="featured">
        <h2>Sản phẩm nổi bật</h2>
        <div className="product-list">
          {featuredProducts.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #eee",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <ProductCard data={item} />
              <button onClick={() => navigate(`/product/${item.id}`)}>
                Xem chi tiết
              </button>
              <button onClick={() => handleAddToCart(item)}>
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Product List */}
      <section className="products">
        <h2>SẢN PHẨM {selectedCategory ? `- ${selectedCategory}` : ""}</h2>
        <div className="product-list">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #eee",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <ProductCard data={item} />
              <button onClick={() => navigate(`/product/${item.id}`)}>
                Xem chi tiết
              </button>
              <button onClick={() => handleAddToCart(item)}>
                Thêm vào giỏ
              </button>
            </div>
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

      {/* FAQ Accordion */}
      <section className="faq">
        <h2>CÂU HỎI THƯỜNG GẶP</h2>
        {faqList.map((faq, i) => (
          <div key={i} style={{ marginBottom: "1rem" }}>
            <div
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              {faq.q}
            </div>
            {openFaq === i && <p>{faq.a}</p>}
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;
