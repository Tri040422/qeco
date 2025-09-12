import React, { useState } from "react";
import CategoryBlock from "../components/CategoryBlock";
import ProductCard from "../components/ProductCard";
import FeedbackCard from "../components/FeedbackCard";
import "../styles/style.css";

const productList = [
  {
    id: 1,
    name: "Lót ly",
    desc: "Lót ly terrazzo thủ công",
    price: "$25",
    category: "Lót ly",
    image: "/images/coaster.jpg",
  },
  {
    id: 2,
    name: "Hũ nến",
    desc: "Hũ nến thơm trang trí",
    price: "$35",
    category: "Hũ nến",
    image: "/images/candle-jar.jpg",
  },
  {
    id: 3,
    name: "Lọ hoa",
    desc: "Lọ cây hoặc hoa decor",
    price: "$40",
    category: "Lọ hoa",
    image: "/images/vase.jpg",
  },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const filteredProducts = selectedCategory
    ? productList.filter((item) => item.category === selectedCategory)
    : productList;

  return (
    <>
      <section className="welcome">
        <h1>
          Chào mừng bạn đến với <br />
          <div className="highlight">
            <span className="qc">Q</span>
            <span className="eo">e</span>
            <span className="qc">C</span>
            <span className="eo">o</span>
          </div>
        </h1>
      </section>

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

      <section className="about">
        <h2>Về chúng tôi</h2>
        <p>
          QeCo chuyên cung cấp các sản phẩm trang trí thân thiện môi trường.
        </p>
      </section>

      <section className="products">
        <h2>SẢN PHẨM {selectedCategory ? `- ${selectedCategory}` : ""}</h2>
        <div className="product-list">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} data={item} />
          ))}
        </div>
      </section>

      <section className="feedbacks">
        <h2>FEEDBACKS</h2>
        <FeedbackCard text="Sản phẩm đẹp và thân thiện!" />
        <FeedbackCard text="Dịch vụ rất tốt!" />
      </section>

      <section className="faq">
        <h2>CÂU HỎI THƯỜNG GẶP</h2>
        <ul>
          <li>Ecolite là gì?</li>
          <li>Làm sao để liên lạc với QeCo?</li>
          <li>Phí vận chuyển là bao nhiêu?</li>
          <li>Cách đổi trả hàng khi sản phẩm lỗi hoặc không vừa ý?</li>
          <li>QeCo có nhận custom sản phẩm không?</li>
        </ul>
      </section>
    </>
  );
};

export default Home;
