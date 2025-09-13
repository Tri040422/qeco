import React from "react";
import { useCart } from "../hooks/useCart";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart(); // dùng cartItems thay vì cart

  const total = cartItems.reduce(
    (sum, item) => sum + (item.qty || 1) * item.price,
    0
  );

  if (cartItems.length === 0) {
    return (
      <section className="cart-section">
        <h2>Giỏ hàng của bạn</h2>
        <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <h2>Giỏ hàng của bạn</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} x {item.qty || 1} = {item.qty || 1 * item.price}₫
            <button onClick={() => removeFromCart(item.id)}>❌</button>
          </li>
        ))}
      </ul>
      <h3>Tổng cộng: {total}₫</h3>
    </section>
  );
};

export default Cart;
