import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/style.css";
import { CartProvider } from "./context/CartProvider"; // ✅ import đúng

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
