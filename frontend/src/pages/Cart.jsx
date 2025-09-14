import React from "react";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <h2>🛒 Giỏ hàng trống</h2>;
  }

  return (
    <div>
      <h2>Giỏ hàng của bạn</h2>
      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{ display: "flex", gap: "10px", margin: "10px 0" }}
        >
          <img src={item.image} alt={item.name} width={50} />
          <span>{item.name}</span>
          <span>{item.price}₫</span>
          <button onClick={() => decreaseQty(item.id)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => increaseQty(item.id)}>+</button>
          <span>= {item.price * item.quantity}₫</span>
          <button onClick={() => removeFromCart(item.id)}>❌</button>
        </div>
      ))}
      <h3>Tổng cộng: {total}₫</h3>
      <button onClick={() => alert("Thanh toán thành công!")}>
        Thanh toán
      </button>
    </div>
  );
};

export default Cart;
