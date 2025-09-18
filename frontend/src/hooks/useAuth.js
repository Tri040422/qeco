import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  // Gọi API quên mật khẩu
  const forgotPassword = async (email) => {
    return axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/forgot`, {
      email,
    });
  };

  // Gọi API đặt lại mật khẩu
  const resetPassword = async (token, password) => {
    return axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/reset/${token}`,
      { password }
    );
  };

  return { ...ctx, forgotPassword, resetPassword };
};
