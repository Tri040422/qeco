import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ResetPassword = () => {
  const { token } = useParams();
  const { resetPassword } = useAuth();
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(token, password);
      alert("✅ Đặt lại mật khẩu thành công");
      nav("/login");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Lỗi đặt lại mật khẩu");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Đặt mật khẩu mới</h2>
        <form className="auth-form" onSubmit={submit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu mới"
            required
          />
          <button type="submit" className="auth-btn">
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
