import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getCart,
  addItemToCart,
  updateItemQty,
  removeItemFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Lấy giỏ hàng của user
router.get("/", protect, getCart);

// Thêm item vào giỏ: { productId, qty }
router.post("/", protect, addItemToCart);

// Cập nhật số lượng: /:productId  { qty }
router.put("/:productId", protect, updateItemQty);

// Xoá 1 item: /:productId
router.delete("/:productId", protect, removeItemFromCart);

// Xoá toàn bộ giỏ
router.delete("/", protect, clearCart);

export default router;
