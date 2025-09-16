import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {cart.map((item) => (
              <li
                key={item.id}
                className="py-2 flex justify-between items-center"
              >
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>${item.price * item.qty}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right font-semibold">Total: ${total}</div>
          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
