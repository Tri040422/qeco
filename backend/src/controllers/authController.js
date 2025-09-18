import asyncHandler from "express-async-handler";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Đăng ký
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email đã tồn tại");
  }

  const user = await User.create({ name, email, password, role });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Dữ liệu người dùng không hợp lệ");
  }
});

// Đăng nhập
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Email hoặc mật khẩu không đúng");
  }
});

// Quên mật khẩu
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("Không tìm thấy tài khoản với email này");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = resetTokenHash;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 phút
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset/${resetToken}`;

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"QeCo" <no-reply@qeco.com>',
    to: email,
    subject: "Đặt lại mật khẩu",
    text: `Bạn nhận được email này vì có yêu cầu đặt lại mật khẩu.\nVui lòng click vào liên kết sau (hạn 15 phút): ${resetUrl}`,
  });

  res.json({
    message: "Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư",
  });
});

// Reset mật khẩu
export const resetPassword = asyncHandler(async (req, res) => {
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: resetTokenHash,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Token không hợp lệ hoặc đã hết hạn");
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.json({ message: "Mật khẩu đã được đặt lại thành công" });
});
