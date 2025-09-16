import api from "./axios";

export const checkout = (orderData) => api.post("/orders/checkout", orderData);
export const getOrders = () => api.get("/orders");
export const getOrderById = (id) => api.get(`/orders/${id}`);
