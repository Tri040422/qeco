import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const checkout = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );
  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  // Build order items and calculate total
  const items = cart.items.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    quantity: item.quantity,
    price: item.price,
  }));
  const totalPrice = items.reduce((s, it) => s + it.price * it.quantity, 0);

  // Create order
  const order = new Order({
    user: req.user._id,
    items,
    shippingAddress,
    paymentMethod,
    totalPrice,
    status: paymentMethod === "cod" ? "pending" : "paid", // simplify
  });

  await order.save();

  // Optionally reduce stock
  for (const it of cart.items) {
    const p = await Product.findById(it.product._id);
    if (p) {
      p.stock = Math.max(0, p.stock - it.quantity);
      await p.save();
    }
  }

  // Clear cart
  cart.items = [];
  await cart.save();

  res.status(201).json({ orderId: order._id, order });
});

export const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("items.product");
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json(order);
});

// Admin get all orders
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user").sort({ createdAt: -1 });
  res.json(orders);
});
