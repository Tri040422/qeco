import api from "./axios";

export const couponsApi = {
  getAll: (token) =>
    api.get("/coupons", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  create: (data, token) =>
    api.post("/coupons", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  update: (id, data, token) =>
    api.put(`/coupons/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  delete: (id, token) =>
    api.delete(`/coupons/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  apply: (code, token) =>
    api.post(
      "/coupons/apply",
      { code },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
};
