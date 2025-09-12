import React from "react";

const FAQ = () => {
  return (
    <section className="faq-section">
      <h2>Câu hỏi thường gặp</h2>
      <div className="faq-list">
        <div className="faq-item">
          <p className="faq-question">Ecolite là gì?</p>
          <p className="faq-answer">
            Ecolite là dòng sản phẩm thủ công của QeCo làm từ vật liệu thân
            thiện với môi trường như xi măng nhẹ, sáp thực vật và gốm tái chế.
          </p>
        </div>

        <div className="faq-item">
          <p className="faq-question">Làm sao để liên lạc với QeCo?</p>
          <p className="faq-answer">
            Bạn có thể liên hệ qua email: qeco.vn@gmail.com, fanpage Facebook
            hoặc điền form tại trang Liên hệ.
          </p>
        </div>

        <div className="faq-item">
          <p className="faq-question">Phí vận chuyển là bao nhiêu?</p>
          <p className="faq-answer">
            Phí vận chuyển từ 20.000đ (TP.HCM) và 30.000đ (toàn quốc). Miễn phí
            với đơn từ 500.000đ.
          </p>
        </div>

        <div className="faq-item">
          <p className="faq-question">
            Cách đổi trả hàng khi sản phẩm lỗi hoặc không vừa ý?
          </p>
          <p className="faq-answer">
            QeCo hỗ trợ đổi trả trong vòng 7 ngày với sản phẩm bị lỗi, móp, vỡ
            hoặc không đúng mô tả. Không áp dụng đổi do đổi ý.
          </p>
        </div>

        <div className="faq-item">
          <p className="faq-question">QeCo có nhận custom sản phẩm không?</p>
          <p className="faq-answer">
            Có. Bạn có thể gửi yêu cầu custom (màu, họa tiết, tên cá nhân...)
            qua fanpage hoặc email. QeCo sẽ báo giá chi tiết.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
