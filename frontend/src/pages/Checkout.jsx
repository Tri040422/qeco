import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePlaceOrder = () => {
    // TODO: gọi API backend lưu đơn hàng
    console.log("Placing order:", { user, cart });
    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-green-600">
          ✅ Order placed successfully!
        </h1>
        <p className="mt-2">Thank you for your purchase, {user?.name}.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map((item) => (
              <li key={item.id} className="py-2 flex justify-between">
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>${item.price * item.qty}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right font-semibold">Total: ${total}</div>
          <button
            onClick={handlePlaceOrder}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
