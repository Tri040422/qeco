import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Bảo vệ route
export const protect = async (req, res, next) => {
  try {
    let token = null;
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Không có token, vui lòng đăng nhập" });
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
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Chỉ quản trị viên mới được phép" });
};
