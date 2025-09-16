import express from "express";
import {
  checkout,
  getUserOrders,
  getOrderById,
  getAllOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/checkout", protect, checkout);
router.get("/", protect, getUserOrders);
router.get("/:id", protect, getOrderById);

// admin
router.get("/admin/all", protect, admin, getAllOrders);

export default router;
