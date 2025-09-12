// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // cho phép frontend gọi API (chỉnh origin nếu cần)

// routes
const productRoutes = require("./routes/productRoutes"); // nếu có
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

// mount apis
app.use("/api/products", productRoutes); // nếu bạn đã có file
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
