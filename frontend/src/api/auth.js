import api from "./axios";

export const authApi = {
  login: (email, password) => api.post("/auth/login", { email, password }),

  register: (name, email, password, role = "customer") =>
    api.post("/auth/register", { name, email, password, role }),

  forgotPassword: (email) => api.post("/auth/forgot", { email }),

  resetPassword: (token, password) =>
    api.post(`/auth/reset/${token}`, { password }),

  deleteAccount: (token) =>
    api.delete("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
