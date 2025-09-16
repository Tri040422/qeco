import api from "./axios";

export const payOrder = (orderId, method) =>
  api.post(`/payment/checkout`, { orderId, method });
