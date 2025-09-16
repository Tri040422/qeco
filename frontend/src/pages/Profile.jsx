import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, deleteAccount, logout } = useAuth();
  const nav = useNavigate();

  if (!user) return <p>Vui lòng đăng nhập</p>;

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc muốn xóa tài khoản?")) return;
    await deleteAccount();
    nav("/");
  };

  return (
    <section>
      <h2>Tài khoản</h2>
      <p>Tên: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button
        onClick={() => {
          logout();
          nav("/");
        }}
      >
        Đăng xuất
      </button>
      <button
        onClick={handleDelete}
        style={{ background: "red", color: "#fff" }}
      >
        Xóa tài khoản
      </button>
    </section>
  );
};

export default Profile;
