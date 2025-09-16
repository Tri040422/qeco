import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Bảo vệ route: yêu cầu có JWT
export const protect = async (req, res, next) => {
  try {
    let token = null;

    // Ưu tiên Authorization: Bearer <token>
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Không có token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Token không hợp lệ" });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Xác thực thất bại" });
  }
};

// Chỉ cho admin
export const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.isAdmin === true)) {
    return next();
  }
  return res.status(403).json({ message: "Chỉ admin" });
};

// ✅ Alias để tương thích với nơi import { admin }
export const admin = adminOnly;

export default {
  protect,
  adminOnly,
  admin,
};
