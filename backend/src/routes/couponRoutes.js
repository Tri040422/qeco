import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  listCoupons,
  createCoupon,
  toggleCoupon,
  deleteCoupon,
  applyCoupon,
} from "../controllers/couponController.js";

const router = express.Router();

// Admin
router.get("/", protect, admin, listCoupons);
router.post("/", protect, admin, createCoupon);
router.patch("/:id/toggle", protect, admin, toggleCoupon);
router.delete("/:id", protect, admin, deleteCoupon);

// Client apply
router.post("/apply", protect, applyCoupon);

export default router;
