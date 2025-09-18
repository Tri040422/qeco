import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Lấy / cập nhật / xóa tài khoản của chính mình
router
  .route("/me")
  .get(protect, getMyProfile)
  .put(protect, updateMyProfile)
  .delete(protect, deleteMyAccount);

// Admin xóa tài khoản bất kỳ
router.delete("/:id", protect, admin, deleteUser);

export default router;
