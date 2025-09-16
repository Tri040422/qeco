import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");
  const { resetPassword } = useAuth();
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email, token, pass);
      alert("Reset thành công");
      nav("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="reset-form">
      <h2>Đặt mật khẩu mới</h2>
      <form onSubmit={submit}>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="Mật khẩu mới"
          required
        />
        <button type="submit">Đổi mật khẩu</button>
      </form>
    </div>
  );
};

export default ResetPassword;
