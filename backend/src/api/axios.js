import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // chỉnh theo backend thật
  withCredentials: true,
});

export default api;
