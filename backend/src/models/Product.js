import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    image: { type: String }, // link ảnh (/images/... hoặc /uploads/...)
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
