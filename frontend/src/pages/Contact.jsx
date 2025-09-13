import React, { useState } from "react";
import "../styles/style.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="contact-section">
      <div className="contact-wrapper">
        <h2 className="section-title">Liên hệ với QeCo</h2>

        <div className="contact-info">
          <p>Email: support@qeco.com</p>
          <p>Điện thoại: 0123 456 789</p>
          <p>Địa chỉ: 123 Đường Xanh, Quận Y, TP. Z</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Nội dung liên hệ"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="send-btn">
            Gửi
          </button>
        </form>

        {/* Google Map */}
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18..."
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
