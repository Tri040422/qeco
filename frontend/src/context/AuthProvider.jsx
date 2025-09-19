// src/context/AuthProvider.jsx
import React, { useState, useEffect } from "react";
import axios from "../api/axios"; // 👉 dùng instance axios.js bạn đã config
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
    setLoading(false);
  }, []);

  // 🔑 Đăng nhập
  const login = async (email, password) => {
    try {
      const res = await axios.post("/auth/login", { email, password });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || "Đăng nhập thất bại",
      };
    }
  };

  // 📝 Đăng ký
  const register = async (name, email, password, role = "customer") => {
    try {
      const res = await axios.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || "Đăng ký thất bại",
      };
    }
  };

  // 🚪 Đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ❌ Xóa tài khoản
  const deleteAccount = async () => {
    if (!user?.token) return;
    try {
      await axios.delete("/users/me", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      logout();
    } catch (err) {
      console.log(err);
      throw new Error("Xóa tài khoản thất bại");
    }
  };

  // 📧 Quên mật khẩu
  const forgotPassword = async (email) => {
    try {
      const res = await axios.post("/auth/forgot", { email });
      return { success: true, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || "Không gửi được email",
      };
    }
  };

  // 🔄 Đặt lại mật khẩu
  const resetPassword = async (token, password) => {
    try {
      const res = await axios.post(`/auth/reset/${token}`, { password });
      return { success: true, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || "Đặt lại mật khẩu thất bại",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        deleteAccount,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
