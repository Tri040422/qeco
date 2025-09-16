import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
      trim: true,
    },
    type: { type: String, enum: ["percent", "fixed"], default: "percent" },
    value: { type: Number, required: true }, // % hoặc số tiền VND
    minOrder: { type: Number, default: 0 }, // đơn tối thiểu
    isActive: { type: Boolean, default: true },
    startAt: { type: Date },
    endAt: { type: Date },
    usageCount: { type: Number, default: 0 },
    maxUsage: { type: Number }, // giới hạn số lần dùng toàn hệ thống
  },
  { timestamps: true }
);

export default mongoose.model("Coupon", couponSchema);
