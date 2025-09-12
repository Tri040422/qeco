import React from "react";

const Register = () => {
  return (
    <>
      <div className="register-form">
        <h2>Đăng ký</h2>
        <form>
          <input type="text" placeholder="Tên người dùng" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Mật khẩu" />
          <button type="submit">Đăng ký</button>
        </form>
      </div>
    </>
  );
};

export default Register;
