import api from "./axios";

export const cartApi = {
  get: (token) =>
    api.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  add: (productId, qty, token) =>
    api.post(
      "/cart",
      { productId, qty },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
  update: (productId, qty, token) =>
    api.put(
      "/cart",
      { productId, qty },
      { headers: { Authorization: `Bearer ${token}` } }
    ),
  remove: (productId, token) =>
    api.delete(`/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
