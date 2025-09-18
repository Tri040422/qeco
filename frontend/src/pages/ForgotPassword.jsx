import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMsg("✅ Vui lòng kiểm tra email để đặt lại mật khẩu");
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Lỗi gửi email");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Quên mật khẩu</h2>
        <form className="auth-form" onSubmit={submit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <button type="submit" className="auth-btn">
            Gửi link đặt lại
          </button>
        </form>
        {msg && <p style={{ marginTop: "1rem" }}>{msg}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
