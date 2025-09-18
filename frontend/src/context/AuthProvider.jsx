import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
    setLoading(false);
  }, []);

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

  const register = async (name, email, password, role = "customer") => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        { name, email, password, role }
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ✅ Xóa tài khoản
  const deleteAccount = async () => {
    if (!user?.token) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      logout(); // clear state + localStorage
    } catch (err) {
      console.error("Xóa tài khoản thất bại:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};
