import api from "./axios";

export const productsApi = {
  getAll: () => api.get("/products"),
  getById: (id) => api.get(`/products/${id}`),
  create: (data, token) =>
    api.post("/products", data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  update: (id, data, token) =>
    api.put(`/products/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  delete: (id, token) =>
    api.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
