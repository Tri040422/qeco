import React from "react";

const Login = () => {
  return (
    <>
      <div className="login-form">
        <h2>Đăng nhập</h2>
        <form>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Mật khẩu" />
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    </>
  );
};

export default Login;
