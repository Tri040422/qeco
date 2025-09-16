import crypto from "crypto";
import qs from "qs";
import axios from "axios";
import Order from "../models/Order.js";

const fmtDate = () => {
  const d = new Date();
  const pad = (n) => (n < 10 ? `0${n}` : n);
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(
    d.getHours()
  )}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
};

// ===== VNPay =====
export const createVNPayUrl = async (req, res) => {
  const { orderId, amount } = req.body;
  const ipAddr =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";

  const vnpParams = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: process.env.VNP_TMN_CODE,
    vnp_Amount: Number(amount) * 100,
    vnp_CurrCode: "VND",
    vnp_TxnRef: String(orderId),
    vnp_OrderInfo: `Thanh toan don ${orderId}`,
    vnp_OrderType: "other",
    vnp_Locale: "vn",
    vnp_ReturnUrl: process.env.VNP_RETURN_URL,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: fmtDate(),
  };

  const sorted = Object.keys(vnpParams)
    .sort()
    .reduce((a, k) => ((a[k] = vnpParams[k]), a), {});
  const signData = qs.stringify(sorted, { encode: false });
  const hmac = crypto.createHmac("sha512", process.env.VNP_HASH_SECRET);
  const vnp_SecureHash = hmac
    .update(Buffer.from(signData, "utf-8"))
    .digest("hex");
  const payUrl = `${process.env.VNP_URL}?${signData}&vnp_SecureHash=${vnp_SecureHash}`;

  res.json({ payUrl });
};

export const vnpReturn = async (req, res) => {
  try {
    const vnpParams = { ...req.query };
    const secureHash = vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHash;
    delete vnpParams.vnp_SecureHashType;

    const sorted = Object.keys(vnpParams)
      .sort()
      .reduce((a, k) => ((a[k] = vnpParams[k]), a), {});
    const signData = qs.stringify(sorted, { encode: false });
    const checkHash = crypto
      .createHmac("sha512", process.env.VNP_HASH_SECRET)
      .update(Buffer.from(signData, "utf-8"))
      .digest("hex");

    const orderId = vnpParams.vnp_TxnRef;
    if (secureHash === checkHash && vnpParams.vnp_ResponseCode === "00") {
      await Order.findByIdAndUpdate(orderId, {
        isPaid: true,
        paidAt: new Date(),
        status: "paid",
        paymentResult: { method: "vnpay", txn: vnpParams.vnp_TransactionNo },
      });
      return res.redirect(
        `${process.env.FRONTEND_URL || ""}/order/${orderId}?paid=1`
      );
    }
    return res.redirect(
      `${process.env.FRONTEND_URL || ""}/order/${orderId}?paid=0`
    );
  } catch {
    return res.status(400).send("Invalid return");
  }
};

export const vnpIpn = async (_req, res) => {
  // Tuỳ nhu cầu, nếu muốn xác minh IPN thì làm tương tự vnpReturn và trả JSON
  res.json({ RspCode: "00", Message: "OK" });
};

// ===== MoMo =====
export const createMoMoPayment = async (req, res) => {
  const { orderId, amount } = req.body;
  const requestId = `${process.env.MOMO_PARTNER_CODE}-${Date.now()}`;
  const orderInfo = `Thanh toan don ${orderId}`;
  const redirectUrl = process.env.MOMO_RETURN_URL;
  const ipnUrl = process.env.MOMO_NOTIFY_URL;

  const raw =
    `accessKey=${process.env.MOMO_ACCESS_KEY}&amount=${amount}&extraData=&ipnUrl=${ipnUrl}` +
    `&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${process.env.MOMO_PARTNER_CODE}` +
    `&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=captureWallet`;

  const signature = crypto
    .createHmac("sha256", process.env.MOMO_SECRET_KEY)
    .update(raw)
    .digest("hex");

  const payload = {
    partnerCode: process.env.MOMO_PARTNER_CODE,
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    requestType: "captureWallet",
    extraData: "",
    signature,
    lang: "vi",
  };

  const momo = await axios.post(process.env.MOMO_ENDPOINT, payload);
  res.json({ payUrl: momo.data?.payUrl || momo.data?.deeplink || "" });
};

export const momoIpn = async (req, res) => {
  try {
    const { orderId, resultCode, amount } = req.body || {};
    if (resultCode === 0) {
      await Order.findByIdAndUpdate(orderId, {
        isPaid: true,
        paidAt: new Date(),
        status: "paid",
        paymentResult: { method: "momo", amount },
      });
      return res.json({ resultCode: 0, message: "OK" });
    }
    return res.json({ resultCode, message: "NOT OK" });
  } catch {
    return res.json({ resultCode: 999, message: "ERROR" });
  }
};
