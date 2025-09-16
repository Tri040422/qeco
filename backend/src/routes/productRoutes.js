import express from "express";
import Product from "../models/Product.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Lấy tất cả sản phẩm
router.get("/", async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Lấy 1 sản phẩm
router.get("/:id", async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Thêm sản phẩm (có hoặc không upload ảnh)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, desc, price, category } = req.body;
    let imagePath = req.body.image || "";

    if (req.file) {
      imagePath = "/uploads/" + req.file.filename;
    }

    const product = new Product({
      name,
      desc,
      price: Number(price),
      category,
      image: imagePath,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Cập nhật sản phẩm
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, desc, price, category } = req.body;
    const updateData = {
      ...(name !== undefined && { name }),
      ...(desc !== undefined && { desc }),
      ...(price !== undefined && { price: Number(price) }),
      ...(category !== undefined && { category }),
    };

    if (req.file) {
      updateData.image = "/uploads/" + req.file.filename;
    } else if (req.body.image) {
      // Cho phép cập nhật lại ảnh dùng link public (/images/xxx.jpg) nếu không upload file
      updateData.image = req.body.image;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Xóa sản phẩm
router.delete("/:id", async (req, res) => {
  try {
    const del = await Product.findByIdAndDelete(req.params.id);
    if (!del)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
