import React from "react";
import { useLocation, Link } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();
  const { orderId, form } = location.state || {};

  return (
    <div className="order-confirmation">
      <h2>Thank you for your order!</h2>
      {orderId ? (
        <>
          <p>
            Your order ID: <strong>{orderId}</strong>
          </p>
          <p>
            We’ll send a confirmation email to <strong>{form?.email}</strong>
          </p>
          <p>Shipping to: {form?.address}</p>
        </>
      ) : (
        <p>No order found.</p>
      )}

      <Link to="/products" className="btn-back">
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderConfirmation;
