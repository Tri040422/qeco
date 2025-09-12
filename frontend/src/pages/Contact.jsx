import React from "react";
import products from "../data/products";
import "../styles/style.css";

const Contact = () => {
  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        <h2 className="section-title">Sản phẩm nổi bật</h2>
        <div className="contact-grid">
          {products.map((item) => (
            <div className="contact-card" key={item.id}>
              <img src={item.image} alt={item.name} className="contact-img" />
              <div className="contact-content">
                <p className="name">{item.name}</p>
                <p className="price">{item.price}</p>
                <div className="bottom-row">
                  <div className="stars">
                    {"★".repeat(5)}
                    <span className="count">(xx)</span>
                  </div>
                  <button className="cart-btn">🛒</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
