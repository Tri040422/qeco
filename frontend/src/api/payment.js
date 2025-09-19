import api from "./axios";

export const paymentsApi = {
  // VNPay
  createVNPay: (orderId, token) =>
    api.post(
      "/payments/vnpay",
      { orderId },
      { headers: { Authorization: `Bearer ${token}` } }
    ),

  // MoMo
  createMoMo: (orderId, token) =>
    api.post(
      "/payments/momo",
      { orderId },
      { headers: { Authorization: `Bearer ${token}` } }
    ),

  // Kiểm tra trạng thái thanh toán
  getStatus: (paymentId, token) =>
    api.get(`/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
