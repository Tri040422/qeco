import React, { useState } from "react";
import "../styles/style.css";

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { name: "Ly, hủ nến", img: "/images/ly-hu-nen.jpg" },
    { name: "Lót ly", img: "/images/lot-ly.jpg" },
    { name: "Lọ hoa", img: "/images/lo-hoa.jpg" },
  ];

  const bestSeller = [
    {
      name: "Lót tròn họa tiết terrazzo",
      price: "70.000đ",
      img: "/images/lot-tron-1.jpg",
    },
    {
      name: "Lót Oval họa tiết terrazzo",
      price: "190.000đ",
      img: "/images/lot-oval.jpg",
    },
    {
      name: "Hủ nến màu trơn",
      price: "160.000đ",
      img: "/images/hu-nen-mau-tron.jpg",
    },
  ];

  const products = [
    { name: "Khay oval in chìm", img: "/images/oval-in-chim-1.jpg" },
    { name: "Khay vỏ sò", img: "/images/vo-so-1.jpg" },
    { name: "Hủ đựng nắp có chóp", img: "/images/hu-dung-nap-co-chop-1.jpg" },
    { name: "Lót hình bông hoa", img: "/images/lot-hinh-bong-hoa-1.jpg" },
  ];

  const feedbacks = [
    {
      user: "NGAN TUYET",
      text: "Sản phẩm rất dễ thương, còn có nhiều ý nghĩa, mình rất thích nó lần tới mình sẽ ủng hộ tiếp.",
      stars: 5,
    },
    {
      user: "NGOC THANH",
      text: "Xịn đét làm đúng theo yêu cầu khách hàng, còn phối màu đẹp nữa, lần sau chắc phải mua thêm tặng người thân mới được.",
      stars: 5,
    },
  ];

  const faqs = [
    {
      q: "QeCo là gì?",
      a: "QeCo là thương hiệu sản phẩm decor thân thiện môi trường.",
    },
    {
      q: "Làm sao để liên lạc với QeCo?",
      a: "Bạn có thể đặt trực tiếp trên website hoặc liên hệ chúng tôi.",
    },
    {
      q: "Phí vận chuyển là bao nhiêu?",
      a: "Phí vận chuyển tuỳ khu vực, thường từ 20k VNĐ.",
    },
    {
      q: "Cách đổi trả sản phẩm lỗi khi hoặc không vừa ý?",
      a: "Trong vòng 7 ngày kể từ khi nhận hàng.",
    },
    {
      q: "QeCo có nhận custom sản phẩm không?",
      a: "Có.",
    },
  ];

  return (
    <div className="home-container">
      {/* Hero */}
      <section className="hero">
        <img src="/images/banner.jpg" alt="Hero" className="hero-img" />
        <div className="hero-text">
          <h1>
            Chào mừng bạn đến với <span className="brand">QeCo</span>
          </h1>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2 className="section-title">Phân loại</h2>
        <div className="category-list">
          {categories.map((c, i) => (
            <div key={i} className="category-card">
              <img src={c.img} alt={c.name} />
              <p>{c.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Promo */}
      <section className="promo">
        <div className="promo-card">
          <h3>Sản phẩm mới giảm giá sâu</h3>
          <button className="btn-primary">Mua ngay</button>
        </div>
      </section>

      {/* Best Seller */}
      <section className="best-seller">
        <h2 className="section-title">Sản phẩm bán chạy</h2>
        <div className="best-grid">
          {bestSeller.map((p, i) => (
            <div key={i} className="best-card">
              <img src={p.img} alt={p.name} />
              <p>{p.name}</p>
              <span>{p.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="about">
        <h2 className="section-title">Về chúng tôi</h2>
        <div className="about-content">
          <div>
            <p>
              QeCo là một cửa hàng decor thủ công sáng tạo, kết hợp vật liệu
              sinh học Ecolite với đồ tái chế như vụn nhựa, thuỷ tinh, sỏi, hoa
              khô ... để tạo ra các sản phẩm nghệ thuật mang tính cá nhân hoá
              cao và truyền tải thông điệp sống xanh. Mỗi sản phẩm đi kèm mã QR
              để kể lại hành trình tái sinh của nguyên liệu và quá trình chế
              tác, tạo ra trải nghiệm nghệ thuật và công nghệ độc đáo.
            </p>
            <button className="btn-secondary">Xem thêm</button>
          </div>
          <img
            src="/images/ve-chung-toi.jpg"
            alt="About"
            className="about-img"
          />
        </div>
      </section>

      {/* Products */}
      <section className="products">
        <h2 className="section-title">Sản phẩm</h2>
        <div className="product-list">
          {products.map((p, i) => (
            <div key={i} className="product-card">
              <img src={p.img} alt={p.name} />
              <p>{p.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback */}
      <section className="feedbacks">
        <h2 className="section-title">Feedback</h2>
        <div className="feedback-list">
          {feedbacks.map((f, i) => (
            <div key={i} className="feedback-card">
              <p>"{f.text}"</p>
              <span>⭐ {f.stars} / 5</span>
              <strong>- {f.user}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2 className="section-title">Câu hỏi thường gặp</h2>
        {faqs.map((f, i) => (
          <div
            key={i}
            className="faq-item"
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          >
            <div className="faq-question">{f.q}</div>
            {openFaq === i && <div className="faq-answer">{f.a}</div>}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
