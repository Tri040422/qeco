import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createVNPayUrl,
  vnpReturn,
  vnpIpn,
  createMoMoPayment,
  momoIpn,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/vnpay/create", protect, createVNPayUrl);
router.get("/vnpay/return", vnpReturn);
router.get("/vnpay/ipn", vnpIpn);

router.post("/momo/create", protect, createMoMoPayment);
router.post("/momo/ipn", momoIpn);

export default router;
