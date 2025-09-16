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
      setMsg("Vui lòng kiểm tra email để reset mật khẩu");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="forgot-form">
      <h2>Quên mật khẩu</h2>
      <form onSubmit={submit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <button type="submit">Gửi</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};

export default ForgotPassword;
