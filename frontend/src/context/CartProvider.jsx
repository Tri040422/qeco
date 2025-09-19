import React, { useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState(null);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      if (existing) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (item) => {
    setCartItems((prev) => prev.filter((i) => i._id !== item._id));
  };

  const updateQty = (item, qty) => {
    if (qty <= 0) return removeFromCart(item);
    setCartItems((prev) =>
      prev.map((i) => (i._id === item._id ? { ...i, qty } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        discount,
        setDiscount,
        coupon,
        setCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
