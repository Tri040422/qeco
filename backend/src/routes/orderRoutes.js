import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";

const router = express.Router();

// Tạo đơn (Checkout) — bạn đã có ở controller riêng, giữ nguyên nếu dùng controller
// router.post("/", protect, createOrder)

// Đơn của tôi
router.get(
  "/my",
  protect,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  })
);

// Admin: list + phân trang
router.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);

    const total = await Order.countDocuments();
    const items = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ items, page, pages: Math.ceil(total / limit), total });
  })
);

// Admin: cập nhật trạng thái
router.put(
  "/:id/status",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { status } = req.body;
    const allowed = [
      "pending",
      "paid",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!allowed.includes(status))
      return res.status(400).json({ message: "Trạng thái không hợp lệ" });

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn" });
    res.json(order);
  })
);

// Chi tiết đơn
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn" });
    if (
      String(order.user) !== String(req.user._id) &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Không có quyền" });
    }
    res.json(order);
  })
);

export default router;
