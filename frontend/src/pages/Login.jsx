import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handle = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setMsg("Đăng nhập thành công");
      nav("/"); // redirect home
    } catch (err) {
      setMsg(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="login-form">
      <h2>Đăng nhập</h2>
      <form onSubmit={handle}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Mật khẩu"
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>{msg}</p>
    </div>
  );
};
export default Login;
