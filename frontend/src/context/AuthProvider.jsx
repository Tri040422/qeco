import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

// Lưu ý: file này chỉ export COMPONENT để Fast Refresh mượt
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user từ localStorage khi reload trang
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
    setLoading(false);
  }, []);

  // Đăng nhập (gọi backend deploy)
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        { email, password }
      );
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

  // Đăng ký
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        { name, email, password }
      );
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

  // Đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
