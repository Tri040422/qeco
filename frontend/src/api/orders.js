import api from "./axios";

export const ordersApi = {
  getMyOrders: (token) =>
    api.get("/orders/my", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getById: (id, token) =>
    api.get(`/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  create: (orderData, token) =>
    api.post("/orders", orderData, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getAllAdmin: (token) =>
    api.get("/orders", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
