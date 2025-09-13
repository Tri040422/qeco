import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "Ecolite là gì?",
      answer:
        "Ecolite là dòng sản phẩm thủ công của QeCo làm từ vật liệu thân thiện với môi trường như xi măng nhẹ, sáp thực vật và gốm tái chế.",
    },
    {
      question: "Làm sao để liên lạc với QeCo?",
      answer:
        "Bạn có thể liên hệ qua email: qeco.vn@gmail.com, fanpage Facebook hoặc điền form tại trang Liên hệ.",
    },
    {
      question: "Phí vận chuyển là bao nhiêu?",
      answer:
        "Phí vận chuyển từ 20.000đ (TP.HCM) và 30.000đ (toàn quốc). Miễn phí với đơn từ 500.000đ.",
    },
    {
      question: "Cách đổi trả hàng khi sản phẩm lỗi hoặc không vừa ý?",
      answer:
        "QeCo hỗ trợ đổi trả trong vòng 7 ngày với sản phẩm bị lỗi, móp, vỡ hoặc không đúng mô tả. Không áp dụng đổi do đổi ý.",
    },
    {
      question: "QeCo có nhận custom sản phẩm không?",
      answer:
        "Có. Bạn có thể gửi yêu cầu custom (màu, họa tiết, tên cá nhân...) qua fanpage hoặc email. QeCo sẽ báo giá chi tiết.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2>Câu hỏi thường gặp</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
            <p
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              {item.question}
            </p>
            {activeIndex === index && (
              <p className="faq-answer">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
