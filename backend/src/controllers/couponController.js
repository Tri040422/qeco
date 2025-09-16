import asyncHandler from "express-async-handler";
import Coupon from "../models/Coupon.js";

export const listCoupons = asyncHandler(async (_req, res) => {
  const list = await Coupon.find().sort({ createdAt: -1 });
  res.json(list);
});

export const createCoupon = asyncHandler(async (req, res) => {
  const {
    code,
    type = "percent",
    value,
    minOrder = 0,
    startAt,
    endAt,
    maxUsage,
  } = req.body;
  if (!code || !value)
    return res.status(400).json({ message: "Thiếu code hoặc value" });

  const exists = await Coupon.findOne({ code: code.toUpperCase() });
  if (exists) return res.status(400).json({ message: "Mã đã tồn tại" });

  const coupon = await Coupon.create({
    code: code.toUpperCase(),
    type,
    value,
    minOrder,
    startAt: startAt ? new Date(startAt) : undefined,
    endAt: endAt ? new Date(endAt) : undefined,
    maxUsage,
  });
  res.status(201).json(coupon);
});

export const toggleCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) return res.status(404).json({ message: "Không tìm thấy mã" });
  coupon.isActive = !coupon.isActive;
  await coupon.save();
  res.json(coupon);
});

export const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) return res.status(404).json({ message: "Không tìm thấy mã" });
  await coupon.deleteOne();
  res.json({ message: "Đã xoá" });
});

export const applyCoupon = asyncHandler(async (req, res) => {
  const { code, itemsPrice } = req.body;
  if (!code || itemsPrice == null)
    return res.status(400).json({ message: "Thiếu dữ liệu" });

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    isActive: true,
  });
  if (!coupon)
    return res.status(404).json({ message: "Mã không tồn tại/đang tắt" });

  const now = new Date();
  if (
    (coupon.startAt && now < coupon.startAt) ||
    (coupon.endAt && now > coupon.endAt)
  ) {
    return res.status(400).json({ message: "Mã không còn hiệu lực" });
  }
  if (coupon.maxUsage && coupon.usageCount >= coupon.maxUsage) {
    return res.status(400).json({ message: "Mã đã hết lượt sử dụng" });
  }
  if (itemsPrice < (coupon.minOrder || 0)) {
    return res
      .status(400)
      .json({ message: `Đơn tối thiểu ${coupon.minOrder?.toLocaleString()}đ` });
  }

  let discount = 0;
  if (coupon.type === "percent")
    discount = Math.floor((itemsPrice * coupon.value) / 100);
  else discount = Math.min(coupon.value, itemsPrice);

  res.json({
    code: coupon.code,
    type: coupon.type,
    value: coupon.value,
    discount,
  });
});
