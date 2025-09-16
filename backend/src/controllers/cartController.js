import asyncHandler from "express-async-handler";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Lấy/khởi tạo giỏ hàng và populate product
const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await cart.populate("items.product");
  }
  return cart;
};

// GET /api/cart
export const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  res.json(cart);
});

// POST /api/cart  { productId, qty }
export const addItemToCart = asyncHandler(async (req, res) => {
  const { productId, qty = 1 } = req.body;
  if (!productId) return res.status(400).json({ message: "Thiếu productId" });

  const product = await Product.findById(productId);
  if (!product)
    return res.status(404).json({ message: "Sản phẩm không tồn tại" });

  const cart = await getOrCreateCart(req.user._id);
  const idx = cart.items.findIndex(
    (i) => String(i.product._id || i.product) === String(productId)
  );
  if (idx >= 0) cart.items[idx].qty += Number(qty);
  else cart.items.push({ product: product._id, qty: Number(qty) });

  await cart.save();
  await cart.populate("items.product");
  res.status(201).json(cart);
});

// PUT /api/cart/:productId  { qty }
export const updateItemQty = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { qty } = req.body;
  if (qty == null) return res.status(400).json({ message: "Thiếu qty" });

  const cart = await getOrCreateCart(req.user._id);
  const item = cart.items.find(
    (i) => String(i.product._id || i.product) === String(productId)
  );
  if (!item)
    return res.status(404).json({ message: "Mặt hàng không có trong giỏ" });

  item.qty = Number(qty);
  if (item.qty <= 0) {
    cart.items = cart.items.filter(
      (i) => String(i.product._id || i.product) !== String(productId)
    );
  }

  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
});

// DELETE /api/cart/:productId
export const removeItemFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cart = await getOrCreateCart(req.user._id);
  const before = cart.items.length;

  cart.items = cart.items.filter(
    (i) => String(i.product._id || i.product) !== String(productId)
  );
  if (before === cart.items.length) {
    return res.status(404).json({ message: "Không tìm thấy item" });
  }

  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
});

// DELETE /api/cart
export const clearCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  cart.items = [];
  await cart.save();
  res.json(cart);
});
