import axios from "axios";

// Lấy API URL từ .env hoặc fallback
const getBaseURL = () => {
  if (import.meta.env.DEV) {
    // khi chạy npm run dev -> môi trường local
    return import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  } else {
    // khi build & deploy
    return import.meta.env.VITE_BACKEND_URL + "/api";
  }
};

const instance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true, // nếu cần cookie/session
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
